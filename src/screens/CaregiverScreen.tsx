import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { themes } from '../../store/theme';
import KeyboardWrapper from '../../components/KeyboardWrapper';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import { handleAddWord, handleResetWords } from '../../utils/helpers/wordHelpers';
import { deactivateWordInDatabase, reactivateWordInDatabase, getInactiveWordsFromDatabase } from '../../database/database';
import { setupDatabaseAndLoadWords } from '../../utils/helpers/databaseSetup';
import { Picker } from '@react-native-picker/picker';
import ActiveWordsTab from '../../components/ui/ActiveWordsTab'; // ✅ Import
import InactiveWordsTab from '../../components/ui/InactiveWordsTab'; // ✅ Import
import { CommunicationItem } from '../../interfaces/CommunicationItem';

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
      <Picker selectedValue={category} style={styles.picker} onValueChange={(itemValue) => setCategory(itemValue)}>
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      {/* Add Word Button */}
      <Button
        title="Add Word"
        onPress={() => handleAddWord(newWord, imageUri, words, dispatch, setNewWord, setImageUri, category)}
      />

      {/* 🔹 Active Words Tab */}
      <ActiveWordsTab words={words} onDeactivate={deactivateWordInDatabase} />

      {/* 🔹 Inactive Words Tab */}
      <InactiveWordsTab
        inactiveWords={inactiveWords}
        onReactivate={reactivateWordInDatabase}
        fetchInactiveWords={fetchInactiveWords}
        currentTheme={currentTheme}
      />

      {/* Reset Button */}
      <Button title="Reset to Default Words" onPress={() => handleResetWords(dispatch)} color="red" />
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  input: { flex: 1, padding: 10, borderRadius: 5, marginRight: 10, borderWidth: 1, borderColor: '#ccc' },
  picker: { height: 50, width: '100%', marginBottom: 10 },
});

export default CaregiverScreen;
