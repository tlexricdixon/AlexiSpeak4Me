import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import wordReducer from './wordSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['words'], // Persist only words
};

const rootReducer = combineReducers({
  words: persistReducer(persistConfig, wordReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;



