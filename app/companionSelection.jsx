import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
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
      router.push('/landingPage');
    } catch (error) {
      console.error("Failed to create companion:", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#DFF5CC] px-4 pt-12">
      <View className="absolute bottom-[-500px] right-[-200px] w-[400px] h-[400px] bg-[#ffe8be] rounded-full z-0"></View>
      <Text className="text-3xl font-bGarden text-[#004225] text-center mb-6">
        Choose Your Companion
      </Text>

      {companions.map((item) => {
        const isSelected = selectedCompanion?.id === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            className={`p-4 rounded-2xl mb-4 flex-row items-center ${
              isSelected
                ? 'bg-[#fff5d5] border-2 border-[#FFD79B]'
                : 'bg-[#fcedd7]'
            }`}
            onPress={() => setSelectedCompanion(item)}
          >
            <Image source={item.avatar} className="w-16 h-16 rounded-full mr-4" />
            <Text className="text-xl text-[#004225] font-psemibold">
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      <Text className="text-center text-lg font-pmedium text-[#004225] mt-2 mb-2">
        Selected Companion:{" "}
        <Text className="font-pbold">
          {selectedCompanion ? selectedCompanion.name : '---'}
        </Text>
      </Text>

      <TouchableOpacity
        className={`py-4 rounded-xl ${
          selectedCompanion ? 'bg-[#FFD79B]' : 'bg-gray-300'
        }`}
        onPress={handleConfirm}
        disabled={!selectedCompanion}
      >
        <Text className="text-[#004225] text-center text-lg font-pbold">
          Confirm
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CompanionSelector;
