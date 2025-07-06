import React, { useState, useRef } from 'react';

const WORK = 25 * 60;
const BREAK = 5 * 60;

const PomodoroTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(WORK);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const format = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          setIsBreak(b => !b);
          setSeconds(isBreak ? WORK : BREAK);
          return isBreak ? WORK : BREAK;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const stop = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const reset = () => {
    stop();
    setSeconds(isBreak ? BREAK : WORK);
  };

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Pomodoro Timer</div>
      <div className="llm-text" style={{ fontSize: 48, textAlign: 'center' }}>{format(seconds)}</div>
      <div className="llm-text" style={{ textAlign: 'center', color: isBreak ? 'green' : 'red' }}>{isBreak ? 'Break' : 'Work'}</div>
      <div className="llm-row" style={{ justifyContent: 'center', marginTop: 16 }}>
        <button className="llm-button" onClick={start} disabled={isRunning}>Start</button>
        <button className="llm-button" onClick={stop} disabled={!isRunning}>Stop</button>
        <button className="llm-button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer; 