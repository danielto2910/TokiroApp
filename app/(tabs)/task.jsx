import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const Task = () => {
  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
      <View className="flex-1 justify-start px-5 mt-3">
        <Text className="text-3xl text-black font-bGarden mt-3"> Daily Task</Text>
        <View className="border-2 border-secondary-700 w-full  h-60 bg-secondary-400 rounded-3xl  items-center">
          
        </View>
        <Text className="text-3xl text-black font-bGarden mt-3"> Weekly Task</Text>
        <View className="border-2 border-secondary-700 w-full  h-60 bg-secondary-400 rounded-3xl  items-center">
          
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Task

const styles = StyleSheet.create({})