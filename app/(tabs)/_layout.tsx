import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="category" focused size={24} color="black" />
            // <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          // tabBarButton: () => null,
          href: null
        }}
      />
       <Tabs.Screen
        name="product"
        options={{
          // tabBarButton: () => null,
          href: null // hides from tab bar
        }}
      />

    </Tabs>
  );
}
