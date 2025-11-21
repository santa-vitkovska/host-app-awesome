import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  type User,
  type Unsubscribe,
} from 'firebase/auth';
import { getFirebaseAuth } from './config';

/**
 * Initialize session-based authentication persistence
 * This ensures users are logged out when the browser closes
 */
export const initializeAuthPersistence = async (): Promise<void> => {
  const auth = getFirebaseAuth();
  try {
    await setPersistence(auth, browserSessionPersistence);
  } catch (error) {
    console.error('Error setting auth persistence:', error);
  }
};

/**
 * Sign up a new user with email and password
 */
export const signUp = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  const auth = getFirebaseAuth();
  // Ensure session persistence is set before signing up
  await initializeAuthPersistence();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update display name
  if (displayName) {
    await updateProfile(user, { displayName });
  }

  return user;
};

/**
 * Sign in with email and password
 */
export const signIn = async (email: string, password: string): Promise<User> => {
  const auth = getFirebaseAuth();
  // Ensure session persistence is set before signing in
  await initializeAuthPersistence();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Sign in with Google provider
 */
export const signInWithGoogle = async (): Promise<User> => {
  const auth = getFirebaseAuth();
  // Ensure session persistence is set before signing in
  await initializeAuthPersistence();
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  const auth = getFirebaseAuth();
  await firebaseSignOut(auth);
};

/**
 * Wrapper around Firebase's onAuthStateChanged
 */
export const onAuthStateChanged = (
  callback: (user: User | null) => void
): Unsubscribe => {
  const auth = getFirebaseAuth();
  return firebaseOnAuthStateChanged(auth, callback);
};

