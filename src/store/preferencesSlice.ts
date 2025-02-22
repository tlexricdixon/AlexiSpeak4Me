import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  theme: 'light' | 'dark';
  language: 'en' | 'es';
}

const initialState: PreferencesState = {
  theme: 'light', // ✅ Default to 'light'
  language: 'en',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'es'>) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = preferencesSlice.actions;
export default preferencesSlice.reducer;


