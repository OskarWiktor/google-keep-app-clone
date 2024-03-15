import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDTJj7yHg_MExXBX64NzHTVf1l4_J3WAhU",
  authDomain: "keep-app-clone.firebaseapp.com",
  projectId: "keep-app-clone",
  storageBucket: "keep-app-clone.appspot.com",
  messagingSenderId: "797265554128",
  appId: "1:797265554128:web:504c8485659c1d92c7ccd5",
  measurementId: "G-GDZSBLV0WC",
  databaseURL: "https://keep-app-clone-default-rtdb.europe-west1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);