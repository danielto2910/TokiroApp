import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthProvider';
import { images } from '../constants';

const companions = [
  {
    id: '1',
    name: 'Flame Fox',
    key: 'flameFox',
    avatar: images.flameFox,
  },
  {
    id: '2',
    name: 'Aqua Cat',
    key: 'aquaCat',
    avatar: images.aquaCat,
  },
  {
    id: '3',
    name: 'Terra Turtle',
    key: 'terraTurtle',
    avatar: images.terraTurtle,
  },
];

const CompanionSelector = () => {
  const router = useRouter();
  const { createCompanion } = useAuth();
  const [selectedCompanion, setSelectedCompanion] = useState(null);

  const handleConfirm = async () => {
    if (!selectedCompanion) return;
    try {
      await createCompanion(selectedCompanion.name, selectedCompanion.key);
      router.push('/landingPage'); // Update this route if needed
    } catch (error) {
      console.error("Failed to create companion:", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      <Text className="text-3xl font-bold text-center mb-6">Choose Your Companion</Text>

      {companions.map((item) => {
        const isSelected = selectedCompanion?.id === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            className={`p-4 rounded-2xl mb-4 flex-row items-center ${
              isSelected ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'
            }`}
            onPress={() => setSelectedCompanion(item)}
          >
            <Image source={item.avatar} className="w-16 h-16 rounded-full mr-4" />
            <Text className="text-xl font-semibold">{item.name}</Text>
          </TouchableOpacity>
        );
      })}

      <Text className="text-center text-lg font-medium mt-2 mb-2">
        Selected Companion:{" "}
        <Text className="font-bold">
          {selectedCompanion ? selectedCompanion.name : '---'}
        </Text>
      </Text>

      <TouchableOpacity
        className={`py-4 rounded-xl ${
          selectedCompanion ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onPress={handleConfirm}
        disabled={!selectedCompanion}
      >
        <Text className="text-white text-center text-lg font-bold">
          Confirm
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CompanionSelector;
