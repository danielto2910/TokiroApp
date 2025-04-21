import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, updateDoc,query, deleteDoc, where, getDocs } from 'firebase/firestore';
import { auth, firestoreDB } from '../lib/firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user

    await setDoc(doc(firestoreDB, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      createdAt: new Date().toISOString()
    });
    
  };

  const createEvent = async (eventName, eventDesc, eventLoc, expGained, expAmount) => {
    const user = auth.currentUser;
    try{
      const eventRef = await addDoc(collection(firestoreDB, "events"), {
        uid: user.uid,
        name: eventName,
        description: eventDesc,
        location: eventLoc,
        createdAt: new Date().toISOString(),
      })

      console.log("Event created with ID: ", eventRef.id);
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const createNotes = async (noteTitle, noteContent) => {
    const user = auth.currentUser;
    try{
      const noteRef = await addDoc(collection(firestoreDB, "notes"), {
        uid: user.uid,
        title: noteTitle,
        content: noteContent,
        createdAt: new Date().toISOString(),
      })

      console.log("Note created with ID: ", noteRef.id);
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const updateEvent = async (eventId, updatedData) => {
    try {
      const eventRef = doc(firestoreDB, 'events', eventId);
      await updateDoc(eventRef, updatedData);
      console.log('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const eventRef = doc(firestoreDB, 'events', eventId);
      await deleteDoc(eventRef);
      console.log('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };


  const updateNote = async (noteId, updatedData) => {
    try {
      const noteRef = doc(firestoreDB, 'notes', noteId);
      await updateDoc(noteRef, updatedData);
      console.log('Notes updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const noteRef = doc(firestoreDB, 'notes', noteId);
      await deleteDoc(noteRef);
      console.log('Notes deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const createTasks = async (taskContent, type, finishedState, expGained) => {
    const user = auth.currentUser;
  
    if (!user) {
      console.log("User not authenticated.");
      return;
    }
  
    const typeLimits = {
      daily: 4,
      weekly: 2,
    };
  
    // Set expAmount based on task type
    const expAmount = type === "daily" ? 20 : type === "weekly" ? 50 : 0;
  
    const tasksRef = collection(firestoreDB, "tasks");
    const q = query(tasksRef, where("uid", "==", user.uid), where("type", "==", type));
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.size >= typeLimits[type]) {
        console.log(`You can only have up to ${typeLimits[type]} ${type} tasks.`);
        return;
      }
  
      const taskRef = await addDoc(tasksRef, {
        uid: user.uid,
        taskContent: taskContent,
        type: type,
        finishedState: finishedState,
        expGained: expGained, // This can be true/false depending on how you’re using it
        expAmount: expAmount,
        createdAt: new Date().toISOString(),
      });
  
      console.log("Task created with ID: ", taskRef.id);
    } catch (e) {
      console.error("Error adding task document: ", e);
    }
  };
  

  const updateTask = async (taskId, updatedData) => {
    try {
      const taskRef = doc(firestoreDB, 'tasks', taskId);
      await updateDoc(taskRef, updatedData);
      console.log('task updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const createCompanion = async (companionName, imageUrl) => {
    const user = auth.currentUser;
  
    if (!user) {
      console.log("User not authenticated.");
      return;
    }
  
    try {
      const companionRef = await addDoc(collection(firestoreDB, "companions"), {
        uid: user.uid,
        name: companionName,
        imageUrl: imageUrl,
        level: 1,
        experience: 0,
        createdAt: new Date().toISOString(),
      });
  
      console.log("Companion created with ID: ", companionRef.id);
    } catch (e) {
      console.error("Error adding companion document: ", e);
    }
  };

  const updateCompanion = async (companionId, updatedData) => {
    try {
      const companionRef = doc(firestoreDB, 'companions', companionId);
      await updateDoc(companionRef, updatedData);
      console.log('Companion updated successfully!');
    } catch (error) {
      console.error('Error updating companion:', error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, createCompanion, updateCompanion, loading, signIn,createEvent, createNotes, createTasks, updateTask, deleteNote, updateNote, deleteEvent, updateEvent, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
