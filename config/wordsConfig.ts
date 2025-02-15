export interface CommunicationItem {
  id: string;
  text: string;
  image: any; // Can be a require() object or a string URI
}

/**
 * 🟢 Default word list (modifiable via caregiver mode)
 * - Stores image paths using `require()`
 */
export const defaultWords: CommunicationItem[] = [
  { id: '1', text: 'Eat', image: require('../assets/images/eat.png') },
  { id: '2', text: 'Drink', image: require('../assets/images/drink.png') },
  { id: '3', text: 'Restroom', image: require('../assets/images/restroom.png') },
  { id: '4', text: 'Happy', image: require('../assets/images/happy.png') },
  { id: '5', text: 'Sad', image: require('../assets/images/sad.png') },
  { id: '6', text: 'Angry', image: require('../assets/images/angry.png') },
  { id: '7', text: 'Yes', image: require('../assets/images/yes.png') },
  { id: '8', text: 'No', image: require('../assets/images/no.png') },
  { id: '9', text: 'Help', image: require('../assets/images/help.png') },
];

/**
 * 🔹 Convert words to a **serializable format** for AsyncStorage.
 * - `require()` cannot be stored in AsyncStorage, so convert to string paths.
 */
export const serializeWordsForStorage = (words: CommunicationItem[]): CommunicationItem[] => {
  return words.map(({ id, text, image }) => ({
    id,
    text,
    image: typeof image === 'number' ? image : image.uri, // Convert `require()` paths to strings
  }));
};

/**
 * 🔹 Convert stored words back into `require()` paths for images.
 * - If an image is a string, assume it's a user-uploaded file and keep it as is.
 * - If an image is a number (meaning `require()`), keep it unchanged.
 */
export const deserializeWordsFromStorage = (storedWords: CommunicationItem[]): CommunicationItem[] => {
  return storedWords.map(({ id, text, image }) => ({
    id,
    text,
    image: typeof image === 'string' ? { uri: image } : image, // Convert string URIs to `{ uri }` for user images
  }));
};
