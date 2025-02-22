import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface AddWordFormProps {
  newWord: string;
  setNewWord: React.Dispatch<React.SetStateAction<string>>;
}

const AddWordForm: React.FC<AddWordFormProps> = ({ newWord, setNewWord }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter Word"
        value={newWord}
        onChangeText={setNewWord}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 10, width: '100%' },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default AddWordForm;


