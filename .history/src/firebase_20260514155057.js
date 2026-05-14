// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbKYWi52nYIgLShlA-HmodufnLFa4W9ow",
  authDomain: "el3farety-app.firebaseapp.com",
  projectId: "el3farety-app",
  storageBucket: "el3farety-app.firebasestorage.app",
  messagingSenderId: "783729192916",
  appId: "1:783729192916:web:1283e14d5664b45a947041",
  measurementId: "G-FHKEJXC2W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);