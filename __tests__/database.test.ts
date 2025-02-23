import * as SQLite from 'react-native-sqlite-storage';
import { initializeDatabase, insertDefaultWords, getWordsFromDatabase, addWordToDatabase, deactivateWordInDatabase, reactivateWordInDatabase, resetWordsToDefault } from '../src/database/database';
import { defaultWords } from '../src/config/defaultData';
import { CommunicationItem } from '../src/interfaces/CommunicationItem';

jest.mock('react-native-sqlite-storage');

const mockExecuteSql = jest.fn();
const mockTransaction = jest.fn((callback) => callback({ executeSql: mockExecuteSql }));

(SQLite.openDatabase as jest.Mock).mockReturnValue({
  transaction: mockTransaction,
  executeSql: mockExecuteSql,
});

describe('Database functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializeDatabase creates table and inserts default words if table is empty', async () => {
    mockExecuteSql.mockResolvedValueOnce([{ rows: { item: () => ({ count: 0 }) } }]);
    await initializeDatabase();
    expect(mockExecuteSql).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS words'));
    expect(mockExecuteSql).toHaveBeenCalledWith(expect.stringContaining('SELECT COUNT(*) as count FROM words;'));
    expect(mockTransaction).toHaveBeenCalled();
  });

  test('insertDefaultWords inserts default words into the database', async () => {
    await insertDefaultWords();
    expect(mockTransaction).toHaveBeenCalled();
    expect(mockExecuteSql).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO words'), expect.any(Array));
  });

  test('getWordsFromDatabase fetches active words from the database', async () => {
    mockExecuteSql.mockResolvedValueOnce([{ rows: { raw: () => defaultWords } }]);
    const words = await getWordsFromDatabase();
    expect(mockExecuteSql).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM words WHERE isActive IN (1);'));
    expect(words).toEqual(defaultWords);
  });

  test('addWordToDatabase inserts a new word into the database', async () => {
    const newWord: CommunicationItem = {
      id: 'new-word',
      text: 'New Word',
      image: 'new-image',
      category: 'new-category',
      isFavorite: false,
      isCustom: true,
      isDefault: false,
      isActive: true,
      order: 1,
      lastUsed: null,
      accessibilityLabel: 'New Word Image'
    };
    await addWordToDatabase(newWord);
    expect(mockExecuteSql).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO words'), expect.any(Array));
  });

  test('deactivateWordInDatabase sets isActive to 0 for the given word id', async () => {
    const wordId = 'word-id';
    await deactivateWordInDatabase(wordId);
    expect(mockExecuteSql).toHaveBeenCalledWith('UPDATE words SET isActive = 0 WHERE id = ?;', [wordId]);
  });

  test('reactivateWordInDatabase sets isActive to 1 for the given word id', async () => {
    const wordId = 'word-id';
    await reactivateWordInDatabase(wordId);
    expect(mockExecuteSql).toHaveBeenCalledWith('UPDATE words SET isActive = 1 WHERE id = ?;', [wordId]);
  });

  test('resetWordsToDefault activates default words and deactivates custom words', async () => {
    await resetWordsToDefault();
    expect(mockExecuteSql).toHaveBeenCalledWith('UPDATE words SET isActive = 1 WHERE isDefault = 1;');
    expect(mockExecuteSql).toHaveBeenCalledWith('UPDATE words SET isActive = 0 WHERE isDefault = 0;');
  });
});