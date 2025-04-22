import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
export default function ShopComingSoon() {
  return (
    <SafeAreaView className="flex-1 bg-[#DFF5CC] items-center justify-center px-6">
      <View className="bg-[#fcedd7] p-6 rounded-3xl items-center shadow-lg">
        
        <Text className="text-[#204a35] text-5xl font-bGarden mb-2">Shop Coming Soon!</Text>
        <Text className="text-[#5A4031] text-center font-bGarden text-2xl">
          Stay tuned for adorable companions, stylish cosmetics, and other surprises!
        </Text>
      </View>
    </SafeAreaView>
  );
}
