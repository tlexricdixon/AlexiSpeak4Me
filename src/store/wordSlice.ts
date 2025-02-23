import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunicationItem } from '../interfaces/CommunicationItem';

interface WordState {
  activeWords: CommunicationItem[];
  inactiveWords: CommunicationItem[];
}

const initialState: WordState = {
  activeWords: [],
  inactiveWords: [],
};

const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWordsFromStorage(state, action: PayloadAction<{ active: CommunicationItem[], inactive: CommunicationItem[] }>) {
      state.activeWords = action.payload.active;
      state.inactiveWords = action.payload.inactive;
    },
    addWord(state, action: PayloadAction<CommunicationItem>) {
      state.activeWords.push(action.payload);
    },
    deactivateWord(state, action: PayloadAction<string>) {
      const word = state.activeWords.find(word => word.id === action.payload);
      if (word) {
        word.isActive = false;
        state.activeWords = state.activeWords.filter(word => word.id !== action.payload);
        state.inactiveWords.push(word);
      }
    },
    reactivateWord(state, action: PayloadAction<string>) {
      const word = state.inactiveWords.find(word => word.id === action.payload);
      if (word) {
        word.isActive = true;
        state.inactiveWords = state.inactiveWords.filter(word => word.id !== action.payload);
        state.activeWords.push(word);
      }
    },
  },
});

export const { setWordsFromStorage, addWord, deactivateWord, reactivateWord } = wordSlice.actions;
export default wordSlice.reducer;








