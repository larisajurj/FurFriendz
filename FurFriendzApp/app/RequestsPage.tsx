import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useUserContext } from '../config/UserContext';
import { RequestStatus } from '@/api/model/requestStatus';
import { ServiceClient } from '@/api/clients/serviceClient';
import Toast from 'react-native-toast-message';

export default function RequestsPage({ route }) {
  const { user } = useUserContext();
  const { status } = route.params;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserRequests = async () => {
    try {
      const response = await ServiceClient.getRequestsFromUserAsync(user.id);
      await processRequests(response);
    } catch (error) {
      console.error('Error fetching user requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserListings = async () => {
    try {
      const response = await ServiceClient.getRequestsForPetSitterAsync(user.id);
      await processRequests(response);
    } catch (error) {
      console.error('Error fetching sitter requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const processRequests = async (requestsData) => {
    const requestsWithServices = await Promise.all(
      requestsData.map(async (req) => {
        try {
          const service = await ServiceClient.getServiceByIdAsync(req.serviceId);
          return { ...req, service };
        } catch (error) {
          console.error(`Error fetching service for serviceId ${req.serviceId}:`, error);
          return { ...req, service: null };
        }
      })
    );

    const filtered = requestsWithServices.filter(r => r.status === status);
    setRequests(filtered);
  };

  const handleCompleteRequest = async (requestId) => {
    try {
      console.log(`Completing request ID: ${requestId}`);
      await ServiceClient.changeRequestStatusAsync(requestId, RequestStatus.Finished);

      // Show success toast
      Toast.show({
        type: 'success',
        text1: `Request #${requestId} Completed 🎉`,
        text2: 'You’ve successfully completed the request.',
      });

      // Refresh requests after status update
      user.role === 'PetSitter' ? fetchUserListings() : fetchUserRequests();
    } catch (error) {
      console.error(`Error completing request #${requestId}:`, error);

      // Show error toast
      Toast.show({
        type: 'error',
        text1: `Failed to complete request #${requestId} 😿`,
        text2: 'Please try again later.',
      });
    }
  };

  useEffect(() => {
    if (user.role === 'PetSitter') {
      fetchUserListings();
    } else {
      fetchUserRequests();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your requests</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading requests...</Text>
      ) : requests.length > 0 ? (
        <ScrollView style={styles.container}>
          {requests.map((req) => (
            <View key={req.id} style={styles.card}>
              <Text style={styles.title}>Request #{req.id}</Text>
              <Text style={styles.details}>User ID: {req.requestingUserId}</Text>
              <Text style={styles.details}>Pets: {req.pets.map((pet) => pet.name).join(', ')}</Text>
              <Text style={styles.details}>
                Service: {req.service?.name || 'Service not found'}
              </Text>
              <Text style={styles.details}>Dates: {req.startDate} to {req.endDate}</Text>
              <Text style={styles.status}>Status: {req.status}</Text>
              {req.details && <Text style={styles.details}>Details: {req.details}</Text>}

              {/* Complete Request Button */}
              {req.status !== RequestStatus.Finished && status==="Accepted" && (
                <TouchableOpacity 
                  style={styles.completeButton} 
                  onPress={() => handleCompleteRequest(req.id)}
                >
                  <Text style={styles.completeButtonText}>Complete Request</Text>
                </TouchableOpacity>
              )}
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
  loadingText: {
     fontSize: 24,
     fontWeight: 'bold',
     marginBottom: 50,
     color:"#fff",
     textAlign: 'center',
  },
  noPetsText: {
     fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 50,
      color:"#fff",
      textAlign: 'center',
  },
  completeButton: {
    backgroundColor: '#008bad',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
