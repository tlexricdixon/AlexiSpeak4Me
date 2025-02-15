import { AppDispatch } from '../../store/store';
import { addWord,  setWordsFromStorage } from '../../store/wordSlice';
import { CommunicationItem } from '../../interfaces/CommunicationItem';
import {
  addWordToDatabase,
  deactivateWordInDatabase,
  resetWordsToDefault,
  reactivateWordInDatabase,
  getWordsFromDatabase,
} from '../../database/database';

/**
 * ✅ Adds a new word to SQLite & Redux
 * - Prevents empty entries (no blank words/images).
 * - Saves persistently in SQLite.
 * - Allows **category selection** when adding a word.
 */
export const handleAddWord = async (
  newWord: string,
  imageUri: string | null,
  words: CommunicationItem[],
  dispatch: AppDispatch,
  setNewWord: (value: string) => void,
  setImageUri: (value: string | null) => void,
  category: string // ✅ Added category parameter
) => {
  if (!newWord.trim() || !imageUri) return; // 🛑 Prevent adding empty words

  // ✅ Create new word object
  const newWordItem: CommunicationItem = {
    id: Date.now().toString(), // ✅ Unique ID
    text: newWord,
    image: imageUri,
    category, // ✅ Assign selected category
    isFavorite: false,
    isCustom: true, // ✅ Marks it as caregiver-added
    isDefault: false, // ✅ Non-default word
    isActive: true, // ✅ New words are active by default
    order: words.length + 1, // ✅ Append to end of list
    lastUsed: null,
    accessibilityLabel: `Image of ${newWord}`,
  };

  try {
    await addWordToDatabase(newWordItem); // ✅ Save to SQLite
    dispatch(addWord(newWordItem)); // ✅ Update Redux store
    console.log(`✅ Word added: ${newWordItem.text}`);
  } catch (error) {
    console.error('🔴 Error adding word to SQLite:', error);
  }

  // ✅ Reset input fields
  setNewWord('');
  setImageUri(null);
};


/**
 * ✅ Deactivates a word in SQLite & updates Redux state.
 * - Ensures word disappears from active list immediately.
 */
export const handleDeactivateWord = async (id: string, dispatch: AppDispatch) => {
  try {
    await deactivateWordInDatabase(id); // ✅ Update SQLite

    // ✅ Fetch updated words (only active ones)
    const updatedWords = await getWordsFromDatabase();

    // ✅ Sync Redux with the latest words
    dispatch(setWordsFromStorage(updatedWords));

    console.log(`✅ Word deactivated and removed from active list: ${id}`);
  } catch (error) {
    console.error('🔴 Error deactivating word:', error);
  }
};

/**
 * ✅ Reactivates a word and updates the UI
 * - Updates `isActive = 1` in SQLite.
 * - Fetches all words again to refresh the UI.
 * - Ensures Redux reflects the latest word state.
 */
export const handleReactivateWord = async (id: string, dispatch: AppDispatch) => {
  try {
    // ✅ Reactivate the word in the database
    await reactivateWordInDatabase(id);

    // ✅ Fetch updated words list (active + inactive)
    const updatedWords = await getWordsFromDatabase();

    // ✅ Dispatch updated word list to Redux
    dispatch(setWordsFromStorage(updatedWords));

    console.log(`✅ Word reactivated and UI updated: ${id}`);
  } catch (error) {
    console.error('🔴 Error reactivating word and updating UI:', error);
  }
};

/**
 * ✅ Resets the Communication Screen to Default Words
 * - Deactivates caregiver words (`isActive = 0`).
 * - Reactivates default words (`isActive = 1`).
 * - Reloads words into Redux.
 */
export const handleResetWords = async (dispatch: AppDispatch) => {
  try {
    await resetWordsToDefault(); // ✅ Reset SQLite states

    // ✅ Fetch updated word list
    const updatedWords = await getWordsFromDatabase();

    // ✅ Dispatch new word list to Redux
    dispatch(setWordsFromStorage(updatedWords));

    console.log('✅ Communication screen reset to defaults.');
  } catch (error) {
    console.error('🔴 Error resetting words:', error);
  }
};
