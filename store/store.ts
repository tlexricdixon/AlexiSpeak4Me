import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import preferencesReducer from './preferencesSlice';
import wordsReducer from './wordSlice'; // ✅ Import wordsSlice

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['preferences', 'words'], // ✅ Persist words & preferences
};

const rootReducer = combineReducers({
  preferences: persistReducer(persistConfig, preferencesReducer),
  words: persistReducer(persistConfig, wordsReducer), // ✅ Add wordsSlice to Redux store
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fix non-serializable warnings
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;







