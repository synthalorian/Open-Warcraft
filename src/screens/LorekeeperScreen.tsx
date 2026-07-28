import * as React from 'react'
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Switch } from 'react-native'
import { useTheme } from '../ThemeContext'

const LORE_ITEMS = [
  { id: 1, title: 'The Sundering of Arthas', era: 'Age of Myth', desc: 'When the Lich King was forged from Orgrimmar\'s heart and the world split asunder. The scars of that day are still visible across Azeroth — frozen wastelands where green grass once grew.', faction: 'Alliance', rarity: 'legendary', timeline: [{ year: -30, text: 'The Scourging of Lordaeron' }, { year: -29, text: 'Arthas\' ascension as the Lich King' }, { year: -28, text: 'The destruction of Dalaran' }] },
  { id: 2, title: 'The War of the Shifting Sands', era: 'Age of Myth', desc: 'The Qiraji emerged from Ahn\'Qiraj, threatening all of Azeroth. The alliance of nations held the line at Mount Hyjal, and the world soul was saved.', faction: 'Horde', rarity: 'epic', timeline: [{ year: -1200, text: 'The Qiraji\'s awakening' }, { year: -1198, text: 'The Great War begins' }, { year: -1195, text: 'The battle at Hyjal' }] },
  { id: 3, title: 'The Fall of the Dark Portal', era: 'Age of Mortals', desc: 'When Gul\'dan opened the Dark Portal a second time, the Burning Legion returned. The siege of Blackrock Mountain saw the death of many champions.', faction: 'Horde', rarity: 'epic', timeline: [{ year: 0, text: 'Gul\'dan betrays Orgrimmar' }, { year: 1, text: 'The Second War begins' }, { year: 3, text: 'The Dark Portal falls' }] },
  { id: 4, title: 'The Wrath of the Lich King', era: 'Age of Mortals', desc: 'The undead king awoke, and the Scourging spread north. Icecrown Citadel became the final battleground against the very essence of death itself.', faction: 'Alliance', rarity: 'legendary', timeline: [{ year: 20, text: 'Arthas awakens' }, { year: 22, text: 'The Lich King\'s return' }, { year: 24, text: 'The fall of Icecrown' }] },
  { id: 5, title: 'The Cataclysm', era: 'Age of Mortals', desc: 'Illidan Stormrage\'s brother, Malfius, struck the world with his bare hands. The continents reshaped, and old powers crumbled.', faction: 'Alliance', rarity: 'legendary', timeline: [{ year: 24, text: 'Malfius strikes Azeroth' }, { year: 25, text: 'The Wrecked Isles form' }, { year: 26, text: 'The Thunder Axe falls' }] },
  { id: 6, title: 'The War of the Visions', era: 'Age of Mortals', desc: 'The Horde and Alliance clashed across the world in a struggle for dominance. Heroes rose from every corner of the map.', faction: 'Alliance', rarity: 'rare', timeline: [{ year: 28, text: 'The initial skirmishes' }, { year: 30, text: 'The major campaigns begin' }, { year: 32, text: 'The war reaches its peak' }] },
  { id: 7, title: 'The Mists of Pandaria', era: 'Age of Mortals', desc: 'Beyond the Eastern Continent lay an unknown land, shrouded in mist and mystery. The Pandaren spirit ran deep, and the land itself was a living testament to balance.', faction: 'Horde', rarity: 'epic', timeline: [{ year: 30, text: 'The first contact' }, { year: 31, text: 'The siege of Dazar\'alor' }, { year: 32, text: 'The Pandaren alliance' }] },
  { id: 8, title: 'The Legion Invasions', era: 'Age of Mortals', desc: 'The Burning Legion returned through the Dark Portal once more. This time, the champions of Azeroth fought back — and they did not retreat.', faction: 'Alliance', rarity: 'epic', timeline: [{ year: 32, text: 'First Legion landing' }, { year: 33, text: 'The siege of the Dark Portal' }, { year: 34, text: 'The Legion\'s defeat' }] },
]

const ERAS = ['All', 'Age of Myth', 'Age of Mortals']

const FACTIONS = {
  Alliance: { label: 'Alliance', color: '#2e59ff' },
  Horde: { label: 'Horde', color: '#c41e1e' },
}

export const LorekeeperScreen = ({ navigation }: any) => {
  const { theme } = useTheme()
  const [selectedEra, setSelectedEra] = React.useState('All')
  const [selectedFaction, setSelectedFaction] = React.useState<'Alliance' | 'Horde'>('Alliance')
  const [factionLens, setFactionLens] = React.useState(false)

  const filtered = selectedEra === 'All'
    ? LORE_ITEMS
    : LORE_ITEMS.filter(i => i.era === selectedEra)

  const factionColors: Record<string, string> = {
    Alliance: theme.alliance,
    Horde: theme.horde,
  }

  const getRarityColor = (rarity: string) => {
    const map: Record<string, string> = {
      epic: theme.epic as unknown as string,
      rare: theme.rare as unknown as string,
      legendary: theme.legendary as unknown as string,
      uncommon: theme.uncommon as unknown as string,
      common: theme.common as unknown as string,
    }
    return map[rarity] || theme.common as unknown as string
  }

  const getRarityLabel = (rarity: string) => {
    const map: Record<string, string> = {
      epic: 'Epic',
      rare: 'Rare',
      legendary: 'Legendary',
      uncommon: 'Uncommon',
      common: 'Common',
    }
    return map[rarity] || 'Common'
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.accent }]}>📜 Lorekeeper</Text>
        <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Explore Azeroth's history</Text>
      </View>

      {/* Filters */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginBottom: 12 }}>
        {/* Era chips */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.filterLabel, { color: theme.textSecondary, marginBottom: 6 }]}>Era</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {ERAS.map(era => (
              <TouchableOpacity
                key={era}
                style={[styles.eraChip, {
                  backgroundColor: selectedEra === era ? theme.accent : theme.bgTertiary,
                  borderColor: theme.border,
                }]}
                onPress={() => setSelectedEra(era)}
              >
                <Text style={{ color: selectedEra === era ? '#fff' : theme.text, fontSize: 12, fontWeight: '600' }}>{era}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Faction Lens toggle */}
        <View style={{ marginLeft: 16 }}>
          <Text style={[styles.filterLabel, { color: theme.textSecondary, marginBottom: 6 }]}>Faction Lens</Text>
          <Switch
            value={factionLens}
            onValueChange={setFactionLens}
            trackColor={{ false: theme.bgTertiary, true: factionColors[selectedFaction] }}
            thumbColor={factionLens ? '#fff' : theme.textMuted}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
          {factionLens && (
            <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
              {Object.keys(FACTIONS).map(key => (
                <TouchableOpacity
                  key={key}
                  style={[styles.factionTab, {
                    backgroundColor: selectedFaction === key ? factionColors[key] || theme.accent : theme.bgTertiary,
                  }]}
                  onPress={() => setSelectedFaction(key as 'Alliance' | 'Horde')}
                >
                  <Text style={[styles.factionTabText, { color: selectedFaction === key ? '#fff' : theme.textSecondary }]}>{FACTIONS[key as 'Alliance' | 'Horde'].label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Lore Cards */}
      <View style={{ paddingHorizontal: 16 }}>
        {filtered.map(item => {
          const showItem = !factionLens || item.faction === selectedFaction
          const rarityColor = getRarityColor(item.rarity)

          return (
            <View
              key={item.id}
              style={[styles.loreCard, {
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                borderLeftWidth: 4,
                borderLeftColor: rarityColor,
                opacity: factionLens && !showItem ? 0.3 : 1,
              }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Text style={[styles.loreTitle, { color: theme.text, fontSize: 16, fontWeight: '700' }]}>{item.title}</Text>
                <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.factionBadge, { backgroundColor: factionColors[item.faction] || '#555', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }]}>
                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{item.faction}</Text>
                  </Text>
                </View>
              </View>

              <Text style={[styles.loreDesc, { color: theme.textSecondary, fontSize: 13, lineHeight: 20 }]}>{item.desc}</Text>

              {/* Rarity bar */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <View style={[styles.rarityBar, { flex: 1, height: 4, backgroundColor: theme.bgTertiary, borderRadius: 2, overflow: 'hidden' }]}>
                  <View style={[styles.rarityFill, { width: `${item.rarity === 'legendary' ? 100 : item.rarity === 'epic' ? 75 : item.rarity === 'rare' ? 50 : item.rarity === 'uncommon' ? 33 : 16}%`, backgroundColor: rarityColor, height: '100%', borderRadius: 2 }]} />
                </View>
                <Text style={[styles.rarityLabel, { color: rarityColor, fontSize: 11, fontWeight: '600', marginLeft: 8 }]}>{getRarityLabel(item.rarity)}</Text>
              </View>

              {/* Timeline */}
              {item.timeline.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <Text style={[styles.timelineTitle, { color: theme.textMuted, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 }]}>Timeline</Text>
                  {item.timeline.map((event, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <View style={[styles.timelineDot, { backgroundColor: theme.accent }]} />
                      <Text style={[styles.timelineYear, { color: theme.accent, fontSize: 11, fontWeight: '700', marginRight: 6 }]}>{event.year}</Text>
                      <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{event.text}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: 1 },
  headerSub: { fontSize: 14, marginTop: 4 },
  filterLabel: { fontSize: 12, fontWeight: '600' },
  eraChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1 },
  factionTab: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginBottom: 4 },
  factionTabText: { fontSize: 10, fontWeight: '700' },
  loreCard: { padding: 14, borderRadius: 10, borderWidth: 1, marginBottom: 8 },
  loreTitle: { flex: 1 },
  factionBadge: { flexDirection: 'row', alignItems: 'center' },
  loreDesc: { lineHeight: 20 },
  rarityBar: { borderRadius: 2 },
  rarityFill: { borderRadius: 2 },
  rarityLabel: { fontSize: 11, fontWeight: '600' },
  timelineTitle: { textTransform: 'uppercase', letterSpacing: 1 },
  timelineDot: { width: 6, height: 6, borderRadius: 3, marginRight: 8 },
  timelineYear: { fontSize: 11, fontWeight: '700', marginRight: 6 },
})
