import React, { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "../Firebase-config";
import { initializeApp } from "firebase/app";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { isAuth } from "../Firebase-config";
import useSound from "use-sound";
import soundFx from "../../assets/sounds/pokequizsound1.mp3";
import music from "../../assets/sounds/pokequizsound2.mp3";
import GenQuiz from "./GenQuiz";
import { pokemonGenerationIndexes } from "../../constants";

const PokeQuiz = () => {
  const [genSelect, setGenSelect] = useState(pokemonGenerationIndexes[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [username, setUsername] = useState("");
  const [fetchedPokeballDb, setFetchedPokeballDb] = useState("");
  const [fetchedScoreDb, setFetchedScoreDb] = useState("");
  const [playSfx] = useSound(soundFx, {
    volume: 0.4,
  });
  const [playBg, { stop }] = useSound(music, {
    volume: 0.03,
  });

  useEffect(() => {
    try {
      if (isAuth()) {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const uid = localStorage.getItem("token");
        const getDataDb = () => {
          onSnapshot(doc(db, "users", uid), (doc) => {
            setFetchedScoreDb(doc.data().score);
            setFetchedPokeballDb(doc.data().pokeball);
            setUsername(doc.data().name);
          });
        };
        getDataDb();
      }
    } catch (error) {
      console.error(error);
    }
  });

  const _handleSelect = (e) => {
    const genDetails = JSON.parse(e.target.value);
    setGenSelect(genDetails);
  };

  const _handleQuiz = () => {
    setShowQuiz(true);
  };

  return (
    <Container>
      {!showQuiz && (
        <>
          {isAuth() && (
            <Row>
              <Col
                className="d-flex justify-content-center mt-4 mx-auto text-center pokeText1 mx-auto"
                style={{ fontSize: "4vh" }}
              >
                <span className="mx-1 mx-sm-4">
                  Quizer: {username.split(" ")[0]}
                </span>
                <span className="mx-1 mx-sm-4">Score: {fetchedScoreDb}</span>
                <span className="mx-1 mx-sm-4">
                  Pokeballs:{" "}
                  <img src="./images/greatball.png" alt="Greatball" />{" "}
                  {fetchedPokeballDb}
                </span>
              </Col>
            </Row>
          )}
          <Row className="d-flex justify-content-center align-items-center text-center mt-2">
            <Col sm={4}>
              {/* { !isAuth() &&
						<>
							<div
							className="d-none d-sm-block"
							style={{height: '16vh'}}>
							</div>
							<div className="d-flex justify-content-center justify-content-sm-end mt-2">
							<Authentication />
							</div>
						</>
						
					}
					{ isAuth() && */}
              <>
                <Row className="mt-5">
                  <Form.Label
                    className="pokeText1"
                    style={{ fontSize: "2rem" }}
                  >
                    Select Generation
                  </Form.Label>
                </Row>
                <Row>
                  <Form.Select
                    className="mt-5 text-center"
                    size="lg"
                    onChange={_handleSelect}
                  >
                    {pokemonGenerationIndexes.map((item) => {
                      return (
                        <option key={item.label} value={JSON.stringify(item)}>
                          {item.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Row>
                <Row>
                  <Button
                    variant="secondary mx-auto mt-5 btn-lg"
                    onClick={_handleQuiz}
                  >
                    Start PokeQuiz!
                  </Button>
                </Row>
              </>
              {/* } */}
            </Col>

            <Col sm={4} style={{ marginTop: "4rem" }}>
              <img
                src="/images/pikachu.webp"
                alt="Prof Pika"
                style={{ maxWidth: "20rem" }}
                className="img-fluid mt-4"
              />
            </Col>
          </Row>
        </>
      )}
      {showQuiz && (
        <GenQuiz
          genSelect={genSelect}
          setShowQuiz={setShowQuiz}
          playBg={playBg}
          playSfx={playSfx}
          stopBg={stop}
        />
      )}
    </Container>
  );
};

export default PokeQuiz;
