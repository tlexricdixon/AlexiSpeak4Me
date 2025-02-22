import React, { useMemo, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store'; // ✅ Redux Store
import CommunicationButton from '../../components/ui/CommunicationButtons';
import { getCategorizedWords } from '../../utils/helpers/getCategorizedWords';
import { syncDatabaseWithRedux } from '../../utils/helpers/syncDatabaseWithRedux';


/**
 * ✅ CommunicationScreen Component
 * - Displays categorized communication items
 * - Uses `SectionList` for organization
 * - Supports swipe gestures for interaction
 */
const CommunicationScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Get words from Redux state (ensuring default value to prevent crashes)
  const words = useSelector((state: RootState) => state.words.words) || [];

  // ✅ Ensure words load on component mount
  useEffect(() => {
    syncDatabaseWithRedux(dispatch);
  }, [dispatch]);

  // 🟢 Optimize category processing using `useMemo`
  const categorizedWords = useMemo(() => getCategorizedWords(words), [words]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* 🔹 Page Title */}
        <Text style={styles.header}>Communicate</Text>

        {/* 🔹 Categorized Word List */}
        <SectionList
          sections={categorizedWords}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item, index, section }) => {
            // ✅ Group words into rows of 3
            const rowStart = index % 3 === 0;
            if (rowStart) {
              const rowItems = section.data.slice(index, index + 3); // ✅ Get up to 3 items
              return (
                <View style={styles.row}>
                  {rowItems.map((rowItem) => (
                    <CommunicationButton 
                      key={rowItem.id} 
                      item={rowItem} 
                      onSwipeLeft={() => console.log(`Swiped Left: ${rowItem.text}`)}
                    />
                  ))}
                </View>
              );
            }
            return null;
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

/** 
 * 🎨 Styles for Communication Screen
 */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor: '#E0E0E0',
    paddingVertical: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default CommunicationScreen;

