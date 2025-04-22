import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, firestoreDB } from '../lib/firebaseConfig';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import EventButton from './EventButton';
import { useAuth } from '../context/AuthProvider';

const YourEventsModal = ({ visible, onClose }) => {

  const { updateEvent, deleteEvent } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  const [eventDetailModal, setEventDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchUserEvents = () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not authenticated.");
      return;
    }

    // Fetch events created by the current user with real-time listener
    const eventsRef = collection(firestoreDB, "events");
    const q = query(eventsRef, where("uid", "==", user.uid)); // Ensure uid is in the events

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userEventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserEvents(userEventsData);
    }, (error) => {
      console.error("Error fetching user events:", error);
    });

    // Return the unsubscribe function to clean up when the component unmounts
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchUserEvents();

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
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
  <SafeAreaView className="flex-1" style={{ backgroundColor: '#dff5cc' }}>
  <View className="px-4 pt-4 flex-row justify-between items-center">
    <Text className="font-bGarden" style={{ fontSize: 28, color: '#004225' }}>
      Your Events
    </Text>
    <TouchableOpacity
      className="px-4 py-2 rounded-xl"
      style={{ backgroundColor: '#FFD79B' }}
      onPress={onClose}
    >
      <Text className="font-bGarden" style={{ fontSize: 18, color: '#004225' }}>
        Close
      </Text>
    </TouchableOpacity>
  </View>

    <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }}>
      <View className="flex-row flex-wrap gap-2 justify-between">
        {userEvents.map((event) => (
          <EventButton
            key={event.id}
            name={event.name}
            location={event.location}
            description={event.description}
            exp={event.exp}
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
    <View
      className="w-[90%] p-5 rounded-2xl items-center shadow-lg"
      style={{ backgroundColor: '#FFD79B', borderColor: '#004225', borderWidth: 1 }}
    >
      <Text className="text-2xl font-bGarden mb-4" style={{ color: '#004225' }}>
        Edit Event
      </Text>

      <TextInput
        value={selectedEvent?.name}
        onChangeText={(text) =>
          setSelectedEvent((prev) => ({ ...prev, name: text }))
        }
        placeholder="Title"
        placeholderTextColor="#6B6B6B"
        className="w-full h-10 rounded-lg p-2 mb-3"
        style={{ backgroundColor: '#FFFFFF', color: '#004225', borderColor: '#004225', borderWidth: 1 }}
      />

      <TextInput
        value={selectedEvent?.location}
        onChangeText={(text) =>
          setSelectedEvent((prev) => ({ ...prev, location: text }))
        }
        placeholder="Location"
        placeholderTextColor="#6B6B6B"
        className="w-full h-10 rounded-lg p-2 mb-3"
        style={{ backgroundColor: '#FFFFFF', color: '#004225', borderColor: '#004225', borderWidth: 1 }}
      />

      <TextInput
        value={selectedEvent?.description}
        onChangeText={(text) =>
          setSelectedEvent((prev) => ({ ...prev, description: text }))
        }
        placeholder="Description"
        multiline
        placeholderTextColor="#6B6B6B"
        className="w-full h-20 rounded-lg p-2 mb-3"
        style={{ backgroundColor: '#FFFFFF', color: '#004225', borderColor: '#004225', borderWidth: 1 }}
      />

    <View className="w-full items-end mb-3">
      <View
        className="w-15 h-15 rounded-lg px-2 justify-center"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#004225',
          borderWidth: 1,
        }}
      >
      <TextInput
          value={selectedEvent?.exp?.toString() || ''}
          onChangeText={(text) =>
            setSelectedEvent((prev) => ({
              ...prev,
              exp: parseInt(text) || 0,
            }))
          }
          placeholder="EXP"
          keyboardType="numeric"
          placeholderTextColor="#6B6B6B"
          className="text-center text-[#004225]"
        />
      </View>
    </View>

      <View className="flex-row gap-x-4 mt-4">
        <TouchableOpacity
          onPress={() => {
            updateEvent(selectedEvent.id, {
              name: selectedEvent.name,
              description: selectedEvent.description,
              location: selectedEvent.location,
              exp: selectedEvent.exp || 0,
            });
            fetchUserEvents();
            closeDetailModal();
          }}
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: '#B9EBC8' }}
        >
          <Text style={{ color: '#004225', fontWeight: 'bold' }}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={closeDetailModal}
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <Text style={{ color: '#004225', fontWeight: 'bold' }}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            deleteEvent(selectedEvent.id);
            fetchUserEvents();
            closeDetailModal();
          }}
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: '#FF9E9E' }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </>
  );
};

export default YourEventsModal;
