// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Main Logo */}
      <Image source={require('../../assets/logo.png')} style={styles.mainLogo} />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('loginPage')}>
          <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('registerType')}>
        <Text style={styles.registerText}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a7ca5',
    paddingHorizontal: 20,
  },
  mainLogo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  registerText: {
    marginTop: 10,
    color: '#ddd',
    fontSize: 14,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#8BAAB2',
    padding: 15,
    borderRadius: 10,
    marginTop: 0,
    width: '40%',
    alignItems: 'center',
  },
  optionLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  noteText: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center',
  },
});
