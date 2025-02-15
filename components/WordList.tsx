import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeWord } from '../store/wordSlice';
import { RootState } from '../store/store';

const WordList: React.FC = () => {
  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.words.words);

  return (
    <FlatList
      data={words}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.wordItem}>
          <Image source={{ uri: item.image }} style={styles.wordImage} />
          <Text style={styles.wordText}>{item.text}</Text>
          <TouchableOpacity onPress={() => dispatch(removeWord(item.id))}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  wordItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '95%', 
    alignSelf: 'center',
    padding: 15, 
    marginVertical: 8,
    backgroundColor: '#f5f5f5', 
    borderRadius: 10,
  },
  wordImage: { width: 80, height: 80, borderRadius: 10 },
  wordText: { fontSize: 18, fontWeight: 'bold', flex: 1, marginLeft: 10 },
  removeText: { color: 'red', fontSize: 16, fontWeight: 'bold' },
});

export default WordList;

