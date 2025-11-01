// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1Cnxjn01u5-yVsVHsfQACQyFfGu_Pwg8",
  authDomain: "smart-deals-b43a0.firebaseapp.com",
  projectId: "smart-deals-b43a0",
  storageBucket: "smart-deals-b43a0.firebasestorage.app",
  messagingSenderId: "884786004245",
  appId: "1:884786004245:web:209df4b42fd1c1fc7d291c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);