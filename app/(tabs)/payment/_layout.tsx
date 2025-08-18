// import { Stack } from "expo-router";

// export default function PaymentLayout() {
//   return;
//   <Stack screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="paymentConfirmation" options={{ headerShown: false }} />
//   </Stack>;
// }

import { Stack } from 'expo-router';

export default function PaymentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="paymentConfirmation" options={{ headerShown: false }} />
    </Stack>
  );
}
