import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import MenuListScreen from '../screens/MenuListScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#FFF8F0', // couleur claire comme la home
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        },
        headerTintColor: '#B83227', // couleur accent
        headerTitleStyle: { 
          fontWeight: '800',
          fontSize: 18,
        },
        tabBarActiveTintColor: '#B83227', // accent couleur
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 5,
          height: 70,
          backgroundColor: '#FFE5B4', // couleur claire
          borderTopWidth: 2,
          borderTopColor: '#B83227',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="AddMenu" 
        component={AddItemScreen} 
        options={{ 
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="My Menu" 
        component={MenuListScreen} 
        options={{ 
          tabBarLabel: 'My Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-circle-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

