import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../config/UserContext';
import { UserClient } from '@/api/clients/userClient';
import { UserModel } from '@/api/model/userModel';
import { ScrollView } from 'react-native-gesture-handler';
import { useImagePicker } from '@/app/components/useImagePicker';
import GOOGLE_API_KEY from '@/config/googleMapApiKey';


export default function MyAccountPage({ navigation }) {
  const { user } = useUserContext();
  const [profileImage, setProfileImage] = useState('');
  const { pickImage } = useImagePicker();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.firstName);
  const [phone, setPhone] = useState(user.telephone);
  const [streetName, setStreetName] = useState(user.homeAddress.streetName || '');
  const [buildingNumber, setBuildingNumber] = useState(user.homeAddress.buildingNumber || '');
  const [apartmentNumber, setApartmentNumber] = useState(user.homeAddress.apartmentNumber || '');
  const [city, setCity] = useState(user.homeAddress.city || '');
  const [location, setLocation] = useState({
    latitude: user.homeAddress.latitude || 0,
    longitude: user.homeAddress.longitude || 0,
  });

  const handlePaymentMethodPress = (method) => {
    setSelectedPaymentMethod(method);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handlePickProfileImage = async () => {
    const base64Image = await pickImage();
    if (base64Image) {
      setProfileImage(base64Image);
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

  const handleSave = async () => {
    const address = `${streetName}, ${buildingNumber}, ${city}`;
    const coordinates = await fetchCoordinates(address);
  
    if (!coordinates) return;
  
    const { latitude, longitude } = coordinates;
  
    try {
      const updatedUser: UserModel = {
        ...user,
        firstName: name,
        telephone: phone,
        homeAddress: {
          streetName,
          buildingNumber,
          apartmentNumber,
          city,
          latitude,
          longitude,
        },
        imageID: profileImage,
      };
  
      console.log('Updated user payload:', updatedUser);
  
      const response = await UserClient.updateAsync(user.id, updatedUser);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
  
      if (response.status === 200) {
        Alert.alert('Success', 'Information updated successfully!');
        setIsEditing(false);
      } else {
        Alert.alert('Error', `Failed to update. Status code: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update user information. Please try again.');
      console.error('Error updating user:', error);
    }
  };
  

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${user.imageID}` }}
          style={styles.profilePic}
        />
        {isEditing && (
        <View style={styles.editButtonsContainer}>
          <TouchableOpacity style={styles.changePictureButton} onPress={handlePickProfileImage}>
            <Text style={styles.changePictureText}>Select Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removePictureButton}>
            <Text style={styles.removePictureText}>Remove Picture</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>

      {/* Name Section */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        ) : (
          <Text style={styles.value}>{name}</Text>
        )}
      </View>

      {/* Phone Section */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Phone</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.value}>{phone}</Text>
        )}
      </View>

      {/* Address Section */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Street Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={streetName}
            onChangeText={setStreetName}
          />
        ) : (
          <Text style={styles.value}>{streetName}</Text>
        )}

        <Text style={styles.label}>Building Number</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={buildingNumber}
            onChangeText={setBuildingNumber}
          />
        ) : (
          <Text style={styles.value}>{buildingNumber}</Text>
        )}

        <Text style={styles.label}>Apartment Number</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={apartmentNumber}
            onChangeText={setApartmentNumber}
          />
        ) : (
          <Text style={styles.value}>{apartmentNumber}</Text>
        )}

        <Text style={styles.label}>City</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />
        ) : (
          <Text style={styles.value}>{city}</Text>
        )}
      </View>
      <View style={styles.actionButtonsContainer}>
        {/* Edit/Save Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={isEditing ? handleSave : toggleEditing}
      >
        <Text style={styles.editButtonText}>
          {isEditing ? 'Save' : 'Edit Info'}
        </Text>
      </TouchableOpacity>
      {isEditing && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setIsEditing(false)} // Cancel editing mode
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
      </View>
      {/* Payment Methods Section */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <View>
        <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPaymentMethod === 'Cash' && styles.selectedPaymentMethod,
            ]}
            onPress={() => handlePaymentMethodPress('Cash')}
          >
            <View style={styles.paymentMethodRow}>
                <Text style={styles.paymentText}>Card</Text>
                {selectedPaymentMethod === 'Cash' && (
                <Ionicons name="checkmark-circle" size={20} color="#00FF00" style={styles.checkmarkIcon} />
                )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPaymentMethod === 'Card' && styles.selectedPaymentMethod,
            ]}
            onPress={() => handlePaymentMethodPress('Card')}
          >
            <View style={styles.paymentMethodRow}>
                <Text style={styles.paymentText}>Card</Text>
                {selectedPaymentMethod === 'Card' && (
                <Ionicons name="checkmark-circle" size={20} color="#00FF00" style={styles.checkmarkIcon} />
                )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
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
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#8BAAB2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
  removePictureButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
    minHeight: 10
  },
  removePictureText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#8BAAB2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#1E1E1E',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  editButton: {
    backgroundColor: '#00aaff',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  paymentSection: {
    backgroundColor: '#8BAAB2',
    borderRadius: 10,
    padding: 15,
  },
  paymentMethod: {
    backgroundColor: '#006c87',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkmarkIcon: {
    marginLeft: 10,
  },
  selectedPaymentMethod: {
    backgroundColor: '#00aaff',
  },
  paymentText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
    minHeight: 1
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
