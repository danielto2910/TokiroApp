import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
const Create = forwardRef(({ onAddEvent }, ref) => {
  const bottomSheetRef = useRef(null);
  const { createEvent, createNotes } = useAuth();
  // Single state object for the event
  const [event, setEvent] = useState({
    name: '',
    description: '',
    location: '',
    expAmount: 0,
  });

  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  const [selectedTab, setSelectedTab] = useState('events');

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  }));

  // Handle input change for the event fields
  const handleInputChange = (field, value) => {
    setEvent(prevEvent => ({
      ...prevEvent,
      [field]: value,
    }));
    setNote(prevNote => ({
      ...prevNote,
      [field]: value,
    }));
  };

  // Handle saving event
  const handleSaveEvent = async () => {
    const { name, description, location, expAmount, finishedState } = event;
    
    // Check for missing fields including expAmount being 0
    if (!name || !location || !description || expAmount === 0) {
      console.log('Please fill all fields');
      return;
    }
  
    try {
      // Call createEvent from AuthProvider to save event
      await createEvent(name, description, location, expAmount);
  
      // Reset form after saving
      setEvent({
        name: '', 
        description: '', 
        location: '',   
        expAmount: 0,
      });
  
      // Close the bottom sheet after saving
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleSaveNote = async () => {
    const { title, content } = note;
    if (!title) {
      console.log('please give it a title');
      return;
    }

    try {
      // Call createEvent from AuthProvider to save event
      await createNotes(title, content);

      // Reset form after saving
      setNote({ title: '', content: '' });

      // Close the bottom sheet after saving
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <BottomSheet
      style={styles.bottomSheetContainer}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: '#eeefc2' }}
      snapPoints={[650]}
      index={-1}
    >
      <BottomSheetView>
        <View className="flex-row bg-secondary-400 rounded-full w-full p-1">
          {/* Events Button */}
          <TouchableOpacity
            onPress={() => setSelectedTab('events')}
            className={`flex-1 items-center py-2 rounded-full ${selectedTab === 'events' ? "bg-secondary-300" : ""}`}
          >
            <Text className={`font-bGarden ${selectedTab === 'events' ? "text-white" : "text-black"}`}>
              Events
            </Text>
          </TouchableOpacity>

          {/* Notes Button */}
          <TouchableOpacity
            onPress={() => setSelectedTab('notes')}
            className={`flex-1 items-center py-2 rounded-full ${selectedTab === 'notes' ? "bg-secondary-300" : ""}`}
          >
            <Text className={`font-bGarden ${selectedTab === 'notes' ? "text-white" : "text-black"}`}>
              Notes
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'events' && (
          <View>
            <Text style={styles.eventText}>Event Name</Text>
            <View style={styles.container}>
              <TextInput
                placeholder="Name of the Event..."
                style={styles.inputText}
                value={event.name}
                onChangeText={(value) => handleInputChange('name', value)}  // Use the new input handler
              />
            </View>
            <Text style={styles.eventText}>Location</Text>
            <View style={styles.container}>
              <TextInput
                placeholder="Where is the event..."
                style={styles.inputText}
                value={event.location}
                onChangeText={(value) => handleInputChange('location', value)}  // Use the new input handler
              />
            </View>
            <Text style={styles.eventText}>Description</Text>
            <View style={styles.container}>
              <TextInput
                placeholder="Write what the event is about..."
                style={styles.inputText}
                value={event.description}
                onChangeText={(value) => handleInputChange('description', value)}  // Use the new input handler
              />
            </View>

            <Text style={styles.eventText}>Experience</Text>
            <View style={styles.container}>
              <TextInput
                placeholder="Amount of EXP..."
                style={styles.inputText}
                keyboardType="numeric"
                value={event.expAmount?.toString()}
                onChangeText={(value) => handleInputChange('expAmount', parseInt(value) || 0)}
              />
            </View>
          </View>
        )}

        {selectedTab === 'notes' && (
          <View>
            <TextInput
              style={[styles.inputTitle]}
              placeholder="Title"
              onChangeText={(value) => handleInputChange('title', value)}
              value={note.title}
            />
            <TextInput
              style={[styles.inputText]}
              placeholder="Write your notes here..."
              multiline
              onChangeText={(value) => handleInputChange('content', value)}
              value={note.content}
            />
          </View>
        )}

        <View style={{ flex: 1 }} />
        <View style={styles.saveButtonContainer}>
          {/* Only enable Save button if 'events' tab is selected */}
          {selectedTab === 'events' && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveEvent}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}
          {selectedTab === 'notes' && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveNote}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderColor: '#e4c68b',
    borderWidth: 3,
    borderRadius: 18,
  },
  container: {
    borderBottomWidth: 1,
    borderColor: '#e4c68b',
    marginHorizontal: 10,
  },
  eventText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputTitle: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    padding: 15,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
    padding: 15,
  },
  saveButton: {
    backgroundColor: '#A7D397',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  saveButtonContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Create;
