import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMttV2rqt8DdHf9G_h_YfgpwNLLnjgPzQ",
  authDomain: "fir-frontend-45faa.firebaseapp.com",
  projectId: "fir-frontend-45faa",
  storageBucket: "fir-frontend-45faa.appspot.com",
  messagingSenderId: "673402144971",
  appId: "1:673402144971:web:1af06ee2043e3da9c2734e",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
