import {useState, useRef} from "react";

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function startTimer() {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  function stopTimer() {
    clearTimeout(timer.current);
    setTimerStarted(false);
    setTimerExpired(false);
  }


  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>Time's up! You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime !== 1 && 's'}
      </p>
      <p>
        <button onClick={timerStarted ? stopTimer : startTimer}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Timer is running...' : 'Timer inactive'}
      </p>
    </section>
  );
}