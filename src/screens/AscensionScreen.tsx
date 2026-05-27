import * as React from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from '../ThemeContext'
import { Ionicons } from '@expo/vector-icons'

const ASCENSION_TIERS = [
  { tier: 1, name: 'Season 1', icon: 'sparkles', desc: 'The beginning of ascension. Vanilla era content unlocked.' },
  { tier: 2, name: 'Season 2', icon: 'flame', desc: 'Explore the expanding world of Azeroth.' },
  { tier: 3, name: 'Season 3', icon: 'skull', desc: 'The Scourge invasion begins.' },
  { tier: 4, name: 'Season 4', icon: 'star', desc: 'Outland opens its doors.' },
  { tier: 5, name: 'Season 5', icon: 'rocket', desc: 'The path to Northrend awaits.' },
  { tier: 6, name: 'Season 6', icon: 'planet', desc: 'The Lich King awaits. Ascension complete.' },
]

const LESSONS = [
  { id: 1, title: 'Class Roles', desc: 'Tank, DPS, Healer — know your part', xp: 100, locked: false, icon: 'sparkles-outline' },
  { id: 2, title: 'World Quests', desc: 'Explore Azeroth and discover hidden content', xp: 150, locked: false, icon: 'flame-outline' },
  { id: 3, title: 'Instance Dungeons', desc: 'Master the art of group content', xp: 200, locked: true, icon: 'skull-outline' },
  { id: 4, title: 'World Bosses', desc: 'Join thousands in epic battles', xp: 300, locked: true, icon: 'time-outline' },
  { id: 5, title: 'PvP Arenas', desc: 'Prove yourself in combat', xp: 500, locked: true, icon: 'star-outline' },
  { id: 6, title: 'Raid Content', desc: 'The ultimate test of skill and coordination', xp: 750, locked: true, icon: 'planet-outline' },
]

const ION_MAP: Record<string, string> = {
  sparkles: 'sparkles-outline',
  flame: 'flame-outline',
  skull: 'skull-outline',
  star: 'star-outline',
  rocket: 'rocket-outline',
  planet: 'planet-outline',
}

export const AscensionScreen = ({ navigation }: any) => {
  const { theme } = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.accent }]}>⚔️ Ascension</Text>
        <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Inspired by ascension.gg</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* XP Bar */}
        <View style={[styles.xpBar, { backgroundColor: theme.cardBg, borderColor: theme.border, marginHorizontal: 16, padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 16 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={[styles.xpLabel, { color: theme.text }]}>Level 12 — Season 1</Text>
            <Text style={[styles.xpAmount, { color: theme.accent }]}>2,450 / 5,000 XP</Text>
          </View>
          <View style={[styles.xpTrack, { backgroundColor: theme.bgTertiary, height: 8, borderRadius: 4, overflow: 'hidden' }]}>
            <View style={[styles.xpFill, { width: '49%', backgroundColor: theme.accent, height: '100%', borderRadius: 4 }]} />
          </View>
        </View>

        {/* Tiers */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Ascension Tiers</Text>
        {ASCENSION_TIERS.map((tier, i) => (
          <View
            key={tier.tier}
            style={[styles.tierCard, {
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
              borderLeftWidth: 4,
              borderLeftColor: i < 3 ? theme.success : i < 5 ? theme.warning : theme.accent,
              marginHorizontal: 16,
              marginBottom: 8,
              padding: 14,
              borderRadius: 10,
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.bgTertiary }}>
                <Ionicons name={ION_MAP[tier.icon] as any} size={20} color={theme.accent} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.tierName, { color: theme.text, fontWeight: '700', fontSize: 16 }]}>
                  Tier {tier.tier}: {tier.name}
                </Text>
                <Text style={[styles.tierDesc, { color: theme.textSecondary, fontSize: 13, marginTop: 4 }]}>{tier.desc}</Text>
              </View>
            </View>
            {i < 3 && (
              <View style={{ marginLeft: 'auto' }}>
                <Ionicons name="checkmark-circle-outline" size={20} color={theme.success} />
              </View>
            )}
          </View>
        ))}

        {/* Lessons */}
        <View style={{ marginTop: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary, fontSize: 16, fontWeight: '700', marginBottom: 0, marginTop: 8 }]}>Ascension Lessons</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Lessons')}>
              <Text style={{ color: theme.accent, fontSize: 13 }}>View All →</Text>
            </TouchableOpacity>
          </View>

          {LESSONS.map(lesson => (
            <View
              key={lesson.id}
              style={[styles.lessonCard, {
                backgroundColor: lesson.locked ? theme.bgTertiary : theme.cardBg,
                borderColor: lesson.locked ? theme.border : theme.accent,
                borderWidth: lesson.locked ? 1 : 2,
                opacity: lesson.locked ? 0.6 : 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                padding: 14,
                marginHorizontal: 16,
                marginBottom: 8,
              }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.bgSecondary }}>
                  <Ionicons name={lesson.icon as any} size={18} color={lesson.locked ? theme.textMuted : theme.accent} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={[styles.lessonTitle, { color: lesson.locked ? theme.textMuted : theme.text, fontSize: 15, fontWeight: '600' }]}>{lesson.title}</Text>
                  <Text style={[styles.lessonDesc, { color: theme.textMuted, fontSize: 12, marginTop: 2 }]}>{lesson.desc}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
                <Text style={[styles.lessonXP, { color: theme.success, fontSize: 12, fontWeight: '700', marginBottom: 2 }]}>+{lesson.xp} XP</Text>
                {lesson.locked && (
                  <Text style={[styles.lessonLock, { color: theme.danger, fontSize: 11, fontWeight: '600' }]}>Locked</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingVertical: 16 },
  headerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: 1 },
  headerSub: { fontSize: 14, marginTop: 4 },
  xpBar: {},
  xpLabel: { fontSize: 14, fontWeight: '700' },
  xpAmount: { fontSize: 13, fontWeight: '600' },
  xpTrack: { height: 8, borderRadius: 4, overflow: 'hidden' },
  xpFill: { height: '100%', borderRadius: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', paddingHorizontal: 16, marginBottom: 12, marginTop: 8 },
  tierCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 10, borderWidth: 1, marginHorizontal: 16, marginBottom: 8 },
  tierIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  tierName: { fontSize: 16 },
  tierDesc: { lineHeight: 18 },
  lessonCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 14, marginHorizontal: 16, marginBottom: 8 },
  lessonIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  lessonTitle: { fontSize: 15, fontWeight: '600' },
  lessonDesc: { lineHeight: 16 },
  lessonXP: { marginBottom: 2 },
  lessonLock: { fontWeight: '600' },
})
