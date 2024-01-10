// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbZvu_jFmhYv08Gz5BVTpTAmgOdHkpPzA",
  authDomain: "trabajo-d6ed3.firebaseapp.com",
  databaseURL: "https://trabajo-d6ed3-default-rtdb.firebaseio.com",
  projectId: "trabajo-d6ed3",
  storageBucket: "trabajo-d6ed3.appspot.com",
  messagingSenderId: "288463129815",
  appId: "1:288463129815:web:3354ef3b2e7de082d2f492"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const storage=getStorage(app)