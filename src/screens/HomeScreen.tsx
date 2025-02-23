import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationButton } from '../components/ui/NavigationButton';
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <Image source={require('../assets/images/avatar_placeholder.jpg')} style={styles.avatar} />
        <Text style={styles.greeting}>Hello! I’m your assistant.</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.grid}>
        <NavigationButton text="Emotion" color="#4CAF50" onPress={() => console.log('Emotion clicked')} />
        <NavigationButton text="Health" color="#2196F3" onPress={() => console.log('Health clicked')} />
        <NavigationButton text="Tasks" color="#FF9800" onPress={() => console.log('Tasks clicked')} />
        <NavigationButton text="Communication" color="#9E9E9E" onPress={() => navigation.navigate('Communication')} />
      </View>
    </View>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8', justifyContent: 'center' },
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 120, height: 120, backgroundColor: '#E0E0E0', borderRadius: 60 },
  greeting: { fontSize: 20, color: '#333', marginTop: 10, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  button: { width: '48%', padding: 15, borderRadius: 20, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#FFF', fontSize: 16 },
});




