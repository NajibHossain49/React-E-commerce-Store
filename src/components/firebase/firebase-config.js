// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrwohErTjXF110Di1-D-2tBLOsaFCKPX0",
  authDomain: "react-e-commerce-store-5eaf6.firebaseapp.com",
  projectId: "react-e-commerce-store-5eaf6",
  storageBucket: "react-e-commerce-store-5eaf6.firebasestorage.app",
  messagingSenderId: "219950341282",
  appId: "1:219950341282:web:7c79261b9ddc3989754bfb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
