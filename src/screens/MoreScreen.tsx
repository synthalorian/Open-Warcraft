import * as React from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Linking } from 'react-native'
import { useTheme } from '../ThemeContext'
import { Ionicons } from '@expo/vector-icons'

export const MoreScreen = ({ navigation }: any) => {
  const { theme, themeKey, setTheme } = useTheme()

  const openBMC = () => {
    Linking.openURL('https://www.buymeacoffee.com/synthalorian').catch(() => {})
  }

  const openGitHub = () => {
    Linking.openURL('https://github.com/synthalorian/open-warcraft').catch(() => {})
  }

  const openDiscord = () => {
    Linking.openURL('https://discord.gg/synthalorian').catch(() => {})
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.accent }]}>⚙️ More</Text>
        <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Settings & Support</Text>
      </View>

      {/* Support */}
      <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Support Development</Text>
        <Text style={[styles.sectionSub, { color: theme.textSecondary, marginTop: 4, marginBottom: 12, fontSize: 13, lineHeight: 20 }]}>
          If you enjoy using Open Warcraft, consider supporting the development. Your contribution helps keep this project alive and growing.
        </Text>
        <TouchableOpacity style={[styles.bmcBtn, { backgroundColor: '#FFDD00' }]} onPress={openBMC}>
          <Ionicons name="cafe-outline" size={18} color="#000" />
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '700', marginLeft: 8 }}>Buy Me a Coffee ☕</Text>
        </TouchableOpacity>
      </View>

      {/* Open Source */}
      <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Open Source</Text>
        <TouchableOpacity style={[styles.menuBtn, { borderBottomColor: theme.border }]} onPress={openGitHub}>
          <Ionicons name="swap-horizontal-outline" size={18} color={theme.accent} />
          <Text style={[styles.menuText, { color: theme.text }]}>GitHub Repository</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={theme.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuBtn, { borderBottomColor: theme.border }]} onPress={openDiscord}>
          <Ionicons name="logo-discord" size={18} color={theme.accent} />
          <Text style={[styles.menuText, { color: theme.text }]}>Discord Community</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={theme.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuBtn, { borderBottomColor: theme.border }]} onPress={() => {}}>
          <Ionicons name="book-outline" size={18} color={theme.accent} />
          <Text style={[styles.menuText, { color: theme.text }]}>Documentation</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={theme.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuBtn, { borderBottomColor: theme.border }]} onPress={() => {}}>
          <Ionicons name="construct-outline" size={18} color={theme.accent} />
          <Text style={[styles.menuText, { color: theme.text }]}>Contribute</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={theme.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>
        <View style={[styles.menuRow, { borderBottomColor: theme.border }]}>
          <Ionicons name="color-palette-outline" size={18} color={theme.accent} />
          <Text style={[styles.menuText, { color: theme.text }]}>Change Theme</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('ThemePicker')}>
            <View style={[styles.themeBadge, { backgroundColor: '#58a6ff' }]}>
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>{theme.name || themeKey}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* About */}
      <View style={[styles.sectionCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: theme.textSecondary, fontSize: 13, lineHeight: 20 }]}>
          Open Warcraft is an open-source companion app for World of Warcraft players. It provides lore exploration, class building, journal tracking, and PvP management tools.
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          <Text style={{ color: theme.textMuted, fontSize: 12 }}>Licensed under MIT</Text>
          <Text style={{ color: theme.textMuted, fontSize: 12 }}>Built with React Native + Expo</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: 1 },
  headerSub: { fontSize: 14, marginTop: 4 },
  sectionCard: { marginHorizontal: 16, padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  sectionSub: { fontSize: 13, lineHeight: 20 },
  bmcBtn: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 10 },
  menuBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1 },
  menuText: { flex: 1, fontSize: 15, marginLeft: 12 },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1 },
  themeBadge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, marginLeft: 8 },
  aboutText: { fontSize: 13, lineHeight: 20 },
})
