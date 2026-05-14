import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFKeyLMpwdgXwVicd7kA6heVZGTyhKWi4",
    authDomain: "claeave.firebaseapp.com",
    projectId: "claeave",
    storageBucket: "claeave.firebasestorage.app",
    messagingSenderId: "709333506974",
    appId: "1:709333506974:web:d5eb510c5123da5e1f148f",
    measurementId: "G-CPYSBR64VL"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);