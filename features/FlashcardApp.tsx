import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'flashcard-app';

type Card = { front: string; back: string };

const FlashcardApp: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setCards(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const add = () => {
    if (front && back) {
      setCards([{ front, back }, ...cards]);
      setFront(''); setBack('');
    }
  };
  const del = (idx: number) => setCards(cards.filter((_, i) => i !== idx));
  const flip = (idx: number) => setFlipped(flipped === idx ? null : idx);

  return (
    <div className="llm-container" style={{ minWidth: 340 }}>
      <div className="llm-title">Flashcard App</div>
      <div className="llm-row">
        <input className="llm-input" value={front} onChange={e => setFront(e.target.value)} placeholder="Front" />
        <input className="llm-input" value={back} onChange={e => setBack(e.target.value)} placeholder="Back" />
        <button className="llm-button" onClick={add}>Add</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {cards.length === 0 && <div className="llm-text">No cards.</div>}
        {cards.map((c, idx) => (
          <div key={idx} className="llm-row" style={{ marginBottom: 8 }}>
            <div className="llm-container" style={{ flex: 1, cursor: 'pointer', background: '#e3f2fd' }} onClick={() => flip(idx)}>
              {flipped === idx ? c.back : c.front}
            </div>
            <button className="llm-button bg-red-500 hover:bg-red-600" onClick={() => del(idx)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardApp; 