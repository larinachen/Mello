// function include(file) {

//   var script = document.createElement('script');
//   script.src = file;
//   script.type = 'text/javascript';
//   script.defer = false;
  
//   document.getElementsByTagName('head').item(0).appendChild(script);
  
// }
  
// /* Include Many js files */
// // Import core Firebase JS SDK (MUST be listed first)
// try{
//   include('https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js');
//   include('https://www.gstatic.com/firebasejs/8.2.6/firebase-auth.js');
//   include('https://www.gstatic.com/firebasejs/8.2.6/firebase-firestore.js');
//   include('https://www.gstatic.com/firebasejs/8.2.6/firebase-analytics.js');
//   include('https://www.gstatic.com/firebasejs/8.2.6/firebase-analytics.js');
// }
// catch{
//   console.log('fail to include')
// }

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
