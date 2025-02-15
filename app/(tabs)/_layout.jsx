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
            tabBarActiveTintColor: '#65eb8b',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle:{
                backgroundColor:"#1f1f1f", 
                borderTopWidth: 1,
                borderTopColor: "#232533",
                height: 84,
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
                            icon={icons.menu}
                            color={color}
                            name="Task"
                            focused={focused}
                        />
                    )

                }}
            />

            <Tabs.Screen
                name='event'
                options={{
                    title: 'Event',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            name="Event"
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