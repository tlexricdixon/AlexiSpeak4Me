import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'preferences',
  storage: AsyncStorage,
  whitelist: ['theme'], // ✅ Persist only theme setting
};

interface PreferencesState {
  theme: 'light' | 'dark';
}

const initialState: PreferencesState = {
  theme: 'light', // Default theme
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = preferencesSlice.actions;
export default persistReducer(persistConfig, preferencesSlice.reducer);

