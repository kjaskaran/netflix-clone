import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIy0DWOjV5ZSZbE8v_LTmxwY4XJPyTvD0",
  authDomain: "netflix-clone-j-k.firebaseapp.com",
  projectId: "netflix-clone-j-k",
  storageBucket: "netflix-clone-j-k.appspot.com",
  messagingSenderId: "1083011004976",
  appId: "1:1083011004976:web:d55a02d42862221ab98bf5",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

