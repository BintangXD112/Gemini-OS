import React, { useState } from 'react';

const UnitPriceCalc: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const perUnit = qty > 0 ? (price / qty).toFixed(2) : '0.00';
  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Unit Price Calculator</div>
      <div className="llm-row">
        <input className="llm-input" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Total Price" />
        <input className="llm-input" type="number" value={qty} onChange={e => setQty(Number(e.target.value))} placeholder="Quantity" />
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>Price per unit: {perUnit}</div>
    </div>
  );
};

export default UnitPriceCalc; 