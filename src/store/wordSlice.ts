import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store/store';
import { getWords } from '../database/database';

interface Word {
  id: string;
  text: string;
  image: string;
  category: string;
  isFavorite: boolean;
  isCustom: boolean;
  isDefault: boolean;
  isActive: boolean;
}

interface WordsState {
  words: Word[];
}

const initialState: WordsState = {
  words: [],
};

const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload;
    },
    addWord: (state, action: PayloadAction<Word>) => {
      state.words.push(action.payload);
    },
    deactivateWord: (state, action: PayloadAction<string>) => {
      const word = state.words.find((w) => w.id === action.payload);
      if (word) word.isActive = false;
    },
  },
});
export const syncDatabaseWithRedux = () => async (dispatch: AppDispatch) => {
  getWords((words) => {
    dispatch(setWords(words));
  });
};


export const { setWords, addWord, deactivateWord } = wordSlice.actions;
export default wordSlice.reducer;
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CommunicationItem } from '../interfaces/CommunicationItem';

// interface WordState {
//   activeWords: CommunicationItem[];
//   inactiveWords: CommunicationItem[];
// }

// const initialState: WordState = {
//   activeWords: [],
//   inactiveWords: [],
// };

// const wordSlice = createSlice({
//   name: 'words',
//   initialState,
//   reducers: {
//     setWordsFromStorage(state, action: PayloadAction<{ active: CommunicationItem[], inactive: CommunicationItem[] }>) {
//       state.activeWords = action.payload.active;
//       state.inactiveWords = action.payload.inactive;
//     },
//     addWord(state, action: PayloadAction<CommunicationItem>) {
//       state.activeWords.push(action.payload);
//     },
//     deactivateWord(state, action: PayloadAction<string>) {
//       const word = state.activeWords.find(word => word.id === action.payload);
//       if (word) {
//         word.isActive = false;
//         state.activeWords = state.activeWords.filter(word => word.id !== action.payload);
//         state.inactiveWords.push(word);
//       }
//     },
//     reactivateWord(state, action: PayloadAction<string>) {
//       const word = state.inactiveWords.find(word => word.id === action.payload);
//       if (word) {
//         word.isActive = true;
//         state.inactiveWords = state.inactiveWords.filter(word => word.id !== action.payload);
//         state.activeWords.push(word);
//       }
//     },
//   },
// });

// export const { setWordsFromStorage, addWord, deactivateWord, reactivateWord } = wordSlice.actions;
// export default wordSlice.reducer;