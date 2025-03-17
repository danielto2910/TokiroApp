import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';

const Create = forwardRef(({ onAddEvent }, ref) => {
  const bottomSheetRef = useRef(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTab, setSelectedTab] = useState('events');

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  }));

  const handleSave = () => {
    if (onAddEvent && typeof onAddEvent === 'function') {
      // Create an event object
      const event = {
        name: eventName,
        location,
        description,
      };

      // Call the onAddEvent function passed from Task to add the event
      onAddEvent(event);

      // Reset form fields
      setEventName('');
      setLocation('');
      setDescription('');

      // Close the bottom sheet
      bottomSheetRef.current?.close();
    } else {
      console.error('onAddEvent is not a function!');
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
                value={eventName}
                onChangeText={setEventName}
              />
            </View>
            <Text style={styles.eventText}>Location</Text>
            <View style={styles.container}>
              <TextInput
                placeholder="Where is the event..."
                style={styles.inputText}
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <Text style={styles.eventText}>Description</Text>
            <View style={styles.container}>
              <TextInput
                placeholder="Write what the event is about..."
                style={styles.inputText}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>
        )}

        {selectedTab === 'notes' && (
          <View>
            <TextInput
              style={[styles.inputTitle]}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
            />
            <TextInput
              style={[styles.inputText]}
              value={text}
              onChangeText={setText}
              placeholder="Write your notes here..."
              multiline
            />
          </View>
        )}

        <View style={{ flex: 1 }} />
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
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
