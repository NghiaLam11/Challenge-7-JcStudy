// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-tKHNVMny4lDVPPEkjIL6rEpHu88EV8Y",
  authDomain: "jcstudyy.firebaseapp.com",
  projectId: "jcstudyy",
  storageBucket: "jcstudyy.appspot.com",
  messagingSenderId: "394880466400",
  appId: "1:394880466400:web:f112e584d512319dab7f85",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db };
