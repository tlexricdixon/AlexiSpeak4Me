import { AppDispatch } from '../store/store';
import {
  getWordsFromDatabase,
  addWordToDatabase,
  deactivateWordInDatabase,
  reactivateWordInDatabase,
} from '../database/database';
import { setWordsFromStorage, addWord, deactivateWord, reactivateWord } from '../store/wordSlice';
import { CommunicationItem } from '../interfaces/CommunicationItem';

/**
 * 🟢 Syncs All Words to Redux (Active + Inactive)
 */
export const syncDatabaseWithRedux = async (dispatch: AppDispatch) => {
  try {
    const words = await getWordsFromDatabase(true);
    const activeWords = words.filter(word => word.isActive);
    const inactiveWords = words.filter(word => !word.isActive);
    dispatch(setWordsFromStorage({ active: activeWords, inactive: inactiveWords }));
    console.log('✅ Redux synced with SQLite.');
  } catch (error) {
    console.error('🔴 Error syncing words:', error);
  }
};

/**
 * 🟢 Add a Word (Database + Redux)
 */
export const addWordDBAndRedux = async (word: CommunicationItem, dispatch: AppDispatch) => {
  try {
    await addWordToDatabase(word);
    dispatch(addWord(word)); // ✅ No need to re-fetch all words
    console.log(`✅ Word added: ${word.text}`);
  } catch (error) {
    console.error('🔴 Error adding word:', error);
  }
};

/**
 * 🟢 Deactivate a Word (Database + Redux)
 */
export const deactivateWordDBAndRedux = async (id: string, dispatch: AppDispatch) => {
  try {
    await deactivateWordInDatabase(id);
    dispatch(deactivateWord(id)); // ✅ Only update this word in Redux
    console.log(`✅ Word deactivated: ${id}`);
  } catch (error) {
    console.error('🔴 Error deactivating word:', error);
  }
};

/**
 * 🟢 Reactivate a Word (Database + Redux)
 */
export const reactivateWordDBAndRedux = async (id: string, dispatch: AppDispatch) => {
  try {
    await reactivateWordInDatabase(id);
    dispatch(reactivateWord(id)); // ✅ Only update this word in Redux
    console.log(`✅ Word reactivated: ${id}`);
  } catch (error) {
    console.error('🔴 Error reactivating word:', error);
  }
};

