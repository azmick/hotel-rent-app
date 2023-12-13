// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASP0UvaJe5g3mabKIl2Uylu0MUBH6wWcU",
  authDomain: "otelkira.firebaseapp.com",
  projectId: "otelkira",
  storageBucket: "otelkira.appspot.com",
  messagingSenderId: "722870931471",
  appId: "1:722870931471:web:33d28d8519ece2170fd37a",
  storage: "async-storage",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_INIT_AUTH= initializeAuth(FIREBASE_APP, {
persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)

