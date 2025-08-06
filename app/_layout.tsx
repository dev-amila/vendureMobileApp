import { Stack } from "expo-router";
import "./global.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/src/api/client";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#00273d",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
    >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ApolloProvider>
  );
}
