import React from "react";
import { isAuth } from "./Firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { firebaseConfig } from "./Firebase-config";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container} from 'react-bootstrap';


const Navigation = () => {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const navigate = useNavigate();

    const _handleSignIn = () => {
        signInWithPopup(auth, provider)
        .then( async (result) => {

        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem('token', user.uid);
        try {
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }, { merge: true });
            console.log("Document written with ID: ", user.uid);
          } catch (e) {
            console.error("Error adding document: ", e);
          };
          navigate('/')
        })
        .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        });        
        
    };

    const _handleSignOut = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('token');
            navigate('/')
            // Sign-out successful.
            })
            .catch((error) => {
                console.log(error)
            // An error happened.
            });
    };


    return (
        <Navbar sticky="top" bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">
                <img src="/images/pokemonlogo.png" className="img-fluid" width={150} alt="PokeQuiz Logo"/>
                <img src="/images/quizzr.png" className="img-fluid" width={100} alt="PokeQuiz Logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/#/pokedex">Pokedex</Nav.Link>
                <Nav.Link href="/#/pokequiz">PokeQuiz</Nav.Link>
                <Nav.Link href="/#/leaderboard">Leaderboard</Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>                
                {/* { isAuth() &&
                    <>
                    <Nav.Link href="/pokeprofile">PokeStorage</Nav.Link>
                    <Nav.Link href="/pokeshop">PokeShop</Nav.Link>
                    </>
                } */}
                { !isAuth() &&
                    <>
                        <Nav.Link onClick={_handleSignIn}>Sign In</Nav.Link>

                    </>
                }
                { isAuth() &&
                    <>
                        <Nav.Link onClick={_handleSignOut}>Sign Out</Nav.Link>
                    </>
                }                                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default Navigation;