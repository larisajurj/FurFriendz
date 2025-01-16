// app/auth.tsx
import React, {useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig';
import { useNavigation } from 'expo-router';
import { UserClient } from '@/api/clients/userClient';
import '@/api/model/userModel';
import { UserContext, useUserContext } from '../config/UserContext';

export default function AuthScreen() {
    const navigation = useNavigation();
    const auth_google = auth;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUserContext();

    const getUserData = async (email: string) => {
       try {
           return await UserClient.getByEmailAsync(email);
       } catch (error) {
           console.error('Error fetching user data:', error);
           throw error; // Propagate the error
       }
    };

    const handleRegister = async () => {
      // signInWithEmailAndPassword(auth_google, email, password)

      //Uncomment for testing environment
       //signInWithEmailAndPassword(auth_google, "lari@gmail.com", "123456789")
      // signInWithEmailAndPassword(auth_google, "ericflaviu.florea@gmail.com", "24iunie")
      //signInWithEmailAndPassword(auth_google, "flaviu.florea@gmail.com", "24iunie")
      signInWithEmailAndPassword(auth_google, "marcela@email.com", "123456789")
      .then(async (userCredential) => {
          //Alert.alert('Success', `User logged in: ${user.email}`);
          Alert.alert('Success', `User logged in`);
          const userData = await getUserData(userCredential.user.email);
          setUser(userData);
          console.log("Current user is " + userData.email);
          navigation.navigate('MapPage');
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