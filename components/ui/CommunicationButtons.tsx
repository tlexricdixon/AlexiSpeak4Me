import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

interface CommunicationItem {
  id: string;
  text: string;
  image: any;
}

const SWIPE_THRESHOLD = -50; // Constant for swipe sensitivity

const createSwipeGesture = (onSwipeLeft: () => void) =>
  Gesture.Pan().onEnd(({ translationX }) => {
    if (translationX < SWIPE_THRESHOLD) onSwipeLeft();
  });

const CommunicationButton: React.FC<{ item: CommunicationItem; onSwipeLeft: () => void }> = ({ item, onSwipeLeft }) => (
  <GestureDetector gesture={createSwipeGesture(onSwipeLeft)}>
    <TouchableOpacity style={styles.gridItem} onPress={() => Speech.speak(item.text)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.gridText}>{item.text}</Text>
    </TouchableOpacity>
  </GestureDetector>
);

const styles = StyleSheet.create({
  gridItem: { width: 100, height: 120, alignItems: 'center', margin: 10, padding: 10, backgroundColor: '#E0E0E0', borderRadius: 10 },
  image: { width: 60, height: 60, marginBottom: 5 },
  gridText: { fontSize: 16, fontWeight: 'bold' },
});

export default CommunicationButton;
