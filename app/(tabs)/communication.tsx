import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectWords, CommunicationItem } from '../../components/wordSlice';
import * as Speech from 'expo-speech';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function CommunicationScreen() {
  const words = useSelector(selectWords);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Communicate</Text>

        <FlatList
          data={words}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => <CommunicationButton key={item.id} item={item} />}
        />
      </View>
    </GestureHandlerRootView>
  );
}

// Communication Button Component
const CommunicationButton: React.FC<{ item: CommunicationItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={() => Speech.speak(item.text)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.gridText}>{item.text}</Text>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  gridItem: { flex: 1, margin: 5, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#E0E0E0', borderRadius: 10 },
  image: { width: 80, height: 80, marginBottom: 5 },
  gridText: { fontSize: 16, fontWeight: 'bold' },
});










