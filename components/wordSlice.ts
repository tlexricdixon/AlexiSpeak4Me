import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch, RootState } from './store';

// Define Word Type
export interface CommunicationItem {
  id: string;
  text: string;
  image: string; // Store image path as string
}

// Default Words
const defaultWords: CommunicationItem[] = [
  { id: '1', text: 'Eat', image: '../assets/images/eat.png' },
  { id: '2', text: 'Drink', image: '../assets/images/drink.png' },
  { id: '3', text: 'Restroom', image: '../assets/images/restroom.png' },
  { id: '4', text: 'Happy', image: '../assets/images/happy.png' },
  { id: '5', text: 'Sad', image: '../assets/images/sad.png' },
  { id: '6', text: 'Angry', image: '../assets/images/angry.png' },
  { id: '7', text: 'Yes', image: '../assets/images/yes.png' },
  { id: '8', text: 'No', image: '../assets/images/no.png' },
  { id: '9', text: 'Help', image: '../assets/images/help.png' },
];

// AsyncStorage Keys
const STORAGE_KEY = 'communicationWords';

// Load Words from AsyncStorage
const loadWords = async (): Promise<CommunicationItem[]> => {
  try {
    const storedWords = await AsyncStorage.getItem(STORAGE_KEY);
    return storedWords ? JSON.parse(storedWords) : defaultWords;
  } catch (error) {
    console.error('Failed to load words:', error);
    return defaultWords;
  }
};

// Save Words to AsyncStorage
const saveWords = async (words: CommunicationItem[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  } catch (error) {
    console.error('Failed to save words:', error);
  }
};

// Redux Slice
const wordSlice = createSlice({
  name: 'words',
  initialState: { words: defaultWords },
  reducers: {
    setWords: (state, action: PayloadAction<CommunicationItem[]>) => {
      state.words = action.payload;
      saveWords(action.payload);
    },
    addWord: (state, action: PayloadAction<CommunicationItem>) => {
      state.words.push(action.payload);
      saveWords(state.words);
    },
    editWord: (state, action: PayloadAction<{ id: string; text: string; image: string }>) => {
      const word = state.words.find((w) => w.id === action.payload.id);
      if (word) {
        word.text = action.payload.text;
        word.image = action.payload.image;
      }
      saveWords(state.words);
    },
    removeWord: (state, action: PayloadAction<string>) => {
      state.words = state.words.filter((word) => word.id !== action.payload);
      saveWords(state.words);
    },
    resetWords: (state) => {
      state.words = defaultWords;
      saveWords(defaultWords);
    },
  },
});

export const { setWords, addWord, editWord, removeWord, resetWords } = wordSlice.actions;
export const selectWords = (state: RootState) => state.words.words;

export default wordSlice.reducer;
