import { Text, View, ScrollView, Modal, TextInput, Button, TouchableOpacity,RefreshControl, Switch} from 'react-native';
import Checkbox from 'expo-checkbox';

import { useState, useEffect } from 'react';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventButton from '../../components/EventButton';
import NoteButton from '../../components/NoteButton';
import { auth, firestoreDB } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useAuth } from '../../context/AuthProvider';

const Task = () => {

  const [refreshing, setRefreshing] = useState(false);
  const {user,updateNote, deleteNote, updateTask,updateCompanion,updateEvent, fetchUserTask,fetchUserNotes,fetchUserEvents,fetchUserCompanions} = useAuth();
  const [events, setEvents] = useState([]);  // Store multiple events
  const [notes, setNotes] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskView, setTaskView] = useState('daily');

const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const loadData = async () => {
    const userNotes = await fetchUserNotes();
    const events = await fetchUserEvents(); 
    const userDailyTask = await fetchUserTask("daily");
    const userWeeklyTask = await fetchUserTask("weekly");
    setNotes(userNotes);
    setEvents(events);
    setDailyTasks(userDailyTask);
    setWeeklyTasks(userWeeklyTask);

  };

  
  useEffect(() => {
    loadData();
  }, []);

  

  const handleEventPress = (event) => {
    setSelectedEvent(event);
  };

  const handleNotePress = (note) => {
    setSelectedNote(note);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#DFF5CC]">
      <ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  }
>

  <Text className="text-4xl text-[#204a35] font-bGarden mt-3 text-left px-6">Upcoming Events</Text>
  <View className="h-60">
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className="flex-row px-4 pb-4 gap-x-4">
        {events.map((event) => (
          <EventButton
            key={event.id}
            name={event.name}
            location={event.location}
            description={event.description}
            finishedState={event.completedBy[user.uid]}
            onPress={() => {
              handleEventPress(event);
              setSelectedNote(null);
              setModalVisible(true);
            }}
          />
        ))}
      </View>
    </ScrollView>
  </View>

  <Text className="text-4xl text-[#204a35] font-bGarden mt-3 text-left px-6"> Notes</Text>
  <View className="px-3">
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className="flex-row px-4 pb-4 gap-x-4">
        {notes.map((note) => (
          <NoteButton
            key={note.id}
            name={note.title}
            description={note.content}
            onPress={() => {
              handleNotePress(note);
              setModalVisible(true);
            }}
          />
        ))}
      </View>
      <View className="h-10" />
    </ScrollView>
  </View>
  <View className="h-12" />

{/* Partial Circle Background (60%) */}
<View className="absolute top-[520px] left-0 right-0 items-center -z-10 ">
<View className="w-[700px] h-[700px] rounded-t-[320px] bg-[#fff9e6]" />
</View>


  <Text className="text-3xl text-[#204a35] font-bGarden mt-10 mb-2 px-6">Daily Tasks</Text>
  <View className="bg-[#fff9e6] rounded-3xl p-4 mx-4">
    {dailyTasks.map(task => (
      <TouchableOpacity
        key={task.id}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedTask(task);
          setSelectedNote(null);
          setSelectedEvent(null);
          setModalVisible(true);
        }}
        className="mb-3"
      >
        <View className="bg-white flex-row items-center justify-between rounded-2xl px-4 py-3 shadow-md">
          <View className="flex-1">
            <Text className="text-base text-gray-800 font-medium">
              {task.taskContent}
            </Text>
            <Text className={`text-sm font-medium ${task.finishedState ? "text-[#4CAF50]" : "text-[#F57C00]"}`}>
              {task.finishedState ? "Completed" : "In Progress"}
            </Text>
          </View>

          <Checkbox
            value={task.finishedState}
            onValueChange={async (newState) => {
              await updateTask(task.id, { finishedState: newState });

              if (newState === true) {
                const companions = await fetchUserCompanions();
                if (companions) {
                  const companion = companions[0];
                  const newExp = (companion.experience || 0) + task.expAmount;
                  await updateCompanion(companion.id, { experience: newExp });
                }
              }

              setDailyTasks(prev =>
                prev.map(t => t.id === task.id ? { ...t, finishedState: newState } : t)
              );
            }}
            color={task.finishedState ? '#4CAF50' : undefined}
          />
        </View>
      </TouchableOpacity>
    ))}
  </View>

  <Text className="text-3xl text-[#204a35] font-bGarden mt-6 mb-2 px-6">Weekly Tasks</Text>
  <View className="bg-[#fff9e6] rounded-3xl p-4 mx-4 mb-12">
    {weeklyTasks.map(task => (
      <TouchableOpacity
        key={task.id}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedTask(task);
          setSelectedNote(null);
          setSelectedEvent(null);
          setModalVisible(true);
        }}
        className="mb-3"
      >
        <View className="bg-white flex-row items-center justify-between rounded-2xl px-4 py-3 shadow-md">
          <View className="flex-1">
            <Text className="text-base text-gray-800 font-medium">
              {task.taskContent}
            </Text>
            <Text className={`text-sm font-medium ${task.finishedState ? "text-[#4CAF50]" : "text-[#F57C00]"}`}>
              {task.finishedState ? "Completed" : "In Progress"}
            </Text>
          </View>

          <Checkbox
            value={task.finishedState}
            onValueChange={async (newState) => {
              await updateTask(task.id, { finishedState: newState });

              if (newState === true) {
                const companions = await fetchUserCompanions();
                if (companions) {
                  const companion = companions[0];
                  const newExp = (companion.experience || 0) + task.expAmount;
                  await updateCompanion(companion.id, { experience: newExp });
                }
              }

              setWeeklyTasks(prev =>
                prev.map(t => t.id === task.id ? { ...t, finishedState: newState } : t)
              );
            }}
            color={task.finishedState ? '#4CAF50' : undefined}
          />
        </View>
      </TouchableOpacity>
    ))}
  </View>


        

        

        {/* Modal for updating/deleting note */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedNote(null);
            setSelectedEvent(null);
          }}
          key={selectedEvent ? selectedEvent.id : selectedNote ? selectedNote.id : ''}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-4/5 bg-white p-5 rounded-xl items-center">
              <Text className="text-2xl font-bGarden mb-4">
                {selectedNote ? 'Update Note' : selectedEvent ? 'Update Event' : ''}
              </Text>
              {selectedNote && (
              <>
                <TextInput
                  value={selectedNote.title}
                  onChangeText={(text) =>
                    setSelectedNote((prev) => ({ ...prev, title: text }))
                  }
                  className="w-full h-10 border border-gray-400 rounded-lg p-2 mb-2"
                  placeholder="Note Title"
                />
                <TextInput
                  value={selectedNote.content}
                  onChangeText={(text) =>
                    setSelectedNote((prev) => ({ ...prev, content: text }))
                  }
                  className="w-full h-20 border border-gray-400 rounded-lg p-2 mb-2"
                  placeholder="Note Content"
                  multiline
                />

                <View className="flex-row gap-x-4 mt-4">
                  <Button title="Update" onPress={() => {
                    // Call your updateNote function here
                    updateNote(selectedNote.id, {
                      title: selectedNote.title,
                      content: selectedNote.content});
                    console.log("Update Note:", selectedNote);
                    setModalVisible(false);
                    fetchUserNotes();
                    setSelectedNote(null);
                  }} />
                  <Button title="Delete" color="red" onPress={() => {
                    // Call your deleteNote function here
                    deleteNote(selectedNote.id);
                    console.log("Delete Note:", selectedNote.id);
                    setModalVisible(false);
                    fetchUserNotes();
                    setSelectedNote(null);
                  }} />
                  <Button title="Close" onPress={() => {
                    setModalVisible(false);
                    setSelectedNote(null);
                  }} />
                </View>
              </>
            )}

          {selectedTask && (
            <>
              <TextInput
                value={selectedTask.taskContent}
                onChangeText={(text) =>
                  setSelectedTask((prev) => ({ ...prev, taskContent: text }))
                }
                className="w-full h-20 border border-gray-400 rounded-lg p-2 mb-2"
                placeholder="Edit Task"
                multiline
              />

              <View className="flex-row gap-x-4 mt-4">
                <Button title="Update" onPress={async () => {
                  await updateTask(selectedTask.id, { 
                    taskContent: selectedTask.taskContent,
                    finishedState: false
                  });
                  console.log("Updated Task:", selectedTask);

                  if (selectedTask.type === 'daily') {
                    fetchUserTask("daily");
                  } else {
                    fetchUserTask("weekly");
                  }

                  setSelectedTask(null);
                  setModalVisible(false);
                }} />
                <Button title="Close" onPress={() => {
                  setSelectedTask(null);
                  setModalVisible(false);
                }} />
              </View>
            </>
          )}

            {selectedEvent && (
              <>
                <Text className="text-lg font-semibold">{selectedEvent.name}</Text>
                <Text>{selectedEvent.location}</Text>
                <Text>{selectedEvent.description}</Text>

                <View className="flex-row gap-x-4 mt-4">
                <Checkbox
                  value={selectedEvent.completedBy[user.uid] || false}  // Check if the user has already completed the event
                  onValueChange={async () => {
                    const updatedCompletedBy = { ...selectedEvent.completedBy }; // Copy the completedBy object
                    const alreadyCompleted = selectedEvent.completedBy?.[user.uid];

                    if (!alreadyCompleted) {
                      updatedCompletedBy[user.uid] = true; // Mark as complete
                      await updateEvent(selectedEvent.id, { completedBy: updatedCompletedBy });

                      // Give EXP only if this is the first time completing it
                      const companions = await fetchUserCompanions();
                      
                      if (companions) {
                        const companion = companions[0];
                        const newExp = (companion.experience || 0) + selectedEvent.expAmount; // Adjust EXP logic as needed
                        await updateCompanion(companion.id, { experience: newExp });
                      }
                    }

                    // Update local state with the new completedBy object
                    setSelectedEvent(prevEvent => ({
                      ...prevEvent,
                      completedBy: updatedCompletedBy
                    }));
                  }}
                  color={selectedEvent.completedBy[user.uid] ? '#4CAF50' : undefined}
                />
                  <Button title="Close" onPress={() => {
                    setModalVisible(false);
                    setSelectedEvent(null);
                  }} />
                </View>
              </>
            )}
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Task;
