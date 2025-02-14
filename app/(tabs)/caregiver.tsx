import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setTheme } from '../../store/preferencesSlice';
import { themes } from '../../store/theme';

const CaregiverScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.preferences.theme);
  const currentTheme = themes[theme];

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.header, { color: currentTheme.text }]}>Caregiver Mode</Text>
      
      <Button 
        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        color={currentTheme.button}
        onPress={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default CaregiverScreen;
