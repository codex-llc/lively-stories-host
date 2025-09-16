// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgaZDOtI6i5o5c3FbOlFCSLqUdNTG-sHM",
  authDomain: "lively-stories.firebaseapp.com",
  databaseURL: "https://lively-stories-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lively-stories",
  storageBucket: "lively-stories.firebasestorage.app",
  messagingSenderId: "782979601947",
  appId: "1:782979601947:web:9d8d4eccc4811baa3acabe",
  measurementId: "G-E3VN4N7V57"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

// Check for user authentication state and redirect if logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in, redirect them to the home page
        console.log("User is logged in. Redirecting to home.html");
        window.location.href = "home.html";
    } else {
        // User is not logged in, do nothing and stay on the current page
        console.log("No user logged in. Staying on the current page.");
    }
});