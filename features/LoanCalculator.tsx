import React, { useState } from 'react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(10000000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(1);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = amount && r ? (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Loan Calculator</div>
      <div className="llm-row">
        <input className="llm-input" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" />
        <input className="llm-input" type="number" value={rate} onChange={e => setRate(Number(e.target.value))} placeholder="Rate (%)" />
        <input className="llm-input" type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Years" />
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>Monthly Payment: {monthly ? monthly.toFixed(2) : '-'}</div>
    </div>
  );
};

export default LoanCalculator; 