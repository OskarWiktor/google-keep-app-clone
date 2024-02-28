// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
//import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyDTJj7yHg_MExXBX64NzHTVf1l4_J3WAhU",
  authDomain: "keep-app-clone.firebaseapp.com",
  projectId: "keep-app-clone",
  storageBucket: "keep-app-clone.appspot.com",
  messagingSenderId: "797265554128",
  appId: "1:797265554128:web:504c8485659c1d92c7ccd5",
  measurementId: "G-GDZSBLV0WC",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);