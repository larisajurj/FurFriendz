// app/auth/GoogleLogin.tsx
import React from 'react';
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

export default function GoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: 'YOUR_GOOGLE_CLIENT_ID',
    androidClientId: 'YOUR_GOOGLE_CLIENT_ID',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Handle successful authentication here
    }
  }, [response]);

  return (
    <View>
      <Text>Login with Google</Text>
      <Button
        title="Login with Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}
