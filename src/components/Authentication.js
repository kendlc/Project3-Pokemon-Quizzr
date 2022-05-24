import React, {useState, useEffect} from "react";
import { signInGoogle, signOutGoogle, auth, db } from "./Firebase-config";
import { collection, doc, addDoc, setDoc } from "firebase/firestore"; 


const Authentication = () => {

    const _handleSignIn = async () => {
        signInGoogle()
        
    }

    const _handleSignOut = () => {
        signOutGoogle();
    }

    

    return(
        <div>
            <button onClick={_handleSignIn}> Sign In with Google </button>
            <button onClick={_handleSignOut}> Sign Out</button>
        </div>
    );
};

export default Authentication;