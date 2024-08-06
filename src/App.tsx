import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions } from "./API";
import { Difficulty } from "./API";


const TOTAL_QUESTIONS = 10;

const App = () => {

  const [Loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOVer] = useState(true);

  console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  

  const startQuiz = async () => {

  };

  const checkAnswer = (e: React.MouseEvent <HTMLButtonElement>) => {};

const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>REACT QUIZ APP</h1>
      <button className="start" onClick={startQuiz}>
        Start Quiz
      </button>
      <p className="score">score:</p>
      <p>Loading Questions ...</p>
      {/* <QuestionCard
      questionNum={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answer}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
