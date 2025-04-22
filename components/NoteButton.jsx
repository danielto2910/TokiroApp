import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

const NoteButton = ({ name, description, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="w-[130px] mt-3 h-[180px] bg-[#fff9e6] rounded-3xl items-center p-2 shadow-lg"
    >
      {/* Note Title */}
      <Text className="text-lg font-bold text-black text-center">{name}</Text>

      {/* Note Description */}
      {description ? (
        <Text
          className="text-xs text-gray-400 text-center mt-2"
          numberOfLines={5}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default NoteButton;
