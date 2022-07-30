import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPjl5Vq09INjSk7gJdikQclNCEsPKmt6w",
  authDomain: "house-marketplace-app-de3d8.firebaseapp.com",
  projectId: "house-marketplace-app-de3d8",
  storageBucket: "house-marketplace-app-de3d8.appspot.com",
  messagingSenderId: "636669750297",
  appId: "1:636669750297:web:36d60b9196e8baccf20e88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()