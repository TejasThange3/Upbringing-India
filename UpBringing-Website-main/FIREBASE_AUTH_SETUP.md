# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your application with email/password and Google sign-in.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Create Firebase Project](#step-1-create-firebase-project)
- [Step 2: Enable Authentication Methods](#step-2-enable-authentication-methods)
- [Step 3: Get Firebase Configuration](#step-3-get-firebase-configuration)
- [Step 4: Configure Environment Variables](#step-4-configure-environment-variables)
- [Step 5: Test the Application](#step-5-test-the-application)
- [Features Included](#features-included)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Google account
- Firebase is already installed in the project
- Application is running locally

---

## Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project

### 1.2 Create New Project
1. **Project name**: Enter your project name (e.g., "Upbringing Auth")
2. **Google Analytics**: Enable/disable as needed
3. Click **"Create project"**
4. Wait for project creation to complete
5. Click **"Continue"**

### 1.3 Add Web App
1. In the project overview, click the **Web icon** (`</>`)
2. **App nickname**: Enter a name (e.g., "Upbringing Web")
3. **Firebase Hosting**: Leave unchecked (unless you need it)
4. Click **"Register app"**

---

## Step 2: Enable Authentication Methods

### 2.1 Navigate to Authentication
1. In the left sidebar, click **"Build" > "Authentication"**
2. Click **"Get started"** if this is your first time

### 2.2 Enable Email/Password
1. Click on the **"Sign-in method"** tab
2. Click on **"Email/Password"**
3. Toggle **"Enable"** to ON
4. Click **"Save"**

### 2.3 Enable Google Sign-In
1. Still in **"Sign-in method"** tab
2. Click on **"Google"**
3. Toggle **"Enable"** to ON
4. **Project support email**: Select your email from dropdown
5. Click **"Save"**

**Important for Google Sign-In:**
- For local development, `localhost` is automatically whitelisted
- For production, add your production domain to **Authorized domains** in the same tab

---

## Step 3: Get Firebase Configuration

### 3.1 Access Project Settings
1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**

### 3.2 Find Your Config
1. Scroll down to **"Your apps"** section
2. You should see your web app listed
3. Under **"SDK setup and configuration"**, select **"Config"** radio button
4. You'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

---

## Step 4: Configure Environment Variables

### 4.1 Create .env File
In your project root, create a `.env` file (if it doesn't exist):

```bash
cp .env.example .env
```

### 4.2 Add Firebase Credentials
Open `.env` and replace the placeholders with your actual Firebase config values:

```env
# API Endpoints
VITE_API_ENDPOINT=http://localhost:3001/api/recommendations
VITE_ZOHO_API_ENDPOINT=http://localhost:3001/api/zoho/leads

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

**Important:**
- Never commit `.env` file to version control
- The `.env` file is already in `.gitignore`
- For production, set these as environment variables on your hosting platform

---

## Step 5: Test the Application

### 5.1 Start Development Server
```bash
npm run dev
```

### 5.2 Test Email/Password Signup
1. Click **"Login"** button in header
2. Click **"Sign up"** at the bottom
3. Fill in:
   - Full Name
   - Email
   - Password
   - Confirm Password
4. Click **"Create Account"**
5. You should be logged in and see your name/email in header

### 5.3 Test Email/Password Login
1. Click your user avatar in header
2. Click **"Logout"**
3. Click **"Login"** button
4. Enter your email and password
5. Click **"Login"**
6. You should be logged in again

### 5.4 Test Google Sign-In
1. Logout if logged in
2. Click **"Login"** button
3. Click **"Sign in with Google"**
4. Select your Google account
5. You should be logged in with your Google account

### 5.5 Verify in Firebase Console
1. Go to Firebase Console > Authentication > Users
2. You should see your registered users listed

---

## Features Included

### ✅ Authentication Features
- **Email/Password Signup**: Users can register with email and password
- **Email/Password Login**: Users can log in with credentials
- **Google OAuth**: One-click sign in with Google
- **User Profile**: Display name and email shown in header
- **Logout**: Sign out functionality
- **Session Persistence**: User stays logged in after page refresh

### ✅ UI/UX Features
- **Responsive Auth Modal**: Beautiful login/signup modal
- **Form Validation**: Real-time validation for all fields
- **Error Handling**: Clear error messages for Firebase errors
- **Loading States**: Loading spinners during authentication
- **User Avatar**: Initials-based avatar in header
- **Dropdown Menu**: User menu with logout option

### ✅ Security Features
- **Environment Variables**: Credentials stored securely
- **Firebase Security Rules**: Default Firebase security applies
- **Auth State Management**: Centralized authentication context
- **Protected Routes**: Easy to add route protection (see below)

---

## Adding Protected Routes (Optional)

If you want certain pages to be accessible only to logged-in users:

### Create Protected Route Component

Create `src/components/ProtectedRoute.tsx`:

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
```

### Use in App.tsx

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

// In your routes:
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
```

---

## Troubleshooting

### Problem: "Firebase: Error (auth/popup-closed-by-user)"

**Cause:** User closed the Google sign-in popup before completing

**Solution:** This is normal - just try again

---

### Problem: "Firebase: Error (auth/email-already-in-use)"

**Cause:** Email is already registered

**Solution:** Use the login form instead, or use "Forgot password" feature

---

### Problem: "Firebase: Error (auth/invalid-credential)"

**Cause:** Wrong email or password

**Solution:**
1. Check email and password are correct
2. Try "Forgot password" if needed
3. Or create a new account

---

### Problem: Google Sign-In doesn't work

**Solution:**
1. Verify Google is enabled in Firebase Console > Authentication > Sign-in method
2. Check that you selected a support email
3. Clear browser cache and try again
4. Make sure popup blockers are disabled

---

### Problem: "Missing Firebase environment variables"

**Cause:** `.env` file not found or variables not set

**Solution:**
1. Ensure `.env` file exists in project root
2. Check all VITE_FIREBASE_* variables are set
3. Restart dev server after editing `.env`

---

### Problem: Changes to .env not taking effect

**Solution:**
```bash
# Stop the dev server (Ctrl+C)
# Then restart it
npm run dev
```

Vite loads environment variables only on startup.

---

## File Structure

```
src/
├── lib/
│   └── firebase.ts              # Firebase initialization
├── contexts/
│   └── AuthContext.tsx          # Authentication context & hooks
├── components/
│   ├── AuthModal.tsx            # Login/Signup modal (updated)
│   └── Header.tsx               # Header with auth UI (updated)
└── App.tsx                      # App with AuthProvider (updated)
```

---

## Production Deployment

### Environment Variables
When deploying to production (Vercel, Netlify, etc.):

1. Go to your hosting platform's environment variable settings
2. Add all `VITE_FIREBASE_*` variables
3. Use your production Firebase project credentials
4. Rebuild and deploy

### Firebase Production Setup
1. Add your production domain to Firebase Console > Authentication > Settings > Authorized domains
2. Consider setting up Firebase App Check for additional security
3. Review Firebase Security Rules

---

## Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Firebase Console](https://console.firebase.google.com/)

---

## Support

If you encounter issues:
1. Check Firebase Console > Authentication > Users to see if users are being created
2. Check browser console for detailed error messages
3. Review Firebase Console logs
4. Ensure all authentication methods are enabled in Firebase Console

---

## Summary

You now have a fully functional authentication system with:
- ✅ Email/Password authentication
- ✅ Google OAuth
- ✅ User session management
- ✅ Beautiful UI with auth modal
- ✅ User profile in header
- ✅ Logout functionality

**Next steps:**
1. Create your Firebase project
2. Enable authentication methods
3. Add credentials to `.env`
4. Test login/signup
5. Start building! 🚀
