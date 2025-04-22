import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YourEventsModal from '../../components/ProfileEventsModal';
import { icons } from '../../constants'; // Assuming you have icons for buttons
import { useAuth } from '../../context/AuthProvider';
import { router } from 'expo-router';

const Profile = () => {

  const [yourEventsModalVisible, setYourEventsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const { logout, fetchUsername } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/sign-in'); // 👈 Redirect to sign-in screen
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loadData = async () => {
   
    const userName = await fetchUsername();
    setUsername(userName);


  };

  useEffect(() => {
      loadData();
    }, []);


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
        <Text className="text-primary text-3xl font-bGarden">{username}</Text>


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

        <TouchableOpacity
          className="bg-secondary-400 p-4 rounded-2xl border border-secondary-700"
          onPress={() => setYourEventsModalVisible(true)}
        >
          <Text className="text-black text-lg text-center font-semibold">Your Events</Text>
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
          onPress= {handleLogout}
        >
          <Text className="text-white font-bGarden text-xl">Logout</Text>
        </TouchableOpacity>
      </View>

      <YourEventsModal
        visible={yourEventsModalVisible}
        onClose={() => setYourEventsModalVisible(false)}
      />
    </SafeAreaView>
  )
}

export default Profile

