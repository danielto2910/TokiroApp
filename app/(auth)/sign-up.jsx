import { View, Text , ScrollView, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'




const SignUp = () => {
 const { SignUp, loading } = useAuth();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
 
   const handleSignUp = async () => {
     try {
       await SignUp(email, password);
       router.replace('/home')
     } catch (error) {
       Alert.alert("Login failed", error.message);
     }
   };
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
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e})}
            otherStyles="mt-7"
          />
          
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-7"
          />
        
          <CustomButton
            title="Sign Up"
  
            containerStyles="mt-7"
            textStyles="font-psemibold"
            isLoading={isSubmitting}
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