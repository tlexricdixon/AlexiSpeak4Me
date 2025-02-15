import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunicationItem, defaultWords } from '../config/wordsConfig';
import { loadCaregiverWords, saveCaregiverWords, resetCaregiverWords } from '../config/caregiverConfig';

/**
 * 🔹 Redux State for Words
 * - Holds word list and loading state.
 */
interface WordsState {
  words: CommunicationItem[];
}

/**
 * 🔹 Initial State
 * - Uses `defaultWords` to **avoid async issues**.
 */
const initialState: WordsState = {
  words: defaultWords, // ✅ Loads default words immediately
};

/**
 * 🟢 Redux Slice for Managing Words
 * - Handles adding, removing, and resetting words.
 */
const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    /**
     * ✅ Load words from AsyncStorage **without awaiting**.
     * - Calls `loadCaregiverWords()`, but **Redux updates synchronously**.
     */
    loadWords: (state) => {
      loadCaregiverWords().then((storedWords) => {
        if (storedWords) {
          state.words = storedWords; // ✅ Updates words asynchronously
        }
      });
    },

    /**
     * ✅ Add a new word (text + image).
     * - Saves words in AsyncStorage **after Redux updates**.
     */
    addWord: (state, action: PayloadAction<CommunicationItem>) => {
      state.words.push(action.payload);
      saveCaregiverWords(state.words); // ✅ Saves in background (async)
    },

    /**
     * ✅ Remove a word by ID.
     * - Updates state immediately, saves asynchronously.
     */
    removeWord: (state, action: PayloadAction<string>) => {
      state.words = state.words.filter((word: CommunicationItem) => word.id !== action.payload);
      saveCaregiverWords(state.words);
    },

    /**
     * ✅ Reset words to default.
     * - Calls `resetCaregiverWords()` asynchronously.
     */
    resetWords: (state) => {
      state.words = defaultWords;
      resetCaregiverWords(); // ✅ Resets AsyncStorage
    },
  },
});

// ✅ Export Redux Actions
export const { loadWords, addWord, removeWord, resetWords } = wordSlice.actions;
export default wordSlice.reducer;



