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
  apiKey: "AIzaSyDmfYZ9a8TsOzP0jjlzbhtI9NL_Bdf5eJs",
  authDomain: "podcast-react-app-5eb51.firebaseapp.com",
  projectId: "podcast-react-app-5eb51",
  storageBucket: "podcast-react-app-5eb51.appspot.com",
  messagingSenderId: "764223245494",
  appId: "1:764223245494:web:9c7030cc1a873211f92a17",
  measurementId: "G-QMKDMHJ55Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
