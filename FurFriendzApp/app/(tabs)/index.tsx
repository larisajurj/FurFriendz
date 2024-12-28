import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <>
      {/* Set the StatusBar properties */}
      <StatusBar barStyle="light-content" backgroundColor="#006c87" />

      {/* Main Container */}
      <View style={styles.container}>
        {/* Main Logo */}
        <Image source={require('../../assets/logo.png')} style={styles.mainLogo} />

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity onPress={() => navigation.navigate('RegisterType')}>
          <Text style={styles.registerText}>Don’t have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#006c87',
    paddingTop: '45%',
    paddingHorizontal: 20,
  },
  mainLogo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  registerText: {
    marginTop: 10,
    color: '#ddd',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#8BAAB2',
    padding: 15,
    borderRadius: 10,
    marginTop: 0,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});