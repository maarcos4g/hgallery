import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import { doc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // your firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { storage, analytics, firestore }