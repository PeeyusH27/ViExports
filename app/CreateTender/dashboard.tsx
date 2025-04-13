import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function Dashboard() {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const loadTenders = async () => {
      const data = await AsyncStorage.getItem('tenders');
      if (data) setTenders(JSON.parse(data));
    };
    loadTenders();
  }, []);

  return (
    <View className='w-full h-full p-4 flex flex-col gap-4 bg-zinc-800'>
    <Text className='text-white text-xl'>Previous Tenders</Text>
    <FlatList
      data={tenders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
    <TouchableOpacity
            className="bg-rose-600 text-text_prm py-3 px-4 text-center rounded-lg font-semibold w-full"
            onPress={() => router.push('/CreateTender/createtender')}>
                <Text className="text-white text-xl text-center font-semibold"><Feather name='plus' size={20} /> Create Tender</Text>
            </TouchableOpacity>
    </View>
  );
}