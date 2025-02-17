import { ImageSourcePropType } from 'react-native';

/**
 * ✅ Resolves an image path from the database
 * - Local assets use a predefined map (`imageAssets`).
 * - File/URL images use `{ uri: path }`.
 * - A fallback image is returned if no valid path exists.
 */
export const resolveImagePath = (imagePath: string): ImageSourcePropType => {
  if (!imagePath) {
    return require('../../assets/images/default.jpg'); // ✅ Fallback image
  }

  // ✅ Handle local asset images (stored as filenames in DB)
  const imageAssets: { [key: string]: ImageSourcePropType } = {
    'eat.png': require('../../assets/images/eat.png'),
    'drink.png': require('../../assets/images/drink.png'),
    'restroom.png': require('../../assets/images/restroom.png'),
    'happy.png': require('../../assets/images/happy.png'),
    'sad.png': require('../../assets/images/sad.png'),
    'angry.png': require('../../assets/images/angry.png'),
    'yes.png': require('../../assets/images/yes.png'),
    'no.png': require('../../assets/images/no.png'),
    'help.png': require('../../assets/images/help.png'),
    'grandma.jpg': require('../../assets/images/grandma.jpg'),
    'dad.png': require('../../assets/images/dad.png'),
    'teacher.png': require('../../assets/images/teacher.png'),
    'home.png': require('../../assets/images/home.png'),
    'school.jpg': require('../../assets/images/school.jpg'),
    'park.png': require('../../assets/images/park.png'),
  };

  if (imageAssets[imagePath]) {
    return imageAssets[imagePath]; // ✅ Return static local asset
  }

    // ✅ Use local static images if applicable
  // ✅ Handle external images (file:// or http://)
  if (imagePath.startsWith('file://') || imagePath.startsWith('http')) {
    return { uri: imagePath };
  }

  console.warn(`⚠️ Warning: Image path not found: ${imagePath}, using placeholder.`);
  return require('../../assets/images/default.jpg'); // ✅ Default fallback
};

