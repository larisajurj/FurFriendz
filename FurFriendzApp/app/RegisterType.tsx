import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';

export default function RegisterTypeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register as:</Text>
      <Image source={require('../assets/bunica.png')} style={styles.mainLogoBuni} />
      <TouchableOpacity style={styles.button} onPress={() =>
        navigation.navigate('RegisterPage', {
          userType: "owner"
        })
      }>
        <Text style={styles.buttonText}>Pet Owner</Text>
      </TouchableOpacity>
      <Image source={require('../assets/domnu.png')} style={styles.mainLogoDomn} />
      <TouchableOpacity style={styles.button} onPress={() =>
          navigation.navigate('RegisterPage', {
            userType: "sitter"
         })
      }>
        <Text style={styles.buttonText}>Pet Sitter</Text>
      </TouchableOpacity>
      <Text style={styles.note}>You can always register as another type later</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006c87',
    paddingHorizontal: 20,
  },
  mainLogoDomn: {
    width: 150,
    height: 150,
    marginBottom: 1, // Reduced margin to bring image closer to button
  },
  mainLogoBuni: {
    width: 150,
    height: 150,
    marginBottom: -16, // Reduced margin to bring image closer to button
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#8BAAB2',
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
    width: '40%',
    alignItems: 'center',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  note: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});
