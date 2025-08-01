import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import { useMutation, useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

import { logInSchema } from "@/src/utils/validation";
import { GET_CUSTOMER } from "@/src/api/mutation/customer";
import { SHOW_ORDER } from "@/src/api/mutation/order";
import TextField from "@/components/TextField";
import { Button } from "@/components/Button";
import { LOGIN_MUTATION } from "@/src/api/mutation/auth";
import { useStore } from "@/src/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import styles from "@/src/styles/styles";
import { moderateScale } from "react-native-size-matters";

type LoginFormData = {
  username: string;
  password: string;
};

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const router = useRouter();
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const { refetch: refetchProfile } = useQuery(GET_CUSTOMER);
  const { refetch: refetchCart } = useQuery(SHOW_ORDER);


  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(logInSchema),
    defaultValues: { username: "", password: "" },
  });

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async (data) => {
      try {
        const { login } = data;
        if (login.__typename === "CurrentUser") {
          await refetchProfile();
          await refetchCart();
          setIsLoggedIn(true);
          navigation.navigate("Profile");
          await makeAuthenticatedRequest(`${process.env.API_URL}`); 
        } else {
          Alert.alert("Erro", "Utilizador ou senha inválidos.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao fazer login. Por favor, tente novamente."
        );
      }
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { username, password } = data;

      const response = await loginMutation({ variables: { username, password } });

      if (response.data && response.data.login && response.data.login.__typename === "CurrentUser") {
        const channels = response.data.login.channels;

        if (channels && channels.length > 0) {
          const token = channels[0].token;
          const pass = password;
          await updateAuthToken(token, pass);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function getAuthToken() {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Erro ao obter o token:", error);
      throw error;
    }
  }

  async function updateAuthToken(newToken: string, pass: string) {
    try {
      await SecureStore.setItemAsync("token", newToken);
      await SecureStore.setItemAsync("password", pass);
    } catch (error) {
      console.error("Erro ao atualizar o token:", error);
      throw error;
    }
  }
  
  async function makeAuthenticatedRequest(url: string, options: RequestInit = {}) {
    try {
      const authToken = await getAuthToken();
      const headers = {
        ...options.headers,
        Authorization: `Bearer ${authToken}`,
      };
      const response = await fetch(url, { ...options, headers });
      return response.json();
    } catch (error) {
      console.error("Erro ao fazer a solicitação autenticada:", error);
      throw error;
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView >
        <View className="" style={styles.scroolViewContainer}>
          <View className="justify-center items-center" 
          style={{
            marginBottom: moderateScale(60),
            marginTop: moderateScale(60)
          }}>
            <Text variant="titleLarge" 
            style={styles.title}>
              Vendure App
            </Text>
          </View>
          <View style={styles.title} >
            <Text variant="titleMedium" style={styles.title}>
              Sign in
            </Text>
            <View  style={styles.fieldsContainer}>
              <TextField
                errors={errors.username?.message}
                placeholder="Email"
                name="username"
                control={control as any}
              />
              <TextField
                errors={errors.password?.message}
                type="password"
                placeholder="Password"
                name="password"
                control={control as any}
              />
              <Button onPress={handleSubmit(onSubmit)}>Login</Button>
              <TouchableOpacity
                style={styles.TouchableOpacitybtn}
                onPress={() => {
                  router.push("./register");
                }}
              >
                <Link style={styles.TouchableOpacitybtnText} href={"/profile/register/index"}>Register</Link>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}