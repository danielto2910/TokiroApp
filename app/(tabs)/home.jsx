import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { icons } from "../../constants";
import { auth, firestoreDB } from "../../lib/firebaseConfig"; 
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { useAuth } from "../../context/AuthProvider";


export default function HomeDashboard() {
  const [isDaily, setIsDaily] = useState(true); // Track selection state

  const {fetchUsername, fetchUserTask, fetchUserCompanions} = useAuth();
  const dailyProgress = 70; // 70% completed for daily tasks
  const weeklyProgress = 40; // 40% completed for weekly tasks
  const taskProgress = isDaily ? dailyProgress : weeklyProgress; // Switches based on selection

  const [companions,setCompanions] = useState([]);
  const [username, setUsername] = useState("");
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const loadData = async () => {
    const userDailyTask = await fetchUserTask("daily");
    const userWeeklyTask = await fetchUserTask("weekly");
    const userName = await fetchUsername();
    const companion = await fetchUserCompanions();
    setDailyTasks(userDailyTask);
    setWeeklyTasks(userWeeklyTask);
    setUsername(userName);
    setCompanions(companion);

  };

  const calculateLevelAndExp = (exp, level) => {
    let maxExp = 140 * level;  // Scale the max EXP by level
    if (exp >= maxExp) {
      level += 1;  // Increase level
      exp = exp - maxExp; // Reset EXP to the remainder after leveling up
    }
    return { level, exp, maxExp };
  };

  useEffect(() => {
    loadData();
  }, []);
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
          {/* Task List */}
          <View className="w-full px-6 mt-4 space-y-1">
            {(isDaily ? dailyTasks : weeklyTasks).map((task, index) => (
              <View key={task.id || index} className="flex-row items-start">
                <Text className="text-primary text-base mr-2">•</Text>
                <Text className="text-primary text-base font-bGarden flex-1">
                  {task.taskContent}
                </Text>
              </View>
            ))}
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
        
      {companions.map((companion) => {
          // Initialize default values for missing data
          const { level = 1, exp = 0 } = companion;  // Default level = 1, exp = 0
          const { level: newLevel, exp: newExp, maxExp } = calculateLevelAndExp(exp, level);

          return (
            <View key={companion.id} className="items-center">
              <Image source={images[companion.imageUrl]} className="w-24 h-24" />
              <View className="w-full px-10 mt-4">
                <View className="flex-row justify-between">
                  <Text className="text-primary font-bGarden text-xl">Lvl: {newLevel}</Text>
                  <Text className="text-primary font-bGarden text-xl">Exp: {newExp}/{maxExp}</Text>
                </View>

                {/* Progress Bar */}
                <View className="w-full h-4 bg-secondary-500 rounded-full mt-2">
                  <View
                    className="h-4 bg-secondary-300 rounded-full"
                    style={{ width: `${(newExp / maxExp) * 100}%` }} // Dynamic width based on EXP
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

