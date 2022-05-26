import React from "react";
import { NavLink } from "react-router-dom";
import { isAuth } from "./Firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { firebaseConfig } from "./Firebase-config";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
// import pokelogo from '.../pupikachu.webp';


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
          navigate('/')
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
            navigate('/')
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
    };


    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/"><img src="/images/pokemonlogo.png" className="img-fluid" width={150} /><img src="/images/quizzr.png" className="img-fluid" width={100} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/pokedex">Pokedex</Nav.Link>
                <Nav.Link href="/pokequiz">PokeQuiz</Nav.Link>
                <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>                
                { isAuth() &&
                    <>
                    <Nav.Link href="/pokeprofile">PokeStorage</Nav.Link>
                    <Nav.Link href="/pokeshop">PokeShop</Nav.Link>
                    </>
                }
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




        // <Navbar>
        //     <Container>
        //         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="me-auto">
        //             <Nav.Link href="#home">Home</Nav.Link>
        //             <Nav.Link href="#link">Link</Nav.Link>
        //                 {/* <NavLink to="/">Home</NavLink>
        //                 <NavLink to="/pokedex">Pokedex</NavLink>
        //                 <NavLink to="/pokequiz" activeclassname="link">PokeQuiz</NavLink>
        //                 { isAuth() &&
        //                     <>
        //                     <NavLink to="/pokeprofile">PokeProfile</NavLink>
        //                     <NavLink to="/pokeshop">PokeShop</NavLink>    
        //                     </>
        //                 }
        //                 <NavLink to="/leaderboard">Leaderboard</NavLink>
        //                 { !isAuth() && 
        //                     <>
        //                     <button onClick={_handleSignIn}>Sign In</button>
        //                     </>
        //                 }
        //                 { isAuth() && 
        //                     <>
        //                     <button onClick={_handleSignOut}>Sign Out</button>
        //                     </>
        //                 } */}
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
        
    );
};

export default Navigation;