

import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';
import React, { useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Create from './create';

const TabIcon = ({ icon, color, name, focused }) => {
  const { height } = useWindowDimensions();
  return (
    <View style={{ marginTop: height * 0.03 }} className="items-center justify-center gap-1">
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} numberOfLines={1} adjustsFontSizeToFit style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const createRef = useRef(null);

  const handleOpenCreate = () => {
    createRef.current?.open(); // ✅ Open the bottom sheet from Create.jsx
  };

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <Tabs screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#BFFFC8', // Primary color for active tab
          tabBarInactiveTintColor: '#2A5B42', // Secondary text green for inactive tabs
          tabBarStyle: {
            backgroundColor: "#fcedd7", 
            height: 85,

          },
        }}>
          <Tabs.Screen
            name='home'
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
              ),
            }}
          />

          <Tabs.Screen
            name='task'
            options={{
              title: 'Task',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.bookmark} color={color} name="Task" focused={focused} />
              ),
            }}
          />
          
          <Tabs.Screen
            name="create"
            options={{
              title: 'Create',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity {...props} onPress={handleOpenCreate} />
              ),
            }}
          />

          <Tabs.Screen
            name='shop'
            options={{
              title: 'Shop',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.shop} color={color} name="Shop" focused={focused} />
              ),
            }}
          />

          <Tabs.Screen
            name='profile'
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
              ),
            }}
          />
        </Tabs>

        {/* Bottom Sheet Component */}
        <Create ref={createRef} />
      </GestureHandlerRootView>
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEFDC", // Soft Cream background
  },
});
