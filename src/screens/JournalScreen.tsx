import * as React from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Modal, TextInput, Alert } from 'react-native'
import { useTheme } from '../ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { storage, JournalEntry } from '../storage'

export const JournalScreen = ({ navigation }: any) => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = React.useState<'quests' | 'achievements' | 'notes'>('quests')
  const [entries, setEntries] = React.useState<JournalEntry[]>([])
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState('')
  const [newContent, setNewContent] = React.useState('')
  const [newType, setNewType] = React.useState<'quest' | 'achievement' | 'note'>('note')

  React.useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    const data = await storage.getJournalEntries()
    setEntries(data)
  }

  const addEntry = async () => {
    if (!newTitle.trim()) {
      Alert.alert('Error', 'Title is required')
      return
    }
    await storage.saveJournalEntry({
      title: newTitle.trim(),
      content: newContent.trim(),
      type: newType,
      completed: false,
    })
    setNewTitle('')
    setNewContent('')
    setShowAddModal(false)
    loadEntries()
  }

  const toggleComplete = async (id: string, completed: boolean) => {
    await storage.updateJournalEntry(id, { completed: !completed })
    loadEntries()
  }

  const deleteEntry = async (id: string) => {
    Alert.alert('Delete Entry', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        await storage.deleteJournalEntry(id)
        loadEntries()
      }},
    ])
  }

  const filteredEntries = entries.filter(e => {
    if (activeTab === 'quests') return e.type === 'quest'
    if (activeTab === 'achievements') return e.type === 'achievement'
    return e.type === 'note'
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'quest': return 'flag-outline'
      case 'achievement': return 'trophy-outline'
      default: return 'document-text-outline'
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.accent }]}>📖 Journal</Text>
        <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Track your journey</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {(['quests', 'achievements', 'notes'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, {
              backgroundColor: activeTab === tab ? theme.accent : theme.bgTertiary,
              borderBottomColor: activeTab === tab ? theme.accent : 'transparent',
            }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : theme.textSecondary }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {filteredEntries.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="document-text-outline" size={48} color={theme.textMuted} />
            <Text style={{ color: theme.textMuted, marginTop: 12, fontSize: 16 }}>No entries yet</Text>
            <Text style={{ color: theme.textMuted, marginTop: 4, fontSize: 13 }}>Tap + to add your first entry</Text>
          </View>
        ) : (
          filteredEntries.map(entry => (
            <View key={entry.id} style={[styles.entryCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: entry.completed ? 2 : 1 }]}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                onPress={() => toggleComplete(entry.id, entry.completed)}
              >
                <Ionicons
                  name={entry.completed ? 'checkmark-circle' : getIcon(entry.type)}
                  size={22}
                  color={entry.completed ? theme.success : theme.accent}
                />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={[styles.entryTitle, { color: theme.text, textDecorationLine: entry.completed ? 'line-through' : 'none' }]}>
                    {entry.title}
                  </Text>
                  {entry.content ? (
                    <Text style={{ color: theme.textMuted, fontSize: 13, marginTop: 4 }} numberOfLines={2}>
                      {entry.content}
                    </Text>
                  ) : null}
                  <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 4 }}>
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteEntry(entry.id)} style={{ padding: 8 }}>
                <Ionicons name="trash-outline" size={18} color={theme.danger} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.accent }]}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Add Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBg }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>New Entry</Text>

            <View style={styles.typeSelector}>
              {(['quest', 'achievement', 'note'] as const).map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeButton, {
                    backgroundColor: newType === type ? theme.accent : theme.bgTertiary,
                  }]}
                  onPress={() => setNewType(type)}
                >
                  <Text style={{ color: newType === type ? '#fff' : theme.textSecondary, fontSize: 13, fontWeight: '600' }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={[styles.input, { backgroundColor: theme.bgTertiary, color: theme.text, borderColor: theme.border }]}
              placeholder="Title"
              placeholderTextColor={theme.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: theme.bgTertiary, color: theme.text, borderColor: theme.border }]}
              placeholder="Details (optional)"
              placeholderTextColor={theme.textMuted}
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.bgTertiary }]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={{ color: theme.textSecondary }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.accent }]}
                onPress={addEntry}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: 1 },
  headerSub: { fontSize: 14, marginTop: 4 },
  tabBar: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, borderWidth: 1, marginRight: 8, borderBottomWidth: 3, flex: 1, alignItems: 'center' },
  tabText: { fontSize: 13, fontWeight: '600' },
  entryCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 14, marginBottom: 8 },
  entryTitle: { fontSize: 15, fontWeight: '600' },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
  modalOverlay: { flex: 1, justifyContent: 'center', padding: 20 },
  modalContent: { borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  typeSelector: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  typeButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 15 },
  textArea: { height: 100, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 8 },
  modalButton: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
})
