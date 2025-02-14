import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addWord, removeWord, selectWords, resetWords } from '../../components/wordSlice';
import * as ImagePicker from 'expo-image-picker';

export default function CaregiverSettings() {
  const words = useSelector(selectWords);
  const dispatch = useDispatch();
  const [newWord, setNewWord] = useState('');
  const [image, setImage] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImage(result.uri);
  };

  return (
    <View>
      <Text>Add a Word</Text>
      <TextInput placeholder="Word" value={newWord} onChangeText={setNewWord} />
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      <Button title="Add Word" onPress={() => dispatch(addWord({ id: Date.now().toString(), text: newWord, image }))} />
      <Button title="Reset Words" onPress={() => dispatch(resetWords())} />
    </View>
  );
}





  
  
  

