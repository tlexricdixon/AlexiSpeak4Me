import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSegments } from 'expo-router';

const screenTitles: Record<string, string> = {
  home: 'Home',
  communication: 'Communication',
  caregiver: 'Caregiver',
  settings: 'Settings',
};

export default function TopNav() {
  const segments = useSegments();
  const currentPage = segments[0] || 'home'; // ✅ Default to 'home' if no segment found
  const title = screenTitles[currentPage] || 'AAC App';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
