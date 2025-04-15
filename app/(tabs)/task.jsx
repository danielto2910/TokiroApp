import { Text, View, ScrollView, Modal, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventButton from '../../components/EventButton';
import NoteButton from '../../components/NoteButton';
import { auth, firestoreDB } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
const Task = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    location: ''
  });
  
  const [events, setEvents] = useState([]);  // Store multiple events
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
  
  useEffect(() => {
    fetchUserEvents();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-secondary-200">
      <ScrollView>
        <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6"> Events</Text>
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
                    onPress={{}}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>

        <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6">Daily Tasks</Text>
        <View className="px-5">
          <View className="border-2 border-secondary-700 w-full mt-3 h-[220px] bg-secondary-400 rounded-3xl items-center">
            {/* Add task content here */}
          </View>
        </View>

        <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6">Weekly Tasks</Text>
        <View className="px-5">
          <View className="border-2 border-secondary-700 w-full mt-3 h-[220px] bg-secondary-400 rounded-3xl items-center">
            {/* Add task content here */}
          </View>
        </View>

        <Text className="text-4xl text-black font-bGarden mt-3 text-left px-6"> Notes</Text>
        <View className="px-3">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4 gap-x-4">
              {notes.map((note) => {
                return (
                  <NoteButton
                    key={{}}
                    name={{}}
                    description={{}}
                    onPress={{}}  // Pass the note's $id to the handler
                  />
                );
              })}
            </View>
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

              <TextInput
                placeholder="Title"
                className="w-full h-10 border border-secondary-700 rounded-lg p-2 mb-3"
              />
 
              { selectedEvent && (
                <TextInput
                placeholder='Location'
                className="w-full h-10 border border-secondary-700 rounded-lg p-2 mb-3"
              />
              )}
              <TextInput
                placeholder="Description"
                className="w-full h-10 border border-secondary-700 rounded-lg p-2 mb-3"
              />

              <View className="flex-row gap-x-4 mt-4">
                <Button title="Update" onPress={{}} />
                <Button title="Close" onPress={() => {
                  setModalVisible(false);
                  setSelectedNote(null);
                  setSelectedEvent(null);
                }} />

                <Button
                  title="Delete"
                  color="red"
                  onPress={{}}
                />
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Task;
