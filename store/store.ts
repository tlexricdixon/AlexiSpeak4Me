import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import preferencesReducer from './preferencesSlice';
import wordsReducer from './wordSlice'; // ✅ Import wordsSlice
import { loadCaregiverWords } from '../config/caregiverConfig';
import { defaultWords } from '../config/wordsConfig';

// ✅ Persist configuration for AsyncStorage
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['preferences', 'words'], // ✅ Persist words & preferences
};

// ✅ Root reducer with persisted reducers
const rootReducer = combineReducers({
  preferences: persistReducer(persistConfig, preferencesReducer),
  words: persistReducer(persistConfig, wordsReducer), // ✅ Add wordsSlice to Redux store
});

// ✅ Configure Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fix non-serializable warnings
    }),
});

// ✅ Persistor to persist Redux state
export const persistor = persistStore(store);

// ✅ Redux Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

/**
 * 🔹 Load initial words into Redux from `wordConfig.ts`
 * - **Ensures words are preloaded when app starts**
 */
loadCaregiverWords().then((storedWords) => {
  store.dispatch({
    type: 'words/loadWords',
    payload: storedWords || defaultWords, // ✅ Fallback to default words if storage is empty
  });
});








