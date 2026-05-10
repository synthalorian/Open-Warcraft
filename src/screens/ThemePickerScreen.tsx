import * as React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import { useTheme, type ThemeKey } from '../ThemeContext'
import { THEMES } from '../theme'
import { Ionicons } from '@expo/vector-icons'

const THEMES_LIST: { key: ThemeKey; name: string; color: string }[] = [
  { key: 'warcraft-dark', name: 'Warcraft Dark', color: '#58a6ff' },
  { key: 'neon-grid', name: 'Neon Grid', color: '#ff00ff' },
  { key: 'sunset-vibes', name: 'Sunset Vibes', color: '#ff6b35' },
  { key: 'chrome-cool', name: 'Chrome Cool', color: '#38bdf8' },
  { key: 'the-matrix', name: 'The Matrix', color: '#33ff33' },
  { key: 'lowkey', name: 'Lowkey', color: '#999999' },
]

export const ThemePickerScreen = ({ navigation, route }: any) => {
  const { theme, themeKey, setTheme } = useTheme()
  const [selected, setSelected] = React.useState<ThemeKey>(themeKey)

  const apply = (key: ThemeKey) => {
    setSelected(key)
    setTheme(key)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView style={{ padding: 24 }}>
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: '700', marginBottom: 4 }}>Choose Theme</Text>
        <Text style={{ color: theme.textSecondary, fontSize: 14, marginBottom: 24 }}>
          Select a theme that suits your playstyle. Changes apply instantly.
        </Text>

        {THEMES_LIST.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.themeCard, {
              backgroundColor: theme.cardBg,
              borderColor: t.color,
              borderWidth: selected === t.key ? 3 : 1,
            }]}
            onPress={() => apply(t.key)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: t.color }} />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={{ color: theme.text, fontSize: 16, fontWeight: '700' }}>{t.name}</Text>
                <Text style={{ color: theme.textMuted, fontSize: 13, marginTop: 2 }}>
                  {selected === t.key ? '✓ Active' : 'Tap to apply'}
                </Text>
              </View>
              {selected === t.key && <Ionicons name="checkmark-circle-outline" size={24} color={t.color} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  themeCard: { borderRadius: 12, padding: 16, marginBottom: 10 },
})
