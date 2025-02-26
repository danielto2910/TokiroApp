import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity} from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'
import React, { useRef , useState} from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";


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
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);  // State to control BottomSheet visibility
    const bottomSheetRef = useRef(null);

    const handleOpen = () => {
        setBottomSheetVisible(true);  // Show the BottomSheet
        bottomSheetRef.current?.expand();  // Optionally expand the BottomSheet
    };

    const handleClose = () => {
        setBottomSheetVisible(false);  // Hide the BottomSheet
        bottomSheetRef.current?.close();  // Optionally close the BottomSheet
    };

  return (
    <>
     <GestureHandlerRootView style={styles.container}>
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
                            
                        ),
                        

                    }}
                />
                
                <Tabs.Screen
                    name='create'
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused}

                            />
                        ),
                        tabBarButton: (props) => <TouchableOpacity {...props} onPress={handleOpen}/>
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

            {/* 🔹 Bottom Sheet Component */}
            
            {isBottomSheetVisible && (
                    <BottomSheet 
                        ref={bottomSheetRef} 
                        enablePanDownToClose={true}
                        snapPoints={[650]}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                                Create Something 🎉
                            </Text>
                        </BottomSheetView>
                    </BottomSheet>
                )}
        </GestureHandlerRootView>
    </>
  )
}

export default TabLayout

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#eeefc2",
    },
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: 'center',
    },
  });