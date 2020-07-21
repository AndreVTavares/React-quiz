import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

import { Difficulty, QuestionState, Category } from './API';

import { GlobalStyle, Wrapper } from './App.styles';

import QuestionCard from './components/QuestionsCard';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [totalQuestions, setTotalQuestions] = useState<number>(0);



  const startTrivia = async () => {

    setLoading(true);
    setGameOver(false);



    try {
      const newQuestions = await fetchQuizQuestions(totalQuestions, Difficulty[difficulty], Category[category]);
      console.log(newQuestions);
      setQuestions(newQuestions);
    } catch (error) {
      console.log(error);
    }

    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(prev => prev + 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }

      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {

    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }

  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categorySelected = event.target.value;

    console.log(categorySelected);
    setCategory(categorySelected);

  }

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const difficultySelected = event.target.value;

    console.log(difficultySelected);
    setDifficulty(difficultySelected);
  }

  const handleTotalQuestions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const totalQuestionsSelected = Number(event.target.value);

    console.log(totalQuestionsSelected);
    setTotalQuestions(totalQuestionsSelected);
  }


  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1 className="title">GEEK QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <input type='number' value={totalQuestions} onChange={handleTotalQuestions}/>
            <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>

            <select id="category" value={category} onChange={handleCategoryChange}>
              <option value="ENTERTAINMENT_BOOKS">books</option>
              <option value="ENTERTAINMENT_FILM">film</option>
              <option value="ENTERTAINMENT_MUSIC">music</option>
              <option value="ENTERTAINMENT_MUSICALS_THEATER">musicals & theater</option>
              <option value="ENTERTAINMENT_TELEVISION">television</option>
              <option value="ENTERTAINMENT_VIDEOGAMES">videogames</option>
              <option value="ENTERTAINMENT_COMICS">comics</option>
              <option value="ENTERTAINMENT_ANIME_MANGA">Anime & Manga</option>
            </select>
            <button className='start' onClick={startTrivia}>
              Start
            </button>
          </>
        ) : null
        }

        {!gameOver ? <p className="score">Score:{score}</p> : null}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={totalQuestions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?
          (
            <button className="next" onClick={nextQuestion}>Next Question</button>
          ) : null
        }

      </Wrapper>
    </>
  )
}

export default App;
