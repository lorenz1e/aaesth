import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAntOrGLz7exc1wCFqxNcx2CS-zmvzeYc8",
  authDomain: "aaesth-e8a6e.firebaseapp.com",
  projectId: "aaesth-e8a6e",
  storageBucket: "aaesth-e8a6e.appspot.com",
  messagingSenderId: "134396275614",
  appId: "1:134396275614:web:48bb4553d2abf79e76c48f"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)