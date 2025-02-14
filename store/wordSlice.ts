import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Define a TypeScript interface for a communication word
export interface CommunicationItem {
  id: string;
  text: string;
  image: any; // Can be a local require() or a URI from caregiver uploads
}

// Default words (Will be customizable in Caregiver Mode)
const initialState: { words: CommunicationItem[] } = {
  words: [
    { id: '1', text: 'Eat', image: require('../assets/images/eat.png') },
    { id: '2', text: 'Drink', image: require('../assets/images/drink.png') },
    { id: '3', text: 'Restroom', image: require('../assets/images/restroom.png') },
    { id: '4', text: 'Happy', image: require('../assets/images/happy.png') },
    { id: '5', text: 'Sad', image: require('../assets/images/sad.png') },
    { id: '6', text: 'Angry', image: require('../assets/images/angry.png') },
    { id: '7', text: 'Yes', image: require('../assets/images/yes.png') },
    { id: '8', text: 'No', image: require('../assets/images/no.png') },
    { id: '9', text: 'Help', image: require('../assets/images/help.png') },
  ],
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<CommunicationItem>) => {
      state.words.push(action.payload);
    },
    removeWord: (state, action: PayloadAction<string>) => {
      state.words = state.words.filter((word) => word.id !== action.payload);
    },
    updateWord: (state, action: PayloadAction<CommunicationItem>) => {
      const index = state.words.findIndex((word) => word.id === action.payload.id);
      if (index !== -1) state.words[index] = action.payload;
    },
  },
});

export const { addWord, removeWord, updateWord } = wordsSlice.actions;
export default wordsSlice.reducer;
