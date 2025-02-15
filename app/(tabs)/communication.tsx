import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // ✅ Required for gestures
import CommunicationButton from '../../components/ui/CommunicationButtons';
import { defaultWords } from '../../config/wordsConfig'; // ✅ Load words from config

const CommunicationScreen: React.FC = () => {
  /**
   * 🟢 Load words directly from wordsConfig.ts
   * - No Redux for now, just using local state.
   */
  const [words, setWords] = useState(defaultWords);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* 🔹 Header */}
        <Text style={styles.header}>Communicate</Text>

        {/* 🔹 Word Grid */}
        <FlatList
          data={words}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <CommunicationButton 
              item={item} 
              onSwipeLeft={() => console.log(`Swiped Left: ${item.text}`)} // ✅ Placeholder swipe function
            />
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

/**
 * 🎨 Styles for Communication Screen
 * - Clean grid layout for better readability.
 */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});

export default CommunicationScreen;






