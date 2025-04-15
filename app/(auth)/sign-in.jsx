import React, { useState , useEffect} from 'react';
import { View, Alert, ScrollView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthProvider';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { Link } from 'expo-router';
import { images } from '../../constants';


const SignIn = () => {
  const { signIn, loading , user} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (!loading && user) {
      router.replace('/home'); 
    }
  }, [loading, user]);

  const handleSignIn = async () => {

    if ( !email || !password) {
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
          <Text className= "text-4xl text-secondary-200 text-bold font-bGarden mt-10">Log In to Tokiro</Text>
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
            title="Sign In"
            containerStyles="mt-7"
            textStyles="font-psemibold"
            isLoading={loading}
            handlePress={handleSignIn}
          />
          <View className = "justify-center pt-5 flex-row gap-2">
            <Text className = "text-lg text-white font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className='text-secondary-200 font-psemibold text-lg'>Sign Up</Link>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn