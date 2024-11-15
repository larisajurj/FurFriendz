// components/dock.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Dock() {
  const router = useRouter();

  return (
    <View style={styles.dock}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/index')} style={styles.iconContainer}>
        <Ionicons name="home-outline" size={24} color="#ffd33d" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(tabs)/search')} style={styles.iconContainer}>
        <Ionicons name="search-outline" size={24} color="#ffd33d" />
        <Text style={styles.label}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(tabs)/about')} style={styles.iconContainer}>
        <Ionicons name="information-circle-outline" size={24} color="#ffd33d" />
        <Text style={styles.label}>About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#25292e',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  iconContainer: {
    alignItems: 'center',
  },
  label: {
    color: '#ffd33d',
    fontSize: 12,
  },
});
