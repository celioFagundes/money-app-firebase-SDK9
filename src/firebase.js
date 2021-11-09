
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBGX_LqI7SVLNkKYjB5QbWpvEKni16Pwgg",
  authDomain: "mymoney2-10c8e.firebaseapp.com",
  databaseURL: "https://mymoney2-10c8e-default-rtdb.firebaseio.com",
  projectId: "mymoney2-10c8e",
  storageBucket: "mymoney2-10c8e.appspot.com",
  messagingSenderId: "686986088386",
  appId: "1:686986088386:web:73dd2e05a8ad5a4b8dd05b"
};


const app = initializeApp(firebaseConfig);
export default app