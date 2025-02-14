import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store'; // ✅ Import RootState
import * as Speech from 'expo-speech'; // ✅ Import Speech API


const CommunicationScreen: React.FC = () => {
  // ✅ Fetch words from Redux store
  const words = useSelector((state: RootState) => state.words.words) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Communicate</Text>

      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem} onPress={() => Speech.speak(item.text)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.gridText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  gridItem: { flex: 1, alignItems: 'center', margin: 10 },
  image: { width: 80, height: 80, marginBottom: 5 },
  gridText: { fontSize: 16, color: '#333' },
});

export default CommunicationScreen;
