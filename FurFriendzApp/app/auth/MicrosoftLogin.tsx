// app/auth/MicrosoftLogin.tsx
import React from 'react';
import { Button, View, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';

export default function MicrosoftLogin() {
  const redirectUri = AuthSession.makeRedirectUri({});
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'YOUR_MICROSOFT_CLIENT_ID',
      responseType: 'token',
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
    },
    { authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize' }
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Handle successful authentication here
    }
  }, [response]);

  return (
    <View>
      <Text>Login with Microsoft</Text>
      <Button
        title="Login with Microsoft"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}
