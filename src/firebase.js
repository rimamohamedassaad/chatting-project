import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyCaNtWy5HEM7HomzeKHk3YPaaG2ORNYuco",
    databaseURL: "https://chat.firebaseio.com",
    authDomain: "chat-cb406.firebaseapp.com",
    projectId: "chat-cb406",
    storageBucket: "chat-cb406.appspot.com",
    messagingSenderId: "687691153685",
    appId: "1:687691153685:web:b13959b583504d47fce91c"
    // apiKey: process.env.apiKey,
    // databaseURL: process.env.databaseURL,
    // authDomain: process.env.authDomain,
    // projectId: process.env.projectId,
    // storageBucket: process.env.storageBucket,
    // messagingSenderId: process.env.messagingSenderId,
    // appId: process.env.appId

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export { auth, db, storage }