import React, { useState } from 'react';

const BinaryConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [base, setBase] = useState<'dec' | 'bin' | 'hex'>('dec');
  const convert = () => {
    let n = 0;
    if (base === 'dec') n = parseInt(input, 10);
    if (base === 'bin') n = parseInt(input, 2);
    if (base === 'hex') n = parseInt(input, 16);
    return {
      dec: n.toString(10),
      bin: n.toString(2),
      hex: n.toString(16).toUpperCase(),
    };
  };
  const res = input ? convert() : { dec: '', bin: '', hex: '' };
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Binary Converter</div>
      <div className="llm-row">
        <select className="llm-input" value={base} onChange={e => setBase(e.target.value as any)}>
          <option value="dec">Decimal</option>
          <option value="bin">Binary</option>
          <option value="hex">Hex</option>
        </select>
        <input className="llm-input" value={input} onChange={e => setInput(e.target.value)} placeholder="Input..." />
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>Decimal: {res.dec}</div>
      <div className="llm-text">Binary: {res.bin}</div>
      <div className="llm-text">Hex: {res.hex}</div>
    </div>
  );
};

export default BinaryConverter; 