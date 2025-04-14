import { View, Text, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { TenderBidsProps, TenderProps } from '../CreateTender/createtender';

const BidsManagement = () => {
    const [bids, setBids] = useState([]);

    const loadBids = async () => {
        try {
            const data = await AsyncStorage.getItem('tenders');
            if (data) {
                const tenders: TenderProps[] = JSON.parse(data);
                let allBids: TenderBidsProps[] = [];

                tenders.forEach(tender => {
                    const { endTime, bids } = tender;

                    if (bids && Array.isArray(bids)) {
                        bids.forEach(bid => {
                            allBids.push({
                                ...bid,
                                tenderEnd: endTime ?? '',
                            });
                        });
                    }
                });

                allBids.sort((a, b) => parseFloat(a.bidCost) - parseFloat(b.bidCost));
                setBids(allBids);
            }
        } catch (error) {
            console.error("Failed to load bids:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadBids();
        }, [])
    );
    
    const isLast5Min = (time: string, end: string) => {
        if (!time || !end) return false;

        const [bidHour, bidMinute] = time.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);

        const bidTotal = bidHour * 60 + bidMinute;
        const endTotal = endHour * 60 + endMinute;

        return endTotal - bidTotal <= 5 && endTotal - bidTotal >= 0;
    };

    const TableHeader = () => (
        <View className="flex-row justify-between items-center border-b border-gray-600 p-2 bg-zinc-700">
            <Text className="text-white font-bold flex-1">Company</Text>
            <Text className="text-white font-bold flex-1">Time</Text>
            <Text className="text-white font-bold flex-1">Cost</Text>
            <Text className="text-white font-bold flex-1">Late?</Text>
        </View>
    );

    const TableRow = ({ item }: any) => (
        <View className="flex-row justify-between items-center border-b border-gray-700 p-2">
            <Text className="text-gray-100 flex-1">{item.companyName}</Text>
            <Text className="text-gray-100 flex-1">{item.bidTime}</Text>
            <Text className="text-gray-100 flex-1">{item.bidCost}</Text>
            <Text className="text-gray-100 flex-1">
                {isLast5Min(item.bidTime, item.tenderEnd) ? '⚠️' : ''}
            </Text>
        </View>
    );

    return (
        <View className="p-4 w-full h-full bg-zinc-800">
            <Text className="text-white text-4xl font-bold mb-4">Bids Management</Text>
            <TableHeader />
            <FlatList
                data={bids}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <TableRow item={item} />}
            />
        </View>
    );
};

export default BidsManagement;
