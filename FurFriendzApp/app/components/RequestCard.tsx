import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Import Vector Icons

const RequestCard = ({ req, handleAccept, handleDeny }) => {
    const speciesCount = req.pets.reduce(
      (acc, pet) => {
        if (pet.specieId === "Cat") {
          acc.cats += 1;
        } else if (pet.specieId === "Dog") {
          acc.dogs += 1;
        }
        return acc;
      },
      { cats: 0, dogs: 0 }
    );
      return (
    <View key={req.id} style={styles.card}>
      <Text style={styles.title}>Request #{req.id}</Text>
      <Text style={styles.details}>
        User ID: {req.requestingUserId}
      </Text>
      <Text style={styles.details}>
        Pets: {speciesCount.cats != 0 && speciesCount.dogs != 0 ? `${speciesCount.cats} Cat and ${speciesCount.dogs} Dog`
         : speciesCount.cats != 0 ? `${speciesCount.cats} Cats` : `${speciesCount.dogs} Dogs`}
      </Text>
      <Text style={styles.details}>
        Service ID: {req.service?.name || 'Service not found'}
      </Text>
      <Text style={styles.details}>
        Dates: {req.startDate} to {req.endDate}
      </Text>
      <Text style={styles.status}>Status: {req.status}</Text>
      {req.details && <Text style={styles.details}>Details: {req.details}</Text>}

      <View style={styles.buttonContainer}>
          <Button
            title="Accept"
            onPress={() => handleAccept(req.id, "Active")} // Pass request ID to the handler
            color="#4CAF50" // Green for Accept
          />
          <Button
            title="Deny"
            onPress={() => handleDeny(req.id, "Reviewed")} // Pass request ID to the handler
            color="#F44336" // Red for Deny
          />
        </View>
    </View>
  );
};

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
  buttonContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
});

export default RequestCard;
