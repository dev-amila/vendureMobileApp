import { Link } from "expo-router";
import { Text, View } from "react-native";
import {
  SafeAreaView,
} from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">
          Welcome to Nativewind!
        </Text>
        <Link href={'/profile/login/index' }>log in</Link>
      </View>
    </SafeAreaView>
  );
}
