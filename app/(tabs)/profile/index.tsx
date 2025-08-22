import Auth from "@/app/(auth)/auth";
import BoxLink from "@/components/BoxLink";
import Icons from "@/components/icons/icons";
import PageLoading from "@/components/loading/PageLoading";
import { GET_CUSTOMER } from "@/src/api/mutation/customer";
import { Customer } from "@/src/utils/interface";
import { safeScale } from "@/src/utils/safeScale";
import { useQuery } from "@apollo/client";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { data, loading, error } = useQuery(GET_CUSTOMER);

  const insets = useSafeAreaInsets();

  const profilePaths = [
    {
      name: "Account information",
      Icon: Icons.FontAwesome5,
      IconName: "user",
      path: "information_account",
    },
    {
      name: "Purchase history",
      Icon: Icons.MaterialCommunityIcons,
      IconName: "shopping-outline",
      path: "history",
    },
    {
      name: "Address",
      Icon: Icons.MaterialIcons,
      IconName: "location-city",
      path: "address",
    },
    {
      name: "Change password",
      Icon: Icons.Ionicons,
      IconName: "lock-closed-outline",
      path: "password",
    },
    {
      name: "Favorites",
      Icon: Icons.Feather,
      IconName: "heart",
      path: "favorite",
    },
  ];

  const activeCustomer: Customer | undefined = data?.activeCustomer || {
    id: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
  };

  if (error) return <Text>{error.message}</Text>;

  return (
    <Auth>
      {loading || data?.activeCustomer === null ? (
        <PageLoading />
      ) : (
        <ScrollView style={styles.container}>
          <View style={[styles.mainContainer, { paddingTop: insets.top + 20 }]}>
            <View style={styles.userInfoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {activeCustomer?.firstName + " " + activeCustomer?.lastName}
                </Text>
                <Text style={styles.platform}>
                  {activeCustomer?.emailAddress}
                </Text>
              </View>
              <TouchableOpacity 
              onPress={() =>
              {}
               }>
                <Icons.Feather
                  name="settings"
                  size={safeScale(30)}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.linkContainer}>
              {profilePaths.map((item, index) => (
                <BoxLink
                  key={index}
                  path={item.path}
                  name={item.name}
                >
                  <item.Icon
                    name={item.IconName}
                    size={safeScale(24)}
                    style={styles.icon}
                  />
                </BoxLink>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: safeScale(16),
  },
  textContainer: {
    flex: 1,
    marginLeft: safeScale(8),
  },
  name: {
    fontSize: safeScale(20),
    fontWeight: "bold",
  },
  platform: {
    fontSize: safeScale(16),
    color: "gray",
  },
  linkContainer: {
    // marginTop: safeScale(25),
    // paddingHorizontal: safeScale(10),
  },
  icon: {
    color: "gray",
  },
});