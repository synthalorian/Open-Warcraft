import * as React from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from '../ThemeContext'
import { Ionicons } from '@expo/vector-icons'

export const WarbandScreen = ({ navigation }: any) => {
  const { theme } = useTheme()

  const matches = [
    { type: 'Arena', winner: 'Alliance', score: '2v2', date: '2h ago', result: 'W' },
    { type: 'Brawl', winner: 'Horde', score: '3v3', date: '1d ago', result: 'L' },
    { type: 'BG', winner: 'Alliance', score: 'AV', date: '2d ago', result: 'W' },
    { type: 'Arena', winner: 'Horde', score: '5v5', date: '3d ago', result: 'W' },
  ]

  const guildMembers = [
    { name: 'Synthalorian', class: 'Warrior', online: true, rank: 'Officer' },
    { name: 'Alfred', class: 'Mage', online: true, rank: 'Guild Master' },
    { name: 'Skully', class: 'Druid', online: false, rank: 'Member' },
    { name: 'NeonKnight', class: 'Paladin', online: true, rank: 'Member' },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.accent }]}>⚔️ Warband</Text>
        <Text style={[styles.headerSub, { color: theme.textSecondary }]}>PvP analysis & guild</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Match History */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Matches</Text>
          {matches.map((match, i) => (
            <View key={i} style={[styles.matchCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: 1, borderRadius: 10, padding: 14, marginBottom: 8 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="flame-outline" size={16} color={theme.textMuted} />
                <Text style={[styles.matchType, { color: theme.textMuted, marginLeft: 6 }]}>{match.type}</Text>
                <Text style={[styles.matchDate, { color: theme.textMuted, marginLeft: 'auto', fontSize: 12 }]}>{match.date}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: match.winner === 'Alliance' ? theme.alliance : theme.horde, fontSize: 16, fontWeight: '700' }}>{match.winner}</Text>
                <Text style={{ color: theme.textMuted, marginHorizontal: 12, fontSize: 16, fontWeight: '600' }}>vs</Text>
                <Text style={{ color: match.winner === 'Alliance' ? theme.horde : theme.alliance, fontSize: 16, fontWeight: '700' }}>{match.winner === 'Alliance' ? 'Horde' : 'Alliance'}</Text>
              </View>
            </View>
          ))}

          {/* Guild Roster */}
          <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 8 }]}>Guild Roster</Text>
          {guildMembers.map((member, i) => (
            <View key={i} style={[styles.guildCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: 1, borderRadius: 10, padding: 14, marginBottom: 8 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.bgTertiary, justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="person-outline" size={20} color={theme.textSecondary} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: '600' }}>{member.name}</Text>
                  <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}>{member.class} · {member.rank}</Text>
                </View>
                <View style={{ marginLeft: 'auto' }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: member.online ? theme.success : theme.textMuted }} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: 1 },
  headerSub: { fontSize: 14, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  matchCard: { marginBottom: 8 },
  matchType: { fontSize: 12, fontWeight: '600' },
  matchDate: { fontSize: 12 },
  guildCard: { marginBottom: 8 },
})
