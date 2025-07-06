import React, { useState } from 'react';

const choices = ['Rock', 'Paper', 'Scissors'];

const RockPaperScissors: React.FC = () => {
  const [user, setUser] = useState('');
  const [comp, setComp] = useState('');
  const [result, setResult] = useState('');
  const play = (c: string) => {
    const compChoice = choices[Math.floor(Math.random() * 3)];
    setUser(c);
    setComp(compChoice);
    if (c === compChoice) setResult('Draw!');
    else if ((c === 'Rock' && compChoice === 'Scissors') || (c === 'Paper' && compChoice === 'Rock') || (c === 'Scissors' && compChoice === 'Paper')) setResult('You win!');
    else setResult('You lose!');
  };
  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Rock Paper Scissors</div>
      <div className="llm-row" style={{ justifyContent: 'center', gap: 16 }}>
        {choices.map(c => <button key={c} className="llm-button" onClick={() => play(c)}>{c}</button>)}
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>You: {user} | Computer: {comp}</div>
      <div className="llm-text">{result}</div>
    </div>
  );
};

export default RockPaperScissors; 