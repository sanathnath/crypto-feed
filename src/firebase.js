import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from "./Config/firebaseConfig";
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export {auth, db};