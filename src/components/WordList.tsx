import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface WordListProps {
  onRemoveWord: (id: string) => void; // ✅ Define onRemoveWord as a prop
}

/**
 * ✅ WordList Component
 * - Displays the list of words with an option to remove them.
 * - Uses Redux to fetch words dynamically.
 */
const WordList: React.FC<WordListProps> = ({ onRemoveWord }) => {
  const words = useSelector((state: RootState) => state.words.words);

  return (
    <View style={styles.container}>
      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.wordItem}>
            <Image source={{ uri: item.image }} style={styles.wordImage} />
            <Text style={styles.wordText}>{item.text}</Text>
            <TouchableOpacity onPress={() => onRemoveWord(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

/** 
 * 🎨 Styles 
 */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  wordItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  wordImage: { width: 60, height: 60, marginRight: 10 },
  wordText: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  removeText: { color: 'red', fontSize: 16, fontWeight: 'bold' },
});

export default WordList;


