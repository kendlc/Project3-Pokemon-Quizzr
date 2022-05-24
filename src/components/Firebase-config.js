import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAU_Or5QzwZcJEfwUIr2Db2d3O1bVpMvl0",
  authDomain: "project3-pokequizr-server.firebaseapp.com",
  projectId: "project3-pokequizr-server",
  storageBucket: "project3-pokequizr-server.appspot.com",
  messagingSenderId: "144894638234",
  appId: "1:144894638234:web:e4732234bc632398074723"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()



export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then ((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("profilePic", profilePic)
    }).catch((error) => {
        console.log(error);
    });
};
