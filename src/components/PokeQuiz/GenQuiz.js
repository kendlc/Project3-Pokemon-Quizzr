import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Container, Button, Table } from "react-bootstrap";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  increment,
} from "firebase/firestore";
import { firebaseConfig, isAuth } from "../Firebase-config";
import { initializeApp } from "firebase/app";
import useSound from "use-sound";
import buttonsFx from "../../assets/sounds/pokequizsound3.mp3";
import buttonsSuc from "../../assets/sounds/pokequizsound4.mp3";
import revealSfx from "../../assets/sounds/pokequizsound5.mp3";
import LoadingIndicator from "../LoadingIndicator";
import { addImageProcess, getRandomIntInclusive } from "../../helpers";

const GenQuiz = ({ genSelect, setShowQuiz, playBg, playSfx, stopBg }) => {
  const [pokeQuest, setPokeQuest] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [unmask, setUnmask] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [points, setPoints] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [pokeballs, setPokeballs] = useState(0);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [fetchedPokeballDb, setFetchedPokeballDb] = useState("");
  const [fetchedScoreDb, setFetchedScoreDb] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [play] = useSound(buttonsFx, {
    volume: 0.4,
  });
  const [success] = useSound(buttonsSuc, {
    volume: 0.2,
  });
  const [reveal] = useSound(revealSfx, {
    volume: 0.5,
  });

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10);
  const { seconds, restart, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      if (!showScore) {
        handleAnswerOptionClick();
      }
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getPokeGuess = async () => {
      try {
        setIsLoading(true);
        const { start, end } = genSelect;
        const pokemonGenList = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${start - 1}&limit=${
            end - (start - 1)
          }`
        );
        const generatedQuestions = [...Array(5).keys()].map(async (_, i) => {
          const pokemonIndex = getRandomIntInclusive(start, end);
          const pokemonData = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
          );
          const {
            name: questionText,
            id,
            sprites: { other },
          } = pokemonData.data;
          const image = other["official-artwork"]["front_default"];

          const limit = end - start;
          const shuffledOptions = [...Array(3).keys()]
            .reduce(
              (acc, _) => {
                const pokemonListResults = pokemonGenList.data.results;
                let randomPokemonOption =
                  pokemonListResults[getRandomIntInclusive(0, limit)].name;
                const optionsArr = acc.map((item) => item.answerText);
                while (
                  !!optionsArr.includes(randomPokemonOption) ||
                  !randomPokemonOption
                ) {
                  randomPokemonOption =
                    pokemonListResults[getRandomIntInclusive(0, limit)].name;
                }
                return [
                  ...acc,
                  {
                    answerText: randomPokemonOption,
                    isCorrect: false,
                    sortIndex: Math.random(),
                  },
                ];
              },
              [
                {
                  answerText: questionText,
                  isCorrect: true,
                  sortIndex: Math.random(),
                },
              ]
            )
            .sort((a, b) => a.sortIndex - b.sortIndex);

          if (!i) {
            await addImageProcess(image);
          }
          return { questionText, id, image, shuffledOptions };
        });
        const pokeQuestions = await Promise.all(generatedQuestions);
        setPokeQuest(pokeQuestions);
        setIsLoading(false);
        playSfx();
        setTimeout(playBg(), 1100);
      } catch (error) {
        console.error(error);
      }
    };

    try {
      getPokeGuess();
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
      if (isAuth()) {
        getDataDb();
      }
    } catch (error) {
      console.error(error);
    }
  }, [genSelect, playBg, playSfx]);

  const [scoreF, setScoreF] = useState(0);
  const [pokeballsF, setPokeballsF] = useState(0);

  useEffect(() => {
    if (showScore === true) {
      setScoreF(score);
      setPokeballsF(pokeballs);
    }
  }, [score, pokeballs, showScore]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const uid = localStorage.getItem("token");
    const handleDataDb = () => {
      setDoc(
        doc(db, "users", uid),
        {
          score: increment(scoreF),
          pokeball: increment(pokeballsF),
        },
        { merge: true }
      );
    };

    if (isAuth()) {
      handleDataDb();
    }
  }, [scoreF, pokeballsF]);

  const handleAnswerOptionClick = (isCorrect) => {
    setTimeout(() => reveal(), 150);
    setIsButtonDisable(true);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < pokeQuest.length + 1) {
      pause();
      setShowAnswer(true);
      setUnmask(true);

      setTimeout(() => {
        setUnmask(false);
      }, 1800);

      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setShowAnswer(false);
        setIsButtonDisable(false);
        if (isCorrect) {
          setPoints(points + 1);
          setScore(score + 10 + (Math.floor(Math.random() * (10 - 1 + 1)) + 1));
          setPokeballs(pokeballs + 5);
        }

        if (questionNumber <= 3) {
          setQuestionNumber(questionNumber + 1);
        }
        const time = new Date();
        time.setSeconds(time.getSeconds() + 10);
        restart(time);

        if (nextQuestion === pokeQuest.length) {
          success();
          setShowScore(true);
        }
      }, 2000);
    }
  };

  const renderScoreCard = () => (
    <Container className="mt-5">
      <Row>
        <p style={{ fontSize: "4rem" }} className="pokeText1 text-center">
          Quiz Over
        </p>
      </Row>
      <Row className="mt-5">
        <Col sm={2}></Col>
        <Col sm={5}>
          <Table responsive="sm" className="table-hover">
            <thead>
              <tr>
                <th>Scoreboard</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Correct Answers</td>
                <td>+</td>
                <td>
                  <strong>{points}</strong>
                </td>
              </tr>
              <tr>
                <td>Score</td>
                <td>+</td>
                <td>
                  <strong>{score}</strong>
                </td>
              </tr>
              <tr>
                <th>Reward</th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <td>Pokeballs</td>
                <td>+</td>
                <td>
                  <strong>{pokeballs}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col
          sm={5}
          className="d-flex justify-content-center justify-content-sm-start"
        >
          <img
            src="./images/prof.webp"
            alt="Prof Tally"
            style={{ width: "12rem" }}
            className="img-fluid"
          />
        </Col>
      </Row>
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
              Pokeballs: <img src="./images/greatball.png" alt="Greatball" />{" "}
              {fetchedPokeballDb}
            </span>
          </Col>
        </Row>
      )}
      <Row>
        <Col className="d-flex justify-content-center mt-5">
          <Button
            variant="secondary btn-lg m-1"
            style={{ borderRadius: "4rem" }}
            onClick={() => {
              stopBg();
              setShowQuiz(false);
            }}
          >
            Quiz again
          </Button>
          <Button
            variant="secondary btn-lg m-1"
            style={{ borderRadius: "4rem" }}
            onClick={() => {
              stopBg();
              navigate("/leaderboard");
            }}
          >
            Leaderboard
          </Button>
          {/* <Button variant='secondary btn-lg m-1'
                  style={{borderRadius: '4rem'}}
                  onClick={ () => navigate('/pokeshop')}>
                      PokeShop
                  </Button>  */}
        </Col>
      </Row>
    </Container>
  );

  const renderQuizGame = () => (
    <>
      <Col sm={7} className="mt-3">
        <Container>
          <div className="d-block d-sm-none d-flex justify-content-center ">
            <img
              src="./images/pokequiz1.png"
              alt="pokequiz"
              style={{ width: "16rem" }}
            />
          </div>
          <Row
            className="d-none d-sm-flex justify-content-around pokeText1"
            style={{ fontSize: "3vw" }}
          >
            <Col className="d-flex justify-content-center">
              Q {questionNumber <= 5 ? questionNumber + 1 : "5"}/5
            </Col>
            <Col className="d-flex justify-content-center">PTS {points}</Col>
            <Col className="d-flex justify-content-center">
              <img
                src="/images/clock.svg"
                alt="pokequiz"
                width="35"
                style={{ marginTop: "1px", minWidth: "3vw" }}
              />{" "}
              &nbsp;{seconds}
            </Col>
          </Row>
          <div>
            <div
              style={{
                background:
                  'url("./images/pokequiz2.png") no-repeat center center',
              }}
              className="d-flex justify-content-center"
            >
              <img
                src={
                  pokeQuest[currentQuestion]
                    ? pokeQuest[currentQuestion].image
                    : ""
                }
                className={unmask ? "unmask img-fluid" : "mask img-fluid"}
                alt="pokequiz"
              />
            </div>
            <Row
              className="d-sm-none d-flex justify-content-around pokeText1"
              style={{ fontSize: "6vw" }}
            >
              <Col className="d-flex justify-content-center">
                Q {questionNumber <= 5 ? questionNumber + 1 : "5"}/5
              </Col>
              <Col className="d-flex justify-content-center">PTS {points}</Col>
              <Col className="d-flex justify-content-center">
                <img
                  src="/images/clock.svg"
                  alt="pokequiz"
                  width="35"
                  style={{ marginTop: "1px", minWidth: "3vw" }}
                />{" "}
                &nbsp;{seconds}
              </Col>
            </Row>
            <div className="pokeText d-flex justify-content-center">
              {showAnswer ? (
                <p className="text-capitalize">
                  {pokeQuest[currentQuestion]
                    ? pokeQuest[currentQuestion].questionText
                    : ""}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
      </Col>
      <Col sm={5}>
        {pokeQuest[currentQuestion] && (
          <Container className="float-center">
            <div className="d-none d-sm-block">
              <img
                src="./images/pokequiz1.png"
                alt="pokequiz"
                style={{ width: "16rem" }}
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto float-center float-sm-start">
              {pokeQuest[currentQuestion].shuffledOptions.map(
                (answerOption) => (
                  <Row key={Math.random()}>
                    <Button
                      variant="danger p-2 m-2 shadow"
                      disabled={isButtonDisable}
                      style={{
                        fontSize: "2rem",
                        borderRadius: "4rem",
                        opacity: "0.7",
                      }}
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                      className="text-capitalize"
                      onMouseDown={() => {
                        play();
                      }}
                    >
                      {answerOption.answerText}
                    </Button>
                  </Row>
                )
              )}
            </div>
          </Container>
        )}
      </Col>
    </>
  );

  return (
    <Container>
      <Row>
        {isLoading ? (
          <div style={{ height: "80vh" }}>
            <LoadingIndicator />
          </div>
        ) : showScore ? (
          renderScoreCard()
        ) : (
          renderQuizGame()
        )}
      </Row>
    </Container>
  );
};

export default GenQuiz;
