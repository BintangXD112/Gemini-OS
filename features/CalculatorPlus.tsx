import React, { useState } from 'react';

const ops = ['+', '-', '*', '/', 'sin', 'cos', 'tan', 'sqrt', '^'];

const CalculatorPlus: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const calc = () => {
    try {
      let expr = input.replace(/\^/g, '**');
      expr = expr.replace(/sin\(([^)]+)\)/g, (_, x) => String(Math.sin(Number(x))));
      expr = expr.replace(/cos\(([^)]+)\)/g, (_, x) => String(Math.cos(Number(x))));
      expr = expr.replace(/tan\(([^)]+)\)/g, (_, x) => String(Math.tan(Number(x))));
      expr = expr.replace(/sqrt\(([^)]+)\)/g, (_, x) => String(Math.sqrt(Number(x))));
      // eslint-disable-next-line no-eval
      setResult(String(eval(expr)));
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Calculator Plus</div>
      <input className="llm-input" value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 2+2, sin(0.5), sqrt(9)" />
      <div className="llm-row" style={{ marginTop: 8 }}>
        <button className="llm-button" onClick={calc}>Calculate</button>
        <button className="llm-button" onClick={() => { setInput(''); setResult(''); }}>Clear</button>
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>Result: {result}</div>
      <div className="llm-text" style={{ fontSize: 12, color: '#888' }}>
        Supported: +, -, *, /, sin(x), cos(x), tan(x), sqrt(x), ^
      </div>
    </div>
  );
};

export default CalculatorPlus; 