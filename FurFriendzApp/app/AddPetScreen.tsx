import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddPetScreen({ navigation }) {
    const [petImage, setPetImage] = useState(null);
    const [petName, setPetName] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petGender, setPetGender] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petBirthdate, setPetBirthdate] = useState('');
  
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
        quality: 1,
      });
  
      if (!result.canceled) {
        setPetImage(result.assets[0].uri); // Update pet image state
      }
    };
  
    // Function to submit pet details
    const handleAddPet = async () => {
      if (!petName || !petBreed || !petGender || !petWeight || !petBirthdate || !petImage) {
        Alert.alert('Missing Information', 'Please fill in all fields and upload a picture.');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: petImage,
          name: 'pet.jpg',
          type: 'image/jpeg',
        });
        formData.append('name', petName);
        formData.append('breed', petBreed);
        formData.append('gender', petGender);
        formData.append('weight', petWeight);
        formData.append('birthdate', petBirthdate);
  
        const response = await fetch('https://your-api-endpoint.com/api/pets', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to add pet');
        }
  
        Alert.alert('Success', 'Pet added successfully!');
        navigation.goBack(); // Navigate back to the previous screen
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to add pet. Please try again.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add a Pet</Text>
  
        {/* Pet Image */}
        <View style={styles.imageSection}>
          <Image
            source={petImage ? { uri: petImage } : require('../assets/dog.png')} // Use a placeholder image if none is selected
            style={styles.petImage}
          />
          <TouchableOpacity style={styles.imageButton} onPress={pickPetImage}>
            <Text style={styles.imageButtonText}>Upload Picture</Text>
          </TouchableOpacity>
        </View>
  
        {/* Pet Details */}
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={petName}
          onChangeText={setPetName}
        />
        <TextInput
          placeholder="Breed"
          style={styles.input}
          value={petBreed}
          onChangeText={setPetBreed}
        />
        <TextInput
          placeholder="Gender (e.g., Male/Female)"
          style={styles.input}
          value={petGender}
          onChangeText={setPetGender}
        />
        <TextInput
          placeholder="Weight (kg)"
          style={styles.input}
          keyboardType="numeric"
          value={petWeight}
          onChangeText={setPetWeight}
        />
        <TextInput
          placeholder="Birthdate (YYYY-MM-DD)"
          style={styles.input}
          value={petBirthdate}
          onChangeText={setPetBirthdate}
        />
  
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
      color: '#333',
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
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      fontSize: 16,
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