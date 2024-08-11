// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { browser } from '$app/environment';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD4oHw7HB2dtGvtHOS6oXo_Qq64TXGEUkA',
	authDomain: 'tandikka-142f7.firebaseapp.com',
	projectId: 'tandikka-142f7',
	storageBucket: 'tandikka-142f7.appspot.com',
	messagingSenderId: '811764342639',
	appId: '1:811764342639:web:b98563fc3eeb6ef0c4529a',
	measurementId: 'G-655XWE3S53'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

if (browser) {
	getAnalytics(app);
}
