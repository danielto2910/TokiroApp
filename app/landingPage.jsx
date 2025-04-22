import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthProvider';

const LandingPage = () => {
  const { createTasks } = useAuth();
  const router = useRouter();

  const [dailyTasks, setDailyTasks] = useState(Array(4).fill(''));
  const [weeklyTasks, setWeeklyTasks] = useState(Array(2).fill(''));

  const handleChange = (type, index, value) => {
    const updated = [...(type === 'daily' ? dailyTasks : weeklyTasks)];
    updated[index] = value;
    type === 'daily' ? setDailyTasks(updated) : setWeeklyTasks(updated);
  };

  const handleSubmit = async () => {
    const allDailyFilled = dailyTasks.every(task => task.trim() !== '');
    const allWeeklyFilled = weeklyTasks.every(task => task.trim() !== '');

    if (!allDailyFilled || !allWeeklyFilled) {
      return Alert.alert('All tasks required', 'Enter all 4 daily and 2 weekly tasks.');
    }

    try {
      await Promise.all([
        ...dailyTasks.map(task => createTasks(task, 'daily', false, false)),
        ...weeklyTasks.map(task => createTasks(task, 'weekly', false, false)),
      ]);

      Alert.alert('Tasks Saved', 'Welcome aboard!');
      router.push('/home');
    } catch (error) {
      console.error('Task submission failed:', error);
    }
  };

  const renderInputs = (count, type) => (
    <>
      <Text className="font-psemibold text-lg mt-4 mb-2 text-[#004225]">
        {type === 'daily' ? 'Daily Tasks' : 'Weekly Tasks'}
      </Text>
      {Array.from({ length: count }, (_, i) => (
        <TextInput
          key={i}
          value={type === 'daily' ? dailyTasks[i] : weeklyTasks[i]}
          onChangeText={text => handleChange(type, i, text)}
          placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} Task ${i + 1}`}
          placeholderTextColor="#999"
          className="bg-[#fff5d5] text-[#004225] border border-[#FFD79B] p-3 rounded-lg mb-3 font-pregular"
        />
      ))}
    </>
  );

  return (
    <ScrollView className="flex-1 px-6 py-10 bg-[#DFF5CC]">
      <Text className="text-3xl font-bGarden text-center text-[#004225] mb-6">
        Welcome! Set Your Tasks
      </Text>
      {renderInputs(4, 'daily')}
      {renderInputs(2, 'weekly')}
      <View className="mt-6">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={dailyTasks.some(task => task.trim() === '') || weeklyTasks.some(task => task.trim() === '')}
          className={`py-4 rounded-xl ${dailyTasks.every(task => task.trim() !== '') && weeklyTasks.every(task => task.trim() !== '') ? 'bg-[#FFD79B]' : 'bg-[#FFD79B]/50'}`}
        >
          <Text className="text-white text-center text-lg font-bold">
            Submit Tasks
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LandingPage;
