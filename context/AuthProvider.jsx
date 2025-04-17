import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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

  const createEvent = async (eventName, eventDesc, eventLoc) => {
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

      console.log("Event created with ID: ", noteRef.id);
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
      console.log('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const noteRef = doc(firestoreDB, 'notes', noteId);
      await deleteDoc(noteRef);
      console.log('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn,createEvent, createNotes, deleteNote, updateNote, deleteEvent, updateEvent, signUp, logout }}>
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
