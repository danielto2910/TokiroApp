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
  const defaultEvent = {
    id: "default-event",
    name: "Create your Event",
    location: "Add a location",
    description: "Tap here to create a new event to remember!",
    completedBy: { [user.uid]: false },
    exp: 0,
  };
  

  const defaultNote = {
    title: "Create your Note",
    content: "Create your note here to make it something worth while!",
    id: "default-note"
  };

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
    if (selectedEvent) {
      console.log("Selected Event EXP value:", selectedEvent.name); // or selectedEvent.expAmount if that's what you're using
    }
  }, []);

  

  const handleEventPress = (event) => {
    console.log("Selected Event:", event);
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
      <EventButton
        key={defaultEvent.id}
        name={defaultEvent.name}
        location={defaultEvent.location}
        description={defaultEvent.description}
        finishedState={defaultEvent.completedBy[user.uid]}
        exp={defaultEvent.expAmount}
        onPress={() => {
          handleEventPress(defaultEvent);
          setSelectedNote(null);
          setModalVisible(true);
        }}
      />
        {events.map((event) => (
          
          <EventButton
            key={event.id}
            name={event.name}
            location={event.location}
            description={event.description}
            finishedState={event.completedBy[user.uid]}
            exp={event.expAmount}
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
      <NoteButton
        name={defaultNote.title}
        description={defaultNote.content}
        onPress={() => {
          handleNotePress(defaultNote);
          setModalVisible(true);
        }}
      />
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
<View className="absolute top-[500px] left-0 right-0 items-center -z-10 ">
<View className="w-[700px] h-[800px] rounded-t-[370px] bg-[#fff9e6]" />
</View>


  <Text className="text-3xl text-[#204a35] font-bGarden mt-10 mb-2 px-6">Daily Tasks</Text>
  <View className="bg-[#fcedd7] rounded-3xl border-4 border-[#fde8c9] p-4 mx-4">
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
            <Text className="text-base text-[#204a35] font-medium">
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
  <View className="bg-[#fcedd7] rounded-3xl border-4 border-[#fde8c9] p-4 mx-4 mb-12">
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
            <Text className="text-base text-[#204a35] font-medium">
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
    <View className="w-4/5 bg-[#fff9e6] p-5 rounded-xl items-start">
      <Text className="text-2xl font-bGarden mb-4 text-[#204a35]">
        {selectedNote ? 'Update Note' : selectedEvent ? selectedEvent.name  : ''}
      </Text>
      
      {/* Note editing */}
      {selectedNote && (
        <>
        <Text className="text-2xl text-[#204a35] font-bGardenBold">Note title:</Text>
          <TextInput
            value={selectedNote.title}
            onChangeText={(text) =>
              setSelectedNote((prev) => ({ ...prev, title: text }))
            }
            className="w-full h-10 border border-[#FFD79B] rounded-lg p-2 mb-2 bg-[#fcedd7] text-[#204a35]"
            placeholder="Note Title"
          />
          <Text className="text-2xl text-[#204a35] font-bGardenBold">Note content:</Text>
          <TextInput
            value={selectedNote.content}
            onChangeText={(text) =>
              setSelectedNote((prev) => ({ ...prev, content: text }))
            }
            className="w-full h-20 border border-[#FFD79B] rounded-lg p-2 mb-2 bg-[#fcedd7] text-[#204a35]"
            placeholder="Note Content"
            multiline
          />

          <View className="flex-row gap-x-4 mt-4">
            <TouchableOpacity
              onPress={() => {
                updateNote(selectedNote.id, {
                  title: selectedNote.title,
                  content: selectedNote.content,
                });
                console.log('Update Note:', selectedNote);
                setModalVisible(false);
                fetchUserNotes();
                setSelectedNote(null);
              }}
              className="py-3 px-6 bg-[#FFD79B] rounded-lg"
            >
              <Text className="text-[#204a35] font-semibold">Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteNote(selectedNote.id);
                console.log('Delete Note:', selectedNote.id);
                setModalVisible(false);
                fetchUserNotes();
                setSelectedNote(null);
              }}
              className="py-3 px-6 bg-[#FF9E9E] rounded-lg"
            >
              <Text className="text-white font-semibold">Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSelectedNote(null);
              }}
              className="py-3 px-6 bg-[#FFD79B] rounded-lg"
            >
              <Text className="text-[#204a35] font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Task editing */}
      {selectedTask && (
        <>
        <Text className="text-2xl text-[#204a35] font-bGardenBold">Task content:</Text>
          <TextInput
            value={selectedTask.taskContent}
            onChangeText={(text) =>
              setSelectedTask((prev) => ({ ...prev, taskContent: text }))
            }
            className="w-full h-20 border border-[#FFD79B] rounded-2xl p-2 mb-2 bg-[#fcedd7] text-[#204a35]"
            placeholder="Edit Task"
            multiline
          />

          <View className="flex-row gap-x-4 mt-4">
            <TouchableOpacity
              onPress={async () => {
                await updateTask(selectedTask.id, {
                  taskContent: selectedTask.taskContent,
                  finishedState: false,
                });
                console.log('Updated Task:', selectedTask);

                if (selectedTask.type === 'daily') {
                  fetchUserTask('daily');
                } else {
                  fetchUserTask('weekly');
                }

                setSelectedTask(null);
                setModalVisible(false);
              }}
              className="py-3 px-6 bg-[#FFD79B] rounded-lg"
            >
              <Text className="text-[#204a35] font-semibold">Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedTask(null);
                setModalVisible(false);
              }}
              className="py-3 px-6 bg-[#FFD79B] rounded-lg"
            >
              <Text className="text-[#204a35] font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Event editing */}
      {selectedEvent && (
        <>
        <View className="absolute top-2 right-2 bg-[#dff5cc] px-2 py-1 mt-3 rounded-full">
            <Text className="text-[15px] font-bold text-[#004225]">{selectedEvent.expAmount} EXP</Text>
          </View>
          

          <Text className="text-2xl text-[#204a35] font-bGardenBold">Event Location:</Text>
          <Text className="text-[#204a35]">{selectedEvent.location}</Text>
          <Text className="text-2xl text-[#204a35] font-bGardenBold">Event Description:</Text>
          <Text className="text-[#204a35]">{selectedEvent.description}</Text>
          

          <View className="flex-row gap-x-4 mt-4">
          <Text className="text-2xl text-[#204a35] font-bGardenBold">Event Completion:</Text>
            <Checkbox
              value={selectedEvent.completedBy[user.uid] || false} 
              onValueChange={async () => {
                const updatedCompletedBy = { ...selectedEvent.completedBy }; 
                const alreadyCompleted = selectedEvent.completedBy?.[user.uid];

                if (!alreadyCompleted) {
                  updatedCompletedBy[user.uid] = true;
                  await updateEvent(selectedEvent.id, { completedBy: updatedCompletedBy });

                  const companions = await fetchUserCompanions();
                  if (companions) {
                    const companion = companions[0];
                    const newExp = (companion.experience || 0) + selectedEvent.expAmount;
                    await updateCompanion(companion.id, { experience: newExp });
                  }
                }

                setSelectedEvent((prevEvent) => ({
                  ...prevEvent,
                  completedBy: updatedCompletedBy,
                }));
              }}
              color={selectedEvent.completedBy[user.uid] ? '#4CAF50' : undefined}
            />
            
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSelectedEvent(null);
              }}
              className="py-3 px-6 bg-[#FFD79B] rounded-lg"
            >
              <Text className="text-[#204a35] font-semibold">Close</Text>
            </TouchableOpacity>
            
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
