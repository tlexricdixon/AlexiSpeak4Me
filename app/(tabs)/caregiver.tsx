import React, { useState } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { themes } from '../../store/theme';
import KeyboardWrapper from '../../components/KeyboardWrapper';
import AddWordForm from '../../components/AddWordForm';
import WordList from '../../components/WordList';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import { addWord } from '../../store/wordSlice';
import { saveCaregiverWords } from '../../config/caregiverConfig';

const CaregiverScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Move `useSelector` to top level
  const theme = useSelector((state: RootState) => state.preferences.theme);
  const words = useSelector((state: RootState) => state.words.words); // 🟢 No more hooks inside functions
  const currentTheme = themes[theme] || themes.light; 

  // ✅ Local state for adding a new word
  const [newWord, setNewWord] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  /**
   * ✅ Handle adding a new word
   * - Uses Redux to store the word
   * - Saves to AsyncStorage for persistence
   * - Prevents adding empty values
   */
  const handleAddWord = async () => {
    if (!newWord.trim() || !imageUri) return; // 🛑 Prevents adding empty words

    const newWordItem = { id: Date.now().toString(), text: newWord, image: imageUri };
    
    // 🟢 Dispatch to Redux
    dispatch(addWord(newWordItem));

    // 🟢 Save to AsyncStorage
    const updatedWords = [...words, newWordItem]; // Include the new word
    await saveCaregiverWords(updatedWords); // ✅ Save words to persistent storage

    // ✅ Reset input fields
    setNewWord('');
    setImageUri(null);
  };

  return (
    <KeyboardWrapper backgroundColor={currentTheme.background}>
      <Text style={[styles.header, { color: currentTheme.text }]}>Caregiver Mode</Text>

      {/* ✅ Theme Toggle */}
      <ThemeToggleButton />

      {/* ✅ Add Word Form */}
      <AddWordForm newWord={newWord} setNewWord={setNewWord} />

      {/* ✅ Image Picker */}
      <ImagePickerComponent onImageSelected={setImageUri} />

      {/* ✅ Add Word Button */}
      <Button title="Add Word" onPress={handleAddWord} />

      {/* ✅ Word List */}
      <WordList />
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});

export default CaregiverScreen;












