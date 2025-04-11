import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { AuthProvider } from '../context/AuthProvider';
import "../global.css"


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded,error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "BubbleGarden": require("../assets/fonts/BubbleGarden.ttf"),
    "BubbleGardenBold": require("../assets/fonts/BubbleGardenBold.ttf")
  })

  useEffect(() => {
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;

  return (
    <AuthProvider>
      <Stack>
          <Stack.Screen name="index" options={{headerShown:false}}/>
          <Stack.Screen name="(auth)" options={{headerShown:false}}/>
          <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      </Stack>
    </AuthProvider>
      
    
  );
}

