import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCRttfZxOIdC_a1Ikh638LRf-g0soDh2wg",
  authDomain: "data-base-auto-service.firebaseapp.com",
  databaseURL: "https://data-base-auto-service-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "data-base-auto-service",
  storageBucket: "data-base-auto-service.appspot.com",
  messagingSenderId: "890340779532",
  appId: "1:890340779532:web:c3f803c569afd69ccf3029"
};

export const fire = firebase;
export const provider = new firebase.auth.GoogleAuthProvider(); 
firebase.initializeApp(firebaseConfig);