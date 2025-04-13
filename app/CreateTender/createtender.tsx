import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import '../../global.css'
import { useState } from "react";
import TextInp from "@/components/TextInp";
import { Feather } from '@expo/vector-icons';
import { AsyncStorage } from "@react-native-async-storage/async-storage"

export default function CreateTender() {

  const [tender, setTender] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    bufferTime: '',
  });

  const [bidding, setBidding] = useState({
    companyName: '',
    bid: '',
  });

  const handleChange = (field: string, value: any) => {
    setTender({ ...tender, [field]: value });
  };
  const handleBidChange = (field: string, value: any) => {
    setBidding({ ...bidding, [field]: value });
  };

  const saveTender = async () => {
    try {
      const existing = await AsyncStorage.getItem('tenders');
      const tenders = existing ? JSON.parse(existing) : [];
      tenders.push({ ...tender, id: Date.now().toString() });
      await AsyncStorage.setItem('tenders', JSON.stringify(tenders));
      Alert.alert('Tender saved locally!');
    } catch (e) {
      console.log(e);
    }
  };

  const inputStyle = 'py-3 w-full px-4 text-gray-300 text-md border border-gray-100 rounded-lg'


  return (
    <ScrollView
      className="flex p-6 w-full h-screen bg-zinc-800"
    >
      <Text className="text-2xl text-rose-500 font-bold">Create Tender</Text>
      <View className="flex flex-col w-full justify-center items-center gap-8 p-2">
        <View className="flex flex-col w-full justify-center gap-2">
          <TextInp
            name={'Tender Name'}
            value={tender.name}
            onChangeText={(v) => handleChange('name', v)}
            className={inputStyle}
          />
          <TextInp
            name={"Description"}
            value={tender.description}
            onChangeText={(v) => handleChange('description', v)}
            className={inputStyle}
          />
          <TextInp
            name={"Start Time"}
            value={tender.startTime}
            onChangeText={(v) => handleChange('startTime', v)}
            className={inputStyle}
          />
          <TextInp
            name={"End Time"}
            value={tender.endTime}
            onChangeText={(v) => handleChange('endTime', v)}
            className={inputStyle}
          />
          <TextInp
            name={"Buffer Time (minutes)"}
            value={tender.bufferTime}
            onChangeText={(v) => handleChange('bufferTime', v)}
            className={inputStyle}
          />
          <TouchableOpacity className="bg-rose-600 text-text_prm py-3 px-3 text-center rounded-lg font-semibold w-full">
            <Text className="text-text_prm text-center font-semibold">Submit</Text>
          </TouchableOpacity>
        </View>

        <View className="p-4 flex flex-col justify-center w-full gap-2 shadow shadow-white bg-zinc-900 rounded-lg">
          <Text className="text-gray-300 font-bold text-xl">Available Tenders</Text>
          <View className="flex flex-col w-full gap-4">
            <Text className="text-3xl text-white">Build Pipeline</Text>
            <View className="flex items-center justify-center gap-4 w-full">
              <View className="flex flex-row w-full justify-around gap-6">
                <Text className="text-gray-200">Something</Text>
                <Text className="text-gray-200">Something</Text>
              </View>
              <View className="w-full flex flex-row justify-around gap-6">
                <Text className="text-gray-200">Something</Text>
                <Text className="text-gray-200">Something</Text>
              </View>
            </View>
            <TextInp
              name="Company Name"
              value={bidding.companyName}
              onChangeText={(val) => handleBidChange('companyName', val)}
              className={inputStyle}
            />
            <TextInp
              name="Bid Cost"
              value={bidding.bid}
              onChangeText={(val) => handleBidChange('bid', val)}
              className={inputStyle}
            />
            <TouchableOpacity className="bg-rose-600 text-text_prm py-3 px-3 text-center rounded-lg font-semibold w-full">
              <Text className="text-text_prm text-center font-semibold" onPress={saveTender}>Submit</Text>
            </TouchableOpacity>
            <View className="py-2 px-4 w-2/3 mx-auto flex flex-row justify-center gap-4 bg-rose-600/20 border border-rose-200 rounded-xl">
                <Feather name="dollar-sign" size={20} color='#f9a8d4'/>
                <Text className="text-gray-200 font-semibold">A bid has been placed.</Text>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}