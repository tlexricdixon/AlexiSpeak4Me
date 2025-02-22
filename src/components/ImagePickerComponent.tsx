import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// 🔹 Props interface to handle the selected image URI
interface ImagePickerProps {
  onImageSelected: (uri: string) => void; // Function to pass the selected image URI to the parent
}

/**
 * ImagePickerComponent
 * A reusable component that allows the user to pick an image from the gallery.
 * - Uses Expo ImagePicker to open the device's image library.
 * - Supports image preview after selection.
 * - Passes the selected image URI back to the parent component via `onImageSelected`.
 */
const ImagePickerComponent: React.FC<ImagePickerProps> = ({ onImageSelected }) => {
  // 🔹 Local state to store the selected image URI
  const [imageUri, setImageUri] = useState<string | null>(null);

  /**
   * pickImage()
   * Opens the device's image library and lets the user pick an image.
   * - If an image is selected, it updates local state (`imageUri`) and notifies the parent (`onImageSelected`).
   * - Uses `try/catch` to handle potential errors.
   */
  const pickImage = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow image selection
        allowsEditing: true, // Allow minor editing (cropping, etc.)
        quality: 1, // Highest image quality
      });

      // ✅ If the user selects an image and doesn't cancel
      if (!canceled && assets?.length) {
        const selectedUri = assets[0].uri; // Extract the selected image URI
        setImageUri(selectedUri); // Update local state for preview
        onImageSelected(selectedUri); // Pass URI back to parent
      }
    } catch (error) {
      console.error("Image selection failed:", error); // Log error if something goes wrong
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to open the image picker */}
      <Button title="Pick Image" onPress={pickImage} />

      {/* Preview the selected image if available */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
    </View>
  );
};

// 🔹 Styles for the component
const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 10 }, // Center the content
  previewImage: { width: 100, height: 100, marginTop: 10, borderRadius: 10 }, // Image preview styling
});

export default ImagePickerComponent;


