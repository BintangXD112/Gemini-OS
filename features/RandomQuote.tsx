import React, { useState } from 'react';

const quotes = [
  'The best way to get started is to quit talking and begin doing. – Walt Disney',
  'Don’t let yesterday take up too much of today. – Will Rogers',
  'It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi',
  'If you are working on something exciting, it will keep you motivated. – Steve Jobs',
  'Success is not in what you have, but who you are. – Bo Bennett',
];

const RandomQuote: React.FC = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const newQuote = () => setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Random Quote</div>
      <div className="llm-text" style={{ fontStyle: 'italic', marginBottom: 16 }}>{quote}</div>
      <button className="llm-button" onClick={newQuote}>New Quote</button>
    </div>
  );
};

export default RandomQuote; 