import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCns4fxm_0BL73yrna1aKJpJ2epfsBdw48",
    authDomain: "khoaluan2022-a3b8f.firebaseapp.com",
    projectId: "khoaluan2022-a3b8f",
    storageBucket: "khoaluan2022-a3b8f.appspot.com",
    messagingSenderId: "785668598614",
    appId: "1:785668598614:web:f4c9b194ce02a79400c4f7",
    measurementId: "G-63HF9F106Z"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
