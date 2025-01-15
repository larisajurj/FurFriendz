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
import { useImagePicker } from './components/useImagePicker';
import { ScrollView } from 'react-native-gesture-handler';
import GOOGLE_API_KEY from '@/config/googleMapApiKey';


export default function AuthScreen({route, navigation }) {
    const { userType } = route.params || {};
    const auth_google = auth;
    const { pickImage } = useImagePicker();
    const [step, setStep] = useState(1); // Tracks the current step
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [showSuccess, setShowSuccess] = useState(false); // Modal visibility state
    const [profileImage, setProfileImage] = useState('');
    const [streetName, setStreetName] = useState('');
    const [buildingNumber, setBuildingNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [city, setCity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const { setUser } = useUserContext();
    const [telephone, setTelephone] = useState('');
    const [userCredential, setUserCredential] = useState(null);

    const getUserData = async (email: string) => {
      try {
          return await UserClient.getByEmailAsync(email);
      } catch (error) {
          console.error('Error fetching user data:', error);
          throw error; // Propagate the error
      }
    };

    const handlePickProfileImage = async () => {
      const base64Image = await pickImage();
      if (base64Image) {
        setProfileImage(base64Image);
      }
    };

    const handleNextStep = () => {
      setStep(step + 1);
    };

    const handlePreviousStep = () => {
      if (step > 1) {
        setStep(step - 1);
      } else {
        navigation.navigate('RegisterType');
      }
    };
    
    const fetchCoordinates = async (address) => {
      const encodedAddress = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          console.log(lat + " " + lng);
          return { latitude: lat, longitude: lng };
        } else {
          throw new Error('Geocoding failed');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        Alert.alert('Error', 'Unable to determine coordinates. Please try again.');
        return null;
      }
    };

    const registerUserInDatabase = async (uid: string) => {
      const address = `${streetName}, ${buildingNumber}, ${city}`;
      const coordinates = await fetchCoordinates(address);
      
      if (!coordinates) return;

      const { latitude, longitude } = coordinates;
      console.log("trying to register user in db");
        try{
            const model: createUserModel = {
              lastName: lastName,
              firstName: firstName,
              username: username,
              email: email,
              imageID: profileImage,
              homeAddress: {
                streetName,
                buildingNumber,
                apartmentNumber,
                city,
                latitude,
                longitude,
                isVerified: false,
              },
              telephone: telephone,
              description: (userType === "sitter" ? description: ''),
              role: (userType === "sitter" ? 0: 1),
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
            <ScrollView contentContainerStyle={styles.inputContainer}>
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
              <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {step === 2 && (
            <ScrollView contentContainerStyle={styles.inputContainer}>
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
              {userType === "sitter" && (
                <TextInput
                style={styles.input}
                placeholder="A short description of yourself"
                placeholderTextColor="#FFFFFF"
                value={description}
                onChangeText={setDescription}
                multiline
              />)}
              <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {step === 3 && (
            <ScrollView contentContainerStyle={styles.inputContainer}>
              <Text style={styles.title}>Where do you live?</Text>
              <TextInput
                style={styles.input}
                placeholder="Street name"
                placeholderTextColor="#FFFFFF"
                value={streetName}
                onChangeText={setStreetName}
              />
              <TextInput
                style={styles.input}
                placeholder="Building number"
                placeholderTextColor="#FFFFFF"
                value={buildingNumber}
                onChangeText={setBuildingNumber}
              />
              <TextInput
                style={styles.input}
                placeholder="Apartment number"
                placeholderTextColor="#FFFFFF"
                value={apartmentNumber}
                onChangeText={setApartmentNumber}
                keyboardType='numeric'
              />
              <TextInput
                style={styles.input}
                placeholder="City name"
                placeholderTextColor="#FFFFFF"
                value={city}
                onChangeText={setCity}
              />
              <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
          {step === 4 && (
            <ScrollView contentContainerStyle={styles.inputContainer}>
            <Text style={styles.title}>Pick your profile image!</Text>
              {profileImage != null && (<Image
                source={{ uri: `data:image/jpeg;base64,${profileImage}`}}
                style={styles.profilePic}
              />)}
              <TouchableOpacity style={styles.changePictureButton} onPress={handlePickProfileImage}>
                <Text style={styles.changePictureText}>Select Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </ScrollView>

          )}
          {step === 5 && (
          <ScrollView contentContainerStyle={styles.inputContainer}>
          <Text style={styles.title}>One last step..</Text>
            <Text style={styles.title}>Set a strong password</Text>
            <Text style={styles.title}>And your phone number!</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#FFFFFF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="07xxxxxxxx"
                keyboardType='phone-pad'
                placeholderTextColor="#FFFFFF"
                value={telephone}
                onChangeText={setTelephone}
              />

              <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
          </ScrollView>
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
  inputContainer: {
    minWidth: '100%',
    alignItems: 'center',
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
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  changePictureButton: {
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
    minHeight: 10
  },
  changePictureText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
