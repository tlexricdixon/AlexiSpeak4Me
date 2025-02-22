import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setTheme } from '../store/preferencesSlice';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Provide default value to prevent `undefined` errors
  const theme = useSelector((state: RootState) => state.preferences?.theme || 'light');

  const handleThemeChange = (value: boolean) => {
    dispatch(setTheme(value ? 'dark' : 'light'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>

      {/* Theme Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={handleThemeChange}
        />
      </View>
    </View>
  );
};

// ✅ Ensure styles are properly defined
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  label: { fontSize: 18, marginRight: 10 },
});

export default SettingsScreen;






  
  
  

