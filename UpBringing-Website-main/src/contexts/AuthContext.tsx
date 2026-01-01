import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { getFirebaseAuth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase not initialized');
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update user profile with full name if provided
    if (fullName && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase not initialized');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase not initialized');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase not initialized');
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
