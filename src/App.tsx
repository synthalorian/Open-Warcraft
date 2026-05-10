import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { ThemeProvider, type ThemeKey } from './ThemeContext'
import * as Themes from './theme'

import { HomeScreen, LorekeeperScreen, ClassBuilderScreen, AscensionScreen } from './screens'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const ION_MAP: Record<string, string> = {
  home: 'home-outline',
  lore: 'document-text-outline',
  build: 'construct-outline',
  ascension: 'rocket-outline',
  more: 'ellipsis-horizontal-outline',
}

const TabIcon: React.FC<{ routeName: string; color: string; size: number }> = ({ routeName, color, size }) => {
  const map: Record<string, string> = {
    home: 'home-outline',
    lore: 'document-text-outline',
    build: 'construct-outline',
    ascension: 'rocket-outline',
    more: 'ellipsis-horizontal-outline',
  }
  return <Ionicons name={map[routeName] || 'help-outline'} size={size} color={color} />
}

function MainTabs({ theme }: { theme: any }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: theme.tabBarBg, borderTopColor: theme.border, height: 60, paddingBottom: 8 },
        tabBarActiveTintColor: theme.tabBarIconActive,
        tabBarInactiveTintColor: theme.tabBarIcon,
        headerStyle: { backgroundColor: theme.bg, borderBottomColor: theme.border },
        headerTitleStyle: { color: theme.text, fontWeight: '700', fontSize: 18 },
        headerTintColor: theme.text,
        tabBarIcon: ({ color, size }) => <TabIcon routeName={route.name} color={color} size={size} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lorekeeper" component={LorekeeperScreen} />
      <Tab.Screen name="ClassBuilder" component={ClassBuilderScreen} />
      <Tab.Screen name="Ascension" component={AscensionScreen} />
      <Tab.Screen name="More" component={require('./screens/MoreScreen').MoreScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#0d1117' },
              headerTitleStyle: { color: '#e6edf3', fontWeight: '700', fontSize: 18 },
              headerTintColor: '#e6edf3',
              contentStyle: { backgroundColor: '#0d1117' },
            }}
          >
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </ThemeProvider>
  )
}
