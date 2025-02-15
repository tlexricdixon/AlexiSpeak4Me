import { AppDispatch } from '../../store/store';
import { getWordsFromDatabase } from '../../database/database';
import { setWordsFromStorage } from '../../store/wordSlice';

/**
 * 🟢 Syncs Active & Inactive Words from SQLite to Redux
 */
export const syncDatabaseWithRedux = async (dispatch: AppDispatch) => {
  try {
    const activeWords = await getWordsFromDatabase(false); // ✅ Fetch active words
    const inactiveWords = await getWordsFromDatabase(true); // ✅ Fetch inactive words

    dispatch(setWordsFromStorage({ active: activeWords, inactive: inactiveWords }));

    console.log('✅ Redux synced with SQLite.');
  } catch (error) {
    console.error('🔴 Error syncing words:', error);
  }
};
