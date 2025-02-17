import * as SQLite from 'expo-sqlite';
import { CommunicationItem } from '../interfaces/CommunicationItem';

/**
 * ✅ Open the SQLite Database (Correct Method for Your Expo Version)
 * - Uses `openDatabaseSync()` instead of `openDatabase()`.
 */
const db = SQLite.openDatabaseSync('communication.db');

/**
 * 🟢 Ensure the Database Structure is Correct
 * - Ensures `isActive` column exists for activation/deactivation.
 */
export const initializeDatabase = async () => {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS words (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        isFavorite INTEGER DEFAULT 0,
        isCustom INTEGER DEFAULT 0,
        isDefault INTEGER DEFAULT 0,
        isActive INTEGER DEFAULT 1, -- ✅ Ensures words are active by default
        orderIndex INTEGER DEFAULT 0,
        lastUsed INTEGER
      );`
    );
    console.log('🟢 Words table verified/created.');
  } catch (error) {
    console.error('🔴 Error initializing database:', error);
  }
};

/**
 * 🟢 Fetches Words Based on Active Status
 */
export const getWordsFromDatabase = async (): Promise<CommunicationItem[]> => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM words WHERE isActive = 1;`);
    return result.map((row: any) => ({
      id: row.id,
      text: row.text,
      image: row.image, // ✅ Keep stored as filename or `file://` path
      category: row.category,
      isFavorite: Boolean(row.isFavorite),
      isCustom: Boolean(row.isCustom),
      isDefault: Boolean(row.isDefault),
      order: row.orderIndex,
      lastUsed: row.lastUsed ? Number(row.lastUsed) : null,
      accessibilityLabel: `Image of ${row.text}`,
      isActive: Boolean(row.isActive),
    }));
  } catch (error) {
    console.error('🔴 Error fetching words:', error);
    return [];
  }
};
export const getInactiveWordsFromDatabase = async (): Promise<CommunicationItem[]> => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM words WHERE isActive = 0;`);

    return result.map((row: any) => ({
      id: row.id,
      text: row.text,
      image: row.image,
      category: row.category,
      isFavorite: Boolean(row.isFavorite),
      isCustom: Boolean(row.isCustom),
      isDefault: Boolean(row.isDefault),
      order: row.orderIndex,
      lastUsed: row.lastUsed ? Number(row.lastUsed) : null,
      accessibilityLabel: `Image of ${row.text}`,
      isActive: false, // ✅ Explicitly mark as inactive
    }));
  } catch (error) {
    console.error('🔴 Error fetching inactive words:', error);
    return [];
  }
};


/**
 * 🟢 Inserts a New Word
 */
export const addWordToDatabase = async (word: CommunicationItem) => {
  try {
    await db.runAsync(
      `INSERT INTO words (id, text, image, category, isFavorite, isCustom, isDefault, isActive, orderIndex, lastUsed) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        word.id,
        word.text,
        word.image,
        word.category,
        word.isFavorite ? 1 : 0,
        word.isCustom ? 1 : 0,
        word.isDefault ? 1 : 0,
        word.isActive ? 1 : 0,
        word.order,
        word.lastUsed ?? null,
      ]
    );
    console.log(`✅ Word added: ${word.text}`);
  } catch (error) {
    console.error('🔴 Error inserting word:', error);
  }
};

/**
 * 🟢 Deactivates a Word (Soft Delete)
 */
export const deactivateWordInDatabase = async (id: string): Promise<void> => {
  try {
    await db.runAsync(`UPDATE words SET isActive = 0 WHERE id = ?;`, [id]);
    console.log(`✅ Word deactivated: ${id}`);
  } catch (error) {
    console.error('🔴 Error deactivating word:', error);
  }
};

/**
 * 🟢 Reactivates a Word
 */
export const reactivateWordInDatabase = async (id: string): Promise<void> => {
  try {
    await db.runAsync(`UPDATE words SET isActive = 1 WHERE id = ?;`, [id]);
    console.log(`✅ Word reactivated: ${id}`);
  } catch (error) {
    console.error('🔴 Error reactivating word:', error);
  }
};

/**
 * 🟢 Reset Words to Default Without Deleting Data
 * - Default words (`isDefault = 1`) stay active (`isActive = 1`).
 * - Caregiver-added words (`isDefault = 0`) are set to inactive (`isActive = 0`).
 */
export const resetWordsToDefault = async () => {
  try {
      // ✅ Activate all default words
      await db.execAsync(`UPDATE words SET isActive = 1 WHERE isDefault = 1;`);

      // ✅ Deactivate all caregiver-added words
      await db.execAsync(`UPDATE words SET isActive = 0 WHERE isDefault = 0;`);

    console.log('✅ Reset complete: Defaults active, custom words inactive.');
  } catch (error) {
    console.error('🔴 Error resetting words:', error);
  }
};


