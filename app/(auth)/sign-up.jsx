import { View, Text , ScrollView, Image, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { useAuth } from '../../context/AuthProvider'




const SignUp = () => {
  const { signUp, loading, user } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!loading && user) {
      router.replace('/landingPage');
    }
  }, [loading, user]);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      return Alert.alert('Missing Fields', 'Please fill out all fields.');
    }

    try {
      await signUp(email, password, username);
    } catch (error) {
      Alert.alert('Sign up failed', error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  return (
    <SafeAreaView className = "bg-primary h-full">
      <ScrollView>
        <View className = "w-full justify-center min-h-[75vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className = "w-[115px] h-[35px]"
          />
          <Text className= "text-4xl text-secondary-200 text-bold font-bGarden mt-10">Sign Up to Tokiro</Text>
          <FormField
            title="Username"
            value={username}
            handleChangeText={setUsername}
            otherStyles="mt-7"
          />
          
          <FormField
            title="Email"
            value={email}
            handleChangeText={setEmail}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={setPassword}
            otherStyles="mt-7"
          />
        
          <CustomButton
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles="mt-7"
            textStyles="font-psemibold"
            isLoading={loading}
          />
          <View className = "justify-center pt-5 flex-row gap-2">
            <Text className = "text-lg text-white font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-secondary-200 font-psemibold text-lg'>Sign In</Link>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp