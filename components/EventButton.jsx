import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const EventButton = ({ name, location, description, onPress, finishedState, exp }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="w-[130px] h-[180px] bg-[#f9f5dd] rounded-3xl border-2 border-[#fddfb3] items-center p-2 shadow-lg relative"
    >
      <View className="flex-1 w-full bg-[#FFF8E1] rounded-2xl p-2 ">
        {/* Event Name */}
        <Text className="text-lg font-bold text-[#204a35] text-center">{name}</Text>

        {/* Location */}
        {location ? (
          <Text className="text-base text-[#204a35] text-center mt-1">{location}</Text>
        ) : null}

        {/* Description */}
        {description ? (
          <Text
            className="text-base text-[#204a35] text-center mt-2"
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

        {/* EXP Display */}
        {exp ? (
          <View className="absolute bottom-2 right-2 bg-[#dff5cc] px-2 py-1 rounded-full">
            <Text className="text-[10px] font-bold text-[#004225]">{exp} EXP</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default EventButton;
