// app/auth.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function AuthScreen() {
  const { userType } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login or Register</Text>
      {userType && <Text style={styles.userTypeText}>Registering as: {userType}</Text>}
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ccc" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#ccc" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or login with</Text>

      <View style={styles.socialContainer}>
        <Button title="Google" onPress={() => {}} color="#EA4335" />
        {/* <Button title="Microsoft" onPress={() => {}} color="#0078D4" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f4c75',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  userTypeText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#3282b8',
    borderRadius: 10,
    marginVertical: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#3282b8',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  orText: {
    color: '#bbb',
    marginVertical: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
});
