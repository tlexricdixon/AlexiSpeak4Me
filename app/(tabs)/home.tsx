import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressBar } from 'react-native-paper';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 1. Avatar Section */}
      <View style={styles.avatarSection}>
        <Image source={require('../../assets/images/avatar_placeholder.jpg')} style={styles.avatar} />
        <Text style={styles.greeting}>Hello! I’m your assistant.</Text>
      </View>

      {/* 2. Navigation Buttons */}
      <View style={styles.grid}>
        <NavigationButton text="Emotion" color="#4CAF50" onPress={() => console.log('Emotion clicked')} />
        <NavigationButton text="Health" color="#2196F3" onPress={() => console.log('Health clicked')} />
        <NavigationButton text="Tasks" color="#FF9800" onPress={() => console.log('Tasks clicked')} />
        <NavigationButton text="Communication" color="#9E9E9E" onPress={() => router.push('/(tabs)/communication')} /> 
      </View>

      {/* 3. Progress Indicators */}
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>Task Completion: 60% Done</Text>
        <ProgressBar progress={0.6} color="#4CAF50" style={styles.progressBar} />
      </View>

      {/* 4. Notification Panel */}
      <View style={styles.reminderPanel}>
        <Text style={styles.reminderText}>Reminder: Brush your teeth at 7:30 PM.</Text>
      </View>
    </View>
  );
}

// 🔹 Reusable Navigation Button Component
const NavigationButton: React.FC<{ text: string; color: string; onPress: () => void }> = ({ text, color, onPress }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

// 🔹 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8', justifyContent: 'center' },
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 120, height: 120, backgroundColor: '#E0E0E0', borderRadius: 60 },
  greeting: { fontSize: 20, color: '#333', marginTop: 10, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  button: { width: '48%', padding: 15, borderRadius: 20, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#FFF', fontSize: 16 },
  progressSection: { marginBottom: 20 },
  progressText: { fontSize: 14, color: '#333', marginBottom: 5 },
  progressBar: { height: 10, borderRadius: 5 },
  reminderPanel: { backgroundColor: '#FFEB3B', padding: 10, borderRadius: 10, alignItems: 'center' },
  reminderText: { fontSize: 14, color: '#333' },
});



