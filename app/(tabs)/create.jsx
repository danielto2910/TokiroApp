import React, { useRef, useMemo ,useCallback} from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"; // ✅ Import BottomSheetView
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
   // Correctly using useRef()
   const bottomSheetRef = useRef(null);

   // callbacks
   const handleSheetChanges = useCallback((index) => {
     console.log('handleSheetChanges', index);
   }, []);
 
   // renders
   return (
     <GestureHandlerRootView style={styles.container}>
       <BottomSheet
         ref={bottomSheetRef}
         onChange={handleSheetChanges}
       >
         <BottomSheetView style={styles.contentContainer}>
           <Text>Awesome 🎉</Text>
         </BottomSheetView>
       </BottomSheet>
     </GestureHandlerRootView>
   );
 };


 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: 'center',
    },
  });
export default Create;
