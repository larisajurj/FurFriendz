import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Button, TouchableOpacity,TouchableHighlight, Text, ScrollView} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../config/UserContext';
import {Dimensions, Animated } from "react-native";
import { PetSittingServicesEnum } from "@/api/model/petSittingServicesEnum"
import SlidingUpPanel from "rn-sliding-up-panel";
import { UserClient } from '@/api/clients/userClient';
import '@/api/model/userModel';
import {DoublePressMarker} from "./components/DoublePressMarker"
const { height } = Dimensions.get("window");
import PetSitterCard from "./components/PetSitterCard"


export default function MapPage({route, navigation }) {
  const { user } = useUserContext();
  const [location, setLocation] = useState({
      latitude: user.homeAddress.latitude || 0,
      longitude: user.homeAddress.longitude || 0,
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034,
    });
  const [errorMsg, setErrorMsg] = useState(null);
  const panelRef = useRef(null); // Reference for SlidingUpPanel
  const [isPanelExpanded, setPanelExpanded] = useState(false);
  const draggedValue = useRef(new Animated.Value(100)).current; // Animated value
  const [selectedService, setSelectedService] = useState(null);
  const draggableRange = { top: height + 100 - 64, bottom: 100 }; // Draggable range
  const { top, bottom } = draggableRange;
  const [petSitters, setPetSitters] = useState([]);
  const [allPetSitters, setAllPetSitters] = useState([]);


    // Animated interpolations
    const backgoundOpacity = draggedValue.interpolate({
      inputRange: [height - 48, height],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const iconTranslateY = draggedValue.interpolate({
      inputRange: [height - 56, height, top],
      outputRange: [0, 56, 180 - 32],
      extrapolate: "clamp",
    });

    const textTranslateY = draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 80],
      extrapolate: "clamp",
    });
    const buttonsTranslateY = draggedValue.interpolate({
          inputRange: [bottom, top],
          outputRange: [0, 100],
          extrapolate: "clamp",
        });

    const textTranslateX = draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, -112],
      extrapolate: "clamp",
    });

    const buttonsTranslateX = draggedValue.interpolate({
          inputRange: [bottom, top],
          outputRange: [0, -112],
          extrapolate: "clamp",
        });

    useEffect(() => {
        (async () => {
          const petSittersList = await getPetSitters();
          setAllPetSitters(petSittersList);
          setPetSitters(petSittersList);
          setLocation({
            latitude: user.homeAddress.latitude, //currentLocation.coords.latitude,
            longitude: user.homeAddress.longitude, //currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        })();
        }, []);
    const handlePress =  (service) => {
        // If the same service is selected, deselect it
        if (selectedService === service) {
          setSelectedService(null);
          setPetSitters(allPetSitters);
        } else {
          // Otherwise, select the pressed service
          setSelectedService(service);
          const filteredPetSitters = allPetSitters.filter(petSitter => {
              return petSitter.services.some(s => {
                  return PetSittingServicesEnum[service] == s.name;
              });
          });
          setPetSitters(filteredPetSitters);
        }
      };
    const getPetSitters = async () => {
       try {
           return await UserClient.getPetSitters();
       } catch (error) {
           console.error('Error fetching petSitters data:', error);
           throw error; // Propagate the error
       }
    };
  return (
    <View style={styles.container}>
          {/* Map View */}
          {location ? (
            <MapView
              style={styles.map}
              region={location}
              showsUserLocation={false}
            >
            <Marker coordinate={{
               latitude: user.homeAddress.latitude, //currentLocation.coords.latitude,
               longitude: user.homeAddress.longitude, //currentLocation.coords.longitude,
               latitudeDelta: 0.01,
               longitudeDelta: 0.01
             }}
             title="Home Address"
             description="You can only requests services for this address"
             image={require('../assets/images/house-pin.png')} // Custom marker icon
             />
            {petSitters
               .filter((petSitter) => petSitter.homeAddress != null) // Filter pet sitters with valid addresses
               .map((petSitter, index) => (
                 <DoublePressMarker
                   key={index} // Ensure a unique key for each marker
                   coordinate={{
                     latitude: petSitter.homeAddress.latitude,
                     longitude: petSitter.homeAddress.longitude,
                   }}
                   title= {`${petSitter.firstName} ${petSitter.lastName}`}
                   description={`@${petSitter.username}`}
                   image={require('../assets/images/petsitter-pin.png')} // Custom marker icon
                   onDoublePress = {() =>
                      navigation.navigate('PetSitterServiceScreen', {
                        petSitter: petSitter
                   })}
                 />
            ))}

            </MapView>

          ) : (
            <Text style={styles.errorText}>{errorMsg || 'Loading map...'}</Text>
          )}
      {/* Conditional Hamburger Menu */}
          {!isPanelExpanded && (
            <TouchableOpacity
              style={styles.hamburger}
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>
          )}
        <SlidingUpPanel
            ref={panelRef}
            draggableRange={draggableRange}
            animatedValue={draggedValue} // Pass animated value
            snappingPoints={[draggableRange.bottom, draggableRange.top]}
            height={height + 100}
            friction={0.5}
            onDragEnd={() => {
                setPanelExpanded(!isPanelExpanded);
                }}
            >
            <View style={styles.panel}>
              <Animated.View
                style={[
                  styles.iconBg,
                  {
                    opacity: backgoundOpacity,
                    transform: [{ translateY: iconTranslateY }],
                  },
                ]}
              />
              <View style={styles.panelHeader}>
                <Animated.View
                  style={{
                    transform: [
                      { translateY: textTranslateY },
                    ],
                  }}
                >
                  <Text style={styles.textHeader}>Request a service</Text>
                </Animated.View>
                <Animated.View
                  style={{
                    transform: [
                      { translateY: buttonsTranslateY },
                    ],
                  }}
                >
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.serviceButton, selectedService == PetSittingServicesEnum.DogWalking && styles.selectedButton]} title="Service 1" onPress={() => handlePress(PetSittingServicesEnum.DogWalking)} >
                        <Text style={[styles.buttonText, selectedService == PetSittingServicesEnum.DogWalking && styles.selectedButtonText]}>Dog Walking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.serviceButton, selectedService == PetSittingServicesEnum.PersonalHouseSitting && styles.selectedButton]} title="Service 1" onPress={() => handlePress(PetSittingServicesEnum.PersonalHouseSitting)} >
                        <Text style={[styles.buttonText, selectedService == PetSittingServicesEnum.PersonalHouseSitting && styles.selectedButtonText]}>House Sitting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.serviceButton, selectedService == PetSittingServicesEnum.CustomerHouseSitting && styles.selectedButton]} title="Service 1" onPress={() => handlePress(PetSittingServicesEnum.CustomerHouseSitting)} >
                        <Text style={[styles.buttonText, selectedService == PetSittingServicesEnum.CustomerHouseSitting && styles.selectedButtonText]}>House Visits</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </View>
              <View style={styles.pullUpContainer}>
                <ScrollView style={styles.scrollView}>
                    {petSitters.map((petSitter, index) => (
                         <PetSitterCard
                            key={petSitter.id}
                            user={petSitter}
                            navigation={navigation}/>
                         ))}
                </ScrollView>
              </View>
            </View>
        </SlidingUpPanel>
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
    zIndex: 0,
  },
  hamburger: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
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
  panel: {
      flex: 1,
      backgroundColor: "transparent",
      position: "relative",
      zIndex: 2,
    },
    panelHeader: {
      height: 120,
      backgroundColor: "#006c87",
      padding: 24,
      borderTopLeftRadius: 50, // Adjust the radius value as needed
      borderTopRightRadius: 50, // Adjust the radius value as needed
      zIndex: 2,
      width: "100%",
    },
    textHeader: {
      fontSize: 20,
      color: "#FFF",
      textAlign: "center",
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
      margin: 10
    },
    pullUpContainer: {
      flex: 1,
      backgroundColor: '#006c87',
      paddingTop: "25%"
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 10,
    },
    selectedButton: {
      backgroundColor: '#57c7ff', // Darker blue when selected
    },
    selectedButtonText: {
      color: '#006c87',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 10,
    }

});