import SQLite from 'react-native-sqlite-2';
import { SQLTransaction, SQLResultSet, SQLError } from 'react-native-sqlite-2';
import { CommunicationItem } from '../interfaces/CommunicationItem';

const db = SQLite.openDatabase(
  'words.db'
);

export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS words (
         id TEXT PRIMARY KEY,
         text TEXT NOT NULL,
         image TEXT NOT NULL,
         category TEXT NOT NULL,
         isFavorite INTEGER DEFAULT 0,
         isCustom INTEGER DEFAULT 0,
         isDefault INTEGER DEFAULT 0,
         isActive INTEGER DEFAULT 1
      );`,
      [],
      () => console.log('Words table created'),
      (error: any) => {
        console.error('Error creating words table:', error);
        return false;
      }
    );
  });
};


export const insertWord = (word: CommunicationItem) => {
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      `INSERT INTO words (id, text, image, category, isFavorite, isCustom, isDefault, isActive) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        word.id,
        word.text,
        word.image,
        word.category,
        word.isFavorite ? 1 : 0,
        word.isCustom ? 1 : 0,
        word.isDefault ? 1 : 0,
        word.isActive ? 1 : 0
      ],
      () => console.log('Word inserted successfully'),
      (error: any) => {
        console.error('Error inserting word:', error);
        return false;
      }
    );
  });
};

export const getWords = (callback: (words: any[]) => void) => {
  db.transaction((tx) => {
    interface WordRow {
      id: string;
      text: string;
      image: string;
      category: string;
      isFavorite: number;
      isCustom: number;
      isDefault: number;
      isActive: number;
    }

    tx.executeSql(
      'SELECT * FROM words WHERE isActive = 1;',
      [],
      (_, result: SQLResultSet) => {
        const rows: WordRow[] = [];
        for (let i = 0; i < result.rows.length; i++) {
          rows.push(result.rows.item(i) as WordRow);
        }
        callback(rows);
      },
      (error: any) => {
        console.error('Error fetching words:', error);
        return false;
      }
    );
  });
};

// import * as SQLite from 'react-native-sqlite-storage';
// import { CommunicationItem } from '../interfaces/CommunicationItem';
// import { defaultWords } from '../config/defaultData';

// /**
//  * ✅ Open the SQLite Database (Correct Method for Your Expo Version)
//  * - Uses `openDatabaseSync()` instead of `openDatabase()`.
//  */
// const dbPromise = SQLite.openDatabase({ name: 'communication.db' });

// /**
//  * 🟢 Ensure the Database Structure is Correct
//  * - Ensures `isActive` column exists for activation/deactivation.
//  */
// export const initializeDatabase = async () => {
//   try {
//     const db = await dbPromise;
//     //await db.executeSql(`drop table if exists words `); // ✅ Enable foreign keys
//   //   console.log('🟢 Initializing database...')  ;
//      // ✅ Insert default words if table is empty
    
//        console.log('⚠️ No words found. Inserting default words...');
//         await db.executeSql(
//           `CREATE TABLE IF NOT EXISTS words (
//             id TEXT PRIMARY KEY,
//             text TEXT NOT NULL,
//             image TEXT NOT NULL,
//             category TEXT NOT NULL,
//             isFavorite INTEGER DEFAULT 0,
//             isCustom INTEGER DEFAULT 0,
//             isDefault INTEGER DEFAULT 0,
//             isActive INTEGER DEFAULT 1,
//             orderIndex INTEGER DEFAULT 0,
//             lastUsed INTEGER,
//             accessibilityLabel TEXT
//           );`
//         );

//         console.log('🟢 Words table verified/created.');
//         const result = await db.executeSql(`SELECT COUNT(*) as count FROM words;`);
//         if (result[0].rows.item(0).count === 0) {
//       await insertDefaultWords();
//     } else {
//       console.log('✅ Words already exist, skipping default insertion.');
//     }
//   } catch (error) {
//      console.error('🔴 Error initializing database:', error);
//    }
// };

// /**
//  * 🟢 Inserts Default Words into Database
//  */
// export const insertDefaultWords = async () => {
//   try {
//     const db = await dbPromise;
//     await db.transaction(async (tx) => {
//       const insertValues = defaultWords.map((word) => [
//         word.id,
//         word.text,
//         word.image,
//         word.category,
//         word.isFavorite ? 1 : 0,
//         word.isCustom ? 1 : 0,
//         word.isDefault ? 1 : 0,
//         word.isActive ? 1 : 0,
//         word.order,
//         word.lastUsed ?? null,
//         word.accessibilityLabel
//       ]);

//       const placeholders = defaultWords.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');

//       const sql = `
//         INSERT INTO words (id, text, image, category, isFavorite, isCustom, isDefault, isActive, orderIndex, lastUsed, accessibilityLabel)
//         VALUES ${placeholders};
//       `;

//       await tx.executeSql(sql, insertValues.flat());
//     });
//     console.log('✅ Default words inserted with correct image names.');
//   } catch (error) {
//     console.error('🔴 Error inserting default words:', error);
//   }
// };

// /**
//  * 🟢 Fetches Words Based on Active Status
//  */
// export const getWordsFromDatabase = async (includeInactive = false): Promise<CommunicationItem[]> => {
//   const db = await dbPromise;
//   await db.executeSql(`drop table if exists words `);
//   try {
//     const [result] = await db.executeSql(
//       `SELECT * FROM words WHERE isActive IN (${includeInactive ? '0,1' : '1'});`
//     );

//     return result.rows.raw().map((row: any) => ({
//       id: `${row.id}`, // ✅ Ensure ID is a string
//       text: row.text,
//       image: `../../assets/images/${row.image}.png`, // ✅ Ensure correct file paths
//       category: row.category,
//       isFavorite: Boolean(row.isFavorite),
//       isCustom: Boolean(row.isCustom),
//       isDefault: Boolean(row.isDefault),
//       order: row.orderIndex,
//       lastUsed: row.lastUsed ? Number(row.lastUsed) : null,
//       accessibilityLabel: `Image of ${row.text}`,
//       isActive: Boolean(row.isActive),
//     }));
//   } catch (error) {
//     console.error('🔴 Error fetching words:', error);
//     return [];
//   }
// };


// export const getInactiveWordsFromDatabase = async (): Promise<CommunicationItem[]> => {
//   try {
//     const db = await dbPromise;
//     const [result] = await db.executeSql(`SELECT * FROM words WHERE isActive = 0;`);

//     return result.rows.raw().map((row: any) => ({
//       id: row.id,
//       text: row.text,
//       image: row.image,
//       category: row.category,
//       isFavorite: Boolean(row.isFavorite),
//       isCustom: Boolean(row.isCustom),
//       isDefault: Boolean(row.isDefault),
//       order: row.orderIndex,
//       lastUsed: row.lastUsed ? Number(row.lastUsed) : null,
//       accessibilityLabel: `Image of ${row.text}`,
//       isActive: false, // ✅ Explicitly mark as inactive
//     }));
//   } catch (error) {
//     console.error('🔴 Error fetching inactive words:', error);
//     return [];
//   }
// };


// /**
//  * 🟢 Inserts a New Word
//  */
// export const addWordToDatabase = async (word: CommunicationItem) => {
//   try {
//     const db = await dbPromise;
//     await db.executeSql(
//       `INSERT INTO words (id, text, image, category, isFavorite, isCustom, isDefault, isActive, orderIndex, lastUsed) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//       [
//         word.id,
//         word.text,
//         word.image,
//         word.category,
//         word.isFavorite ? 1 : 0,
//         word.isCustom ? 1 : 0,
//         word.isDefault ? 1 : 0,
//         word.isActive ? 1 : 0,
//         word.order,
//         word.lastUsed ?? null,
//         word.accessibilityLabel
//       ]
//     );
//     console.log(`✅ Word added: ${word.text}`);
//   } catch (error) {
//     console.error('🔴 Error inserting word:', error);
//   }
// };

// /**
//  * 🟢 Deactivates a Word (Soft Delete)
//  */
// export const deactivateWordInDatabase = async (id: string): Promise<void> => {
//   try {
//     const db = await dbPromise;
//     await db.executeSql(`UPDATE words SET isActive = 0 WHERE id = ?;`, [id]);
//     console.log(`✅ Word deactivated: ${id}`);
//   } catch (error) {
//     console.error('🔴 Error deactivating word:', error);
//   }
// };

// /**
//  * 🟢 Reactivates a Word
//  */
// export const reactivateWordInDatabase = async (id: string): Promise<void> => {
//   try {
//     const db = await dbPromise;
//     await db.executeSql(`UPDATE words SET isActive = 1 WHERE id = ?;`, [id]);
//     console.log(`✅ Word reactivated: ${id}`);
//   } catch (error) {
//     console.error('🔴 Error reactivating word:', error);
//   }
// };

// /**
//  * 🟢 Reset Words to Default Without Deleting Data
//  * - Default words (`isDefault = 1`) stay active (`isActive = 1`).
//  * - Caregiver-added words (`isDefault = 0`) are set to inactive (`isActive = 0`).
//  */
// export const resetWordsToDefault = async () => {
//   try {
//     const db = await dbPromise;
//       // ✅ Activate all default words
//       await db.executeSql(`UPDATE words SET isActive = 1 WHERE isDefault = 1;`);

//       // ✅ Deactivate all caregiver-added words
//       await db.executeSql(`UPDATE words SET isActive = 0 WHERE isDefault = 0;`);

//     console.log('✅ Reset complete: Defaults active, custom words inactive.');
//   } catch (error) {
//     console.error('🔴 Error resetting words:', error);
//   }
// };