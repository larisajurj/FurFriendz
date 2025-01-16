import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useUserContext } from '../config/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { PetClient } from '@/api/clients/petClient';
import { Ionicons } from '@expo/vector-icons';
import { AddressMode } from '@/api/model/addressModel';
import { RequestStatus } from '@/api/model/requestStatus';
import { useFocusEffect } from '@react-navigation/native';
import { UserClient } from '@/api/clients/userClient';
import { ServiceClient } from '@/api/clients/serviceClient';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useUserContext();
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPets = async () => {
    try {
      const fetchedPets = await PetClient.getByUserIdAsync(user.id);
      setPets(fetchedPets);
    } catch (error) {
      console.error('Error fetching user pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = useCallback(async () => {
    try {
      const updatedUser = await UserClient.getByEmailAsync(user.email);
      setUser(updatedUser);
      console.log("I am here");
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [user.email, setUser]);

  const fetchServices = useCallback(async () => {
    try {
      console.log("trying to get services");
      const fetchedServices = await ServiceClient.getServicesByUserIdAsync(user.id);
      //console.log("trying to get services");
      setServices(fetchedServices);
    } catch (error) {
      console.error('Error fetching services of sitter:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);
  
  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
      if (user.role === 'PetOwner') {
        fetchUserPets();
      }
      if (user.role === 'PetSitter') {
        fetchServices();
      }
    }, [fetchUserInfo, fetchServices, user.role])
  );
  

  const handleGoAsRole = () => {
    if (user.role === 'PetOwner') {
      alert('Navigating to Pet Owner functionality!');
    } else {
      alert('Navigating to Pet Sitter functionality!');
    }
  };

  const handleAddPet = () => {
    navigation.navigate('PetFormScreen');
  };


  const handleLogOut = () => {
    try {
      auth.signOut().then(() => navigation.navigate('LoginPage'));
      alert('Logging out!');
    } catch {
      alert('Error logging out');
    }
  };

  return (
    <View style={styles.container}>
      {/* User Section */}
      <View style={styles.userSection}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${user.imageID}` }}
          style={styles.profilePic}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.username}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyAccountPage')}>
            <Text style={styles.myAccountText}>My account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Home Location Section */}
      <Text style={styles.sectionTitle}>My home location</Text>
      <View style={styles.homeLocationContainer}>
        <Text style={styles.homeLocationText}>
          {user.homeAddress
            ? `${user.homeAddress.streetName} ${user.homeAddress.buildingNumber}, ${user.homeAddress.city}`
            : 'Set your home location by going to My account'}
        </Text>
      </View>
      {user.role === "PetOwner" && (
          <>
            <Text style={styles.sectionTitle}>See your requests</Text>
                  <View style={styles.homeLocationContainer}>
                    <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.serviceButton, { backgroundColor: '#3d8a63' }]} title="Active" onPress={() => navigation.navigate('RequestsPage', { status: RequestStatus.Accepted })} >
                        <Text style={styles.buttonText}>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.serviceButton, { backgroundColor: '#b3ae39' }]} title="Pending" onPress={() => navigation.navigate('RequestsPage', { status: RequestStatus.Pending })} >
                        <Text style={styles.buttonText}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.serviceButton, { backgroundColor: '#008bad' }]} title="Completed" onPress={() => navigation.navigate('RequestsPage', { status: RequestStatus.Finished })} >
                        <Text style={styles.buttonText}>Completed</Text>
                    </TouchableOpacity>
                  </View>
             </View>
          </>
      )}
      {/* Pet Section (Visible Only for Pet Owners) */}
      {user.role === 'PetOwner' && (
        <>
          <Text style={styles.sectionTitle}>Your pets</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading pets...</Text>
          ) : pets.length > 0 ? (
            <ScrollView>
              {pets.map((pet) => (
                <TouchableOpacity
                  key={pet.id}
                  style={styles.petCard}
                  onPress={() => navigation.navigate('PetFormScreen', { petId: pet.id })}
                >
                  <Image
                    source={ pet.profileImage ?
                        { uri: `data:image/jpeg;base64,${pet.profileImage}` }
                      : require('../assets/dog.png')}
                    style={styles.petImage}
                  />
                  <View>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petBreed}>{pet.specieId || 'Unknown'}</Text>
                  </View>
                  <View style={{flex:1}}/>
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
        </>
      )}

      {user.role === "PetSitter" && (
        <>
          <Text style={styles.sectionTitle}>Your Services</Text>
          <TouchableOpacity style={styles.petCard} onPress={() => navigation.navigate('CreateServiceForm', {serviceId: services.id})}>
            <Ionicons name="walk-outline" size={24} color="#1E1E1E" style={{paddingRight: 10}}/>
            <Text style={styles.petName}>Dog Walking</Text>
            <View style={{flex:1}}/>
            <Ionicons name="chevron-forward" size={20} color="#1E1E1E"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.petCard} onPress={() => navigation.navigate('CreateServiceForm', {serviceId: services.id})}>
            <Ionicons name="home" size={24} color="#1E1E1E" style={{paddingRight: 10}}/>
            <Text style={styles.petName}>House Sitting</Text>
            <View style={{flex:1}}/>
            <Ionicons name="chevron-forward" size={20} color="#1E1E1E"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.petCard} onPress={() =>{ console.log(services); navigation.navigate('CreateServiceForm', {serviceId: PetSittingServicesEnum.PersonalHouseSitting})}}>
            <Ionicons name="home-outline" size={24} color="#1E1E1E" style={{paddingRight: 10}}/>
            <Text style={styles.petName}>House Visiting</Text>
            <View style={{flex:1}}/>
            <Ionicons name="chevron-forward" size={20} color="#1E1E1E"/>
          </TouchableOpacity>
        </>
      )}

      
      {/* Action Buttons */}
      <View style={{flex: 1}}/>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleLogOut}>
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
  bottomButtons: {
    flexDirection: 'row',
    gap: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  iconSitter: {
    paddingRight:10,
  },
   buttonRow: {
        flexDirection: "row", // Arrange buttons horizontally
        justifyContent: "space-evenly", // Space buttons evenly
        alignItems: "center",
        width: "100%", // Ensure the row spans the full width
      },
   serviceButton: {
      flex: 1,
      backgroundColor: '#00aaff',
      padding: 8,
      borderRadius: 10,
      margin: 3
   },
});
