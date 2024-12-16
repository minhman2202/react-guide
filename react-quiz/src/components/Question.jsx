import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({questionText, answers, onSelectAnswer, onSkipAnswer, selectedAnswer, answerState}) {
  return (
    <div id="question">
      <QuestionTimer onTimeOut={onSkipAnswer} timeout={10000}
      />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}