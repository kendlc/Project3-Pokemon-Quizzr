import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizGenI = () => {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

    const [pokeQuest, setPokeQuest ] = useState([]);

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
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < pokeQuest.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
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
                            } />
                            
                            {/* {
                        pokeQuest[currentQuestion] ?
                        pokeQuest[currentQuestion].questionText
                        : ''
                        } */}
                        </div>
					</div>
                    { pokeQuest[currentQuestion] && 
					<div className='answer-section'>
						{
                        pokeQuest[currentQuestion].answerOptions.map((answerOption) => (
							<button key={Math.random()} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
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