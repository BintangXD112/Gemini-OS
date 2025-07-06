import React, { useState } from 'react';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

const RandomPasswordGen: React.FC = () => {
  const [pw, setPw] = useState('');
  const generate = () => {
    let p = '';
    for (let i = 0; i < 12; i++) p += chars[Math.floor(Math.random() * chars.length)];
    setPw(p);
  };
  const copy = () => navigator.clipboard.writeText(pw);
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Random Password Generator</div>
      <button className="llm-button" onClick={generate}>Generate</button>
      <div className="llm-textarea" style={{ minHeight: 40, marginTop: 8 }}>{pw}</div>
      <button className="llm-button" onClick={copy} disabled={!pw}>Copy</button>
    </div>
  );
};

export default RandomPasswordGen; 