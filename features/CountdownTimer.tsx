import React, { useState, useRef } from 'react';

const CountdownTimer: React.FC = () => {
  const [input, setInput] = useState(60);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const reset = () => {
    stop();
    setSeconds(input);
  };
  const setAndReset = (v: number) => {
    setInput(v);
    setSeconds(v);
    stop();
  };
  const format = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Countdown Timer</div>
      <div className="llm-row">
        <input className="llm-input" type="number" value={input} onChange={e => setAndReset(Number(e.target.value))} />
        <span>seconds</span>
      </div>
      <div className="llm-text" style={{ fontSize: 48, textAlign: 'center' }}>{format(seconds)}</div>
      <div className="llm-row" style={{ justifyContent: 'center', marginTop: 16 }}>
        <button className="llm-button" onClick={start} disabled={running}>Start</button>
        <button className="llm-button" onClick={stop} disabled={!running}>Stop</button>
        <button className="llm-button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer; 