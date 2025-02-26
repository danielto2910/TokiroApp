import React from 'react'
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'; // Assuming you have profile images in constants
import { icons } from '../../constants'; // Assuming you have icons for buttons
const Profile = () => {
  const exp = 60; // Current EXP
  const maxExp = 140; // Max EXP for the level
  const progress = (exp / maxExp) * 100; // Calculate percentage for progress bar
  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
      {/* Profile Section */}
      <View className="items-center justify-center pt-10">
        <Image
          source={icons.profile} // Replace with your profile image
          resizeMode="cover"
          className="w-[100px] h-[100px] rounded-full mb-4 border-2"
        />
        <Text className="text-primary text-3xl font-bGarden">Username</Text>
        <Text className="text-white text-lg font-bGarden mt-2">email@example.com</Text>

        <View className="w-full px-10 mt-4">
          <View className="w-full h-4 bg-secondary-500 rounded-full mt-2">
            <View
              className="h-4 bg-secondary-300 rounded-full"
              style={{ width: `${progress}%` }} // Dynamic width based on EXP
            />
          </View>
        </View>
      </View>

      {/* Settings & Logout Section */}
      <View className="flex-1 mt-10">
        {/* Settings Option */}
        <TouchableOpacity
          className="flex-row justify-between items-center px-6 py-3 border-b-2 rounded-full border-secondary-700"
          onPress={() => {}}
        >
          <Text className="text-primary text-xl font-bGarden">Settings</Text>
          <Image source={icons.settings} className="w-6 h-6" />
        </TouchableOpacity>

        {/* Privacy Option */}
        <TouchableOpacity
          className="flex-row justify-between items-center px-6 py-3 border-b-2 rounded-full border-secondary-700"
          onPress={() => {}}
        >
          <Text className="text-primary text-xl font-bGarden">Privacy</Text>
          <Image source={icons.lock} className="w-6 h-6" />
        </TouchableOpacity>

        {/* Help Option */}
        <TouchableOpacity
          className="flex-row justify-between items-center px-6 py-3 border-b-2 rounded-full border-secondary-700"
          onPress={() => {}}
        >
          <Text className="text-primary text-xl font-bGarden">Help</Text>
          <Image source={icons.help} className="w-6 h-6" />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          className="mt-4  h-10 w-25 bg-primary rounded-xl items-center justify-center"
          onPress={() => {}}
        >
          <Text className="text-white font-bGarden text-xl">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile

