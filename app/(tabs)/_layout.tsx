import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * 🔹 Define icons for navigation
 */
const tabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home-outline',
  communication: 'chatbubbles-outline',
  settings: 'settings-outline',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name] || 'help-circle-outline'} size={size} color={color} />
        ),
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
        tabBarPosition: 'top', // ✅ Moves tabs to the top
        headerShown: false, // ✅ Removes "(tabs)" from the top
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="communication" options={{ title: 'Communication' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

