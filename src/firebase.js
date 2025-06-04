// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- استيراد Firestore
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASqERWmgHn-sPvk1WTJWEQMAhqn3Ayosw",
  authDomain: "dalil-tour-guide.firebaseapp.com",
  projectId: "dalil-tour-guide",
  storageBucket: "dalil-tour-guide.firebasestorage.app",
  messagingSenderId: "425366259487",
  appId: "1:425366259487:web:65381b988cb04bbfa7522a",
  measurementId: "G-L6WDGBE4EY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore database
const db = getFirestore(app);
export const auth = getAuth(app);

// Export the db so يمكنك استيراده في ملفات أخرى
export { db };
