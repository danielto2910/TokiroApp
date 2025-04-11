// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8GBDAxeXJlMn28mTFDTLNL9gbihNfA1g",
  authDomain: "tokiro.firebaseapp.com",
  databaseURL: "https://tokiro-default-rtdb.firebaseio.com",
  projectId: "tokiro",
  storageBucket: "tokiro.firebasestorage.app",
  messagingSenderId: "10117714092",
  appId: "1:10117714092:web:decb50a062436714054f09",
  measurementId: "G-60XYWP8QEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  //Initialize Firestore DB and storege
const firestoreDB = getFirestore();
const firebaseStorage = getStorage();


export { app, auth, firestoreDB, firebaseStorage };