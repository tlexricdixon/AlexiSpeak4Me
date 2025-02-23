import { AppDispatch } from '../store/store';
import { setWordsFromStorage } from '../store/wordSlice';
import { initializeDatabase, getWordsFromDatabase } from '../database/database';

/**
 * ✅ Initializes the SQLite Database & Loads Words
 * - Ensures database setup.
 * - Fetches words from SQLite.
 * - Updates Redux store with loaded words.
 */
export const setupDatabaseAndLoadWords = async (dispatch: AppDispatch) => {
  try {
    initializeDatabase(); // ✅ Ensure database is set up
    const storedWords = await getWordsFromDatabase(); // ✅ Fetch stored words
    dispatch(setWordsFromStorage({ active: storedWords, inactive: [] })); // ✅ Sync with Redux
  } catch (error) {
    console.error('🔴 Error initializing database:', error);
  }
};
