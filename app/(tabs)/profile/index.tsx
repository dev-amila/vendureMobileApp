import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';

const index = () => {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn = true;
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.replace('/auth/login');
  //   }
  // }, [isLoggedIn]);

  // if (!isLoggedIn) return null; // or loading spinner

  if(!isLoggedIn){
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <Text>Welcome to your profile!</Text>
    </View>
  );
}

export default index