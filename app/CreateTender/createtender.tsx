import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import '../../global.css'
import { useState } from "react";
import TextInp from "@/components/TextInp";
import AsyncStorage from "@react-native-async-storage/async-storage"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';


interface TenderProps {
  name: any,
  description: string,
  startTime: string,
  endTime: string,
  bufferTime: number
}


export default function CreateTender() {

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Functions to handle time selection
  const onStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartPicker(Platform.OS === 'ios'); // keep open on iOS
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      handleChange('startTime', timeString);
    }
  };

  const onEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      handleChange('endTime', timeString);
    }
  };



  const [tender, setTender] = useState<TenderProps>({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    bufferTime: 0,
  });

  const handleChange = (field: string, value: any) => {
    setTender({ ...tender, [field]: value });
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
          <View>
            <Text className="text-gray-300 mb-1">Start Time</Text>
            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              className={inputStyle}
            >
              <Text className="text-gray-300">
                {tender.startTime || 'Select Start Time'}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                mode="time"
                value={new Date()}
                is24Hour={true}
                display="default"
                onChange={onStartTimeChange}
              />
            )}
          </View>

          {/* End Time Picker */}
          <View>
            <Text className="text-gray-300 mb-1">End Time</Text>
            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              className={inputStyle}
            >
              <Text className="text-gray-300">
                {tender.endTime || 'Select End Time'}
              </Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                mode="time"
                value={new Date()}
                is24Hour={true}
                display="default"
                onChange={onEndTimeChange}
              />
            )}
          </View>
          <TextInp
            name={"Buffer Time (minutes)"}
            value={tender.bufferTime}
            onChangeText={(v) => handleChange('bufferTime', v)}
            className={inputStyle}
          />
          <TouchableOpacity className="bg-rose-600 text-text_prm py-3 px-3 text-center rounded-lg font-semibold w-full">
            <Text className="text-text_prm text-center font-semibold" onPress={saveTender}>Submit</Text>
          </TouchableOpacity>
        </View>


      </View>
    </ScrollView>
  );
}