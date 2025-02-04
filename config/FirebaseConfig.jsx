// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDy_bLYKb3pVTRWr1FwH2X0vOtob5O4lqQ",
authDomain: "med-track-5a7e4.firebaseapp.com",
projectId: "med-track-5a7e4",
storageBucket: "med-track-5a7e4.firebasestorage.app",
messagingSenderId: "954307691770",
appId: "1:954307691770:web:d2c564a70644af30983543",
measurementId: "G-RR3853YHHM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)

export const db=getFirestore(app)