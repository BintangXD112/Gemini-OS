import React, { useState } from 'react';

const NumberGuessGame: React.FC = () => {
  const [target, setTarget] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [msg, setMsg] = useState('');
  const check = () => {
    const n = Number(guess);
    if (n === target) setMsg('Correct!');
    else if (n < target) setMsg('Too low!');
    else setMsg('Too high!');
  };
  const reset = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMsg('');
  };
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Number Guess Game</div>
      <input className="llm-input" value={guess} onChange={e => setGuess(e.target.value)} placeholder="Guess 1-100" />
      <button className="llm-button" onClick={check} style={{ marginTop: 8 }}>Guess</button>
      <button className="llm-button" onClick={reset} style={{ marginTop: 8, marginLeft: 8 }}>Reset</button>
      <div className="llm-text" style={{ marginTop: 16 }}>{msg}</div>
    </div>
  );
};

export default NumberGuessGame; 