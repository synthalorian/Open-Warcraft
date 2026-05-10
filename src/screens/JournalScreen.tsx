import * as React from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Modal } from 'react-native'
import { useTheme } from '../ThemeContext'
import { Ionicons } from '@expo/vector-icons'

export const JournalScreen = ({ navigation }: any) => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = React.useState<'quests' | 'achievements' | 'collections'>('quests')

  const quests = [
    { id: 1, title: 'The Sunwell Plateau', type: 'Quest', completed: true, icon: 'school' },
    { id: 2, title: 'The Fall of the Lich King', type: 'Quest', completed: false, icon: 'flag' },
    { id: 3, title: 'Gather the Council of Black', type: 'Daily', completed: true, icon: 'school' },
    { id: 4, title: 'The Argent Crusade', type: 'Quest', completed: false, icon: 'lock-closed' },
  ]

  const achievements = [
    { id: 1, title: 'Hero of Northrend', completed: true, icon: 'star', points: 10 },
    { id: 2, title: 'Slay the Dragon', completed: false, icon: 'help', points: 5 },
    { id: 3, title: 'Master of the Arena', completed: true, icon: 'star', points: 10 },
    { id: 4, title: 'Legend of Azeroth', completed: false, icon: 'help', points: 10 },
  ]

  const collections = [
    { id: 1, title: 'Mounts', count: 42, max: 100, icon: 'horse' },
    { id: 2, title: 'Transmog', count: 210, max: 500, icon: 'shirt' },
    { id: 3, title: 'Pets', count: 18, max: 160, icon: 'paw' },
    { id: 4, title: 'Titles', count: 5, max: 50, icon: 'person' },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.accent }]}>📖 Azeroth Journal</Text>
        <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Track your progress</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {(['quests', 'achievements', 'collections'] as const).map(tab => (
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
        {activeTab === 'quests' && (
          <View style={{ gap: 8 }}>
            {quests.map((item, i) => (
              <View key={item.id} style={[styles.questCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: item.completed ? 2 : 1, flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 14 }]}>
                <Ionicons name={(item as any).icon || 'help'} size={20} color={(item as any).completed ? theme.success : theme.accent} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: '600' }}>{item.title}</Text>
                  <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}>{item.type}</Text>
                </View>
                {item.completed && <Ionicons name="checkmark-circle-outline" size={20} color={theme.success} />}
              </View>
            ))}
          </View>
        )}

        {activeTab === 'achievements' && (
          <View style={{ gap: 8 }}>
            {achievements.map(item => (
              <View key={item.id} style={[styles.questCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: item.completed ? 2 : 1, flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 14 }]}>
                <Ionicons name={(item as any).icon || 'help'} size={20} color={item.completed ? '#fff' : theme.textMuted} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: '600' }}>{item.title}</Text>
                  <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}>{(item as any).points} pts</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'collections' && (
          <View style={{ gap: 8 }}>
            {collections.map(item => (
              <View key={item.id} style={[styles.questCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 14, marginBottom: 4 }]}>
                <Ionicons name={(item as any).icon || 'help'} size={20} color={theme.accent} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: '600' }}>{item.title}</Text>
                  <View style={{ marginTop: 6, height: 6, backgroundColor: theme.bgTertiary, borderRadius: 3, overflow: 'hidden' }}>
                    <View style={{ height: '100%', backgroundColor: theme.accent, borderRadius: 3, width: `${(item.count / item.max) * 100}%` }} />
                  </View>
                  <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 4 }}>{item.count} / {item.max}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
  questCard: { borderWidth: 1 },
})
