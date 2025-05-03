import React, { createContext, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { initializeFirebase, auth, firestore } from '@/firebase/config';
import {
  signInWithCredential,
  GoogleAuthProvider,
  OAuthProvider,
  signInAnonymously as signInAnonymouslyFirebase,
  signOut as signOutFirebase,
  updateProfile,
  deleteUser,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { initializePurchases } from '@/lib/revenuecat';

// Initialize WebBrowser for OAuth redirects
WebBrowser.maybeCompleteAuthSession();

// Auth types
interface UserProfile {
  uid: string;
  isAnonymous: boolean;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

interface UserProfileUpdate {
  displayName?: string;
  photoURL?: string;
}

// Auth context type
interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (profile: UserProfileUpdate) => Promise<void>;
  deleteAccount: () => Promise<void>;
  completeOnboarding: () => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  hasCompletedOnboarding: false,
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signInAnonymously: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
  deleteAccount: async () => {},
  completeOnboarding: () => {},
});

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Google OAuth configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: 'YOUR_IOS_CLIENT_ID', // Replace with your actual client ID
    androidClientId: 'YOUR_ANDROID_CLIENT_ID', // Replace with your actual client ID
    webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your actual client ID
  });

  // Check onboarding status on mount
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await SecureStore.getItemAsync('onboarding-completed');
        setHasCompletedOnboarding(status === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, []);

  // Initialize Firebase on mount
  useEffect(() => {
    initializeFirebase();
  }, []);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userProfile: UserProfile = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        };

        setUser(userProfile);
        setIsAuthenticated(true);

        // Initialize RevenueCat with user ID
        initializePurchases(firebaseUser.uid);

        // Check if user document exists in Firestore, create if not
        await ensureUserDocument(firebaseUser);
      } else {
        // User is signed out
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Handle Google sign-in response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((error) => {
        console.error('Error signing in with Google:', error);
      });
    }
  }, [response]);

  // Ensure user document exists in Firestore
  const ensureUserDocument = async (firebaseUser: FirebaseUser) => {
    try {
      const userDocRef = doc(firestore, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(userDocRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          isAnonymous: firebaseUser.isAnonymous,
          createdAt: new Date().toISOString(),
          photoURL: firebaseUser.photoURL,
        });
      }
    } catch (error) {
      console.error('Error ensuring user document:', error);
    }
  };

  // Complete onboarding
  const completeOnboarding = async () => {
    try {
      await SecureStore.setItemAsync('onboarding-completed', 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    if (!request) {
      throw new Error('Google Auth request not initialized');
    }
    await promptAsync();
  };

  // Sign in with Apple
  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Create Apple credential
      const provider = new OAuthProvider('apple.com');
      const authCredential = provider.credential({
        idToken: credential.identityToken as string,
        rawNonce: credential.nonce,
      });

      // Sign in with Firebase
      await signInWithCredential(auth, authCredential);
    } catch (error) {
      console.error('Error signing in with Apple:', error);
      throw error;
    }
  };

  // Sign in anonymously
  const signInAnonymously = async () => {
    try {
      await signInAnonymouslyFirebase(auth);
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await signOutFirebase(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (profile: UserProfileUpdate) => {
    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }

      await updateProfile(auth.currentUser, profile);

      // Update Firestore document
      const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, profile, { merge: true });

      // Update local state
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          ...profile,
        };
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Delete account
  const deleteAccount = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }

      await deleteUser(auth.currentUser);
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        hasCompletedOnboarding,
        signInWithGoogle,
        signInWithApple,
        signInAnonymously,
        signOut,
        updateUserProfile,
        deleteAccount,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
