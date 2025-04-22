import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const Shop = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#DFF5CC]">
      <View className="flex-1 justify-start px-5 mt-3">
        <Text className="text-4xl text-black font-bGarden mt-3"> Shop</Text>
        <View className="border-2 border-secondary-700 w-full  h-60 bg-[#f5efcc] rounded-3xl  items-center">
          
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default Shop

const styles = StyleSheet.create({})