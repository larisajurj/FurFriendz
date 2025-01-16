import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useUserContext } from '../config/UserContext';
import { ServiceClient } from '@/api/clients/serviceClient';
import { PetClient } from '@/api/clients/petClient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import MultiSelect from 'react-native-multiple-select';
import { useNavigation } from "@react-navigation/native";

export default function CreateListingForm({route }) {
    const { user } = useUserContext();
    const navigation = useNavigation();
    const { serviceId } = route.params;
    const { price } = route.params;
    const { petSitter } = route.params;
    const { typeOfPet } = route.params;
    const [pets, setPets] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const multiSelectRef = useRef(null);

    useEffect(() => {
        const fetchUserPets = async () => {
          try {
            const fetchedPets = await PetClient.getByUserIdAsync(user.id);
            const typePets = fetchedPets
                .filter(pet => typeOfPet == 'Any' ? true : pet.specieId == typeOfPet) // Filter pets by Specie
                .map(pet => {
                    // Perform any transformation if needed
                    return pet; // Adjust this if you need a specific structure
                });
            setPets(typePets); // Update the state with fetched pets
            //console.log(fetchedPets);
          } catch (error) {
            console.error('Error fetching user pets:', error);
          } finally {
            setLoading(false); // Ensure loading is set to false
          }
        };

        fetchUserPets();
      }, [user.id]);

    const handleSubmit = async () => {
        if (!startDate || !endDate || pets.length == 0) {
          Alert.alert('Validation Error', 'Please fill in all required fields.');
          return;
        }
        const newReq: CreateListingModel = {
                requestingUserId: user.id,
                pets: selectedItems,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                details: description,
                serviceId: serviceId
              };
        setLoading(true);
        try {
          const createdService = await ServiceClient.createRequestAsync(newReq);
          Alert.alert('Success', `Listing created successfully!`);
          navigation.navigate('MapPage');
        } catch (error) {
                  console.error("Error occurred:", error);
                      throw error;
          Alert.alert('Error', 'Failed to create listing. Please try again.');
        } finally {
          setLoading(false);
        }
    };
    const onDateChange = (event, selectedDate: Date) => {
      const currentDate = selectedDate || startDate;
      setShowDatePicker(false);
      setStartDate(currentDate);
    };
   const onDateChangeEnd = (event, selectedDate) => {
     const currentDate = selectedDate || endDate;
     setShowDatePickerEnd(false);
     setEndDate(currentDate);
   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Listing Request</Text>

      {/* Start Date */}
      <View style={styles.inputGroup}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTouchable}>
          <Text style={styles.input}>
            {startDate ? startDate.toISOString().split('T')[0] : 'Select Start Date'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Start Date */}
    <View style={styles.inputGroup}>
      <TouchableOpacity onPress={() => setShowDatePickerEnd(true)} style={styles.dateTouchable}>
        <Text style={styles.input}>
          {endDate ? endDate.toISOString().split('T')[0] : 'Select End Date'}
        </Text>
      </TouchableOpacity>
    </View>

    {/* Date Picker */}
    {showDatePickerEnd && (
      <DateTimePicker
        value={new Date()}
        mode="date"
        display="default"
        onChange={onDateChangeEnd}
      />
    )}
      {/* Details */}
      <TextInput
        style={styles.textArea}
        placeholder="Details (optional)"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      <View style={{ flex: 1,}}>
                      <MultiSelect
                          hideTags
                          items={pets} // Ensure 'pets' is the correct array you're passing to the MultiSelect
                          uniqueKey="id"
                          ref={multiSelectRef}
                          onSelectedItemsChange={setSelectedItems} // Pass setSelectedItems directly
                          selectedItems={selectedItems}
                          selectText="Pick Items"
                          searchInputPlaceholderText="Search Items..."
                          altFontFamily="ProximaNova-Light"
                          tagRemoveIconColor="#CCC"
                          tagBorderColor="#008bad"
                          tagTextColor="#CCC"
                          selectedItemTextColor="#008bad"
                          selectedItemIconColor="#CCC"
                          itemTextColor="#000"
                          displayKey="name"
                          searchInputStyle={{ color: '#CCC' }}
                          submitButtonColor="#008bad"
                          submitButtonText="Submit"
                      />
                      <View>
                          {multiSelectRef.current && multiSelectRef.current.getSelectedItemsExt(selectedItems)}
                      </View>
                  </View>
      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#006c87',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    color:"#fff",
    textAlign: 'center',
  },
  input: {
    borderWidth: 3,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: '#008bad',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: '#008bad',
    borderWidth: 3,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    height: 100,
    marginBottom: 15,
    marginTop: 15,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '60%',
    borderWidth: 5,
    borderColor: "#008bad",
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 500,
    color: "#333",
    textAlign: 'center',
    fontSize: 16,
  },
  inputGroup:{
    marginBottom:20
  },


});

export default CreateListingForm;
