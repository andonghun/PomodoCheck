import React, { useState, useEffect } from "react";

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: number | undefined = undefined;

    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          alert("시간이 다 되었습니다!");
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, minutes, seconds]);

  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div>
      <h1>{`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}</h1>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default App;
