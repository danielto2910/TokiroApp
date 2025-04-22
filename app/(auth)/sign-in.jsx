import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthProvider';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { Link } from 'expo-router';
import { images } from '../../constants';

const SignIn = () => {
  const { signIn, loading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [loading, user]);

  const handleSignIn = async () => {
    if (!email || !password) {
      return Alert.alert('Missing Fields', 'Please fill out all fields.');
    }

    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#DFF5CC]">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-[#DFF5CC] h-full relative">
      {/* Large Circle in the Background */}
      
      <ScrollView>
      <View className="absolute top-[-250px] right-[-180px] w-[450px] h-[450px] bg-[#fff5d5] rounded-full z-0"></View>
      <View className="absolute bottom-[-250px] left-[-150px] w-[300px] h-[300px] bg-[#ffe8be] rounded-full z-0"></View>
        <View className="w-full justify-center min-h-[75vh] px-4 my-6 z-10">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-4xl text-[#004225] font-bGarden mt-10">Log In to Tokiro</Text>
          
          {/* Form Fields */}
          <FormField
            title="Email"
            value={email}
            handleChangeText={setEmail}
            otherStyles="mt-7"
            keyboardType="email-address"
            // pastel green background and forest green border
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={setPassword}
            otherStyles="mt-7"
             // pastel green background and forest green border
          />
          
          {/* Sign In Button */}
          <CustomButton
            title="Sign In"
            containerStyles="mt-7 bg-[#fff5d5] border-[#FFD79B] border-2"
            textStyles="text-[#004225] font-psemibold"
            isLoading={loading}
            handlePress={handleSignIn}
          />
          
          {/* Link to Sign Up */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-[#004225] font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-[#d6ae4e] font-psemibold text-lg">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
