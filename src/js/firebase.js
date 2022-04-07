// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    measurementId: config.MEASUREMENT_ID
  };

  /*
  var firebaseConfig = {
    apiKey: "AIzaSyB89QDl3IktUend22_q9ekuxNj2f0ff6kA",
    authDomain: "mello-8e3a5.firebaseapp.com",
    projectId: "mello-8e3a5",
    storageBucket: "mello-8e3a5.appspot.com",
    messagingSenderId: "530255252080",
    appId: "1:530255252080:web:ffc16f9015a255037282b5",
    measurementId: "G-QRJ3QKX8HJ"
  };

  */ 


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const analytics = firebase.analytics();