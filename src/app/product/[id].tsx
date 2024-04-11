import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Product() {
  const { id } = useLocalSearchParams();
  console.log(id);

  return <View className="flex-1"></View>;
}
