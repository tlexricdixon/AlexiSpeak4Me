import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunicationItem } from '../interfaces/CommunicationItem';

/**
 * 🟢 Initial Redux State for Words
 */
interface WordsState {
  words: CommunicationItem[]; // ✅ Active words
  inactiveWords: CommunicationItem[]; // ✅ Inactive words
}

const initialState: WordsState = {
  words: [],
  inactiveWords: [], // ✅ Store for inactive words
};

/**
 * 🟢 Redux Slice for Managing Words
 */
const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    /**
     * ✅ Replace Active & Inactive Words in Redux Store
     */
    // ✅ Replace words properly
setWordsFromStorage: (state, action: PayloadAction<CommunicationItem[]>) => {
  state.words = action.payload.filter(word => word.isActive);
  state.inactiveWords = action.payload.filter(word => !word.isActive);
},

    /**
     * ✅ Add a Word (Redux Only)
     */
    addWord: (state, action: PayloadAction<CommunicationItem>) => {
      state.words.push(action.payload);
    },

    /**
     * ✅ Deactivate a Word (Move to `inactiveWords`)
     */
    deactivateWord: (state, action: PayloadAction<string>) => {
      const wordIndex = state.words.findIndex((w) => w.id === action.payload);
      if (wordIndex !== -1) {
        const word = { ...state.words[wordIndex], isActive: false };
        state.words.splice(wordIndex, 1);
        state.inactiveWords.push(word);
      }
    },

    /**
     * ✅ Reactivate a Word (Move back to `words`)
     */
    reactivateWord: (state, action: PayloadAction<string>) => {
      const wordIndex = state.inactiveWords.findIndex((w) => w.id === action.payload);
      if (wordIndex !== -1) {
        const word = { ...state.inactiveWords[wordIndex], isActive: true };
        state.inactiveWords.splice(wordIndex, 1);
        state.words.push(word);
      }
    },
  },
});

// ✅ Export Actions
export const { setWordsFromStorage, addWord, deactivateWord, reactivateWord } = wordSlice.actions;

// ✅ Export Reducer
export default wordSlice.reducer;








