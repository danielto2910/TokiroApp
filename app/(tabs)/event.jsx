import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
const Event = () => {
  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
      <Text className="text-4xl text-black font-bGarden mt-3 text-center"> Events</Text>
      <View className="flex-1 justify-start px-5 mt-1">
            <View className="border-2 border-secondary-700 w-full mt-3 h-60 bg-secondary-400 rounded-3xl items-center">
                
            </View>
            
      </View>
    </SafeAreaView>
  )
}

export default Event

const styles = StyleSheet.create({})