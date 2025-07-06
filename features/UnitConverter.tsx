import React, { useState } from 'react';

const units = {
  Length: { m: 1, km: 0.001, cm: 100, mm: 1000 },
  Weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462 },
};

const UnitConverter: React.FC = () => {
  const [type, setType] = useState<'Length' | 'Weight'>('Length');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('km');
  const [value, setValue] = useState(1);
  const convert = () => (value * (units[type][to] / units[type][from])).toFixed(4);

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Unit Converter</div>
      <div className="llm-row">
        <select className="llm-input" value={type} onChange={e => {
          setType(e.target.value as any);
          setFrom(Object.keys(units[e.target.value as 'Length' | 'Weight'])[0]);
          setTo(Object.keys(units[e.target.value as 'Length' | 'Weight'])[1]);
        }}>
          {Object.keys(units).map(k => <option key={k}>{k}</option>)}
        </select>
        <input className="llm-input" type="number" value={value} onChange={e => setValue(Number(e.target.value))} />
        <select className="llm-input" value={from} onChange={e => setFrom(e.target.value)}>
          {Object.keys(units[type]).map(k => <option key={k}>{k}</option>)}
        </select>
        <span style={{ fontWeight: 'bold' }}>→</span>
        <select className="llm-input" value={to} onChange={e => setTo(e.target.value)}>
          {Object.keys(units[type]).map(k => <option key={k}>{k}</option>)}
        </select>
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>
        Result: {convert()} {to}
      </div>
    </div>
  );
};

export default UnitConverter; 