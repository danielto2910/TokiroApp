// app/landing.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
        ...dailyTasks.map(task => createTasks(task, 'daily', false,false)),
        ...weeklyTasks.map(task => createTasks(task, 'weekly', false,false)),
      ]);

      Alert.alert('Tasks Saved', 'Welcome aboard!');
      router.push('/home'); // Replace with main screen, e.g. /home or /tasks
    } catch (error) {
      console.error('Task submission failed:', error);
    }
  };

  const renderInputs = (count, type) => (
    <>
      <Text className="font-bold text-lg mt-4 mb-2">{type === 'daily' ? 'Daily Tasks' : 'Weekly Tasks'}</Text>
      {Array.from({ length: count }, (_, i) => (
        <TextInput
          key={i}
          value={type === 'daily' ? dailyTasks[i] : weeklyTasks[i]}
          onChangeText={text => handleChange(type, i, text)}
          placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} Task ${i + 1}`}
          className="border border-gray-300 p-3 rounded-lg mb-2"
        />
      ))}
    </>
  );

  return (
    <View className="flex-1 px-6 py-10 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Welcome! Set Your Tasks</Text>
      {renderInputs(4, 'daily')}
      {renderInputs(2, 'weekly')}
      <Button title="Submit Tasks" onPress={handleSubmit} />
    </View>
  );
};

export default LandingPage;
