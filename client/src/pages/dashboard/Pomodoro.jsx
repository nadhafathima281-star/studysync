import { useEffect, useState } from "react";

export default function Pomodoro() {
  const focusTime = 25 * 60; // 25 minutes
  const breakTime = 5 * 60;

  const [seconds, setSeconds] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0 && isRunning) {
      setIsRunning(false);

      if (!isBreak) {
        // 🔥 Add 25 minutes to weekly total
        const current = Number(localStorage.getItem("weeklyFocus")) || 0;
        localStorage.setItem("weeklyFocus", current + 25);
      }

      setIsBreak(!isBreak);
      setSeconds(isBreak ? focusTime : breakTime);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, isBreak]);

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{formatTime()}</h2>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button
          onClick={() => {
            setSeconds(isBreak ? breakTime : focusTime);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        {isBreak ? "Break Time ☕" : "Focus Time 🔥"}
      </p>
    </div>
  );
}