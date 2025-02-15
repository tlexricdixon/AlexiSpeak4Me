import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createExpoFileSystemStorage from 'redux-persist-expo-filesystem'; // ✅ New storage for preferences
import preferencesReducer from './preferencesSlice';
import wordsReducer, { setWordsFromStorage } from './wordSlice';
import { getWordsFromDatabase } from '../database/database'; // ✅ Import SQLite function

// 🔹 Persist configuration for preferences only (using FileSystem)
const persistConfig = {
  key: 'preferences',
  storage: createExpoFileSystemStorage, // ✅ Replaces AsyncStorage
  whitelist: ['preferences'], // ✅ Only persist preferences (not words)
};

// 🔹 Combine reducers (Words are NOT persisted, loaded from SQLite)
const rootReducer = combineReducers({
  preferences: persistReducer(persistConfig, preferencesReducer), // ✅ Persist Preferences Only
  words: wordsReducer, // ❌ No persistence (handled by SQLite)
});

// ✅ Configure Redux Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Prevents serialization warnings
    }),
});

// ✅ Persistor for Redux-Persist (Preferences Only)
export const persistor = persistStore(store);

/**
 * ✅ Load Words from SQLite into Redux Store
 * - Fetches stored words from SQLite.
 * - Dispatches `setWordsFromStorage()` to update Redux.
 */
const loadWordsIntoStore = async () => {
  try {
    const storedWords = await getWordsFromDatabase(); // ✅ Fetch words from SQLite
    store.dispatch(setWordsFromStorage({ active: storedWords, inactive: [] })); // ✅ Sync with Redux
  } catch (error) {
    console.error('🔴 Failed to load words into Redux:', error);
  }
};

// ✅ Load words from SQLite on startup
loadWordsIntoStore();

// 🔹 Type Definitions for Redux Usage
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;











