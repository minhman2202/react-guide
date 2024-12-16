import {useState, useEffect} from "react";

export default function QuestionTimer({timeout, onTimeOut, mode}) {
  const [timeLeft, setTimeLeft] = useState(timeout);

  useEffect(() => {
    console.log('Setting timeout');
    const timer = setTimeout(() => {
      console.log('Timeout reached');
      onTimeOut();
    }, timeout);

    return () => {
      console.log('Clearing timeout');
      clearTimeout(timer);
    };
  }, [timeout, onTimeOut]);

  useEffect(() => {
    console.log('Setting interval');
    const interval = setInterval(() => {
      console.log('Interval tick');
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 100);
    }, 100);

    return () => {
      console.log('Clearing interval');
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id="question-time" max={timeout} value={timeLeft} className={mode}/>
  );
}