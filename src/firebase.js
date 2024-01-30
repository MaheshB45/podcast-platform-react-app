// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWI3HnDjbpHLCcsOq4QJC9oHgDaElZjFY",
  authDomain: "podcast-platform-app-c9a7b.firebaseapp.com",
  projectId: "podcast-platform-app-c9a7b",
  storageBucket: "podcast-platform-app-c9a7b.appspot.com",
  messagingSenderId: "174116536393",
  appId: "1:174116536393:web:eef42f003c9b13d1b97f98",
  measurementId: "G-8LV493BN5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };