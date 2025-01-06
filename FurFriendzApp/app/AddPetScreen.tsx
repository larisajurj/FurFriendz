import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { PetClient } from '@/api/clients/petClient';
import { useUserContext } from '../config/UserContext';
import { BreedClient } from '@/api/clients/breedClient';
import CreatePetModel from '@/api/model/createPetModel';

export default function AddPetScreen({ navigation }) {
  const { user } = useUserContext();
  const [petImage, setPetImage] = useState('');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petSpecies, setPetSpecies] = useState('');
  const [breedList, setBreedList] = useState([]); // Dynamic breed list
  const [petGender, setPetGender] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petBirthdate, setPetBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to fetch breeds based on the selected species
  const fetchBreeds = async (species) => {
    try {
      // Simulate an API call to get breeds based on species
      const response = await BreedClient.getBySpeciesAsync(species); // Assuming this function exists
      setBreedList(response); // Update the breed list
    } catch (error) {
      console.error('Failed to fetch breeds:', error);
      Alert.alert('Error', 'Failed to fetch breeds. Please try again.');
    }
  };

  // Update the breed list when the species changes
  useEffect(() => {
    if (petSpecies) {
      fetchBreeds(petSpecies);
    } else {
      setBreedList([]); // Reset the breed list if no species is selected
    }
  }, [petSpecies]);

  function convertToBase64(byteArray: number[]): string {
    // Convert the number array to a Uint8Array
    const uint8Array = new Uint8Array(byteArray);
  
    // Convert the Uint8Array to a string
    const binaryString = String.fromCharCode(...uint8Array);
  
    // Encode the binary string to Base64
    const base64String = btoa(binaryString);
  
    return base64String;
  }

  // Function to pick a pet image
  const pickPetImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to grant media library permissions to pick a picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      try {
        const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setPetImage(base64Image);
      } catch (error) {
        console.error('Error reading the image file:', error);
        Alert.alert('Error', 'Unable to process the image. Please try again.');
      }
    }
  };

  // Function to handle the submission of the form
  const handleAddPet = async () => {
    if (!petName || !petBreed || !petSpecies || !petGender || !petWeight || !petBirthdate || !petImage) {
      Alert.alert('Missing Information', 'Please fill in all fields and upload a picture.');
      return;
    }
  
    try {
      const newPet: CreatePetModel = {
        name: petName,
        gender: petGender === 'Male' ? 0 : 1,
        specieId: petSpecies, // Convert species ID to a number
        breedId: parseInt(petBreed, 10), // Convert breed ID to a number
        profileImage: petImage, // Include the Base64 string with MIME type
        weight: parseFloat(petWeight), // Convert weight to a number
        birthday: petBirthdate.toISOString(), // Convert to ISO 8601 format
        ownerId: user.id, // Owner's UUID
      };
  
      console.log('Submitting pet data:', newPet);
  
      const createdPet = await PetClient.createAsync(newPet);
      Alert.alert('Success', 'Pet added successfully!');
      // console.log('Created Pet:', createdPet);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding pet:', error);
      Alert.alert('Error', 'Failed to add pet. Please try again.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || petBirthdate;
    setShowDatePicker(false);
    setPetBirthdate(currentDate);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add a Pet</Text>
      <View style={styles.imageSection}>
        <Image
          source={
            petImage
              ? { uri: `data:image/jpeg;base64,${petImage}` }
              : require('../assets/dog.png')
          }
          style={styles.petImage}
        />
        <TouchableOpacity style={styles.imageButton} onPress={pickPetImage}>
          <Text style={styles.imageButtonText}>Upload Picture</Text>
        </TouchableOpacity>
      </View>

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

      {/* Species Dropdown */}
      <View style={styles.inputGroup}>
        <Ionicons name="paw" size={24} color="#fff" style={styles.icon} />
        <Picker
          selectedValue={petSpecies}
          style={styles.picker}
          onValueChange={(itemValue) => setPetSpecies(itemValue)}
        >
          <Picker.Item label="Select Species" value="" />
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Cat" value="Cat" />
        </Picker>
      </View>

      {/* Breed Dropdown */}
      <View style={styles.inputGroup}>
        <Ionicons name="paw-outline" size={24} color="#fff" style={styles.icon} />
        <Picker
          selectedValue={petBreed}
          style={styles.picker}
          onValueChange={(itemValue) => setPetBreed(itemValue)}
        >
          <Picker.Item label="Select Breed" value="" />
          {breedList.map((breed) => (
            <Picker.Item key={breed.id} label={breed.name} value={breed.id.toString()} />
          ))}
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
