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
  const {updateNote, deleteNote, updateTask} = useAuth();
  const [events, setEvents] = useState([]);  // Store multiple events
  const [notes, setNotes] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchUserEvents(), fetchUserNotes()],fetchUserTask("daily"),fetchUserTask("weekly"));
    setRefreshing(false);
  };
  
  const fetchUserEvents = async () => {
    try {
      const eventsRef = collection(firestoreDB, "events");
      const querySnapshot = await getDocs(eventsRef); // Get all events
      
      const allEvents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setEvents(allEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchUserTask = async (taskType) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not authenticated.");
        return;
      }
  
      const taskRef = collection(firestoreDB, "tasks");
  
      const maxLimit = taskType === "daily" ? 4 : taskType === "weekly" ? 2 : 10;
  
      const q = query(
        taskRef,
        where("uid", "==", user.uid),
        where("type", "==", taskType),
        limit(maxLimit)
      );
  
      const querySnapshot = await getDocs(q);
      const userTasksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (taskType === "daily") {
        setDailyTasks(userTasksData);
      } else if (taskType === "weekly") {
        setWeeklyTasks(userTasksData);
      }
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const fetchUserNotes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("User not authenticated.");
          return;
        }
  
        // Fetch events created by the current user
        const notesRef = collection(firestoreDB, "notes");
        const q = query(notesRef, where("uid", "==", user.uid)); // Ensure uid is in the events
        const querySnapshot = await getDocs(q);
        const userNotesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        setNotes(userNotesData);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };
  
  useEffect(() => {
    fetchUserEvents();
    fetchUserNotes();
    fetchUserTask("daily"); // Fetch daily tasks
    fetchUserTask("weekly"); // Fetch weekly tasks
  }, []);

  

  const handleEventPress = (event) => {
    setSelectedEvent(event);
  };

  const handleNotePress = (note) => {
    setSelectedNote(note);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-200 pb-10">
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
        <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6">Upcoming Events</Text>
        <View className="h-60">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4 gap-x-4">
              {events.map((event) => {
                return (
                  <EventButton
                    key={event.id}
                    name={event.name}
                    location={event.location}
                    description={event.description}
                    onPress={() => {
                      handleEventPress(event)
                      setSelectedNote(null); // just in case something was selected before
                      setModalVisible(true);
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>

        <Text className="text-4xl text-black font-bGarden mt-3 text-left">Daily Tasks</Text>
        {dailyTasks.map(task => (
          <TouchableOpacity
            key={task.id}
            activeOpacity={0.7}
            onPress={() => {
              setSelectedTask(task);
              setSelectedNote(null);
              setSelectedEvent(null);
              setModalVisible(true);
            }}
            className="mt-3"
          >
            <View className="flex-row items-center justify-between border-2 border-secondary-700 w-full bg-secondary-400 rounded-3xl px-4 py-4">
              <View className="flex-1 pr-2">
                <Text className={task.finishedState ? "line-through text-gray-500" : "text-black"}>
                  {task.taskContent}
                </Text>
              </View>

              <Checkbox
                value={task.finishedState}
                onValueChange={async (newState) => {
                  await updateTask(task.id, { finishedState: newState });
                  setDailyTasks(prev =>
                    prev.map(t => t.id === task.id ? { ...t, finishedState: newState } : t)
                  );
                }}
                color={task.finishedState ? '#4CAF50' : undefined}
              />
            </View>
          </TouchableOpacity>
        ))}
          {/* Weekly Tasks */}
          <Text className="text-4xl text-black font-bGarden mt-3">Weekly Tasks</Text>
          {weeklyTasks.map(task => (
          <TouchableOpacity
            key={task.id}
            activeOpacity={0.7}
            onPress={() => {
              setSelectedTask(task);
              setSelectedNote(null);
              setSelectedEvent(null);
              setModalVisible(true);
            }}
            className="mt-3"
          >
            <View className="flex-row items-center justify-between border-2 border-secondary-700 w-full bg-secondary-400 rounded-3xl px-4 py-4">
              <View className="flex-1 pr-2">
                <Text className={task.finishedState ? "line-through text-gray-500" : "text-black"}>
                  {task.taskContent}
                </Text>
              </View>

              <Checkbox
                value={task.finishedState}
                onValueChange={async (newState) => {
                  await updateTask(task.id, { finishedState: newState });
                  setDailyTasks(prev =>
                    prev.map(t => t.id === task.id ? { ...t, finishedState: newState } : t)
                  );
                }}
                color={task.finishedState ? '#4CAF50' : undefined}
              />
            </View>
          </TouchableOpacity>
        ))}


        <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6"> Notes</Text>
        <View className="px-3">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4 gap-x-4">
              {notes.map((note) => {
                return (
                  <NoteButton
                    key={note.id}
                    name={note.title}
                    description={note.content}
                    onPress={() => {handleNotePress(note);
                      setModalVisible(true);
                    }}  // Pass the note's $id to the handler
                  />
                );
              })}
            </View>
            <View className="h-10" />
          </ScrollView>
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
