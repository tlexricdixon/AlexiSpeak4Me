import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';
import { CommunicationItem } from '@/config/wordsConfig';// ✅ Import CommunicationItem from shared type file

/**
 * Constants for swipe detection.
 */
const SWIPE_THRESHOLD = -50; // Minimum swipe distance to trigger action

/**
 * CommunicationButton Component:
 * - Displays an image + text button.
 * - On tap: Speaks the text.
 * - On swipe left: Triggers a function (e.g., remove word).
 */
const CommunicationButton: React.FC<{ item: CommunicationItem; onSwipeLeft: () => void }> = ({ item, onSwipeLeft }) => {
  // ✅ Initialize swipe gesture detector inside the component
  const swipeGesture = Gesture.Pan().onEnd(({ translationX }) => {
    if (translationX < SWIPE_THRESHOLD) {
      onSwipeLeft();
    }
  });

  return (
    <GestureDetector gesture={swipeGesture}>
      <TouchableOpacity style={styles.gridItem} onPress={() => Speech.speak(item.text)}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.gridText}>{item.text}</Text>
      </TouchableOpacity>
    </GestureDetector>
  );
};

/**
 * Styles for CommunicationButton:
 * - Ensures uniform spacing, alignment, and readability.
 */
const styles = StyleSheet.create({
  gridItem: {
    width: 110, 
    height: 130, 
    alignItems: 'center', 
    justifyContent: 'center',
    margin: 10, 
    padding: 10, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 10, 
    elevation: 3, // Adds a slight shadow for better visual appeal
  },
  image: { 
    width: 70, 
    height: 70, 
    marginBottom: 5, 
    resizeMode: 'contain' // Ensures images fit within bounds 
  },
  gridText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
});

export default CommunicationButton;


