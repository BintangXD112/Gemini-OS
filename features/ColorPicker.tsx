import React, { useState } from 'react';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#3498db');
  const copy = () => navigator.clipboard.writeText(color);
  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Color Picker</div>
      <div className="llm-row">
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="llm-input" style={{ width: 40, height: 40, padding: 0 }} />
        <input className="llm-input" value={color} onChange={e => setColor(e.target.value)} style={{ width: 100 }} />
        <button className="llm-button" onClick={copy}>Copy</button>
      </div>
      <div style={{ marginTop: 16, width: 60, height: 60, background: color, borderRadius: 8, border: '1px solid #ccc' }} />
    </div>
  );
};

export default ColorPicker; 