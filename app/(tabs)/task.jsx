import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import EventButton from '../../components/EventButton';
import Create from './create';

const Task = () => {
  const [events, setEvents] = useState([]); // State to store created events

  const addEvent = (event) => {
    // Add the new event to the events state
    console.log('Event Added:', event);
    setEvents((prevEvents) => [...prevEvents, event]);
  };
  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
      <ScrollView >

      <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6"> Events</Text>
      <View className="h-60">  
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row px-4 gap-x-4">
           {/* make the event here */}
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

      <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6"> Notes</Text>
      <View className="px-3">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4 gap-x-4">
              <EventButton name="something"/>
              <EventButton />
            </View>
          </ScrollView>
      </View>
      </ScrollView>
      <Create onAddEvent={addEvent} />
    </SafeAreaView>
    
  )
}

export default Task

const styles = StyleSheet.create({})