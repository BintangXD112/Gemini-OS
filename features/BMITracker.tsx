import React, { useState } from 'react';

const BMITracker: React.FC = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const bmi = weight / ((height / 100) ** 2);
  let category = 'Normal';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">BMI Tracker</div>
      <div className="llm-row">
        <input className="llm-input" type="number" value={height} onChange={e => setHeight(Number(e.target.value))} placeholder="Height (cm)" />
        <input className="llm-input" type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} placeholder="Weight (kg)" />
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>BMI: {bmi.toFixed(2)}</div>
      <div className="llm-text">Category: {category}</div>
    </div>
  );
};

export default BMITracker; 