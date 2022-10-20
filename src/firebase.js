import '@firebase/firestore'
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/storage';
//import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCIH_5yl48Y6w1b6MyUYcDyNyuXOZzo4zY",
    authDomain: "instagram-clone-justina.firebaseapp.com",
    databaseURL: "https://instagram-clone-justina-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-justina",
    storageBucket: "instagram-clone-justina.appspot.com",
    messagingSenderId: "270613465986",
    appId: "1:270613465986:web:0c97f160088d2781bd9d9b",
    measurementId: "G-BT5VSF6W3R"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const username = result.user.displayName;
            const email = result.user.email;
            const avatarImgUrl = result.user.avatarImgUrl;
        })
        .catch((error) => {
            console.log(error);
        })
}

export {db, auth, storage}