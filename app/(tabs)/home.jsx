import { View, Text, Image, ScrollView } from "react-native";
import React from 'react'

const Home = () => {
  return (
    <View className="flex-1 bg-primary p-4 gap-3">
            {/* Companion Section */}
            <View className="items-center mb-4">
                
                <Text className="text-lg font-semibold mt-2">Your Companion</Text>
            </View>
            
            {/* Task Section */}
            <Text className="text-xl font-bold mb-2">Your Tasks</Text>
            <ScrollView className="space-y-2">
                <View className="gap-3">
                    <View className="bg-white p-4 rounded-lg shadow-md">
                        <Text className="text-lg font-medium">Task 1</Text>
                        <Text className="text-gray-600">Description of the task goes here.</Text>
                    </View>
                    <View className="bg-white p-4 rounded-lg shadow-md">
                        <Text className="text-lg font-medium">Task 2</Text>
                        <Text className="text-gray-600">Another task description.</Text>
                    </View>
                    <View className="bg-white p-4 rounded-lg shadow-md">
                        <Text className="text-lg font-medium">Task 3</Text>
                        <Text className="text-gray-600">More details about this task.</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
  )
}

export default Home