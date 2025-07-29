
import { GET_ALL_COLLECTIONS } from '@/src/api/mutation/category';
import { Category } from '@/src/utils/interface';
import { useQuery } from '@apollo/client';
import { Text, View } from "react-native";


export default function Index() {
  
  const { loading, error, data } = useQuery(GET_ALL_COLLECTIONS);
  const categories: Category[] = data?.collections.items || [];
  console.log(categories);
  console.log(error);
  
  
  
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>

      {categories.map((c) => (
        <View key={c.id}>
          <Text className="text-xl font-bold text-blue-500" >
            {c.name}
          </Text>
        </View>
      ))}
    </View>
  );
}
