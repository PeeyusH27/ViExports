import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import '../global.css';

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-zinc-900 px-6">
      <Text className="text-3xl text-white font-bold mb-8">Tender Management</Text>

      <TouchableOpacity
        onPress={() => router.push('/CreateTender/dashboard')}
        className="bg-rose-600 py-3 px-6 rounded-lg"
      >
        <Text className="text-white font-semibold text-lg">Go to Create Tender</Text>
      </TouchableOpacity>
    </View>
  );
}
