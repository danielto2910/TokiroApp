import { StyleSheet, Text, View, ScrollView } from 'react-native'

import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import EventButton from '../../components/EventButton';
const Task = () => {
  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
      <ScrollView >

      <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6"> Events</Text>
      <View className="h-60">  
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row px-4 gap-x-4">
            <EventButton />
            <EventButton />
          </View>
        </ScrollView>
      </View>

      <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6">Daily Tasks</Text>
      <View className="px-5">
        <View className="border-2 border-secondary-700 w-full mt-3 h-[220px] bg-secondary-400 rounded-3xl items-center">

        </View>
      </View>

      <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6"> Weekly Tasks</Text>
      <View className="px-5">
        <View className="border-2 border-secondary-700 w-full mt-3 h-[220px] bg-secondary-400 rounded-3xl items-center">

        </View>
      </View>
      </ScrollView>
      
    </SafeAreaView>
    
  )
}

export default Task

const styles = StyleSheet.create({})