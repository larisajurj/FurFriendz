import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useUserContext } from '../config/UserContext';
import {UserRole} from '../api/model/userRole'
export default function ProfileScreen({ route, navigation }) {
    const { user } = useUserContext()

  return (
    <View style={styles.container}>
      {/* User Section */}
      <View style={styles.userSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Placeholder for profile pic
          style={styles.profilePic}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.roleEnum}</Text>
         {/* <Text style={styles.userRating}>
            {'★'.repeat(user.rating)}{'☆'.repeat(5 - user.rating)}
          </Text>
          */}
          <TouchableOpacity>
            <Text style={styles.myAccountText}>My account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pet Section */}
      <Text style={styles.sectionTitle}>Your pets</Text>
      {/*<ScrollView>
        {user.pets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={styles.petCard}
            onPress={() => alert(`Viewing ${pet.name}`)}
          >
            <Image source={pet.image} style={styles.petImage} />
            <View>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>{pet.breed}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      */}

      {/* Manage and Logout Buttons */}
      <View style={styles.actionButtons}>
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
    opacity: 1,
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
  userRating: {
    fontSize: 16,
    color: '#282828',
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
  actionButtons: {
    marginTop: 20,
  },
  buttonPrimary: {
    backgroundColor: '#00aaff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});