import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPLLUXSk-k-LkTgJzqj_8QXOJSxifM4r4",
  authDomain: "todolisttypescript.firebaseapp.com",
  projectId: "todolisttypescript",
  storageBucket: "todolisttypescript.appspot.com",
  messagingSenderId: "109464713425",
  appId: "1:109464713425:web:a52b4ad0bfe14e06e7edf0"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);