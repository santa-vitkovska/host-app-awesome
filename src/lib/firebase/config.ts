import { initializeApp, getApps } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app (only if not already initialized)
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Export getter functions for Firebase services
export const getFirebaseAuth = () => {
  return getAuth(app);
};

export const getFirebaseFirestore = () => {
  return getFirestore(app);
};

export const getFirebaseStorage = () => {
  return getStorage(app);
};

export const getFirebaseMessaging = () => {
  // Messaging is only available in browser environments
  if (typeof window !== 'undefined') {
    return getMessaging(app);
  }
  return null;
};

// Export the app instance for direct access if needed
export { app };

