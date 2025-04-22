import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

import { useAuth } from "../../context/AuthProvider";


export default function HomeDashboard() {
  const [isDaily, setIsDaily] = useState(true); // Track selection state
  const [refreshing, setRefreshing] = useState(false);
  const {fetchUsername, fetchUserTask, fetchUserCompanions, updateCompanion} = useAuth();
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


  // Function to calculate level and experience, and return the updated values
  const calculateLevelAndUpdate = (companion) => {
    const { level = 1, experience = 0, id } = companion;
    let newExp = experience;
    let newLevel = level;

    let maxExp = 140 * level;  // Scale the max EXP by level
    if (newExp >= maxExp) {
      newLevel += 1;  // Increase level
      newExp = newExp - maxExp; // Reset EXP to the remainder after leveling up
    }
    updateCompanion(id, { experience: newExp, level: newLevel });
    // Return the new values so they can be used in the UI
    return { newExp, newLevel, maxExp };
  };

  useEffect(() => {
    loadData();
  }, []);
  return (

<SafeAreaView className="flex-1 bg-[#DFF5CC]">
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={handleRefresh}
        colors={["#91E39F"]}
        tintColor="#91E39F"
      />
    }
  >
    {/* Welcome Message */}
    <View className="px-5 pt-4 pb-2 bg-[#f8fcc5] rounded-3xl mx-4 mt-2">
      <Text className="text-[#204a35] text-3xl font-bold">Welcome back, {username}!</Text>
      <Text className="text-[#204a35] text-base mt-1">
        “Do something today that your future self will thank you for.”
      </Text>
    </View>

    {/* Companion Section */}
    {companions.map((companion) => {
      const { newExp, newLevel, maxExp } = calculateLevelAndUpdate(companion);

      return (
        <View key={companion.id} className="items-center">
          <Image
            source={images[companion.imageUrl]}
            style={{ width: 250, height: 250 }}
            className="rounded-full mt-5"
          />
          <View className="w-full px-10">
            <View className="flex-row justify-between">
              <Text className="text-[#204a35] font-bGarden text-xl">Lvl: {newLevel}</Text>
              <Text className="text-[#204a35] font-bGarden text-xl">Exp: {newExp}/{maxExp}</Text>
            </View>
            <View className="h-4 bg-[#E6E6E6] rounded-full overflow-hidden mt-2">
              <View
                className="h-4 bg-[#91E39F] rounded-full"
                style={{ width: `${Math.min((newExp / maxExp) * 100, 100)}%` }}
              />
            </View>
          </View>
        </View>
      );
    })}

    {/* Tasks Section */}
    <View className="mt-8 px-3">
      <View className="bg-[#FFF8E1] p-4 rounded-3xl shadow-lg">
        <Text className="text-[#1F3A3D] text-xl font-bold mb-2">Tasks</Text>

        <View className="bg-[#fcedd7] rounded-3xl p-4 shadow-lg">
          {/* Toggle */}
          <View className="flex-row bg-[#FFD699] rounded-full w-full p-1 mb-4">
            <TouchableOpacity
              onPress={() => setIsDaily(true)}
              className={`flex-1 items-center py-2 rounded-full ${
                isDaily ? "bg-[#fddfb3]" : "bg-transparent"
              }`}
            >
              <Text
                className={`font-bGarden ${
                  isDaily ? "text-white" : "text-[#5A4031]"
                }`}
              >
                Daily
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsDaily(false)}
              className={`flex-1 items-center py-2 rounded-full ${
                !isDaily ? "bg-[#fedba6]" : "bg-transparent"
              }`}
            >
              <Text
                className={`font-bGarden ${
                  !isDaily ? "text-white" : "text-[#5A4031]"
                }`}
              >
                Weekly
              </Text>
            </TouchableOpacity>
          </View>

          {/* Task List */}
          <View>
            {(isDaily ? dailyTasks : weeklyTasks).map((task, index) => (
              <View
                key={index}
                className="bg-white p-3 mb-3 rounded-2xl shadow-md flex-row items-center justify-between"
              >
                <View>
                  <Text className="text-[#2D3A22] text-base font-semibold">
                    {task.taskContent}
                  </Text>
                  <Text
                    className={`text-sm font-medium ${
                      task.finishedState ? "text-[#4CAF50]" : "text-[#F57C00]"
                    }`}
                  >
                    {task.finishedState ? "Completed" : "In Progress"}
                  </Text>
                </View>
                {task.finishedState && (
                  <View className="bg-[#C3F4C7] px-3 py-1 rounded-full">
                    <Text className="text-[#2D3A22] font-semibold text-sm">✓</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
</SafeAreaView>


//     <SafeAreaView className="flex-1 bg-secondary-200">
//       {/* Username Section */}
//       <View className="justify-center min-h-[5vh] px-4">
//         <Text className="text-primary text-4xl font-bGarden">
//           Welcome, <Text className="text-primary font-bGardenBold">{username}</Text>!
//         </Text>
//       </View>

//       {/* Toggle Switch */}
//       <View className="flex-row justify-between px-5 min-h-[15vh] mt-6">
//         <View className="border-2 border-secondary-700 w-full h-60 bg-secondary-400 rounded-3xl  items-center">
//           {/* Toggle Buttons */}
//           <View className="flex-row bg-secondary-600 rounded-full w-48 p-1">
//             {/* Daily Button */}
//             <TouchableOpacity
//               onPress={() => setIsDaily(true)}
//               className={`flex-1 items-center py-2 rounded-full ${
//                 isDaily ? "bg-secondary-300" : ""
//               }`}
//             >
//               <Text className={`font-bGarden ${isDaily ? "text-white" : "text-black"}`}>
//                 Daily
//               </Text>
//             </TouchableOpacity>

//             {/* Weekly Button */}
//             <TouchableOpacity
//               onPress={() => setIsDaily(false)}
//               className={`flex-1 items-center py-2 rounded-full ${
//                 !isDaily ? "bg-secondary-300" : ""
//               }`}
//             >
//               <Text className={`font-bGarden ${!isDaily ? "text-white" : "text-black"}`}>
//                 Weekly
//               </Text>
//             </TouchableOpacity>

            
//           </View>
//           {/* Task List */}
//           <View className="w-full px-6 mt-4 space-y-1">
//             {(isDaily ? dailyTasks : weeklyTasks).map((task, index) => (
//               <View key={task.id || index} className="flex-row items-start">
//                 <Text className="text-primary text-base mr-2">•</Text>
//                 <Text className="text-primary text-base font-bGarden flex-1">
//                   {task.taskContent}
//                 </Text>
//               </View>
//             ))}
//           </View>

//           {/* Task Progress Bar Inside Toggle Box */}
//           <View className="w-full absolute bottom-5 px-4">
//             <View className="w-full h-3 bg-secondary-500 rounded-full">
//               <View
//                 className="h-3 bg-secondary-300 rounded-full"
//                 style={{ width: `${taskProgress}%` }} // Dynamic width based on task completion
//               />
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Main Content Section */}
//       <View className="items-center justify-center min-h-[40vh] mt-10">
        
//       {companions.map((companion) => {
// // Calculate new level and experience based on the companion data
//         const { newExp, newLevel, maxExp } = calculateLevelAndUpdate(companion);

//         // Update Firestore with the new level and exp
        

//             return (
//             <View key={companion.id} className="items-center">
//               <Image source={images[companion.imageUrl]} className="w-24 h-24" />
//               <View className="w-full px-10 mt-4">
//                 <View className="flex-row justify-between">
//                   <Text className="text-primary font-bGarden text-xl">Lvl: {newLevel}</Text>
//                   <Text className="text-primary font-bGarden text-xl">Exp: {newExp}/{maxExp}</Text>
//                 </View>

//                 {/* Progress Bar */}
//                 <View className="w-full h-4 bg-secondary-500 rounded-full mt-2">
//                   <View
//                     className="h-4 bg-secondary-300 rounded-full"
//                     style={{ width: `${(newExp / maxExp) * 100}%` }} // Dynamic width based on EXP
//                   />
//                 </View>
//               </View>
//             </View>
//           );
//         })}
//       </View>
//     </SafeAreaView>
  );
}

