import React, { useState } from 'react';

const DiceRoller: React.FC = () => {
  const [result, setResult] = useState(1);
  const roll = () => setResult(Math.floor(Math.random() * 6) + 1);
  return (
    <div className="llm-container" style={{ minWidth: 200 }}>
      <div className="llm-title">Dice Roller</div>
      <div className="llm-text" style={{ fontSize: 48, textAlign: 'center' }}>{result}</div>
      <button className="llm-button" onClick={roll}>Roll</button>
    </div>
  );
};

export default DiceRoller; 