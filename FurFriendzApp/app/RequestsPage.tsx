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

export default function RequestsPage({ route }) {
  const { user } = useUserContext();
  const { status } = route.params;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserRequests = async () => {
    try {
      const response = await ServiceClient.getRequestsFromUserAsync(user.id);
      const requestsWithServices = await Promise.all(
            response.map(async (req) => {
              try {
                const service = await ServiceClient.getServiceByIdAsync(req.serviceId);
                return { ...req, service }; // Merge request and service details
              } catch (error) {
                console.error(`Error fetching service for serviceId ${req.serviceId}:`, error);
                return { ...req, service: null }; // Fallback if service fetch fails
              }
            })
      );
      var filtered = requestsWithServices.filter(r => r.status == status)
          .map(r => {
              // Perform any transformation if needed
              return r; // Adjust this if you need a specific structure
          });
      setRequests(filtered);
    } catch (error) {
      console.error('Error fetching user requests:', error);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
        fetchUserRequests();
      }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your requests</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading pets...</Text>
      ) : requests.length > 0 ? (
        <ScrollView style={styles.container}>
              {requests.map((req) => (
                <View key={req.id} style={styles.card}>
                  <Text style={styles.title}>Request #{req.id}</Text>
                  <Text style={styles.details}>
                    User ID: {req.requestingUserId}
                  </Text>
                  <Text style={styles.details}>
                    Pets: {req.pets.map((pet) => pet.name).join(', ')}
                  </Text>
                  <Text style={styles.details}>
                    Service ID: {req.service?.name || 'Service not found'}
                  </Text>
                  <Text style={styles.details}>
                    Dates: {req.startDate} to {req.endDate}
                  </Text>
                  <Text style={styles.status}>Status: {req.status}</Text>
                  {req.details && <Text style={styles.details}>Details: {req.details}</Text>}
                </View>
              ))}
            </ScrollView>
      ) : (
        <View style={styles.noPetsSection}>
          <Text style={styles.noPetsText}>You have no requests yet.</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006c87', // Background for the entire screen
    padding: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Card background color
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008bad', // Title text color
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#333', // Neutral text color for details
    marginBottom: 3,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#008bad', // Highlight color for status
    marginTop: 5,
  },
   sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 50,
      color:"#fff",
      textAlign: 'center',
    },
});
