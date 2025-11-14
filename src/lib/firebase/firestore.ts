import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getFirebaseFirestore } from './config';

export interface UserProfile {
  displayName: string;
  avatar?: string;
  status?: string;
  createdAt: any;
  updatedAt: any;
}

export interface UserProfileInput {
  displayName: string;
  avatar?: string;
  status?: string;
}

/**
 * Create a new user profile document in Firestore
 */
export const createUserProfile = async (
  uid: string,
  data: UserProfileInput
): Promise<void> => {
  const db = getFirebaseFirestore();
  const userRef = doc(db, 'users', uid);

  // Remove undefined values (Firestore doesn't accept undefined)
  const cleanData: Record<string, any> = {
    displayName: data.displayName,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (data.avatar !== undefined) {
    cleanData.avatar = data.avatar;
  }

  if (data.status !== undefined) {
    cleanData.status = data.status;
  }

  await setDoc(userRef, cleanData);
};

/**
 * Get a user profile document from Firestore
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const db = getFirebaseFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }

    return null;
  } catch (error: any) {
    // If it's a permissions error, log it but don't throw
    // This allows the app to continue working with auth user data
    if (error.code === 'permission-denied' || error.code === 'PERMISSION_DENIED') {
      console.warn('Firestore permissions not configured. Please deploy firestore.rules to Firebase.');
      return null;
    }
    // Re-throw other errors
    throw error;
  }
};

/**
 * Update specific fields in a user profile
 * Uses setDoc with merge to create the document if it doesn't exist
 */
export const updateUserProfile = async (
  uid: string,
  patch: Partial<UserProfileInput>
): Promise<void> => {
  const db = getFirebaseFirestore();
  const userRef = doc(db, 'users', uid);

  // Check if document exists
  const userSnap = await getDoc(userRef);
  const exists = userSnap.exists();

  // Remove undefined values (Firestore doesn't accept undefined)
  const cleanPatch: Record<string, any> = {
    updatedAt: serverTimestamp(),
  };

  if (patch.displayName !== undefined) {
    cleanPatch.displayName = patch.displayName;
  }

  if (patch.avatar !== undefined) {
    cleanPatch.avatar = patch.avatar;
  }

  if (patch.status !== undefined) {
    cleanPatch.status = patch.status;
  }

  // If document doesn't exist, set createdAt as well
  if (!exists) {
    cleanPatch.createdAt = serverTimestamp();
  }

  // Use setDoc with merge to create or update
  await setDoc(userRef, cleanPatch, { merge: true });
};

