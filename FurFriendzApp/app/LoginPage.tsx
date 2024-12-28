// app/auth.tsx
import React, { useState }  from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig';
import { useNavigation } from 'expo-router';

export default function AuthScreen() {
    const navigation = useNavigation();
    const auth_google = auth;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
      
      signInWithEmailAndPassword(auth_google, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Success', `User logged in: ${user.email}`);
          navigation.navigate('MapPage', {
             userEmail: `${user.email}`, // Replace with your parameter name and value
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert('Error', errorMessage);
        });
    };

    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.mainLogo} />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* <Text style={styles.orText}>Or register with</Text>

        <View style={styles.socialContainer}>
          <Button title="Google" onPress={() => Alert.alert('Google Sign-In')} color="#EA4335" />
        </View> */}
      </View>
    );
  }


const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#006c87',
    paddingTop: '20%',
    paddingHorizontal: 20,
    },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  mainLogo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  userTypeText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#8BAAB2',
    borderRadius: 10,
    marginVertical: 10,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#8BAAB2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  orText: {
    color: '#FFFFFF',
    marginVertical: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
});