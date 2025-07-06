import React, { useState } from 'react';

const RandomNamePicker: React.FC = () => {
  const [names, setNames] = useState('Alice,Bob,Charlie,David,Eve');
  const [picked, setPicked] = useState('');
  const pick = () => {
    const arr = names.split(',').map(n => n.trim()).filter(Boolean);
    if (arr.length) setPicked(arr[Math.floor(Math.random() * arr.length)]);
  };
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Random Name Picker</div>
      <input className="llm-input" value={names} onChange={e => setNames(e.target.value)} placeholder="Comma separated names..." />
      <button className="llm-button" onClick={pick} style={{ marginTop: 8 }}>Pick</button>
      {picked && <div className="llm-text" style={{ marginTop: 16 }}>Picked: {picked}</div>}
    </div>
  );
};

export default RandomNamePicker; 