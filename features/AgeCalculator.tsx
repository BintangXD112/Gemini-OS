import React, { useState } from 'react';

const AgeCalculator: React.FC = () => {
  const [birth, setBirth] = useState('2000-01-01');
  const age = (() => {
    const b = new Date(birth);
    const n = new Date();
    let a = n.getFullYear() - b.getFullYear();
    if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) a--;
    return a;
  })();
  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Age Calculator</div>
      <input className="llm-input" type="date" value={birth} onChange={e => setBirth(e.target.value)} />
      <div className="llm-text" style={{ marginTop: 16 }}>Age: {age} years</div>
    </div>
  );
};

export default AgeCalculator; 