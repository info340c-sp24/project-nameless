import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtOCphogt4WUp2o9SkXeq7yQJPgfWan-A",
  authDomain: "project-nameless-8f4df.firebaseapp.com",
  databaseURL: "https://project-nameless-8f4df-default-rtdb.firebaseio.com",
  projectId: "project-nameless-8f4df",
  storageBucket: "project-nameless-8f4df.appspot.com",
  messagingSenderId: "1026899816847",
  appId: "1:1026899816847:web:42c62740d83f45b2535bfa"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);