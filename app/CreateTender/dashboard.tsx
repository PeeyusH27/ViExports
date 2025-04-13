import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function Dashboard() {
  const [tenders, setTenders] = useState([]);

  const loadTenders = async () => {
    try {
      const data = await AsyncStorage.getItem('tenders');
      if (data) {
        setTenders(JSON.parse(data).reverse());
      } else {
        setTenders([]);
      }
    } catch (error) {
      console.error("Failed to load tenders:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTenders();
    }, [])
  );

  return (
    <View className='w-full h-full p-4 flex flex-col gap-4 bg-zinc-800'>
      <Text className='text-white text-xl'>Previous Tenders</Text>

      <FlatList
        data={tenders}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-white text-center">No tenders available.</Text>
        }
        renderItem={({ item }) => (
          <View className='px-4 py-2 bg-zinc-700 rounded-lg mb-2 flex flex-col gap-2'>
            <Text className='text-xl text-white font-semibold'>{item.name}</Text>
            <Text className='text-md text-gray-100'>{item.description}</Text>
            <View className='flex flex-row justify-around text-sm px-3 py-1 bg-zinc-600 rounded-lg'>
              <Text className='text-md text-gray-100'><Text className='text-green-500 font-medium'>{item.startTime}</Text></Text>
              <Text className='text-md text-gray-100'><Text className='text-red-600 font-medium'>{item.endTime}</Text></Text>
            </View>
            <Text className='text-md text-gray-100 text-center'>Time Remaining: {item.bufferTime} min</Text>
          </View>
        )}
      />

      <TouchableOpacity
        className="bg-rose-600 text-text_prm py-3 px-4 text-center rounded-lg font-semibold w-full"
        onPress={() => router.push('/CreateTender/createtender')}>
        <Text className="text-white text-xl text-center font-semibold">
          <Feather name='plus' size={20} /> Create Tender
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-rose-600 text-text_prm py-3 px-4 text-center rounded-lg font-semibold w-full"
        onPress={loadTenders}>
        <Text className="text-white text-xl text-center font-semibold">Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}
