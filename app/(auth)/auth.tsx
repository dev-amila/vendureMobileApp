import PageLoading from "@/components/loading/PageLoading";
import { LOGOUT } from "@/src/api/mutation/auth";
import { GET_CUSTOMER } from "@/src/api/mutation/customer";
import { SHOW_ORDER } from "@/src/api/mutation/order";
import { useStore } from "@/src/store/useStore";
import { useLazyQuery, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Login from "./login";

interface AuthScreenProps {
  children: React.ReactNode;
}

export default function AuthScreen({ children }: AuthScreenProps) {
  const isLoggedIn = useStore((s) => s.isLoggedIn);
  const setIsLoggedIn = useStore((s) => s.setIsLoggedIn);

  const [checkingToken, setCheckingToken] = useState(true);

  const [getCustomer, { data: customerData, loading: customerLoading }] =
    useLazyQuery(GET_CUSTOMER);
  const [getOrder, { refetch: refetchCart }] = useLazyQuery(SHOW_ORDER);

  const [logoutMutation] = useMutation(LOGOUT, {
    onError: async (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async () => {
      try {
        await refetchCart();
        await SecureStore.deleteItemAsync("token");
        setIsLoggedIn(false);
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "An error has occurred. Please try again.");
      }
    },
  });

  useEffect(() => {
    checkTokenExistence();
  }, []);

  const checkTokenExistence = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        await getCustomer();
        await getOrder();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        await logoutMutation();
      }
    } catch (error) {
      setIsLoggedIn(false);
      await logoutMutation();
    } finally {
      setCheckingToken(false);
    }
  };

  if (customerLoading || checkingToken) {
    return <PageLoading />;
  }

  if (!isLoggedIn || customerData?.activeCustomer === null) {
    return <Login />;
  }

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        refetchProfile: getCustomer,
        refetchCart,
      })}
    </>
  );
}