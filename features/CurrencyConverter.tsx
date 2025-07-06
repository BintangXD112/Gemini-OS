import React, { useState } from 'react';

const rates = { USD: 1, EUR: 0.9, IDR: 15000 };

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('IDR');
  const convert = () => (amount * (rates[to] / rates[from])).toFixed(2);

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Currency Converter</div>
      <div className="llm-row">
        <input className="llm-input" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
        <select className="llm-input" value={from} onChange={e => setFrom(e.target.value)}>
          {Object.keys(rates).map(k => <option key={k}>{k}</option>)}
        </select>
        <span style={{ fontWeight: 'bold' }}>→</span>
        <select className="llm-input" value={to} onChange={e => setTo(e.target.value)}>
          {Object.keys(rates).map(k => <option key={k}>{k}</option>)}
        </select>
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>
        Result: {convert()} {to}
      </div>
    </div>
  );
};

export default CurrencyConverter; 