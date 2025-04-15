import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
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

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn,createEvent, signUp, logout }}>
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
