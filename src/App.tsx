import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions } from "./API";
import {QuestionState ,Difficulty } from "./API";

// styles

import { GlobalStyle, Wrapper } from "./App.styles";


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const TOTAL_QUESTIONS = 10;

const App = () => {

  const [Loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  
  // console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };


  

  const checkAnswer = (e: React.MouseEvent <HTMLButtonElement>) => {
    if(!gameOver){
      // user answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if(correct) setScore(prev => prev + 1);
      // save answer is the array of userAnswer
      const answerObject = {
       question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

const nextQuestion = () => {
  const nextQuestion = number + 1;
  if(nextQuestion === TOTAL_QUESTIONS){
    setGameOver(true)
  }else{
    setNumber(nextQuestion);
  }
};

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>REACT QUIZ APP</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="start" onClick={startQuiz}>
        Start Quiz
      </button>
      ) : null}
     {!gameOver ? <p className="score">score: {score}</p> : null}
      {Loading && <p>Loading Questions ...</p>}
      {!Loading && !gameOver && (
        <QuestionCard
        questionNum={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        />
      )}
      {!gameOver && !Loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1  ? (  <button className="next" onClick={nextQuestion}>Next Question</button>) : null}
    </Wrapper>
    </>
  );
}

export default App;
