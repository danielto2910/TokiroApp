import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { icons } from "../../constants";



export default function HomeDashboard() {
  const [isDaily, setIsDaily] = useState(true); // Track selection state
  const level = 1;
  const exp = 60; // Current EXP
  const maxExp = 140; // Max EXP for the level
  const progress = (exp / maxExp) * 100; // Calculate percentage for progress bar
  
  const dailyProgress = 70; // 70% completed for daily tasks
  const weeklyProgress = 40; // 40% completed for weekly tasks
  const taskProgress = isDaily ? dailyProgress : weeklyProgress; // Switches based on selection

  const [username, setUsername] = useState("");


  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
      {/* Username Section */}
      <View className="justify-center min-h-[5vh] px-4">
        <Text className="text-primary text-4xl font-bGarden">
          Welcome, <Text className="text-primary font-bGardenBold">{username}</Text>!
        </Text>
      </View>

      {/* Toggle Switch */}
      <View className="flex-row justify-between px-5 min-h-[15vh] mt-6">
        <View className="border-2 border-secondary-700 w-full h-60 bg-secondary-400 rounded-3xl  items-center">
          {/* Toggle Buttons */}
          <View className="flex-row bg-secondary-600 rounded-full w-48 p-1">
            {/* Daily Button */}
            <TouchableOpacity
              onPress={() => setIsDaily(true)}
              className={`flex-1 items-center py-2 rounded-full ${
                isDaily ? "bg-secondary-300" : ""
              }`}
            >
              <Text className={`font-bGarden ${isDaily ? "text-white" : "text-black"}`}>
                Daily
              </Text>
            </TouchableOpacity>

            {/* Weekly Button */}
            <TouchableOpacity
              onPress={() => setIsDaily(false)}
              className={`flex-1 items-center py-2 rounded-full ${
                !isDaily ? "bg-secondary-300" : ""
              }`}
            >
              <Text className={`font-bGarden ${!isDaily ? "text-white" : "text-black"}`}>
                Weekly
              </Text>
            </TouchableOpacity>
          </View>


          {/* Task Progress Bar Inside Toggle Box */}
          <View className="w-full absolute bottom-5 px-4">
            <View className="w-full h-3 bg-secondary-500 rounded-full">
              <View
                className="h-3 bg-secondary-300 rounded-full"
                style={{ width: `${taskProgress}%` }} // Dynamic width based on task completion
              />
            </View>
          </View>
        </View>
      </View>

      {/* Main Content Section */}
      <View className="items-center justify-center min-h-[40vh] mt-10">
        <Image
          source={images.dog}
          className="h-[150px] absolute z-10"
          resizeMode="contain"
          style={{ top: "1%" }} // Adjust the height of the dog image
        />
        <Image
          source={images.platform}
          className="w-[500px] h-[100px]"
          resizeMode="contain"
        />

        {/* Level and EXP Progress Bar */}
        <View className="w-full px-10 mt-4">
          <View className="flex-row justify-between">
            <Text className="text-primary font-bGarden text-xl">Lvl: {level}</Text>
            <Text className="text-primary font-bGarden text-xl">
              Exp: {exp}/{maxExp}
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="w-full h-4 bg-secondary-500 rounded-full mt-2">
            <View
              className="h-4 bg-secondary-300 rounded-full"
              style={{ width: `${progress}%` }} // Dynamic width based on EXP
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

