import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const EventButton = ({ name, location, description, onPress, finishedState }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="border-2 border-secondary-700 w-[130px] mt-3 h-[180px] bg-secondary-400 rounded-3xl items-center p-2"
    >
      {/* Event Name */}
      <Text className="text-lg font-bold text-black text-center">{name}</Text>

      {/* Location */}
      {location ? (
        <Text className="text-sm text-gray-500 text-center mt-1">
          {location}
        </Text>
      ) : null}

      {/* Description */}
      {description ? (
        <Text
          className="text-xs text-gray-400 text-center mt-2"
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      ) : null}

      {/* Completion Status */}
      <View className="mt-2">
        <Text className={`text-xs text-center ${finishedState ? 'text-green-500' : 'text-red-500'}`}>
          {finishedState ? 'Completed' : 'Incomplete'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventButton;
