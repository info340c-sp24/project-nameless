import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtOCphogt4WUp2o9SkXeq7yQJPgfWan-A",
  authDomain: "project-nameless-8f4df.firebaseapp.com",
  databaseURL: "https://project-nameless-8f4df-default-rtdb.firebaseio.com",
  projectId: "project-nameless-8f4df",
  storageBucket: "project-nameless-8f4df.appspot.com",
  messagingSenderId: "1026899816847",
  appId: "1:1026899816847:web:42c62740d83f45b2535bfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App database={database} />
  </React.StrictMode>
);