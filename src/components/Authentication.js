import React, {useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, setDoc } from "firebase/firestore"; 
import { firebaseConfig } from "./Firebase-config";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const navigate = useNavigate();

    const _handleSignIn = () => {
        signInWithPopup(auth, provider)
        .then( async (result) => {

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem('token', token);
        
        // The signed-in user info.
        const user = result.user;

        try {
            const docRef = await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                score: 0,
                pokeball: 0
            }, { merge: true });
            console.log("Document written with ID: ", user.uid);
          } catch (e) {
            console.error("Error adding document: ", e);
          };
        navigate('/pokequiz');
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        });        
        
    };

    const _handleSignOut = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('token');
            navigate('/pokequiz')

            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
    };

    

    return(
        <div>
            <button onClick={_handleSignIn}> Sign In with Google </button>
            <button onClick={_handleSignOut}> Sign Out</button>
        </div>
    );
};

export default Authentication;

