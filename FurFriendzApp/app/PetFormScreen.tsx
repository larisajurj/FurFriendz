import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PetClient } from '@/api/clients/petClient';
import { useUserContext } from '../config/UserContext';
import { useImagePicker } from './components/useImagePicker';
import { BreedClient } from '@/api/clients/breedClient';

export default function PetFormScreen({ route, navigation }) {
  const { petId } = route.params || {}; // Check if editing an existing pet
  const { user } = useUserContext();
  const { pickImage } = useImagePicker();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(!!petId); // Editing mode if petId exists
  const [pet, setPet] = useState(null);
  const [breedList, setBreedList] = useState([]);
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petSpecies, setPetSpecies] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petProfileImage, setPetProfileImage] = useState('');
  const [petBirthdate, setPetBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (petId) {
      fetchPetDetails();
    } else {
        setIsLoading(false);
    }
  }, [petId]);

  const fetchPetDetails = async () => {
    try {
      setIsLoading(true);
      const petData = await PetClient.getOneAsync(petId);
      setPet(petData);
      setPetProfileImage(petData.profileImage);
      setPetName(petData.name);
      setPetBreed(petData.breedId);
      setPetSpecies(petData.specieId);
      setPetGender(petData.gender === 0 ? 'Male' : 'Female');
      setPetWeight(petData.weight.toString());
      setPetBirthdate(new Date(petData.birthday));
    } catch (error) {
      console.error('Error fetching pet details:', error);
      Alert.alert('Error', 'Failed to load pet details.');
    } finally {
        setIsLoading(false);
    }
  };

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

    useEffect(() => {
        if (petSpecies) {
            fetchBreeds(petSpecies);
        } else {
            setBreedList([]); // Reset the breed list if no species is selected
        }
        }, [petSpecies]);

  const handleImagePicker = async () => {
    const base64Image = await pickImage();
    if (base64Image) {
      setPetProfileImage(base64Image);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Pet',
      'Are you sure you want to delete this pet? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await PetClient.deleteAsync(petId);
              Alert.alert('Success', 'Pet deleted successfully!');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting pet:', error);
              Alert.alert('Error', 'Failed to delete pet. Please try again.');
            }
          },
        },
      ]
    );
  };
  

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || petBirthdate;
    setShowDatePicker(false);
    setPetBirthdate(currentDate);
  };

  const showDatePickerHandler = () => setShowDatePicker(true);

  const handleSubmit = async () => {
    if (!petName || !petBreed || !petSpecies || !petGender || !petWeight || !petBirthdate || !petProfileImage) {
      Alert.alert('Missing Information', 'Please fill in all fields and upload a picture.');
      return;
    }

    const petData: CreatePetModel = {
      name: petName,
      gender: petGender === 'Male' ? 0 : 1,
      specieId: petSpecies,
      breedId: parseInt(petBreed, 10),
      profileImage: petProfileImage,
      weight: parseFloat(petWeight),
      birthday: petBirthdate.toISOString(),
      ownerId: user.id,
    };

    try {
      if (isEditing) {
        await PetClient.updateAsync(petId, petData);
        Alert.alert('Success', 'Pet information updated successfully!');
      } else {
        await PetClient.createAsync(petData);
        Alert.alert('Success', 'Pet added successfully!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving pet:', error);
      Alert.alert('Error', 'Failed to save pet information. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
        {isLoading ? (
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading your Pets details...</Text>
        </View> 
        ) : (<ScrollView style={styles.scrollViewContent} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.title}>{isEditing ? 'Edit Pet' : 'Add Pet'}</Text>
            <View style={styles.imageSection}>
              <Image
                source={
                  petProfileImage
                    ? { uri: `data:image/jpeg;base64,${petProfileImage}` }
                    : require('../assets/dog.png')
                }
                style={styles.petImage}
              />
              <TouchableOpacity style={styles.changePictureButton} onPress={handleImagePicker}>
                <Text style={styles.changePictureText}>Upload Picture</Text>
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
      
            <View style={styles.inputGroup}>
              <Ionicons name="paw-outline" size={24} color="#fff" style={styles.icon} />
              <Picker
                selectedValue={petBreed}
                style={styles.picker}
                onValueChange={(itemValue) => setPetBreed(itemValue)}
              >
                <Picker.Item
                label={
                    breedList && pet?.breedId
                    ? breedList.find((breed) => breed.id?.toString() === pet.breedId?.toString())?.name || 'Select Breed'
                    : 'Select Breed'
                }
                value={pet?.breedId?.toString() || ''}
                />
                {breedList.map((breed) => (
                  <Picker.Item key={breed.id} label={breed.name} value={breed.id.toString()} />
                ))}
              </Picker>
            </View>
      
            <View style={styles.inputGroup}>
              <Ionicons name="scale" size={24} color="#fff" style={styles.icon} />
              <TextInput
                placeholder="Weight (kg)"
                placeholderTextColor="#fff"
                style={styles.input}
                value={petWeight}
                keyboardType="numeric"
                onChangeText={setPetWeight}
              />
            </View>
      
            <View style={styles.inputGroup}>
              <Ionicons name="male-female" size={24} color="#fff" style={styles.icon} />
              <Picker
                selectedValue={petGender}
                style={styles.picker}
                onValueChange={setPetGender}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
      
            <View style={styles.inputGroup}>
              <Ionicons name="calendar" size={24} color="#fff" style={styles.icon} />
              <TouchableOpacity onPress={showDatePickerHandler} style={styles.dateTouchable}>
                <Text style={styles.input}>
                  {petBirthdate ? petBirthdate.toISOString().split('T')[0] : 'Select Birthdate'}
                </Text>
                <Ionicons name="arrow-down-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
      
            {showDatePicker && (
              <DateTimePicker
                value={petBirthdate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
      
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{isEditing ? 'Save Changes' : 'Add Pet'}</Text>
            </TouchableOpacity>
            {isEditing && (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete Pet</Text>
            </TouchableOpacity>
            )}
          </ScrollView>
        )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#006c87', paddingHorizontal: 20, },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 20 },
  imageSection: { alignItems: 'center', marginBottom: 20 },
  petImage: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#ccc', marginBottom: 10 },
  changePictureButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  changePictureText: { color: '#fff', fontWeight: 'bold' },
  inputGroup: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', backgroundColor: '#8BAAB2', borderRadius: 5, padding: 10, marginBottom: 15, maxHeight: 60 },
  picker: { flex: 1, color: '#fff', fontSize: 16 },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', fontSize: 16 }, 
  dateTouchable: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  submitButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center', },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }, 
  scrollViewContent: { paddingBottom: 100},
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#006c87',},
  loadingText: { fontSize: 18, color: '#fff', fontWeight: 'bold',},
  deleteButton: { backgroundColor: '#ff4d4d', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10, marginBottom: 20,},
  deleteButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', },
});
