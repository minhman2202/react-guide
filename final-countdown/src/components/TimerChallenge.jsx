import {useState, useRef} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function startTimer() {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.open();
    }, targetTime * 1000);
  }

  function stopTimer() {
    clearTimeout(timer.current);
    setTimerStarted(false);
    setTimerExpired(false);
  }


  return (<>
    <ResultModal ref={dialog} result={false} targetTime={targetTime}/>
    <section className="challenge">
      <h2>{title}</h2>
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
  </>);
}