import {useState, useCallback} from "react";

import quizCompleteImg from '../assets/quiz-complete.png';

import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null)
  }, [handleSelectAnswer]);

  if (quizIsCompleted) {
    return (<div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon"/>
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (<div id="quiz">
    <Question
      key={activeQuestionIndex} // to force React to destroy and recreate the component whenever activeQuestionIndex changes
      questionIndex={activeQuestionIndex}
      onSelectAnswer={handleSelectAnswer}
      onSkipAnswer={handleSkipAnswer}
    />
    </div>
  );
}
