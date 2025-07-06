import React, { useState, useRef } from 'react';

const Stopwatch: React.FC = () => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
  };
  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const reset = () => {
    stop();
    setElapsed(0);
  };
  const format = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Stopwatch</div>
      <div className="llm-text" style={{ fontSize: 48, textAlign: 'center' }}>{format(elapsed)}</div>
      <div className="llm-row" style={{ justifyContent: 'center', marginTop: 16 }}>
        <button className="llm-button" onClick={start} disabled={running}>Start</button>
        <button className="llm-button" onClick={stop} disabled={!running}>Stop</button>
        <button className="llm-button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch; 