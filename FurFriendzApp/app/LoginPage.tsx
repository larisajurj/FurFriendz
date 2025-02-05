// app/auth.tsx
import React, {useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig';
import { useNavigation } from 'expo-router';
import { UserClient } from '@/api/clients/userClient';
import '@/api/model/userModel';
import { useUserContext } from '../config/UserContext';
import Toast from 'react-native-toast-message';

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

    const handleRegister = async (demoEmail = email, demoPassword = password) => {
      signInWithEmailAndPassword(auth_google, demoEmail, demoPassword)
        .then(async (userCredential) => {
          Toast.show({
            type: 'success',
            text1: 'Good to see you back 😽👋',
          });
          const userData = await getUserData(userCredential.user.email);
          setUser(userData);
          navigation.navigate('MapPage');
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Could not log you in',
            text2: error.message,
          });
        });
    };

    const handlePetOwnerDemo = () => {
      handleRegister("ericflaviu.florea@gmail.com", "24iunie");
    };

    const handlePetSitterDemo = () => {
      handleRegister("ericflorea.flaviu@gmail.com", "24iunie");
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
        <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* Demo Login Buttons */}
        <TouchableOpacity style={styles.button} onPress={handlePetOwnerDemo}>
          <Text style={styles.buttonText}>Login as Pet Owner Demo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePetSitterDemo}>
          <Text style={styles.buttonText}>Login as Pet Sitter Demo</Text>
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