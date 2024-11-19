import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the top bar for all tabs
        tabBarActiveTintColor: '#ffd33d',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarStyle: { display: 'none' }, // Optionally hide the tab bar for the Home screen
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
