// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxMX-JmIKYcNmjctLNFv2dn1_zOV0W7NM",
  authDomain: "email-password-auth-b009f.firebaseapp.com",
  projectId: "email-password-auth-b009f",
  storageBucket: "email-password-auth-b009f.firebasestorage.app",
  messagingSenderId: "997583187942",
  appId: "1:997583187942:web:5f4a514ef4ab3673c33027",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
