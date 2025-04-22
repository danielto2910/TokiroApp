import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthProvider';

const Create = forwardRef(({ onAddEvent }, ref) => {
  const bottomSheetRef = useRef(null);
  const { createEvent, createNotes } = useAuth();

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

  const handleInputChange = (field, value) => {
    setEvent(prev => ({ ...prev, [field]: value }));
    setNote(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEvent = async () => {
    const { name, description, location, expAmount } = event;
    if (!name || !location || !description || expAmount === 0) {
      console.log('Please fill all fields');
      return;
    }
    try {
      await createEvent(name, description, location, expAmount);
      setEvent({ name: '', description: '', location: '', expAmount: 0 });
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleSaveNote = async () => {
    const { title, content } = note;
    if (!title) {
      console.log('Please give it a title');
      return;
    }
    try {
      await createNotes(title, content);
      setNote({ title: '', content: '' });
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <BottomSheet
      style={styles.bottomSheetContainer}
      ref={bottomSheetRef}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#fff9e6' }}
      snapPoints={[650]}
      index={-1}
    >
      <BottomSheetView>
        {/* Tab Selector */}
        <View className="flex-row bg-[#fddfb3] rounded-full w-full p-1">
          <TouchableOpacity
            onPress={() => setSelectedTab('events')}
            className={`flex-1 items-center py-2 rounded-full ${selectedTab === 'events' ? "bg-[#FFD79B]" : ""}`}
          >
            <Text className={`font-bGarden ${selectedTab === 'events' ? "text-white" : "text-black"}`}>
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('notes')}
            className={`flex-1 items-center py-2 rounded-full ${selectedTab === 'notes' ? "bg-[#FFD79B]" : ""}`}
          >
            <Text className={`font-bGarden ${selectedTab === 'notes' ? "text-white" : "text-black"}`}>
              Notes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Events Form */}
        {selectedTab === 'events' && (
          <View>
            <Text style={styles.label}>Event Name</Text>
            <TextInput
              placeholder="Name of the Event..."
              style={styles.input}
              value={event.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <Text style={styles.label}>Location</Text>
            <TextInput
              placeholder="Where is the event..."
              style={styles.input}
              value={event.location}
              onChangeText={(value) => handleInputChange('location', value)}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Write what the event is about..."
              style={styles.input}
              value={event.description}
              onChangeText={(value) => handleInputChange('description', value)}
            />
            <Text style={styles.label}>Experience</Text>
            <TextInput
              placeholder="Amount of EXP..."
              style={styles.input}
              keyboardType="numeric"
              value={event.expAmount?.toString()}
              onChangeText={(value) => handleInputChange('expAmount', parseInt(value) || 0)}
            />
          </View>
        )}

        {/* Notes Form */}
        {selectedTab === 'notes' && (
          <View>
            <TextInput
              style={styles.inputTitle}
              placeholder="Title"
              value={note.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Write your notes here..."
              multiline
              value={note.content}
              onChangeText={(value) => handleInputChange('content', value)}
            />
          </View>
        )}

        {/* Save Button */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            className="bg-[#fddfb3] border-2 border-[#FFD79B]"
            onPress={selectedTab === 'events' ? handleSaveEvent : handleSaveNote}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderColor: '#fddfb3',
    borderWidth: 3,
    borderRadius: 18,
  },
  label: {
    marginHorizontal: 16,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#204a35',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 12,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD79B',
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFD79B',
  },
  saveButtonContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  saveButton: {

    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#204a35',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Create;
