import React from 'react';
import { Text,  TouchableOpacity, StyleSheet } from 'react-native';
import {NavigationButtonProps} from '../../interfaces/CommunicationItem';
const NavigationButton: React.FC<NavigationButtonProps> = ({ text, color, onPress }) => {
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      width: '48%',
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: { color: '#FFF', fontSize: 16 },
  });
  
  export { NavigationButton };