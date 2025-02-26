import { StyleSheet, Text, View, ScrollView,Image } from 'react-native'
import React from 'react'
import { Redirect, router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images} from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'

const index = () => {
  return (
    <SafeAreaView className= "bg-primary h-full">
      <ScrollView contentContainerStyle = {{ height: "100%"}}>
        <View className = "w-full min-h-[85vh] px-4 justify-center items-center">
          <Image
            source={images.logo}
            className="w-[230px] h-[150px]"
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[150px]"
            resizeMode='contain'
          />

          <View className= "mt-5 px-5">
            <Text className= "text-4xl text-white font-bGarden text-center">Level up your productivity with{' '} 
            <Text className= "text-secondary-200 font-bGardenBold">Tokiro</Text>
            </Text>
          </View>

        
          <Text className= "text-white text-center font-pregular text-sm mt-4">  Experience and Enhance your productivity with your trusty Companion using Tokiro</Text>
        
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
            textStyles={"text-3xl"}
          />
        </View>
        
        
      </ScrollView>

      <StatusBar backgroundColor='#1f1f1f' style='light'/>
    </SafeAreaView>
  )
}

export default index
