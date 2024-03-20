// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
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
const storage = getStorage();
export { auth, db, storage };
