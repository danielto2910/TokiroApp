import { StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'
import React from 'react'

const TabIcon = ({icon, color, name, focused})=> {
    const { height } = useWindowDimensions();

    return(
        <View style={{ marginTop: height * 0.03 }} className = " items-center justify-center gap-1">
            <Image 
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} numberOfLines={1} adjustsFontSizeToFit style={{color: color}}> {name}</Text>
        </View>
    )
}

const TabLayout = () => {
  return (
    <>
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#b9dbb3',
            tabBarInactiveTintColor: '#a0a7a4',
            tabBarStyle:{
                backgroundColor:"#151515", 
                borderTopWidth: 1,
                borderTopColor: "#232533",
                height: 85,
            }
        }}>
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )

                }}
            />

            <Tabs.Screen
                name='task'
                options={{
                    title: 'Task',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            name="Task"
                            focused={focused}
                        />
                    )

                }}
            />

            <Tabs.Screen
                name='shop'
                options={{
                    title: 'Shop',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.shop}
                            color={color}
                            name="Shop"
                            focused={focused}
                        />
                    )

                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Profile"
                            focused={focused}
                        />
                    )

                }}
            />
        </Tabs>
    </>
  )
}

export default TabLayout

const styles = StyleSheet.create({})