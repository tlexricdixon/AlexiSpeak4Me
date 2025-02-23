import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommunicationItem } from '../interfaces/CommunicationItem';
import { defaultWords } from '../config/defaultData';

const STORAGE_KEY = 'caregiverWords';

// Load caregiver-modified words from storage
export const loadCaregiverWords = async (): Promise<CommunicationItem[]> => {
  try {
    const storedWords = await AsyncStorage.getItem(STORAGE_KEY);
    return storedWords ? JSON.parse(storedWords) : defaultWords;
  } catch (error) {
    console.error('Failed to load caregiver words:', error);
    return defaultWords;
  }
};

// Save caregiver-modified words
export const saveCaregiverWords = async (words: CommunicationItem[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  } catch (error) {
    console.error('Failed to save caregiver words:', error);
  }
};

// Reset to default words
export const resetCaregiverWords = async () => {
  await saveCaregiverWords(defaultWords);
};
