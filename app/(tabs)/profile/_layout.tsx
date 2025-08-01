import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="login/index" />
      <Stack.Screen name="register/index" />
    </Stack>
  );
}