import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getFirestore, collection, query, orderBy, limit, getDocs} from "firebase/firestore"; 
import { firebaseConfig } from "./Firebase-config";
import { initializeApp } from "firebase/app";
import FeaturedPokemons from "./FeaturedPokemons";

const Leaderboard = () => {
    const [scoreBoard, setScoreBoard] = useState([]);

    useEffect( () => {
        const getScores = async () => {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const q = query(collection(db, "users"), orderBy("score", "desc"), limit(10));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(  (doc) => {
                 setScoreBoard((prev) => ([...prev, doc.data()]))
            });
        }
            getScores();
    },[]);

    return (
        <div className="d-block justify-content-center" >
            <Row className="d-flex justify-content-center">
                <Col sm={4} style={{fontSize: '20px'}}>
                    <table className="table table-hover mt-5">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            { scoreBoard.map( (u, i) => { 
                                return (
                                    <tr key={Math.random()}>
                                        <td>{i + 1}</td>
                                        <td>{u.name}</td>
                                        <td>{u.score}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Col>
                <Col sm={4}>
                    <img src="./images/smeargle.png" alt="Smeargle"
                    style={{maxWidth: '300px'}}
                    className="img-fluid mt-5 mx-4"/>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5">
                <Col sm={6}>
                <FeaturedPokemons />
                </Col>
            </Row>

        </div >
    );
};

export default Leaderboard; 