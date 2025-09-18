// welcome.js

// Check for user authentication state and redirect if logged in
// firebase-init.js

// Firebase configuration
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

auth.onAuthStateChanged((user) => {
    // Check if the user is logged in AND if the current page is NOT home.html
    if (user && window.location.pathname !== '/home.html') {
        // Use replace() to prevent the user from going back to the login page
       window.location.replace("home.html");
    }
});

// The rest of your login page-specific code goes here.
const signInButton = document.getElementById('signInButton');
const createAccountButton = document.getElementById('createAccountButton');

signInButton.addEventListener('click', () => {
    console.log("Sign into an Account button clicked.");
    // Add Firebase sign-in logic here
    window.location.replace("login.html");
});

createAccountButton.addEventListener('click', () => {
    console.log("Create an account button clicked.");
    // Add Firebase account creation logic here
});
