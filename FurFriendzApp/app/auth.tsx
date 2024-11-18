// app/auth.tsx
import React, { useState }  from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "firebaseConfig"

export default function AuthScreen() {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
      //const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Success', `User registered: ${user.email}`);
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert('Error', errorMessage);
        });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or register with</Text>

        <View style={styles.socialContainer}>
          <Button title="Google" onPress={() => Alert.alert('Google Sign-In')} color="#EA4335" />
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
