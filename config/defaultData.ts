import { CommunicationItem } from '../interfaces/CommunicationItem';

/**
 * 🔹 Default word list (modifiable via caregiver mode)
 * - Ensures each word is assigned the correct category.
 */

export const defaultWords: CommunicationItem[] = [
  // ✅ Basic Needs
  { id: '1', text: 'Eat', image: require('../assets/images/eat.png'), category: 'Basic Needs', isFavorite: false, isCustom: false, order: 1, lastUsed: null, accessibilityLabel: 'Eat', isDefault: true, isActive: true },
  { id: '2', text: 'Drink', image: require('../assets/images/drink.png'), category: 'Basic Needs', isFavorite: false, isCustom: false, order: 2, lastUsed: null, accessibilityLabel: 'Drink', isDefault: true, isActive: true },
  { id: '3', text: 'Restroom', image: require('../assets/images/restroom.png'), category: 'Basic Needs', isFavorite: false, isCustom: false, order: 3, lastUsed: null, accessibilityLabel: 'Restroom', isDefault: true, isActive: true},

  // ✅ Feelings
  { id: '4', text: 'Happy', image: require('../assets/images/happy.png'), category: 'Feelings', isFavorite: false, isCustom: false, order: 4, lastUsed: null, accessibilityLabel: 'Happy', isDefault: true, isActive: true },
  { id: '5', text: 'Sad', image: require('../assets/images/sad.png'), category: 'Feelings', isFavorite: false, isCustom: false, order: 5, lastUsed: null, accessibilityLabel: 'Sad', isDefault: true, isActive: true },
  { id: '6', text: 'Angry', image: require('../assets/images/angry.png'), category: 'Feelings', isFavorite: false, isCustom: false, order: 6, lastUsed: null, accessibilityLabel: 'Angry', isDefault: true, isActive: true},

  // ✅ Responses
  { id: '7', text: 'Yes', image: require('../assets/images/yes.png'), category: 'Responses', isFavorite: false, isCustom: false, order: 7, lastUsed: null, accessibilityLabel: 'Yes', isDefault: true, isActive: true },
  { id: '8', text: 'No', image: require('../assets/images/no.png'), category: 'Responses', isFavorite: false, isCustom: false, order: 8, lastUsed: null, accessibilityLabel: 'No', isDefault: true, isActive: true },
  { id: '9', text: 'Help', image: require('../assets/images/help.png'), category: 'Responses', isFavorite: false, isCustom: false, order: 9, lastUsed: null, accessibilityLabel: 'Help', isDefault: true, isActive: true },

  // ✅ People
  { id: '10', text: 'Mom', image: require('../assets/images/dad.png'), category: 'People', isFavorite: false, isCustom: false, order: 10, lastUsed: null, accessibilityLabel: 'Mom', isDefault: true, isActive: true },
  { id: '11', text: 'Dad', image: require('../assets/images/teacher.png'), category: 'People', isFavorite: false, isCustom: false, order: 11, lastUsed: null, accessibilityLabel: 'Dad', isDefault: true, isActive: true },
  { id: '12', text: 'Teacher', image: require('../assets/images/grandma.jpg'), category: 'People', isFavorite: false, isCustom: false, order: 12, lastUsed: null, accessibilityLabel: 'Teacher', isDefault: true, isActive: true },

  // ✅ Places
  { id: '13', text: 'Home', image: require('../assets/images/home.png'), category: 'Places', isFavorite: false, isCustom: false, order: 13, lastUsed: null, accessibilityLabel: 'Home', isDefault: true, isActive: true },
  { id: '14', text: 'School', image: require('../assets/images/school.jpg'), category: 'Places', isFavorite: false, isCustom: false, order: 14, lastUsed: null, accessibilityLabel: 'School', isDefault: true, isActive: true },
  { id: '15', text: 'Park', image: require('../assets/images/park.png'), category: 'Places', isFavorite: false, isCustom: false, order: 15, lastUsed: null, accessibilityLabel: 'Park', isDefault: true, isActive: true },
];

