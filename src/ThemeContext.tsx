import * as React from 'react'
import { THEMES, type ThemeKey, type ThemeColors } from './theme'

export { type ThemeKey } from './theme'

export const ThemeContext = React.createContext<{
  theme: ThemeColors
  themeKey: ThemeKey
  setTheme: (key: ThemeKey) => void
}>({ theme: THEMES['warcraft-dark'].colors, themeKey: 'warcraft-dark', setTheme: () => {} })

export function useTheme() {
  return React.useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>('warcraft-dark')
  const theme = THEMES[themeKey].colors

  const setTheme = React.useCallback((key: ThemeKey) => {
    setThemeKey(key)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
