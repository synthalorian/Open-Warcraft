import * as React from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from '../ThemeContext'
import { Ionicons } from '@expo/vector-icons'

export const HomeScreen = ({ navigation }: any) => {
  const { theme } = useTheme()

  const quickLinks: { title: string; icon: string; color: string; route: string }[] = [
    { title: 'Lorekeeper', icon: 'document-text', color: '#58a6ff', route: 'Lorekeeper' },
    { title: 'Class Builder', icon: 'construct', color: '#f58cba', route: 'ClassBuilder' },
    { title: 'Ascension', icon: 'rocket', color: '#ffd100', route: 'Ascension' },
    { title: 'Journal', icon: 'book', color: '#2ea043', route: 'Lorekeeper' },
    { title: 'Warband', icon: 'flame', color: '#c41e1e', route: 'Lorekeeper' },
    { title: 'Themes', icon: 'color-palette', color: '#d946ef', route: 'More' },
  ]

  const recentActivity = [
    { type: 'lore', text: 'New lore entry: The Sundering of Arthas', time: '2h ago', icon: 'document-text' },
    { type: 'class', text: 'Updated Blood DK rotation — added Maw Slot', time: '5h ago', icon: 'construct' },
    { type: 'ascension', text: 'Completed lesson: Elemental Convergence (+150 XP)', time: '1d ago', icon: 'rocket' },
    { type: 'journal', text: 'Quest completed: The Sunwell Plateau', time: '2d ago', icon: 'book' },
  ]

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.accent }]}>⚔️ Open Warcraft</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Your Azeroth companion</Text>
      </View>

      {/* Quick Access Grid */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Access</Text>
        <View style={styles.grid}>
          {quickLinks.map(link => (
            <TouchableOpacity
              key={link.title}
              style={[styles.quickCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
              onPress={() => {
                if (link.route === 'More') navigation?.navigate('More')
                else navigation?.navigate(link.route)
              }}
            >
              <Ionicons name={(link.icon + '-outline') as React.ComponentProps<typeof Ionicons>['name']} size={28} color={link.color} />
              <Text style={[styles.quickText, { color: theme.text }]}>{link.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Server Status */}
      <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Server Status</Text>
        <View style={[styles.statusCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#2ea043', marginRight: 10 }} />
            <Text style={{ color: theme.text, fontSize: 15, fontWeight: '600' }}>Realm: Azeroth (US)</Text>
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 13, marginTop: 4 }}>Population: 42,891 online · 2.1% population · Low latency</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity</Text>
        {recentActivity.map((activity, i) => (
          <View
            key={i}
            style={[styles.activityItem, { backgroundColor: theme.cardBg, borderColor: theme.border, borderBottomWidth: i < recentActivity.length - 1 ? 1 : 0 }]}
          >
            <Ionicons name={(activity.icon + '-outline') as React.ComponentProps<typeof Ionicons>['name']} size={18} color={theme.accent} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: theme.text, fontSize: 14 }}>{activity.text}</Text>
              <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Community */}
      <View style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 24 }}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Community</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Ionicons name="logo-discord" size={28} color="#5865F2" />
            <Text style={[styles.quickText, { color: theme.text }]}>Discord</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Ionicons name="logo-github" size={28} color={theme.text} />
            <Text style={[styles.quickText, { color: theme.text }]}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  title: { fontSize: 26, fontWeight: '800', letterSpacing: 1 },
  subtitle: { fontSize: 14, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', gap: 8 },
  quickText: { fontSize: 13, fontWeight: '600' },
  statusCard: { padding: 14, borderRadius: 10, borderWidth: 1 },
  activityItem: { padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0 },
})
