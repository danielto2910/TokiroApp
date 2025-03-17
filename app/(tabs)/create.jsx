import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text,TextInput, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import EventButton from '../../components/EventButton';

const data = [
  { label: 'Events', value: '1' },
  { label: 'Dailies', value: '2' },
  { label: 'Weeklies', value: '3' },
  
];

const Create = forwardRef((props, ref) => {
  const bottomSheetRef = useRef(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedTab, setSelectedTab] = useState('events');
  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  }));

  const handleSave = () => {

    // Reset state after saving
    setText(''); // Clear the text
    setTitle(''); // Clear the text

    // Close the bottom sheet after saving
    bottomSheetRef.current?.close();
  };

  return (
    
    <BottomSheet
      style={styles.bottomSheetContainer}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backgroundStyle = {{backgroundColor: '#eeefc2'}}
      snapPoints={[650]}
      index={-1}
    >
      <BottomSheetView>
        <View className="flex-row bg-secondary-400 rounded-full w-full p-1">
          {/* Events Button */}
          <TouchableOpacity
            onPress={() => setSelectedTab('events')}
            className={`flex-1 items-center py-2 rounded-full ${
              selectedTab === 'events' ? "bg-secondary-300" : ""
            }`}
          >
            <Text className={`font-bGarden ${selectedTab === 'events' ? "text-white" : "text-black"}`}>
              Events
            </Text>
          </TouchableOpacity>



          {/* Notes Button */}
          <TouchableOpacity
            onPress={() => setSelectedTab('notes')}
            className={`flex-1 items-center py-2 rounded-full ${
              selectedTab === 'notes'  ? "bg-secondary-300" : ""
            }`}
          >
            <Text className={`font-bGarden ${selectedTab === 'notes' ? "text-white" : "text-black"}`}>
              Notes
            </Text>
          </TouchableOpacity>

        </View>
        
        
        
        {selectedTab === 'events' && (<View>
          <Text>Event Name</Text>
          <View className=" border-2 border-secondary-700 rounded-full w-full h-16 px-4 mt-2 bg-white focus:border-secondary-200 items-center flex-row">
            <TextInput
              style={[styles.inputTitle]}
              value={title}
              onChangeText={setTitle}
              placeholder="Name of the Event"
            
            />
          </View>
          <Text>Location</Text>
          <View className=" border-2 border-secondary-700 rounded-full w-full h-16 px-4 mt-2 bg-white focus:border-secondary-200 items-center flex-row">
            <TextInput
              style={[styles.inputTitle]}
              value={title}
              onChangeText={setTitle}
              placeholder="location"
            
            />
          </View>
          <Text>Time</Text>
          
          <Text>Description</Text>
          <View className=" border-2 border-secondary-700 rounded-full w-full h-16 px-4 mt-2 bg-white focus:border-secondary-200 items-center flex-row">
            <TextInput
              style={[styles.inputTitle]}
              value={title}
              onChangeText={setTitle}
              placeholder="Name of the Event"
              multiline
            />
          </View>
        </View>)}


        {selectedTab === 'notes' && (<View>
          <TextInput
          style={[styles.inputTitle]}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          multiline
          />
          <TextInput
          style={[styles.inputText]}
          value={text}
          onChangeText={setText}
          placeholder="Write your notes here..."
          multiline
          />

        </View>)}
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
    borderColor: '#e4c68b', // Example border color
    borderWidth: 3, // Optional, for visibility
    borderRadius: 18,
    
    // Add other styles as needed
  },
  inputTitle: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold'
  },
  inputText: {
    fontSize: 16,
    color: '#000',
    padding: 0, // Remove default padding
    margin: 0, // Remove default margin
  },
  inputFocused: {
    borderColor: '#ccc',
  },
  TaskContainer: {
    paddingTop: 10,
    alignItems: 'center', // Horizontal centering
  },
  dropdown: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: '#A7D397',
    paddingVertical: 12,

    borderRadius: 24,
    alignItems: 'center',
    
  },
  saveButtonContainer: {
    paddingHorizontal: 16,
    marginTop: 12, // Add margin if needed
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Create;
