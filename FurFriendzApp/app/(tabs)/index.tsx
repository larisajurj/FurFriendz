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
      <Button title="Login" onPress={() => navigation.navigate('auth')} />
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
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffdb58',
    padding: 10,
    borderRadius: 8,
    width: '45%',
  },
  buttonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffdb58',
    padding: 10,
    borderRadius: 8,
    width: '45%',
  },
  optionLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#25292e',
  },
  noteText: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center',
  },
});
