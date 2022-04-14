import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDPvpb25rKQJDYjjfJC4vvgK7PN5TSKxJQ",
  authDomain: "home-marketplace-92389.firebaseapp.com",
  projectId: "home-marketplace-92389",
  storageBucket: "home-marketplace-92389.appspot.com",
  messagingSenderId: "53150509134",
  appId: "1:53150509134:web:10975cef0f8faadd2d3b1f"
};


initializeApp(firebaseConfig);
export const db = getFirestore()

