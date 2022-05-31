import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore"; 
import { firebaseConfig } from "./Firebase-config";
import { initializeApp } from "firebase/app";


const Leaderboard = () => {
    const [score,setScore] = useState('')

    useEffect( () => {
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
            console.log("Current data: ", doc.data().score);
            setScore(doc.data().score);
        });

        // const q = query(collection(db, "users"), where("score", "==", 0))
        // console.log(q)
        // const querySnapshot = getDocs(q)
        // console.log(querySnapshot)
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //   });
        
        // const q = query(collection(db, "cities"), where("state", "==", "CA"));
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // const cities = [];
        // querySnapshot.forEach((doc) => {
        //     cities.push(doc.data().name);
        // });
        // console.log("Current cities in CA: ", cities.join(", "));
        // });
    })

    const app = initializeApp(firebaseConfig);
    
    const db = getFirestore(app);
    const uid = localStorage.getItem('token');

    const docRef = doc(db, "cities", "SF");
    const docSnap = getDoc(docRef);

    const handleData = () => {
        setScore(score + 1)
        const docRef = setDoc(doc(db, "users", uid), {
            score: 1 + score,
            pokeball: 1 
        }, { merge: true });

        // const getData = doc(db, "users", uid);
        // const docSnap = getDoc(getData);
        // console.log(docSnap)


    }

    return (
        <Container>
            <Button onClick={ handleData }>Add data</Button>

            {/* Leaderboard coming soon
            <img src="http://www.fillmurray.com/400/400" /> */}
        </Container >
    );
};

export default Leaderboard; 