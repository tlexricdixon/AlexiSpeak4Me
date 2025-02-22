import { AppDispatch } from '../../store/store';
import { getWordsFromDatabase } from '../../database/database';
import { setWordsFromStorage } from '../../store/wordSlice';

/**
 * 🟢 Syncs Words from SQLite to Redux
 */
export const syncDatabaseWithRedux = async (dispatch: AppDispatch) => {
  try {
    const activeWords = await getWordsFromDatabase(false); // ✅ Fetch only active words
    const inactiveWords = await getWordsFromDatabase(true); // ✅ Fetch all words (active + inactive)

    dispatch(setWordsFromStorage([...activeWords, ...inactiveWords])); // ✅ Flatten to a single array
    console.log('✅ Redux synced with SQLite.');
  } catch (error) {
    console.error('🔴 Error syncing words:', error);
    dispatch(setWordsFromStorage([])); // ✅ Prevents Redux crash
  }
};


