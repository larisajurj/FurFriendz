import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useUserContext } from '../config/UserContext';
import { PetClient } from '@/api/clients/petClient';
import { Ionicons } from '@expo/vector-icons';
import { AddressMode } from '@/api/model/addressModel';

export default function ProfileScreen({ route, navigation }) {
  const { user } = useUserContext();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [base64Image, setBase64Image] = useState<string>(null)

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const fetchedPets = await PetClient.getByUserIdAsync(user.id);
        setPets(fetchedPets); // Update the state with fetched pets
        //console.log(fetchedPets);
      } catch (error) {
        console.error('Error fetching user pets:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    fetchUserPets();
  }, [user.id]); // Re-run effect if user.id changes

  fetch

  const handleGoAsPetSitter = () => {
    alert("Navigating to Pet Sitter functionality!");
  };

  const handleAddPet = () => {
    navigation.navigate('AddPetScreen'); // Navigate to the Add Pet screen
  };

  const handleMyAccountButton = () => {
    navigation.navigate('MyAccountPage');
  };

  const handleHomeAddressText = () => {
    const homeAddress : AddressMode = {
      streetName: user.homeAddress.streetName,
      buildingNumber: user.homeAddress.builduingNumber,
      apartmentNumber: user.homeAddress.apartmentNumber,
      city: user.homeAddress.city,
      latitude: user.homeAddress.latitude,
      longitude: user.homeAddress.longitude,
    }
    return homeAddress.streetName + ' ' + homeAddress.buildingNumber + ',' + homeAddress.city;
  };

  return (
    <View style={styles.container}>
      {/* User Section */}
      <View style={styles.userSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Placeholder for profile pic
          style={styles.profilePic}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.username}</Text>
          <TouchableOpacity onPress={handleMyAccountButton}>
            <Text style={styles.myAccountText}>My account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Home Location Section */}
      <Text style={styles.sectionTitle}>My home location</Text>
      <View style={styles.homeLocationContainer}>
        {user.homeLocation==null ? (
          <Text style={styles.homeLocationText}>{handleHomeAddressText()}</Text>
        ) : (
          <Text style={styles.setHomeLocationText}>
            Set your home location by going to My account
          </Text>
        )}
      </View>

      {/* Pet Section */}
      <Text style={styles.sectionTitle}>Your pets</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading pets...</Text>
      ) : pets.length > 0 ? (
        <ScrollView>
          {pets.map((pet) => (
            <TouchableOpacity
              key={pet.id}
              style={styles.petCard}
              onPress={() => {
                alert(`Viewing ${pet.name}`);
                setBase64Image(pet.image);
                console.log(pet.image); }}
              >
              <Image
                // source={pet.image ? { uri: pet.image } : require(`../assets/dog.png`)}
                source={{ uri: `data:image/jpeg;base64,${pet.image}`}}
                style={styles.petImage}
              />
              <View>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>{pet.breed || 'Unknown'}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#1E1E1E" />
            </TouchableOpacity>

          ))}
        </ScrollView>
      ) : (
        <View style={styles.noPetsSection}>
          <Text style={styles.noPetsText}>You have no pets yet.</Text>
        </View>
      )}
      <TouchableOpacity style={styles.buttonAddPet} onPress={handleAddPet}>
            <Text style={styles.buttonText}>Add a Pet</Text>
      </TouchableOpacity>

      <View style={{ flexDirection:"row", gap: 20}}>
          {/* Go as Pet Sitter Button */}
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleGoAsPetSitter}>
            <Text style={styles.buttonText}>Go as Pet Sitter</Text>
          </TouchableOpacity>
          {/* Manage and Logout Buttons */}
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate('LoginPage')}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006c87',
    padding: 20,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8BAAB2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  myAccountText: {
    color: '#017C9B',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  homeLocationContainer: {
    backgroundColor: '#8BAAB2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  homeLocationText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  setHomeLocationText: {
    fontSize: 16,
    color: '#282828',
    fontStyle: 'italic',
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8BAAB2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    resizeMode: 'contain'
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  petBreed: {
    fontSize: 14,
    color: '#282828',
  },
  noPetsSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  noPetsText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: '#00aaff',
    padding: 15,
    borderRadius: 10,
  },
  buttonAddPet: {
    backgroundColor: '#00aaff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionButtons: {
    marginTop: 20,
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
});
