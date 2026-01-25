// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrn4wp3cVNdbqy4jvC0QoXOpVO7aVE4O0",
  authDomain: "golocal-a1ab8.firebaseapp.com",
  projectId: "golocal-a1ab8",
  storageBucket: "golocal-a1ab8.firebasestorage.app",
  messagingSenderId: "236696745464",
  appId: "1:236696745464:web:eec5a322cd3d893e8e520d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);