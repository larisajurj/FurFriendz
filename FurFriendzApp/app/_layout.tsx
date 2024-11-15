// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="registerType" options={{ title: 'Register Type' }} />
      <Stack.Screen name="auth" options={{ title: 'Login / Register' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
