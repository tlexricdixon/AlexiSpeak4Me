import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { themes } from '../../store/theme';
import KeyboardWrapper from '../../components/KeyboardWrapper';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import WordItem from '../../components/ui/WordItem';
import { handleAddWord, handleResetWords } from '../../utils/helpers/wordHelpers';
import { deactivateWordInDatabase, reactivateWordInDatabase, getInactiveWordsFromDatabase } from '../../database/database';
import { setupDatabaseAndLoadWords } from '../../utils/helpers/databaseSetup';
import { Picker } from '@react-native-picker/picker'; 
import { CommunicationItem } from '../../interfaces/CommunicationItem';

// 📌 Import TabView
import { TabView, SceneMap } from 'react-native-tab-view';

const categories = ['Basic Needs', 'Feelings', 'Responses', 'People', 'Places', 'Custom']; 

const CaregiverScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.preferences.theme);
  const words = useSelector((state: RootState) => state.words.words);
  const currentTheme = themes[theme] || themes.light;

  const [newWord, setNewWord] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('Basic Needs'); 
  const [inactiveWords, setInactiveWords] = useState<CommunicationItem[]>([]); 

  useEffect(() => {
    setupDatabaseAndLoadWords(dispatch);
    fetchInactiveWords();
  }, [dispatch]);

  const fetchInactiveWords = async () => {
    const words = await getInactiveWordsFromDatabase();
    setInactiveWords(words);
  };

  // 🔹 Active Words Tab
  const ActiveWordsTab = () => (
    <FlatList
      data={words}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <WordItem item={item} onDeactivate={() => deactivateWordInDatabase(item.id)} />
      )}
    />
  );

  // 🔹 Inactive Words Tab
  const InactiveWordsTab = () => (
    inactiveWords.length === 0 ? (
      <Text style={[styles.emptyText, { color: currentTheme.text }]}>No inactive words</Text>
    ) : (
      <FlatList
        data={inactiveWords}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <WordItem
            item={item}
            onDeactivate={async () => {
              await reactivateWordInDatabase(item.id);
              fetchInactiveWords();
              setupDatabaseAndLoadWords(dispatch);
            }}
          />
        )}
      />
    )
  );

  // 📌 Configure Tabs
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'active', title: 'Active Words' },
    { key: 'inactive', title: 'Inactive Words' }
  ]);

  const renderScene = SceneMap({
    active: ActiveWordsTab,
    inactive: InactiveWordsTab,
  });

  return (
    <KeyboardWrapper backgroundColor={currentTheme.background}>
      <Text style={[styles.header, { color: currentTheme.text }]}>Caregiver Mode</Text>

      {/* Theme Toggle Button */}
      <ThemeToggleButton />

      {/* Input and Image Picker Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: currentTheme.input, color: currentTheme.text }]}
          placeholder="Enter Word"
          placeholderTextColor="#888"
          value={newWord}
          onChangeText={setNewWord}
        />
        <ImagePickerComponent onImageSelected={setImageUri} />
      </View>

      {/* Category Dropdown */}
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      {/* Add Word Button */}
      <Button
        title="Add Word"
        onPress={() => handleAddWord(newWord, imageUri, words, dispatch, setNewWord, setImageUri, category)}
      />

      {/* Tab View for Active & Inactive Words */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />

      {/* Reset Button */}
      <Button title="Reset to Default Words" onPress={() => handleResetWords(dispatch)} color="red" />
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default CaregiverScreen;
























