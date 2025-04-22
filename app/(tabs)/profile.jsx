import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import YourEventsModal from '../../components/ProfileEventsModal';
import { icons } from '../../constants';
import { useAuth } from '../../context/AuthProvider';

const Profile = () => {
  const [yourEventsModalVisible, setYourEventsModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [flash, setFlash] = useState(false);
  const [selected, setSelected] = useState(null); // State to track selected button
  const { logout, fetchUsername } = useAuth();

  const exp = 60;
  const maxExp = 140;
  const progress = (exp / maxExp) * 100;

  useEffect(() => {
    const loadData = async () => {
      const userName = await fetchUsername();
      setUsername(userName);
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handlePressIn = (buttonName) => {
    setFlash(true);
    setSelected(buttonName); // Mark the button as selected
  };

  const handlePressOut = () => {
    setFlash(false);
    setSelected(null); // Deselect the button when released
  };

  return (
    <SafeAreaView className="flex-1 bg-[#dff5cc]">
      {/* Profile Info */}
      <View className="items-center justify-center pt-12">
        <Image
          source={icons.profile}
          resizeMode="cover"
          className="w-[120px] h-[120px] rounded-full mb-6 border-4 border-[#fddfb3]"
        />
        <Text className="text-[#204a35] text-3xl font-bGarden">{username}</Text>

        
      </View>

      {/* Options Section */}
      <View className="flex-1 mt-10 space-y-6 px-8">
        {/* Settings */}
        <TouchableOpacity
          className={`flex-row justify-between items-center py-4 mb-2 border-4 border-[#fddfb3] rounded-3xl bg-[#fcedd7] shadow-md ${selected === 'settings' ? 'bg-[#FFD79B]' : ''}`}
          onPressIn={() => handlePressIn('settings')}
          onPressOut={handlePressOut}
        >
          <Text className="text-[#204a35] text-lg font-bGarden text-center w-full">Settings</Text>
          <Image source={icons.settings} className="w-6 h-6" />
        </TouchableOpacity>

        {/* Your Events */}
        <TouchableOpacity
          className={`flex-row justify-between items-center py-4 mb-2 border-4 border-[#fddfb3] rounded-3xl bg-[#fcedd7] shadow-md ${selected === 'events' ? 'bg-[#FFD79B]' : ''}`}
          onPressIn={() => handlePressIn('events')}
          onPressOut={handlePressOut}
          onPress={() => setYourEventsModalVisible(true)}
        >
          <Text className="text-[#204a35] text-lg font-bGarden text-center w-full">Your Events</Text>
        </TouchableOpacity>

        {/* Privacy */}
        <TouchableOpacity
          className={`flex-row justify-between items-center py-4 mb-2 border-4 border-[#fddfb3] rounded-3xl bg-[#fcedd7] shadow-md ${selected === 'privacy' ? 'bg-[#FFD79B]' : ''}`}
          onPressIn={() => handlePressIn('privacy')}
          onPressOut={handlePressOut}
        >
          <Text className="text-[#204a35] text-lg font-bGarden text-center w-full">Privacy</Text>
          <Image source={icons.lock} className="w-6 h-6" />
        </TouchableOpacity>

        {/* Help */}
        <TouchableOpacity
          className={`flex-row justify-between items-center py-4 mb-2 border-4 border-[#fddfb3] rounded-3xl bg-[#fcedd7] shadow-md ${selected === 'help' ? 'bg-[#FFD79B]' : ''}`}
          onPressIn={() => handlePressIn('help')}
          onPressOut={handlePressOut}
        >
          <Text className="text-[#204a35] text-lg font-bGarden text-center w-full">Help</Text>
          <Image source={icons.help} className="w-6 h-6" />
        </TouchableOpacity>
        
        {/* Logout Button (Added margin-top here) */}
        <View className="px-8 mt-10">
          <TouchableOpacity
            className={`flex-row justify-between items-center py-4 mb-2 border-4 border-[#fddfb3] rounded-3xl bg-[#fddfb3] shadow-md ${selected === 'logout' ? 'bg-[#FFD79B]' : ''}`}
            onPressIn={() => handlePressIn('logout')}
            onPressOut={handlePressOut}
            onPress={handleLogout}
          >
            <Text className="text-[#204a35] text-lg font-bGarden text-center w-full">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      

      <YourEventsModal
        visible={yourEventsModalVisible}
        onClose={() => setYourEventsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Profile;
