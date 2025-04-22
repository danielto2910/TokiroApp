import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';

const index = () => {
  return (
    <SafeAreaView className="bg-[#DFF5CC] h-full">
      {/* Decorative Circles */}
      <View className="absolute top-[-200px] left-[-150px] w-[450px] h-[450px] bg-[#fff5d5] rounded-full z-0" />
      <View className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] bg-[#ffe8be] rounded-full z-0" />

      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full min-h-[85vh] px-4 justify-center items-center z-10">
          <Image
            source={images.logo}
            className="w-[230px] h-[150px]"
            resizeMode="contain"
          />

          <View className="w-[250px] h-[250px] rounded-full bg-[#FFF8E1] border-4 border-[#fddfb3] items-center justify-center mt-4">
            <Image
              source={images.terraTurtle}
              className="w-[250px] h-[250px]"
              resizeMode="contain"
            />
          </View>

          <View className="mt-5 px-5">
            <Text className="text-4xl text-[#004225] font-bGarden text-center">
              Level up your productivity with{' '}
              <Text className="text-[#FFD79B] font-bGardenBold">Tokiro</Text>
            </Text>
          </View>

          <Text className="text-[#004225] text-center font-pregular text-sm mt-4">
            Experience and enhance your productivity with your trusty companion using Tokiro.
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7 bg-[#fff5d5] border-[#FFD79B] border-2"
            textStyles="text-3xl text-[#004225]"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#1f1f1f" style="light" />
    </SafeAreaView>
  );
};

export default index;
