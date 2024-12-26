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

export default function AuthScreen() {
    const { userType } = useLocalSearchParams (); // Access parameters
    const auth_google = auth;
    const [step, setStep] = useState(1); // Tracks the current step
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [uid, setUid] = useState('');
    const [showSuccess, setShowSuccess] = useState(false); // Modal visibility state

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

    const registerUserInDatabase = async () => {
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
        const isSuccessful = true; // Simulate success response
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                    console.error("Response Data:", error.response.data);
                    console.error("Response Status:", error.response.status);
                    console.error("Response Headers:", error.response.headers);
                } else if (error.request) {
                    console.error("Request Details:", error.request);
                } else {
                    console.error("Error Message:", error.message);
                }

                // Additional debugging information
                console.error("Error Config:", error.config);
        }
        if (isSuccessful) {
              setShowSuccess(true); // Show success modal
              setTimeout(() => {
                router.push({
                  pathname: '/mapPage',
                  params: { username }, // Pass username to main page
                });
              }, 2000); // Redirect after 3 seconds
            } else {
              Alert.alert('Registration Failed', 'Please try again.');
            }
    }
    const handleRegister = () => {

      createUserWithEmailAndPassword(auth_google, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUid(user.uid);
          registerUserInDatabase();
          Alert.alert('Success', `User registered: ${user.email}`);
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert('Error', errorMessage);
        });
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
                <TouchableOpacity style={styles.buttonSmall} onPress={handlePreviousStep}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSmall} onPress={handleNextStep}>
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
                    <TouchableOpacity style={styles.buttonSmall} onPress={handlePreviousStep}>
                      <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSmall} onPress={handleRegister}>
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
