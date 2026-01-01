
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  // Debug: Check environment variables
  console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
  console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY ? 'SET' : 'NOT SET');
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL || 'NOT SET');
  console.log('VITE_API_ENDPOINT:', import.meta.env.VITE_API_ENDPOINT || 'NOT SET');
  console.log('===================================');

  createRoot(document.getElementById("root")!).render(<App />);
  