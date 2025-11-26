// Firebase configuration for the Gaming Platform project
// (values copied from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCtTvgDrvB5cFOD9qYL-wK3JtCTACx4GDM",
  authDomain: "gaming-platform-79b14.firebaseapp.com",
  projectId: "gaming-platform-79b14",
  storageBucket: "gaming-platform-79b14.firebasestorage.app",
  messagingSenderId: "744349432738",
  appId: "1:744349432738:web:62da1a093d6d581ff690fb",
  measurementId: "G-BC0QV2KCZ2",
};

// Initialize Firebase for the CDN (compat) SDK loaded via script tags
if (window.firebase && (!firebase.apps || !firebase.apps.length)) {
  firebase.initializeApp(firebaseConfig);
}


