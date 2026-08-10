import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEYS = {
  JOURNAL_ENTRIES: '@openwarcraft/journal_entries',
  CUSTOM_BUILDS: '@openwarcraft/custom_builds',
  WARBAND_ROSTER: '@openwarcraft/warband_roster',
  ASCENSION_PROGRESS: '@openwarcraft/ascension_progress',
  SETTINGS: '@openwarcraft/settings',
} as const

export interface JournalEntry {
  id: string
  title: string
  content: string
  type: 'quest' | 'achievement' | 'note'
  completed: boolean
  createdAt: number
  updatedAt: number
}

export interface CustomBuild {
  id: string
  name: string
  classKey: string
  specKey: string
  gear: Record<string, { name: string; rarity: string }>
  notes: string
  createdAt: number
  updatedAt: number
}

export interface WarbandMember {
  id: string
  name: string
  class: string
  rank: string
  online: boolean
  addedAt: number
}

export interface AscensionProgress {
  currentTier: number
  currentXP: number
  totalXP: number
  completedLessons: string[]
  lastUpdated: number
}

export interface AppSettings {
  theme: string
  notifications: boolean
  autoSync: boolean
}

class StorageService {
  // Journal
  async getJournalEntries(): Promise<JournalEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  async saveJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<JournalEntry> {
    const entries = await this.getJournalEntries()
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    entries.push(newEntry)
    await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries))
    return newEntry
  }

  async updateJournalEntry(id: string, updates: Partial<JournalEntry>): Promise<void> {
    const entries = await this.getJournalEntries()
    const index = entries.findIndex(e => e.id === id)
    if (index >= 0) {
      entries[index] = { ...entries[index], ...updates, updatedAt: Date.now() }
      await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries))
    }
  }

  async deleteJournalEntry(id: string): Promise<void> {
    const entries = await this.getJournalEntries()
    const filtered = entries.filter(e => e.id !== id)
    await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(filtered))
  }

  // Custom Builds
  async getCustomBuilds(): Promise<CustomBuild[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CUSTOM_BUILDS)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  async saveCustomBuild(build: Omit<CustomBuild, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomBuild> {
    const builds = await this.getCustomBuilds()
    const newBuild: CustomBuild = {
      ...build,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    builds.push(newBuild)
    await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_BUILDS, JSON.stringify(builds))
    return newBuild
  }

  async updateCustomBuild(id: string, updates: Partial<CustomBuild>): Promise<void> {
    const builds = await this.getCustomBuilds()
    const index = builds.findIndex(b => b.id === id)
    if (index >= 0) {
      builds[index] = { ...builds[index], ...updates, updatedAt: Date.now() }
      await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_BUILDS, JSON.stringify(builds))
    }
  }

  async deleteCustomBuild(id: string): Promise<void> {
    const builds = await this.getCustomBuilds()
    const filtered = builds.filter(b => b.id !== id)
    await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_BUILDS, JSON.stringify(filtered))
  }

  // Warband
  async getWarbandRoster(): Promise<WarbandMember[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WARBAND_ROSTER)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  async saveWarbandMember(member: Omit<WarbandMember, 'id' | 'addedAt'>): Promise<WarbandMember> {
    const roster = await this.getWarbandRoster()
    const newMember: WarbandMember = {
      ...member,
      id: Date.now().toString(),
      addedAt: Date.now(),
    }
    roster.push(newMember)
    await AsyncStorage.setItem(STORAGE_KEYS.WARBAND_ROSTER, JSON.stringify(roster))
    return newMember
  }

  async updateWarbandMember(id: string, updates: Partial<WarbandMember>): Promise<void> {
    const roster = await this.getWarbandRoster()
    const index = roster.findIndex(m => m.id === id)
    if (index >= 0) {
      roster[index] = { ...roster[index], ...updates }
      await AsyncStorage.setItem(STORAGE_KEYS.WARBAND_ROSTER, JSON.stringify(roster))
    }
  }

  async deleteWarbandMember(id: string): Promise<void> {
    const roster = await this.getWarbandRoster()
    const filtered = roster.filter(m => m.id !== id)
    await AsyncStorage.setItem(STORAGE_KEYS.WARBAND_ROSTER, JSON.stringify(filtered))
  }

  // Ascension
  async getAscensionProgress(): Promise<AscensionProgress | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ASCENSION_PROGRESS)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }

  async saveAscensionProgress(progress: AscensionProgress): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ASCENSION_PROGRESS, JSON.stringify({
      ...progress,
      lastUpdated: Date.now(),
    }))
  }

  // Settings
  async getSettings(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS)
      return data ? JSON.parse(data) : { theme: 'warcraft-dark', notifications: true, autoSync: false }
    } catch {
      return { theme: 'warcraft-dark', notifications: true, autoSync: false }
    }
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  }

  // Utility
  async clearAll(): Promise<void> {
    const keys = Object.values(STORAGE_KEYS)
    await Promise.all(keys.map(key => AsyncStorage.removeItem(key)))
  }
}

export const storage = new StorageService()
