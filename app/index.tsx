import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl'>Tokiro Screen</Text>
      <Link href={"./profile"} className='font-bold text-blue-600'> Click to go to Profile</Link>
      <StatusBar style="auto" />
    </View>
  );
}


