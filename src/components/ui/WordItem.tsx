import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CommunicationItem } from '../../interfaces/CommunicationItem';
interface WordItemProps {
  item: CommunicationItem;
  onDeactivate?: (id: string) => void; // ✅ Optional prop for deactivation
  onReactivate?: (id: string) => void; // ✅ Optional prop for reactivation
}
/**
 * ✅ WordItem Component
 * - Displays a word with image.
 * - Supports **activation/deactivation**.
 */
const WordItem: React.FC<WordItemProps> = ({ item, onDeactivate, onReactivate }) => {
  return (
    <View style={styles.container}>
      {/* 🔹 Word Image */}
      <Image source={{ uri: item.image }} style={styles.wordImage} />
      
      {/* 🔹 Word Text */}
      <Text style={styles.wordText}>{item.text}</Text>

      {/* 🔹 Deactivate Button (for active words) */}
      {item.isActive && onDeactivate && (
        <TouchableOpacity onPress={() => onDeactivate(item.id)} style={styles.deactivateButton}>
          <Text style={styles.buttonText}>Deactivate</Text>
        </TouchableOpacity>
      )}

      {/* 🔹 Reactivate Button (for inactive words) */}
      {!item.isActive && onReactivate && (
        <TouchableOpacity onPress={() => onReactivate(item.id)} style={styles.reactivateButton}>
          <Text style={styles.buttonText}>Reactivate</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * 🎨 Styles for WordItem
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    width: '30%',
  },
  wordImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  wordText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deactivateButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  reactivateButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WordItem;




