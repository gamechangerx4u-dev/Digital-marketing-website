/**
 * Firebase Configuration
 * 
 * IMPORTANT: Fill in your Firebase credentials below
 * See ../FIREBASE_SETUP.md for step-by-step instructions
 */

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdurXkVj7zBUEWUW2eJvntUF40P0JHHxM",
  authDomain: "digital-gamechanger4u.firebaseapp.com",
  projectId: "digital-gamechanger4u",
  storageBucket: "digital-gamechanger4u.firebasestorage.app",
  messagingSenderId: "874961740096",
  appId: "1:874961740096:web:5d9194266ffe3c337d1aa5",
  measurementId: "G-62B8XQD9NC",
  databaseURL: "https://digital-gamechanger4u-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Realtime Database reference
const database = firebase.database();

console.log('Firebase initialized successfully');
