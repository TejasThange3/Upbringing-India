import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Support both Vite and Next.js environment variables
const getEnvVar = (key: string) => {
  if (typeof window === 'undefined') {
    // Server-side (Next.js) - return empty string to prevent initialization
    return '';
  }
  // Client-side - try both import.meta.env (Vite) and process.env (Next.js)
  const importMetaEnv = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};
  return importMetaEnv[key] || process.env[key];
};

const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY') || getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN') || getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID') || getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET') || getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID') || getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID') || getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID'),
};

// Lazy initialization - only on client side
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export const getFirebaseApp = () => {
  if (typeof window === 'undefined') return null;
  if (!app && !getApps().length) {
    app = initializeApp(firebaseConfig);
  }
  return app || getApps()[0];
};

export const getFirebaseAuth = () => {
  if (typeof window === 'undefined') return null;
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      auth = getAuth(firebaseApp);
    }
  }
  return auth;
};

// Legacy exports for backward compatibility
export { getFirebaseAuth as auth };
export default getFirebaseApp();
