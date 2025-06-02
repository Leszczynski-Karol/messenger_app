import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg_vcGV9XSBq7A8Y_khEB2umScjoU11qE",
  authDomain: "messengerapp-2025.firebaseapp.com",
  projectId: "messengerapp-2025",
  storageBucket: "messengerapp-2025.firebasestorage.app",
  messagingSenderId: "878169405862",
  appId: "1:878169405862:web:fb6dce23081a83c63d3767"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  doc,
  getDoc,
  setDoc
};
