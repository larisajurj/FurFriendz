import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const useImagePicker = () => {
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to grant media library permissions to pick a picture.');
      return null;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      try {
        const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return base64Image;
      } catch (error) {
        console.error('Error reading the image file:', error);
        Alert.alert('Error', 'Unable to process the image. Please try again.');
      }
    }
    return null;
  };

  return { pickImage };
};
