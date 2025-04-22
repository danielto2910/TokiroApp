import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

const NoteButton = ({ name, description, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="w-[130px] h-[180px] bg-[#f9f5dd] rounded-3xl border-2 border-[#fddfb3] items-center p-2 shadow-lg relative"
    >

      <View className="flex-1 w-full bg-[#FFF8E1] rounded-2xl p-2 ">
      {/* Note Title */}
      <Text className="text-lg font-bold text-[#004225] text-center">{name}</Text>

      {/* Note Description */}
      {description ? (
        <Text
          className="text-base text-[#004225] text-center mt-2"
          numberOfLines={5}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default NoteButton;
