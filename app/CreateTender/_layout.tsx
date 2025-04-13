import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { Slot } from 'expo-router';

export default function AdminLayout() {
  return (
      <View className='flex flex-col h-screen bg-zinc-800 p-2'>
            <Text className='text-4xl font-bold text-white'>Admin Panel</Text>
            <Stack
              screenOptions={{
                headerShown:false,
                statusBarHidden:true
              }}>
    </Stack>
        </View>
  );
}