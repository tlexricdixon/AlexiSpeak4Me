import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import CommunicationScreen from '../screens/CommunicationScreen';
import CaregiverScreen from '../screens/CaregiverScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="Communicate" 
        component={CommunicationScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="Caregiver" 
        component={CaregiverScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
