import {useEffect, useState} from "react";

export default function ProgressBar({timer}) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("TIMER INTERVAL");
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => {
      console.log("TIMER INTERVAL CLEARED");
      clearInterval(interval);
    }
  }, []);

  return <progress value={remainingTime} max={timer}/>;
}