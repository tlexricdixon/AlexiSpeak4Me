import React from 'react';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/preferencesSlice';
import { RootState, AppDispatch } from '../store/store';
import { themes } from '../store/theme';

const ThemeToggleButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.preferences.theme);
  const currentTheme = themes[theme];

  return (
    <Button 
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      color={currentTheme.button}
      onPress={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))} 
    />
  );
};

export default ThemeToggleButton;
