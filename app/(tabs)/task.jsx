import { Text, View, ScrollView, Modal, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventButton from '../../components/EventButton';

import NoteButton from '../../components/NoteButton';

const Task = () => {
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation,setNewLocation] = useState('');
  const [newDesc, setNewDesc] = useState('');

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
                    key={event.$id}
                    name={event.event_name}         
                    location={event.event_location} 
                    description={event.event_description} 
                    onPress={() => handleEventPress(event.$id)}
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
                    key={note.$id}
                    name={note.note_title}
                    description={note.note_desc}
                    onPress={() => handleNotePress(note.$id)}  // Pass the note's $id to the handler
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
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Title"
                className="w-full h-10 border border-secondary-700 rounded-lg p-2 mb-3"
              />
 
              { selectedEvent && (
                <TextInput
                value={newLocation}
                onChangeText={setNewLocation}
                placeholder='Location'
                className="w-full h-10 border border-secondary-700 rounded-lg p-2 mb-3"
              />
              )}
              <TextInput
                value={newDesc}
                onChangeText={setNewDesc}
                placeholder="Description"
                className="w-full h-10 border border-secondary-700 rounded-lg p-2 mb-3"
              />

              <View className="flex-row gap-x-4 mt-4">
                <Button title="Update" onPress={handleUpdate} />
                <Button title="Close" onPress={() => {
                  setModalVisible(false);
                  setSelectedNote(null);
                  setSelectedEvent(null);
                }} />

                <Button
                  title="Delete"
                  color="red"
                  onPress={handleDelete}
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
