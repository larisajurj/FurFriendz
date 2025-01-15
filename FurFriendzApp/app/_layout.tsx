import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import MapPage from './MapPage';
import ProfileScreen from './ProfileScreen';
import LoginPage from './LoginPage';
import RegisterType from './RegisterType';
import RegisterPage from './RegisterPage';
import PetSitterServiceScreen from './PetSitterServiceScreen'
import NotFound from './+not-found'; // Assuming a "not found" screen component
import Index from './(tabs)/index';
import { UserContext } from '../config/UserContext';
import AddPetScreen from './AddPetScreen';
import MyAccountPage from './MyAccountPage';
import PetFormScreen from './PetFormScreen';
import CreateListingForm from './CreateListingForm';
import CreateServiceForm from './CreateServiceForm';

const Stack = createStackNavigator();

export default function RootLayout() {
  const [user, setUser] = useState<UserModel | null>(null);

  return (
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationIndependentTree>
          <Stack.Navigator initialRouteName="Index">
            {/* Main Page (Index) */}
            <Stack.Screen
              name="Index"
              component={Index}
              options={{ headerShown: false }}
            />

            {/* Map Page */}
            <Stack.Screen
              name="MapPage"
              component={MapPage}
              options={{ headerShown: false }}
            />

            {/* Profile Screen */}
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />

            {/* Login Page */}
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
            />

            {/* Register Type */}
            <Stack.Screen
              name="RegisterType"
              component={RegisterType}
              options={{ headerShown: false }}
            />

            {/* Register Page */}
            <Stack.Screen
              name="RegisterPage"
              component={RegisterPage}
              options={{ headerShown: false }}
            />
            {/* My Account Page */}
            <Stack.Screen
              name='MyAccountPage'
              component={MyAccountPage}
              options={{ headerShown: false}}
            />
            {/* Pet Form Page */}
            <Stack.Screen
              name='PetFormScreen'
              component={PetFormScreen}
              options={{ headerShown: false}}
            />
            {/* Not Found Page */}
            <Stack.Screen
              name="NotFound"
              component={NotFound}
              options={{ headerShown: false }}
            />
            {/* Pet Sitter Screen */}
            <Stack.Screen
              name="PetSitterServiceScreen"
              component={PetSitterServiceScreen}
              options={{ headerShown: false }}
            />
            {/* Create Service Forme */}
            <Stack.Screen
              name="CreateServiceForm"
              component={CreateServiceForm}
              
            {/* Request Service Screen */}
            <Stack.Screen
              name="CreateListingForm"
              component={CreateListingForm}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationIndependentTree>
      </UserContext.Provider>
  );
}