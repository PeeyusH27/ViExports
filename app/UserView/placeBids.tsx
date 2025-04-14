import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { TenderProps } from '../CreateTender/createtender';
import { router } from 'expo-router';

const PlaceBids = () => {
    const [tenders, setTenders] = useState([]);
    const [selectedTenderId, setSelectedTenderId] = useState('');
    const [company, setCompany] = useState('');
    const [cost, setCost] = useState('');

    useEffect(() => {
        const fetchTenders = async () => {
            const data = await AsyncStorage.getItem('tenders');
            if (data) {
                const parsed = JSON.parse(data);
                setTenders(parsed);
                if (parsed.length > 0) {
                    setSelectedTenderId(parsed[0].id);
                }
            }
        };
        fetchTenders();
    }, []);

    const getCurrentTime = () => {
        const now = new Date();
        const h = now.getHours().toString().padStart(2, '0');
        const m = now.getMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
    };

    const handlePlaceBid = async () => {
        if (!company || !cost || !selectedTenderId) {
            Alert.alert('Please fill all fields');
            return;
        }

        const data = await AsyncStorage.getItem('tenders');
        const tendersList: TenderProps[] = data ? JSON.parse(data) : [];

        const updatedTenders = tendersList.map(tender => {
            if (tender.id === selectedTenderId) {
                const newBid = {
                    companyName: company,
                    bidCost: parseFloat(cost),
                    bidTime: getCurrentTime(),
                };
                tender.bids = tender.bids ? [...tender.bids, newBid] : [newBid];
            }
            return tender;
        });

        await AsyncStorage.setItem('tenders', JSON.stringify(updatedTenders));
        Alert.alert('Bid placed successfully!');
        setCompany('');
        setCost('');
    };

    return (
        <View className='bg-zinc-800 h-full w-full p-4'>
            <Text className='text-4xl font-bold text-white mb-6'>Place Bids</Text>

            <Text className="text-white text-lg mb-2">Select Tender:</Text>
            <View className="bg-white rounded-lg mb-4">
                <Picker
                    selectedValue={selectedTenderId}
                    onValueChange={(itemValue) => setSelectedTenderId(itemValue)}
                >
                    {tenders.map((tender: TenderProps) => (
                        <Picker.Item key={tender.id} label={tender.name} value={tender.id} />
                    ))}
                </Picker>
            </View>

            <Text className="text-white text-lg mb-2">Company Name:</Text>
            <TextInput
                value={company}
                onChangeText={setCompany}
                placeholder="Enter company name"
                className="bg-white rounded-lg px-4 py-3 mb-4"
            />

            <Text className="text-white text-lg mb-2">Bid Cost (₹):</Text>
            <TextInput
                value={cost}
                onChangeText={setCost}
                placeholder="Enter bid cost"
                keyboardType="numeric"
                className="bg-white rounded-lg px-4 py-3 mb-6"
            />

            <TouchableOpacity
                className="bg-zinc-900 py-3 rounded-lg"
                onPress={handlePlaceBid}
            >
                <Text className="text-white text-xl text-center font-bold">Submit Bid</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-rose-700 py-3 rounded-lg mt-10"
                onPress={handlePlaceBid}
            >
                <Text className="text-white text-xl text-center font-bold" onPress={()=> router.push('/BidsManagement/bids')}>See all bids</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PlaceBids;
