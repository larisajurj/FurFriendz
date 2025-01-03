// app/auth.tsx
import React, { useState }  from 'react';
import { Modal,View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig';
import { UserClient } from '@/api/clients/userClient';
import '@/api/model/userModel';
import '@/api/model/userRole';
import { useLocalSearchParams  } from 'expo-router'
import { useUserContext } from '../config/UserContext';

export default function AuthScreen({route, navigation }) {
    const { userType } = route.params || {};
    const auth_google = auth;
    const [step, setStep] = useState(1); // Tracks the current step
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [showSuccess, setShowSuccess] = useState(false); // Modal visibility state
    const { setUser } = useUserContext();
    const [userCredential, setUserCredential] = useState(null);

    const getUserData = async (email: string) => {
           try {
               return await UserClient.getByEmailAsync(email);
           } catch (error) {
               console.error('Error fetching user data:', error);
               throw error; // Propagate the error
           }
        };

    const handleNextStep = () => {
        if (step < 3) {
          setStep(step + 1);
        }
      };

      const handlePreviousStep = () => {
        if (step > 1) {
          setStep(step - 1);
        }
      };

    const registerUserInDatabase = async (uid: string) => {
    console.log("trying to register user in db");
        try{
            const model: createUserModel = {
              lastName: lastName,
              firstName: firstName,
              username: username,
              email: email,
              role: 0
            }
            if(userType == "owner")
                await UserClient.createPetOwnerAsync(model);
            else
                await UserClient.createPetSitterAsync(model);
            console.log("created " + userType);
            Alert.alert('Success', `User registered: ${email}`);
            navigation.navigate('LoginPage');
        } catch (error: any) {
            if (error.response) {
                  console.error("Server responded with an error:");
                  console.error(`Status: ${error.response.status}`);
                  console.error(`Headers:`, error.response.headers);
                  console.error(`Data:`, error.response.data);
                } else if (error.request) {
                  console.error("No response received:");
                  console.error(`Request:`, error.request);
                } else {
                  console.error("Error setting up the request:");
                  console.error(`Message: ${error.message}`);
                }

                console.error("Error config:", error.config);
            throw error;
        }

    }
    const handleRegister = async () => {
    console.log(userType);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth_google, email, password);
            await registerUserInDatabase(userCredential.user.uid); //with uid
            Alert.alert('Successful', `Registered user : ${email}`);
            navigation.navigate("LoginPage");
        }catch (error: any) {
            console.log(error);
            userCredential.delete();
            Alert.alert('Error', `Could not register user : ${email}`);
        }
    };

    return (
        <View style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.mainLogo} />
          {step === 1 && (
            <>
              <Text style={styles.title}>Register</Text>
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
                  placeholder="Username"
                  placeholderTextColor="#FFFFFF"
                  value={username}
                  onChangeText={setUsername}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

              <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.title}>Tell Us About Yourself</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#FFFFFF"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#FFFFFF"
                value={lastName}
                onChangeText={setLastName}
              />
              <View style={styles.navigationButtons}>
                <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <Text style={styles.title}>One last step..</Text>
               <Text style={styles.title}>Set a strong password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />

                  <View style={styles.navigationButtons}>
                    <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                      <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                      <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                  </View>
            </>
          )}
          <Modal visible={showSuccess} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Registration Successful!</Text>
                  <Text style={styles.modalText}>Welcome, {username}!</Text>
                </View>
              </View>
          </Modal>
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
    color: '#fff',
    marginBottom: 20,
  },
  mainLogo: {
    width: 250,
    height: 250,
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
    backgroundColor: '#8BAAB2',
    borderRadius: 10,
    marginVertical: 10,
    color: '#fff',
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
