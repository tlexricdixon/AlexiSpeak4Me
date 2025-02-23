import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CommunicationScreen from './src/screens/CommunicationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Communication"
          component={CommunicationScreen}
          options={{ title: 'Communication' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

