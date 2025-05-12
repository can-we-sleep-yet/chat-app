import app from "../services/firebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// Initializing auth object
const auth = getAuth(app);

// Initializing firestore db
const db = getFirestore(app);

// DOM selection
const signUpForm = document.getElementById("signUpForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

signUpForm.addEventListener("submit", (e) => {
  // Prevent default behaviour (form from refreshing)
  e.preventDefault();

  // Getting input details
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmationPassword = confirmPasswordInput.value;

  // Checking if password and confirmPassword are equal
  if (password !== confirmationPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // Create User
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        username: username,
        createdAt: new Date(),
      };
      await setDoc(doc(db, "users", user.uid), userData);
      window.location.href = "../index.html";
    })
    .catch((e) => {
      alert("Failed to create account: " + e.message);
    });
});

// TODO: DISABLE SIGN UP BUTTON DURING SIGNUP. DO SAME FOR LOGIN.
