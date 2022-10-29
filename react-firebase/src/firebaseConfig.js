import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9fBnLWN-v4edTHbRutWDzD28CpOzbeoM",
  authDomain: "fir-frontend-9f329.firebaseapp.com",
  projectId: "fir-frontend-9f329",
  storageBucket: "fir-frontend-9f329.appspot.com",
  messagingSenderId: "380353459000",
  appId: "1:380353459000:web:e32079c26f64789b2947cd",
  measurementId: "G-D647YC76MW",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
