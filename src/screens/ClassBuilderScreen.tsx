import * as React from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Modal, Switch } from 'react-native'
import { useTheme } from '../ThemeContext'
import { Ionicons } from '@expo/vector-icons'

const ION_MAP: Record<string, string> = {
  warrior: 'swords',
  paladin: 'shield-outline',
  hunter: 'ellipse-outline',
  rogue: 'cut-outline',
  priest: 'medkit-outline',
  deathknight: 'skull-outline',
  shaman: 'water-outline',
  mage: 'flame-outline',
  warlock: 'sparkles-outline',
  druid: 'leaf-outline',
}

const ALL_CLASSES = [
  { key: 'warrior', name: 'Warrior', color: '#c41e3d', spec: ['Fury', 'Frost', 'Arms'], role: 'Melee DPS / Tank' },
  { key: 'paladin', name: 'Paladin', color: '#f58cba', spec: ['Holy', 'Protection', 'Retribution'], role: 'Healer / Tank / Melee DPS' },
  { key: 'hunter', name: 'Hunter', color: '#fad800', spec: ['Beast Mastery', 'Marksmanship', 'Survival'], role: 'Ranged DPS / Pet Tank' },
  { key: 'rogue', name: 'Rogue', color: '#fff468', spec: ['Assassination', 'Subtlety', 'Outlaw'], role: 'Melee DPS' },
  { key: 'priest', name: 'Priest', color: '#ffffff', spec: ['Holy', 'Discipline', 'Shadow'], role: 'Healer / Ranged DPS' },
  { key: 'deathknight', name: 'Death Knight', color: '#c41e3d', spec: ['Blood', 'Frost', 'Unholy'], role: 'Tank / Melee DPS' },
  { key: 'shaman', name: 'Shaman', color: '#0070de', spec: ['Elemental', 'Enhancement', 'Restoration'], role: 'Ranged DPS / Healer' },
  { key: 'mage', name: 'Mage', color: '#0070de', spec: ['Fire', 'Frost', 'Arcane'], role: 'Ranged DPS' },
  { key: 'warlock', name: 'Warlock', color: '#9482c9', spec: ['Affliction', 'Destruction', 'Demonology'], role: 'Ranged DPS' },
  { key: 'druid', name: 'Druid', color: '#78cc7d', spec: ['Balance', 'Feral', 'Restoration', 'Guardian'], role: 'Ranged DPS / Melee DPS / Healer / Tank' },
]

const ALL_SPECIALIZATIONS = [
  { classKey: 'warrior', key: 'warrior-Fury', name: 'Fury', color: '#c41e3d' },
  { classKey: 'warrior', key: 'warrior-Frost', name: 'Frost', color: '#0070de' },
  { classKey: 'warrior', key: 'warrior-Arms', name: 'Arms', color: '#0070de' },
  { classKey: 'paladin', key: 'paladin-Holy', name: 'Holy', color: '#f58cba' },
  { classKey: 'paladin', key: 'paladin-Protection', name: 'Protection', color: '#f58cba' },
  { classKey: 'paladin', key: 'paladin-Retribution', name: 'Retribution', color: '#f58cba' },
  { classKey: 'hunter', key: 'hunter-BM', name: 'Beast Mastery', color: '#fad800' },
  { classKey: 'hunter', key: 'hunter-MM', name: 'Marksmanship', color: '#fad800' },
  { classKey: 'hunter', key: 'hunter-Survival', name: 'Survival', color: '#fad800' },
  { classKey: 'rogue', key: 'rogue-Assassination', name: 'Assassination', color: '#fff468' },
  { classKey: 'rogue', key: 'rogue-Subtlety', name: 'Subtlety', color: '#fff468' },
  { classKey: 'rogue', key: 'rogue-Outlaw', name: 'Outlaw', color: '#fff468' },
  { classKey: 'priest', key: 'priest-Holy', name: 'Holy', color: '#ffffff' },
  { classKey: 'priest', key: 'priest-Discipline', name: 'Discipline', color: '#ffffff' },
  { classKey: 'priest', key: 'priest-Shadow', name: 'Shadow', color: '#ffffff' },
  { classKey: 'deathknight', key: 'deathknight-Blood', name: 'Blood', color: '#c41e3d' },
  { classKey: 'deathknight', key: 'deathknight-Frost', name: 'Frost', color: '#c41e3d' },
  { classKey: 'deathknight', key: 'deathknight-Unholy', name: 'Unholy', color: '#c41e3d' },
  { classKey: 'shaman', key: 'shaman-Elemental', name: 'Elemental', color: '#0070de' },
  { classKey: 'shaman', key: 'shaman-Enhancement', name: 'Enhancement', color: '#0070de' },
  { classKey: 'shaman', key: 'shaman-Restoration', name: 'Restoration', color: '#0070de' },
  { classKey: 'mage', key: 'mage-Fire', name: 'Fire', color: '#0070de' },
  { classKey: 'mage', key: 'mage-Frost', name: 'Frost', color: '#0070de' },
  { classKey: 'mage', key: 'mage-Arcane', name: 'Arcane', color: '#0070de' },
  { classKey: 'warlock', key: 'warlock-Affliction', name: 'Affliction', color: '#9482c9' },
  { classKey: 'warlock', key: 'warlock-Destruction', name: 'Destruction', color: '#9482c9' },
  { classKey: 'warlock', key: 'warlock-Demonology', name: 'Demonology', color: '#9482c9' },
  { classKey: 'druid', key: 'druid-Balance', name: 'Balance', color: '#78cc7d' },
  { classKey: 'druid', key: 'druid-Feral', name: 'Feral', color: '#78cc7d' },
  { classKey: 'druid', key: 'druid-Restoration', name: 'Restoration', color: '#78cc7d' },
  { classKey: 'druid', key: 'druid-Guardian', name: 'Guardian', color: '#78cc7d' },
]

const ROTATION_DATA: Record<string, { simple: string[]; advanced: string[] }> = {
  'deathknight-Blood': { simple: ['Blood Boil', 'Death Strike', 'Dark Command', 'Icebound Fortitude (CD)'], advanced: ['Blood Boil', 'Mortal Strike (Blood Tap)', 'Death Strike', 'Icebound Fortitude (CD)', 'Hemorrhage', 'Outbreak', 'Death and Decay'] },
  'mage-Fire': { simple: ['Fireball', 'Pyroblast', 'Ignite', 'Blast Wave'], advanced: ['Fireball', 'Fireball', 'Pyroblast', 'Blast Wave', 'Nether Tempest', 'Combustion (CD)', 'Fireball'] },
  'druid-Feral': { simple: ['Shred', 'Rake', 'Rip', 'Berserk'], advanced: ['Shred', 'Rake', 'Rip', 'Berserk (CD)', 'Rake', 'Shred', 'Rip', 'Maul (CM)'] },
}

const GEAR_SLOTS = [
  { slot: 'Head', type: 'head' },
  { slot: 'Neck', type: 'neck' },
  { slot: 'Shoulder', type: 'shoulder' },
  { slot: 'Back', type: 'back' },
  { slot: 'Chest', type: 'chest' },
  { slot: 'Wrist', type: 'wrist' },
  { slot: 'Hands', type: 'hands' },
  { slot: 'Waist', type: 'waist' },
  { slot: 'Legs', type: 'legs' },
  { slot: 'Feet', type: 'feet' },
  { slot: 'Ring 1', type: 'ring' },
  { slot: 'Ring 2', type: 'ring' },
  { slot: 'Trinket 1', type: 'trinket' },
  { slot: 'Trinket 2', type: 'trinket' },
  { slot: 'Main Hand', type: 'weapon' },
  { slot: 'Off Hand', type: 'offhand' },
]

export const ClassBuilderScreen = ({ navigation }: any) => {
  const { theme } = useTheme()
  const [selectedClass, setSelectedClass] = React.useState('warrior')
  const [selectedSpec, setSelectedSpec] = React.useState('warrior-Fury')
  const [showClassPicker, setShowClassPicker] = React.useState(false)
  const [showSpecPicker, setShowSpecPicker] = React.useState(false)
  const [gear, setGear] = React.useState<Record<string, { name: string; rarity: string }>>({})
  const [showRotation, setShowRotation] = React.useState(false)
  const [showGear, setShowGear] = React.useState(false)
  const [simpleMode, setSimpleMode] = React.useState(true)

  const currentClass = ALL_CLASSES.find(c => c.key === selectedClass)
  const currentSpec = ALL_SPECIALIZATIONS.find(s => s.key === selectedSpec)

  const rotation = ROTATION_DATA[selectedSpec]

  const handleClassSelect = (key: string) => {
    setSelectedClass(key)
    const spec = ALL_SPECIALIZATIONS.find(s => s.classKey === key && s.key === ALL_SPECIALIZATIONS.find(s => s.classKey === key)?.key)
    if (spec) setSelectedSpec(spec.key)
    setShowClassPicker(false)
  }

  const handleSpecSelect = (key: string) => {
    setSelectedSpec(key)
    setShowSpecPicker(false)
  }

  const setGearItem = (slot: string, name: string, rarity: string) => {
    setGear(prev => ({ ...prev, [slot]: { name, rarity } }))
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.accent }]}>⚔️ Class Builder</Text>
        <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Build your perfect spec</Text>
      </View>

      {/* Class Selector */}
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <TouchableOpacity
          style={[styles.pickBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
          onPress={() => setShowClassPicker(true)}
        >
          <Text style={[styles.pickLabel, { color: theme.textSecondary, fontSize: 12 }]}>Class</Text>
          {currentClass && (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name={ION_MAP[selectedClass] as any} size={32} color={currentClass.color} style={{ marginBottom: 8 }} />
              <Text style={[styles.pickValue, { color: currentClass.color, fontWeight: '700', fontSize: 20 }]}>{currentClass.name}</Text>
              <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{currentClass.role}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Spec Selector */}
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <TouchableOpacity
          style={[styles.pickBtn, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
          onPress={() => setShowSpecPicker(true)}
        >
          <Text style={[styles.pickLabel, { color: theme.textSecondary, fontSize: 12 }]}>Spec</Text>
          {currentSpec && (
            <Text style={[styles.pickValue, { color: currentSpec.color, fontWeight: '700', fontSize: 18 }]}>{currentSpec.name}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Gear Slots */}
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setShowGear(true)}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Gear Loadout ({Object.keys(gear).length}/{gearSlots.length})</Text>
        </TouchableOpacity>
        <View style={styles.gearGrid}>
          {gearSlots.map(slot => {
            const item = gear[slot]
            return (
              <TouchableOpacity
                key={slot}
                style={[styles.gearSlot, {
                  backgroundColor: item ? (item.rarity === 'legendary' ? theme.legendary : item.rarity === 'epic' ? theme.epic : item.rarity === 'rare' ? theme.rare : theme.uncommon) : theme.bgTertiary,
                  borderColor: theme.border,
                }]}
                onPress={() => setGearItem(slot, 'Ring of Power', 'epic')}
              >
                <Text style={{ color: item ? '#fff' : theme.textSecondary, fontSize: 11, fontWeight: '600', textAlign: 'center' }}>
                  {item ? item.name : slot}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {/* Rotation */}
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setShowRotation(true)}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Rotation</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <TouchableOpacity
            style={[styles.rotationTab, {
              backgroundColor: simpleMode ? theme.accent : theme.bgTertiary,
              borderColor: theme.border,
            }]}
            onPress={() => setSimpleMode(true)}
          >
            <Text style={{ color: simpleMode ? '#fff' : theme.text, fontSize: 12, fontWeight: '600' }}>Simple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rotationTab, {
              backgroundColor: !simpleMode ? theme.accent : theme.bgTertiary,
              borderColor: theme.border,
            }]}
            onPress={() => setSimpleMode(false)}
          >
            <Text style={{ color: !simpleMode ? '#fff' : theme.text, fontSize: 12, fontWeight: '600' }}>Advanced</Text>
          </TouchableOpacity>
        </View>

        {rotation ? (
          (simpleMode ? rotation.simple : rotation.advanced).map((ability, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
              <Text style={{ color: theme.accent, fontSize: 14, fontWeight: '600', marginRight: 8, minWidth: 24 }}>{i + 1}.</Text>
              <Text style={{ color: theme.text, fontSize: 14 }}>{ability}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: theme.textMuted, fontSize: 13 }}>Select a spec to view rotation</Text>
        )}

        {/* Rune tracker for DK */}
        {selectedClass === 'deathknight' && (
          <View style={{ marginTop: 12 }}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Rune Tracker</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              {['Blood', 'Frost', 'Unholy'].map((rune, i) => (
                <View key={rune + i} style={[styles.runeSlot, { backgroundColor: theme.bgTertiary, borderColor: theme.border, borderWidth: 1 }]}>
                  <Text style={{ color: theme.text, fontSize: 11, fontWeight: '600' }}>{rune}</Text>
                </View>
              ))}
              {['Blood', 'Frost', 'Unholy'].map((rune, i) => (
                <View key={rune + 'cd' + i} style={[styles.runeSlot, { backgroundColor: theme.bgTertiary, borderColor: theme.border, borderWidth: 1 }]}>
                  <Text style={{ color: theme.text, fontSize: 11, fontWeight: '600' }}>{rune}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Berserk timer for Guardian Druid */}
        {selectedSpec === 'druid-Guardian' && (
          <View style={{ marginTop: 12 }}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Berserk Timer</Text>
            <View style={[styles.timerBar, { backgroundColor: theme.bgTertiary, borderRadius: 6, overflow: 'hidden' }]}>
              <View style={{ flex: 1, height: 20, backgroundColor: theme.accent, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>Berserk Active</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Spec-specific UI elements */}
      {selectedClass === 'deathknight' && (
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>DK Utility</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {['Dark Simularity', 'Horn of Winter', 'Icebound Fortitude', 'Death Pact', 'Anticipation'].map(util => (
              <View key={util} style={[styles.utilChip, { backgroundColor: theme.bgTertiary, borderColor: theme.border }]}>
                <Text style={{ color: theme.text, fontSize: 12, fontWeight: '600' }}>{util}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {selectedClass === 'druid' && selectedSpec === 'druid-Guardian' && (
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Guardian Druid Talents</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {['Heart of the Wild', 'Maul', 'Shred', 'Berserk', 'Ironbear'].map(talent => (
              <View key={talent} style={[styles.utilChip, { backgroundColor: theme.bgTertiary, borderColor: theme.border }]}>
                <Text style={{ color: theme.text, fontSize: 12, fontWeight: '600' }}>{talent}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Modals */}
      <Modal visible={showClassPicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Select Class</Text>
            {ALL_CLASSES.map(item => (
              <TouchableOpacity key={item.key} onPress={() => handleClassSelect(item.key)}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={ION_MAP[item.key] as any} size={20} color={item.color} />
                  <Text style={{ color: item.color, fontSize: 16, fontWeight: '700', marginLeft: 10 }}>{item.name}</Text>
                  <Text style={{ color: theme.textSecondary, fontSize: 12, marginLeft: 10 }}>{item.role}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={showSpecPicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Select Spec</Text>
            {ALL_SPECIALIZATIONS.filter(s => s.classKey === selectedClass).map(item => (
              <TouchableOpacity key={item.key} onPress={() => handleSpecSelect(item.key)}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={ION_MAP[selectedClass] as any} size={20} color={item.color} />
                  <Text style={{ color: item.color, fontSize: 16, fontWeight: '700', marginLeft: 10 }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = {
  header: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: 1 },
  headerSub: { fontSize: 14, marginTop: 4 },
  pickBtn: { padding: 16, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  pickLabel: { fontSize: 12, fontWeight: '600' },
  pickValue: { fontSize: 18, fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  gearGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  gearSlot: { width: '30%', padding: 10, borderRadius: 6, borderWidth: 1, alignItems: 'center', marginBottom: 4 },
  rotationTab: { flex: 1, paddingVertical: 8, borderRadius: 6, borderWidth: 1, alignItems: 'center' },
  runeSlot: { flex: 1, padding: 8, borderRadius: 4, alignItems: 'center' },
  timerBar: { height: 20, borderRadius: 6, overflow: 'hidden', marginBottom: 8 },
  utilChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 1, marginBottom: 4, marginRight: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', borderRadius: 16, borderWidth: 1, padding: 16, maxHeight: '80%', overflow: 'hidden' },
}
