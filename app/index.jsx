import { StyleSheet, Text, View, ScrollView,Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images} from '../constants'

const index = () => {
  return (
    <SafeAreaView className= "bg-primary h-full">
      <ScrollView contentContainerStyle = {{ height: "100%"}}>
        <View className = "w-full px-4 justify-center items-center">
          <Image
            source={images.logo}
            className="w-[330px] h-[200px]"
            resizeMode='contain'
          />

          {/* <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          /> */}
        </View>

        <View className= "mt-5 px-5">
          <Text className= "text-3xl text-white font-bold text-center">Level up your productivity with{' '} 
          <Text className= "text-secondary-200">Tokiro</Text>
          </Text>
          
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default index
