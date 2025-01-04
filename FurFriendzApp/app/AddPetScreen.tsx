import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { PetClient } from '@/api/clients/petClient';
import { useUserContext } from '../config/UserContext';

export default function AddPetScreen({ navigation }) {
    const { user } = useUserContext();
    const [petImage, setPetImage] = useState(null);
    const [petName, setPetName] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petSpecies, setPetSpecies] = useState(''); // State for species
    const [petGender, setPetGender] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petBirthdate, setPetBirthdate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    // Function to pick a pet image
    const pickPetImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (!permissionResult.granted) {
          Alert.alert('Permission required', 'You need to grant media library permissions to pick a picture.');
          return;
        }
      
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Updated to use MediaType
          allowsEditing: true,
          aspect: [1, 1], // Square aspect ratio
          quality: 0.2,
        });
      
        if (!result.canceled) {
          try {
            // Read the selected image as base64
            const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
      
            // Convert base64 string to byte array
            const byteArray = Uint8Array.from(atob(base64Image), (char) => char.charCodeAt(0));
      
            // Update the state with the byte array
            setPetImage(byteArray);
            console.log('Pet image set as byte array:', byteArray);
          } catch (error) {
            console.error('Error reading the image file:', error);
            Alert.alert('Error', 'Unable to process the image. Please try again.');
          }
        }
      };
  
    // Function to submit pet details
    const handleAddPet = async () => {
        if (!petName || !petBreed || !petSpecies || !petGender || !petWeight || !petBirthdate || !petImage) {
          Alert.alert('Missing Information', 'Please fill in all fields and upload a picture.');
          return;
        }
      
        try {
          console.log("Attempting to add pet to the database...");
      
          // Construct the new pet model
          const newPet = {
            name: petName,
            type: petSpecies === "1" ? "Dog" : "Cat", // Convert species value to readable type
            breed: null,
            age: new Date().getFullYear() - petBirthdate.getFullYear(), // Approximate age calculation
            ownerId: user.id, // Replace with actual user ID
            imageID: petImage, // Assuming you'll store image URI or convert to a server-compatible format
          };
          console.log(newPet);
      
          // Use PetClient to create the pet
          const createdPet = await PetClient.createAsync(newPet);
      
          console.log("Pet added successfully:", createdPet);
          Alert.alert('Success', 'Pet added successfully!');
          navigation.goBack(); // Navigate back to the previous screen
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
          Alert.alert('Error', 'Failed to add pet. Please try again.');
        }
      };
  
    // Function to show the date picker
    const showDatePickerHandler = () => {
      setShowDatePicker(true);
    };
  
    // Function to handle date change
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || petBirthdate;
      setShowDatePicker(false);
      setPetBirthdate(currentDate);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add a Pet</Text>
  
        {/* Pet Image */}
        <View style={styles.imageSection}>
        <Image
        source={
            petImage
            ? { uri: `data:image/jpeg;base64,${petImage}` } // Base64 as a data URL
            : require('../assets/dog.png') // Fallback image
        }
        style={styles.petImage}
        />
          <TouchableOpacity style={styles.imageButton} onPress={pickPetImage}>
            <Text style={styles.imageButtonText}>Upload Picture</Text>
          </TouchableOpacity>
        </View>
  
        {/* Pet Details */}
        <View style={styles.inputGroup}>
          <Ionicons name="paw" size={24} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#fff"
            style={styles.input}
            value={petName}
            onChangeText={setPetName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Ionicons name="paw-outline" size={24} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="Breed"
            placeholderTextColor="#fff"
            style={styles.input}
            value={petBreed}
            onChangeText={setPetBreed}
          />
        </View>

        {/* Species Select Box */}
        <View style={styles.inputGroup}>
          <Ionicons name="paw" size={24} color="#fff" style={styles.icon} />
          <Picker
            selectedValue={petSpecies}
            style={styles.picker}
            onValueChange={(itemValue) => setPetSpecies(itemValue)}
          >
            <Picker.Item label="Select Species" value="" />
            <Picker.Item label="Dog" value="1" />
            <Picker.Item label="Cat" value="0" />
          </Picker>
        </View>

        {/* Gender Select Box */}
        <View style={styles.inputGroup}>
          <Ionicons name="male-female" size={24} color="#fff" style={styles.icon} />
          <Picker
            selectedValue={petGender}
            style={styles.picker}
            onValueChange={(itemValue) => setPetGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="scale" size={24} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="Weight (kg)"
            placeholderTextColor="#fff"
            style={styles.input}
            keyboardType="numeric"
            value={petWeight}
            onChangeText={setPetWeight}
          />
        </View>
        
        {/* Date Picker */}
        <View style={styles.inputGroup}>
          <Ionicons name="calendar" size={24} color="#fff" style={styles.icon} />
          <TouchableOpacity onPress={showDatePickerHandler} style={styles.dateTouchable}>
            <Text style={styles.input}>
              {petBirthdate ? petBirthdate.toISOString().split('T')[0] : 'Select Birthdate'}
            </Text>
            <Ionicons name="arrow-down-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={petBirthdate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
          <Text style={styles.addButtonText}>Add Pet</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006c87',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  imageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#8BAAB2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  picker: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  dateTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
