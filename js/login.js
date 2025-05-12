import app from "../services/firebaseConfig.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// Initializing db
const db = getFirestore(app);

// Initializing auth and Google provider object
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// DOM selection
const logInForm = document.getElementById("logInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const googleIcon = document.getElementById("googleIcon");

logInForm.addEventListener("submit", (e) => {
  // Prevent default behaviour (form from refreshing)
  e.preventDefault();

  // Getting input details
  const email = emailInput.value;
  const password = passwordInput.value;

  // Log In
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "../index.html";
    })
    .catch((e) => {
      alert("Failed to login: " + e.message);
    });
});

// Sign In With Google
googleIcon.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const user = result.user;
      if (auth.currentUser === user) {
        window.location.href = "../index.html";
        return;
      }
      const userData = {
        email: user.email,
        username: user.displayName,
        createdAt: new Date(),
      };

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, userData);
      }

      window.location.href = "../index.html";
    })
    .catch((e) => {
      alert("Google Sign-In failed: " + e.message);
    });
});
