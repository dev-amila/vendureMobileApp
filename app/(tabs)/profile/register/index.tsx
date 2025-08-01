import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import { registerSchema } from "@/src/utils/validation";
import { REGISTER_MUTATION } from "@/src/api/mutation/auth";
import { client } from "@/src/api/client";
import styles from "@/src/styles/styles";
import TextField from "@/components/TextField";
import { Button } from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

type RegisterFormData = {
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      emailAddress: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [registerCustomerAccount, { loading, error }] = useMutation(
    REGISTER_MUTATION,
    {
      client: client,
      onError: (error) => {
        Alert.alert("Erro", error.message);
      },
      onCompleted: async (data) => {
        const { registerCustomerAccount } = data;

        if (registerCustomerAccount.__typename === "Success") {
          navigation.navigate("AccountCreatedScreen");
        } else {
          switch (registerCustomerAccount.__typename) {
            case "MissingPasswordError":
              Alert.alert(
                "Erro ao registrar cliente:",
                "Por favor, insira uma senha."
              );
              break;
            case "PasswordValidationError":
              Alert.alert(
                "Erro ao registrar cliente:",
                "Senha inválida. Por favor, escolha uma senha mais segura."
              );
              break;
            case "NativeAuthStrategyError":
              Alert.alert(
                "Erro ao registrar cliente:",
                "Erro na estratégia de autenticação."
              );
              break;
            default:
              Alert.alert(
                "Erro ao registrar cliente:",
                "Ocorreu um erro ao registrar. Por favor, tente novamente."
              );
          }
        }
      },
    }
  );

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { emailAddress, firstName, lastName, password } = data;
      await registerCustomerAccount({
        variables: {
          emailAddress,
          firstName,
          lastName,
          password,
        },
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao fazer login. Por favor, tente novamente."
      );
    }
  };

  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.scroolViewContainer}>
          <Text variant="titleLarge" style={styles.title}>
            Sign up
          </Text>
          <View style={styles.fieldsContainer}>
            <TextField
              errors={errors.emailAddress?.message}
              placeholder="Email"
              name="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              control={control}
            />
            <TextField
              errors={errors.firstName?.message}
              placeholder="First name"
              name="firstName"
              control={control}
            />
            <TextField
              errors={errors.lastName?.message}
              placeholder="Last name"
              name="lastName"
              control={control}
            />
            <TextField
              errors={errors.password?.message}
              type="password"
              placeholder="Password"
              name="password"
              control={control}
            />
            <TextField
              errors={errors.confirmPassword?.message}
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              control={control}
            />
            <Button onPress={handleSubmit(onSubmit)}>Register</Button>
          </View>
            <TouchableOpacity
              style={styles.TouchableOpacitybtn}
              onPress={() => router.back()}
            >
              <Text style={styles.TouchableOpacitybtnText}>
                Login
              </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
