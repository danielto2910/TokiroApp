import { StyleSheet, Text, View, ScrollView, } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import EventButton from '../../components/EventButton';
import Create from './create';
import { getEvent } from '../../lib/appwrite';

const Task = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvent();
        console.log("Fetched events data:", fetchedEvents); 
        setEvents(fetchedEvents);
        
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
      <ScrollView >

      <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6"> Events</Text>
      <View className="h-60">  
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex-row px-4 gap-x-4">
           {events.map((event) => {
            console.log("Event data Mapped:", event.event_name);
            return (
                <EventButton
                key={event.$id}
                name={event.event_name}         
                location={event.event_location} 
                description={event.event_description} 
                />
              )
           }
           )}
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

    </SafeAreaView>
    
  )
}

export default Task
