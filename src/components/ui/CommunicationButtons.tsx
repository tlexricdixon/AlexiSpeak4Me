import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as Speech from 'react-native-tts';
import { CommunicationItem } from '../../interfaces/CommunicationItem';

/**
 * CommunicationButton Component:
 * - Displays an image + text button.
 * - On tap: Speaks the text.
 * - On swipe left: Triggers a function (e.g., remove word).
 */
const CommunicationButton: React.FC<{ item: CommunicationItem; onSwipeLeft: () => void }> = ({ item, onSwipeLeft }) => {
  const imageSource = typeof item.image === 'string'
  ? item.image.startsWith('file://') || item.image.startsWith('http')
    ? { uri: item.image } // ✅ External file or network image
    : require('../../assets/images/default.jpg') // ✅ Fallback image
  : item.image; // ✅ Use local static images if applicable
  //const imageSource = resolveImagePath(item.image); // ✅ Resolve correct path

  // ✅ Swipe gesture to remove word
  const swipeGesture = Gesture.Pan().onEnd(({ translationX }) => {
    if (translationX < -50) {
      onSwipeLeft();
    }
  });


  return (
    <GestureDetector gesture={swipeGesture}>
      <TouchableOpacity style={styles.gridItem} onPress={() => Speech.speak(item.text)}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.gridText}>{item.text}</Text>
      </TouchableOpacity>
    </GestureDetector>
  );
};

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
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  gridText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CommunicationButton;



