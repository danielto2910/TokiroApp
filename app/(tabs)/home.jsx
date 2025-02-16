import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from '../../constants'
import CustomButton from "../../components/CustomButton"
import IconButton from "../../components/IconButton"
import { icons } from '../../constants'

export default function HomeDashboard() {
  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
        {/* Username Section */}
      <View className="justify-center min-h-[11vh] px-4">
        <Text className="text-primary text-4xl font-bGarden">Welcome, <Text className="text-secondary-300 font-bGardenBold">Username</Text>!</Text>
      </View>
    

        <View className="justify-center min-h-[10vh] mt-3">
            {/* Icon Buttons Section */}
            <View className="flex-row justify-between px-10 min-h-[8vh] mt-10">
                {/* Companion Tab */}
                <IconButton
                icon={icons.paw}
                handlePress={() => {}}
                color="#333333"
                iconStyles={"w-8 h-8"}
                />
                {/* Task Tab */}
                <IconButton
                icon={icons.task}
                handlePress={() => {}}
                color="#333333"
                />
            
            </View>
            
            {/* Event Tab Section (Below Daily/Weekly Tabs) */}
            <View className="px-10 flex-row justify-between">
                <IconButton
                icon={icons.medal}
                handlePress={() => {}}
                color="#333333"
                iconStyles={"w-8 h-8"}
                />
                <IconButton
                icon={icons.bookmark}
                handlePress={() => {}}
                color="#333333"
                />
            </View>
        </View>
      
      

      {/* Main Content Section */}
      <View className="items-center justify-center min-h-[60vh] mt-10">
        <Image
          source={images.dog}
          className=" h-[150px] absolute z-10"
          resizeMode="contain"
          style={{
            top: '20%', // Adjust dog position relative to the platform
            }} // Adjust the height of the dog image relative to the viewport height}}
        />
        <Image
          source={images.platform}
          className="w-[500px] h-[100px]"
          resizeMode="contain"
        />

        <View className="flex-row items-center gap-x-32 mt-2">
          <Text className="text-primary font-bGarden text-xl">Lvl: 1</Text>
          <Text className="text-primary font-bGarden text-xl">Exp: 0/140</Text>
        </View>

        
      </View>
    
      
    </SafeAreaView>
  )
}
