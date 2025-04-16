import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, firestoreDB } from '../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import EventButton from './EventButton';

const YourEventsModal = ({ visible, onClose }) => {
const [userEvents, setUserEvents] = useState([]);
  const [eventDetailModal, setEventDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchUserEvents = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not authenticated.");
        return;
      }

      // Fetch events created by the current user
      const eventsRef = collection(firestoreDB, "events");
      const q = query(eventsRef, where("uid", "==", user.uid)); // Ensure uid is in the events
      const querySnapshot = await getDocs(q);
  
      const userEventsdata = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setUserEvents(userEventsdata);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };
  
  useEffect(() => {
    fetchUserEvents();
  }, []);


  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setEventDetailModal(true);
  };

  const closeDetailModal = () => {
    setEventDetailModal(false);
    setSelectedEvent(null);
  };

  return (
    <>
      {/* Main Your Events Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        onRequestClose={onClose}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="px-4 pt-4 flex-row justify-between items-center">
            <Text className="text-2xl font-bGarden text-primary">Your Events</Text>
            <Button title="Close" onPress={onClose} />
          </View>

          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }}>
            <View className="flex-row flex-wrap gap-2 justify-between">
              {userEvents.map((event) => (
                    <EventButton
                      key={event.id}
                      name={event.name}
                      location={event.location}
                      description={event.description}
                      onPress={() => handleEventPress(event)}
                    />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Detail Modal */}
      <Modal
        visible={eventDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDetailModal}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="w-[90%] bg-white p-5 rounded-xl items-center">
            <Text className="text-2xl font-bGarden mb-4">Edit Event</Text>

            <Text className="w-full text-left mb-1 font-bold">Title</Text>
            <TextInput
              defaultValue={selectedEvent?.name}
              placeholder="Title"
              className="w-full h-10 border border-secondary-700 rounded-lg p-2 mb-3"
            />

            <Text className="w-full text-left mb-1 font-bold">Location</Text>
            <TextInput
              defaultValue={selectedEvent?.location}
              placeholder="Location"
              className="w-full h-10 border border-secondary-700 rounded-lg p-2 mb-3"
            />

            <Text className="w-full text-left mb-1 font-bold">Description</Text>
            <TextInput
              defaultValue={selectedEvent?.description}
              placeholder="Description"
              multiline
              className="w-full h-20 border border-secondary-700 rounded-lg p-2 mb-3"
            />

            <View className="flex-row gap-x-4 mt-4">
              <Button title="Update" onPress={() => {}} />
              <Button title="Close" onPress={closeDetailModal} />
              <Button title="Delete" color="red" onPress={() => {}} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default YourEventsModal;
