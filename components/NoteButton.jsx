import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

const NoteButton = ({ name, description, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="border-2 border-secondary-700 w-[130px] mt-3 h-[180px] bg-secondary-400 rounded-3xl items-center p-2"
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
