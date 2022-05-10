
// Firebase configuration
var firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  measurementId: config.MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();
