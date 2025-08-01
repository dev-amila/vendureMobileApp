import { View, Text } from 'react-native'
import React from 'react'

const index = () => {
  // const { isLoggedIn } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.replace('/auth/login');
  //   }
  // }, [isLoggedIn]);

  // if (!isLoggedIn) return null; // or loading spinner

  return (
    <View>
      <Text>Welcome to your profile!</Text>
    </View>
  );
}

export default index