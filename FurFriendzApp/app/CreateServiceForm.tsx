import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PetSittingServicesEnum } from "@/api/model/petSittingServicesEnum";
import { AnimalSpecie } from "@/api/model/animalSpecie";
import { useUserContext } from "@/config/UserContext";
import { ServiceClient } from "@/api/clients/serviceClient";
import { ServiceModel } from "@/api/model/serviceModel";
import { CreateServiceModel } from "@/api/model/createServiceModel";

export default function CreateServiceForm() {
  const { user } = useUserContext();
  const route = useRoute();
  const navigation = useNavigation();
  const { serviceId } = route.params || {};
  const [serviceType, setServiceType] = useState('');
  const [price, setPrice] = useState<string>("");
  const [maxNumberOfPets, setMaxNumberOfPets] = useState<string>("");
  const [personalDescription, setPersonalDescription] = useState<string>("");
  const [typeOfPet, setTypeOfPet] = useState<AnimalSpecie | null>(null);

  useEffect(() => {
    // Fetch service details if serviceId is provided
    if (serviceId) {
      (async () => {
        try {
          const service = await ServiceClient.getServiceByIdAsync(serviceId);
          setPrice(service.price.toString());
          setServiceType(service.name);
          setMaxNumberOfPets(service.maxNumberOfPets?.toString() || "");
          setPersonalDescription(service.personalDescription || "");
          setTypeOfPet(service.typeOfPet);
        } catch (error) {
          console.error("Error fetching service details:", error);
          Alert.alert("Error", "Failed to load service details.");
        }
      })();
    }
  }, [serviceId]);

  const handleSubmit = async () => {
    if (!serviceType || !price || !typeOfPet) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    const serviceData: CreateServiceModel = {
      userId: user.id,
      name: PetSittingServicesEnum[serviceType as keyof typeof PetSittingServicesEnum],
      price: parseFloat(price),
      maxNumberOfPets: maxNumberOfPets ? parseInt(maxNumberOfPets, 10) : undefined,
      personalDescription: personalDescription || undefined,
      typeOfPet,
    };

    try {
      if (serviceId) {
        // Update existing service
        await ServiceClient.updateServiceAsync(serviceId, serviceData);
        Alert.alert("Success", "Service updated successfully!");
      } else {
        // Create new service
        await ServiceClient.addServiceAsync(serviceData);
        Alert.alert("Success", "Service created successfully!");
      }
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error("Error saving service:", error);
      Alert.alert("Error", "Failed to save service. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {serviceId ? "Edit" : "Create"} {serviceType} Service
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type of Pet</Text>
        <Picker
          selectedValue={typeOfPet}
          onValueChange={(itemValue) => setTypeOfPet(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Type of Pet" value={null} />
          <Picker.Item label="Cat" value="Cat" />
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Any" value="Any" />
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Max Number of Pets</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter max number of pets"
          keyboardType="numeric"
          value={maxNumberOfPets}
          onChangeText={setMaxNumberOfPets}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Personal Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter a brief description"
          multiline
          textAlignVertical="top"
          value={personalDescription}
          onChangeText={setPersonalDescription}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          {serviceId ? "Update" : "Create"} Service
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#006c87" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#fff" },
  inputGroup: { marginBottom: 15 },
  label: { marginBottom: 5, fontSize: 16, fontWeight: "bold", color: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, fontSize: 16, backgroundColor: "#ccc" },
  textArea: { height: 100 },
  picker: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: "#ccc" },
  submitButton: { backgroundColor: "#007bff", padding: 15, borderRadius: 5, alignItems: "center" },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
