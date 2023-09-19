// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDG-mIBKhsu_mPDqaaukpcXh0eJbq9a8uM",
  authDomain: "group-bio.firebaseapp.com",
  projectId: "group-bio",
  storageBucket: "group-bio.appspot.com",
  messagingSenderId: "841094275904",
  appId: "1:841094275904:web:a6e5bc3d49eedadb05d0a5",
  measurementId: "G-XH98C61KD6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
