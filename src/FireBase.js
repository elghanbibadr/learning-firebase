// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmfz479NrcuXnh6pb18PdnpohPL7gkjrM",
  authDomain: "todoapp-35b66.firebaseapp.com",
  projectId: "todoapp-35b66",
  storageBucket: "todoapp-35b66.appspot.com",
  messagingSenderId: "791361682784",
  appId: "1:791361682784:web:8d7d5a6b3b229e1663b205"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
