import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Your Firebase configuration
const firebaseConfig = {
  apiKey:
    Constants.expoConfig?.extra?.firebaseApiKey || "YOUR_FIREBASE_API_KEY",
  authDomain:
    Constants.expoConfig?.extra?.firebaseAuthDomain ||
    "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId:
    Constants.expoConfig?.extra?.firebaseProjectId ||
    "YOUR_FIREBASE_PROJECT_ID",
  storageBucket:
    Constants.expoConfig?.extra?.firebaseStorageBucket ||
    "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId:
    Constants.expoConfig?.extra?.firebaseMessagingSenderId ||
    "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: Constants.expoConfig?.extra?.firebaseAppId || "YOUR_FIREBASE_APP_ID",
  measurementId:
    Constants.expoConfig?.extra?.firebaseMeasurementId ||
    "YOUR_FIREBASE_MEASUREMENT_ID",
};

// Initialize Firebase if not already initialized
export const initializeFirebase = () => {
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
};

// Export Firebase services
export const app =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Enable persistence for offline support
// This might need to be adjusted since persistence isn't fully supported in all environments
try {
  const { enablePersistence } = require("firebase/firestore");
  enablePersistence(firestore, { synchronizeTabs: true }).catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn("Firestore persistence failed: Multiple tabs open");
    } else if (err.code === "unimplemented") {
      // The current browser doesn't support persistence
      console.warn("Firestore persistence not supported in this environment");
    }
  });
} catch (error) {
  console.warn("Firestore persistence module not available");
}
