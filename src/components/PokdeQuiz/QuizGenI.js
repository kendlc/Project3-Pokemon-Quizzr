import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Container, Button, Table } from "react-bootstrap";




const QuizGenI = () => {
    const [pokeQuest, setPokeQuest ] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [unmask, setUnmask] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [points, setPoints] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [pokeballs, setPokeballs] = useState(0);
    const [buttonDisable, setButtonDisable] = useState('');

    // setScore(points *  (10 + Math.floor(Math.random() * 9)))
    // setPokeballs(points * 10)

    useEffect( () => {
        getPokeGuess();
    },[]);

    const getPokeGuess = () => {
        for (let i = 0; i < 5; i++){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 151)}`)
            .then( async ({data}) => {
                const questionText = data.name
                const id = data.id
                const image = data.sprites.other["official-artwork"]["front_default"]
                 await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
                .then( async ({data}) => {
                    const answerOptions = data.results
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
                    .slice(0, 3).map( (p) => ({answerText: p.name, isCorrect: false}))
                    answerOptions.push({ answerText: questionText, isCorrect: true })

                    const shuffledOptions = answerOptions.map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
                    
                    await setPokeQuest((prev) => ([ ...prev, {questionText, id, image, shuffledOptions} ]))
                })
            })
        }
    }

	const handleAnswerOptionClick = (isCorrect) => {
        setButtonDisable(true);
        if (isCorrect) {
            setPoints(points + 1);
        }

            const nextQuestion = currentQuestion + 1;
                
        if (nextQuestion < pokeQuest.length +  1) {
            setShowAnswer(true);
            setUnmask(true);

            setTimeout( () => {
                setUnmask(false);
            }, 1800);

            setTimeout( () => {
                setCurrentQuestion(nextQuestion);
                setShowAnswer(false);
                setButtonDisable('');

                if (questionNumber <= 3) {
                    setQuestionNumber(questionNumber + 1);
                }
                setTimeout( () => {
    setScore(points *  (10 + Math.floor(Math.random() * 9)))
    setPokeballs(points * 10)
                    if (nextQuestion === pokeQuest.length) {
                        setShowScore(true);

                    }
                }, 200);
            },2000)
        }
	};

	return (
		<Container >
            <Row>
			{showScore ? (
				<Container className='mt-5'>
                    <Row>
                        <p style={{fontSize: '4rem'}} className="pokeText1 text-center">Quiz Over</p>
                    </Row>
                    <Row className='mt-5'>
                        <Col sm={2}>
                        </Col>
                        <Col sm={5}>
                            <Table responsive='sm' className="table-hover" >
                                <thead>
                                <tr>
                                    <th>Tally</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Correct Answers</td>
                                    <td>...</td>
                                    <td>{points}</td>
                                </tr>
                                <tr>
                                    <td>Score</td>
                                    <td>...</td>
                                    <td>{score}</td>
                                </tr>
                                <tr>
                                    <th>Rewards</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td>Pokeballs</td>
                                    <td>...</td>
                                    <td>{pokeballs}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col sm={5} className='d-flex justify-content-center justify-content-sm-start'>
                            <img src='./images/prof.webp'
                            style={{width: '12rem'}}
                            className='img-fluid'/>
                        </Col>
                    </Row>
				</Container>
			    ) : (
				<>
                <Col sm={7} className='mt-3'>
                    
					<Container className=''>
                        <div className='d-block d-sm-none d-flex justify-content-center '>
                            <img src='./images/pokequiz1.png' 
                            style={{width: '16rem'}}
                            />
                        </div>
						<div className='d-flex justify-content-around pokeText1'>
							<span>Q &nbsp;{questionNumber <= 5 ? questionNumber + 1 : '5'}&nbsp; /&nbsp;5</span><span>PTS {points}</span>
						</div>

						<div>
                            <div style={{background: 'url("./images/pokequiz2.png") no-repeat center center'}}
                            className='d-flex justify-content-center'>
                                <img src={
                                    pokeQuest[currentQuestion] ?
                                    pokeQuest[currentQuestion].image
                                    : ''
                                } 
                                className={ unmask ? 'unmask img-fluid' : 'mask img-fluid' }
                                />
                            </div>
                            <div className="pokeText d-flex justify-content-center">
                                { showAnswer ?
                                    <p className="text-capitalize">
                                    {
                                        pokeQuest[currentQuestion] ?
                                        pokeQuest[currentQuestion].questionText
                                    : ''
                                    }
                                    </p>
                                : '' }
                            </div>
                                         
                        </div>
					</Container>
                </Col>
                <Col sm={5}>
                    { pokeQuest[currentQuestion] && 
                        
                        <Container className="float-center">
                            <div className='d-none d-sm-block'>
                                <img src='./images/pokequiz1.png' 
                                style={{width: '16rem'}}
                                />
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto float-center float-sm-start">
                            {
                            pokeQuest[currentQuestion].shuffledOptions.map((answerOption) => (
                                    <Row key={Math.random()} >
                                    <Button variant="danger p-2 m-2 shadow" disabled={buttonDisable}
                                    style={{fontSize: '2rem', borderRadius: '4rem', opacity: '0.7'}}
                                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                    className="text-capitalize"
                                    >
                                    {answerOption.answerText}
                                    </Button>
                                    </Row>
                            ))}
                            </div>
                        </Container>
                    }
                </Col>
				</>
			)}
            </Row>
		</Container>
	);
}

export default QuizGenI;


// shuffle
// .map(value => ({ value, sort: Math.random() }))
// .sort((a, b) => a.sort - b.sort)
// .map(({ value }) => value)


// const questions = [
//     {
//         questionText: 'What is the capital of France?',
//         answerOptions: [
//             { answerText: 'New York', isCorrect: false },
//             { answerText: 'London', isCorrect: false },
//             { answerText: 'Paris', isCorrect: true },
//             { answerText: 'Dublin', isCorrect: false },
//         ],
//     },
//     {
//         questionText: 'Who is CEO of Tesla?',
//         answerOptions: [
//             { answerText: 'Jeff Bezos', isCorrect: false },
//             { answerText: 'Elon Musk', isCorrect: true },
//             { answerText: 'Bill Gates', isCorrect: false },
//             { answerText: 'Tony Stark', isCorrect: false },
//         ],
//     },
//     {
//         questionText: 'The iPhone was created by which company?',
//         answerOptions: [
//             { answerText: 'Apple', isCorrect: true },
//             { answerText: 'Intel', isCorrect: false },
//             { answerText: 'Amazon', isCorrect: false },
//             { answerText: 'Microsoft', isCorrect: false },
//         ],
//     },
//     {
//         questionText: 'How many Harry Potter books are there?',
//         answerOptions: [
//             { answerText: '1', isCorrect: false },
//             { answerText: '4', isCorrect: false },
//             { answerText: '6', isCorrect: false },
//             { answerText: '7', isCorrect: true },
//         ],
//     },
// ];

                    //    {/* <div style={{minHeight: '120px'}}>
                    //             <div className="collapse collapse-horizontal" id="collapseWidthExample">
                    //                 <div className="card card-body" style={{width: '300px'}}>
                    //                     <h2>
                    //                     {
                    //                         pokeQuest[currentQuestion] ?
                    //                         pokeQuest[currentQuestion].questionText
                    //                     : ''
                    //                     }
                    //                     </h2>
                    //                 </div>
                    //             </div>
                    //         </div> */}