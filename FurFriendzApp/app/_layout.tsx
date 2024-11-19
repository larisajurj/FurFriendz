import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}> {/* Globally hide headers */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="registerType" />
      <Stack.Screen name="registerPage" />
      <Stack.Screen name="loginPage" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
