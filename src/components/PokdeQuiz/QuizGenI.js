import React, { useEffect, useState } from "react";
import axios from "axios";



const QuizGenI = () => {

    const [pokeQuest, setPokeQuest ] = useState([]);
    const [show, setShow] = useState(false);
    const [unmask, setUnmask] = useState(false);

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
                    
                    await setPokeQuest((prev) => ([ ...prev, {questionText, id, image, answerOptions} ]))
                })
            })
        }
    }

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
        // setShow(true);
        // setTimeout( setShow(false), 2000);
        // setTimeout( () => {
            if (isCorrect) {
                setScore(score + 1);
            }

            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < pokeQuest.length) {
                setShow(true)
                setUnmask(true)

                setTimeout( () => {
                    setUnmask(false);
                },1600)

                setTimeout( () => {
                    setCurrentQuestion(nextQuestion);
                    setShow(false);
                },1800)
            } else {
                setTimeout( () => {
                    setShowScore(true)
                }
                ,1500)
            }
        // }, 3000)
	};
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {pokeQuest.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{pokeQuest.length}
						</div>

						<div className='question-text mb-5'>
                            <img src={
                                pokeQuest[currentQuestion] ?
                                pokeQuest[currentQuestion].image
                                : ''
                            } 
                            className={unmask ? 'unmask' : 'mask'}
                            />
                            {/* <div style={{minHeight: '120px'}}>
                                <div className="collapse collapse-horizontal" id="collapseWidthExample">
                                    <div className="card card-body" style={{width: '300px'}}>
                                        <h2>
                                        {
                                            pokeQuest[currentQuestion] ?
                                            pokeQuest[currentQuestion].questionText
                                        : ''
                                        }
                                        </h2>
                                    </div>
                                </div>
                            </div> */}
                            {show ?
                                        <h2 className="answer">
                                        {
                                            pokeQuest[currentQuestion] ?
                                            pokeQuest[currentQuestion].questionText
                                        : ''
                                        }
                                        </h2>
                                         : '' }
                                         
                        </div>
					</div>
                    { pokeQuest[currentQuestion] && 
					<div className='answer-section'>
						{
                        pokeQuest[currentQuestion].answerOptions.map(value => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value).map((answerOption) => (
							<button 
                            key={Math.random()} 
                            onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                            // class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample"
                            >
                            {answerOption.answerText}
                            </button>
						))}
					</div>
                    }
				</>
			)}
		</div>
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