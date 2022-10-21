import { getDatabase } from 'firebase/database';
// import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyYnL1EDxgjuNI1Tachos5LPgMMrTtHVM",
  authDomain: "support-chat-24b46.firebaseapp.com",
  databaseURL: "https://support-chat-24b46-default-rtdb.firebaseio.com",
  projectId: "support-chat-24b46",
  storageBucket: "support-chat-24b46.appspot.com",
  messagingSenderId: "1089625819670",
  appId: "1:1089625819670:web:b725f6560b31cd60a44337",
  measurementId: "G-8BMT884DS1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
// export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();