import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, setDoc } from "firebase/firestore"; 



export const firebaseConfig = {
  apiKey: "AIzaSyAU_Or5QzwZcJEfwUIr2Db2d3O1bVpMvl0",
  authDomain: "project3-pokequizr-server.firebaseapp.com",
  projectId: "project3-pokequizr-server",
  storageBucket: "project3-pokequizr-server.appspot.com",
  messagingSenderId: "144894638234",
  appId: "1:144894638234:web:e4732234bc632398074723"
};

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

// const provider = new GoogleAuthProvider();

// export const auth = getAuth();



// console.log(auth)

// export const signInGoogle = () => { 

//     signInWithPopup(auth, provider)
//         .then( async (result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         localStorage.setItem('token', token);
        
//         // The signed-in user info.
//         const user = result.user;
//         console.log(user)
//         try {
//             const docRef = await setDoc(doc(db, "users", user.uid), {
//                 name: user.displayName,
//                 email: user.email,
//                 photo: user.photoURL,
//                 score: 0,
//                 pokeball: 0
//             }, { merge: true });
//             console.log("Document written with ID: ", user.uid);
//           } catch (e) {
//             console.error("Error adding document: ", e);
//           }
//         }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         });        
// }

// export const signOutGoogle = () => {
//     signOut(auth).then(() => {
//         localStorage.removeItem('token');
//         // Sign-out successful.
//         }).catch((error) => {
//         // An error happened.
//         });
// }

export const isAuth = () => {
  return localStorage.getItem('token') ? true : false
}
