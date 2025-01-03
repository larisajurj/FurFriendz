import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../config/UserContext';

export default function MapPage({route, navigation }) {
  const { userEmail } = route.params || {};
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { user } = useUserContext()

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get initial location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Watch location for updates
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 }, // Update every 10 meters
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Hamburger Menu */}
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() =>  navigation.navigate('ProfileScreen')}
      >
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Map View */}
      {location ? (
        <MapView
          style={styles.map}
          region={location}
          showsUserLocation={true}
        ></MapView>
      ) : (
        <Text style={styles.errorText}>{errorMsg || 'Loading map...'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006c87',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  hamburger: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#8BAAB2',
    borderRadius: 5,
    padding: 10,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});