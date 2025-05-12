import app from "../services/firebaseConfig.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// Initializing auth object
const auth = getAuth(app);

// Initializing firestore db
const db = getFirestore(app);

// DOM selection
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    emailEl.textContent = user.email;
    usernameEl.textContent =
      (await getUsernameFromDB(user.uid)) || user.displayName;
  }
});

async function getUsernameFromDB(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().username;
  }
}
