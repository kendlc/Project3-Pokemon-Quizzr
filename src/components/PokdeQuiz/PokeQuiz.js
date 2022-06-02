import React, { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore"; 
import { firebaseConfig } from "../Firebase-config";
import { initializeApp } from "firebase/app";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Authentication from "../Authentication";
import { isAuth } from "../Firebase-config";
import QuizGenI from "./QuizGenI";
import QuizGenII from "./QuizGenII";
import QuizGenIII from "./QuizGenIII";
import QuizGenIV from "./QuizGenIV";
import QuizGenV from "./QuizGenV";
import QuizGenVI from "./QuizGenVI";
import QuizGenVII from "./QuizGenVII";
import QuizGenVIII from "./QuizGenVIII";
import FeaturedPokemons from "../FeaturedPokemons";
import useSound from "use-sound";
import soundFx from './sounds/pokequizsound1.mp3';
import music from './sounds/pokequizsound2.mp3';


const PokeQuiz = () => {
	const [genSelect, setGenSelect] = useState('1');
	const [genQuiz, setGenQuiz] = useState('');
	const [showQuiz, setShowQuiz] = useState(false);
    const [username, setUsername] = useState('');
	const [fetchedPokeballDb, setFetchedPokeballDb] = useState('');
    const [fetchedScoreDb, setFetchedScoreDb] = useState('');
	const [play] = useSound(soundFx, {
		volume: 0.4,
	});
	const [play1] = useSound(music, {
		volume: 0.03,
	  });

	useEffect( () => {
		if (isAuth()){
		const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const uid = localStorage.getItem('token');
		const getDataDb = () => {
			onSnapshot(doc(db, "users", uid), (doc) => {
			setFetchedScoreDb(doc.data().score);
			setFetchedPokeballDb(doc.data().pokeball);
			setUsername(doc.data().name);
			});
		}
		getDataDb();
		}
	})

	const _handleSelect = (e) => {
		setGenSelect(e.target.value);
	}

	const _handleQuiz = () => {
		setGenQuiz(genSelect);
		setShowQuiz(true);
		play();
		setTimeout( () => {
			play1();
		}, 3000)
	}

	return (
		<Container>
			{!showQuiz &&
				<>
				{isAuth() &&
					<Row>
						<Col className='d-flex justify-content-center mt-4 mx-auto text-center pokeText1 mx-auto' style={{fontSize: '4vh'}}>
							<span className="mx-1 mx-sm-4">Quizer: {username.split(' ')[0]}</span>
							<span className="mx-1 mx-sm-4">Score:  {fetchedScoreDb}</span>
							<span className="mx-1 mx-sm-4">Pokeballs:  <img src="./images/greatball.png" alt="Greatball"/>  {fetchedPokeballDb}</span>
						</Col>
					</Row>
				}
				<Row className="d-flex justify-content-center text-center mt-2">
					<Col sm={4} >
						
					{ !isAuth() &&
						<div className="d-flex justify-content-end">
							<Authentication />
						</div>
					}
					{ isAuth() &&
						<>
							<Row className="mt-5">
								<Form.Label className="pokeText1" style={{fontSize: '2rem'}}>Select Generation</Form.Label>
							</Row>
							<Row>
							<Form.Select className="mt-5 text-center"size="lg"
							onChange={_handleSelect}>
								<option value="1">Gen I</option>
								<option value="2">Gen II</option>
								<option value="3">Gen III</option>
								<option value="4">Gen IV</option>
								<option value="5">Gen V</option>
								<option value="6">Gen VI</option>
								<option value="7">Gen VII</option>
								<option value="8">Gen VIII</option>
							</Form.Select>
							</Row>
							<Row>
							<Button variant="secondary mx-auto mt-5 btn-lg" onClick={_handleQuiz}
							>
								Start PokeQuiz!
							</Button>
							</Row>

						</>
					}
				</Col>

				<Col sm={4} style={{marginTop: '4rem'}}>
						<img src="/images/pikachu.webp" alt="Prof Pika" 
						style={{maxWidth: '20rem'}}
						className="img-fluid mt-4"/>
				</Col>
				</Row>
				{ !isAuth() &&
					<Row className="d-flex justify-content-center mt-5">
						<Col sm={6}>
						<FeaturedPokemons />
						</Col>
					</Row>
				}

				</>
			}
			
			{ genQuiz === '1' &&
				<QuizGenI />
			}
			{ genQuiz === '2' &&
				<QuizGenII />
			}
			{ genQuiz === '3' &&
				<QuizGenIII />
			}
			{ genQuiz === '4' &&
				<QuizGenIV />
			}
			{ genQuiz === '5' &&
				<QuizGenV />
			}
			{ genQuiz === '6' &&
				<QuizGenVI />
			}
			{ genQuiz === '7' &&
				<QuizGenVII />
			}
			{ genQuiz === '8' &&
				<QuizGenVIII />
			}
			
		</Container>
	);
};

export default PokeQuiz;