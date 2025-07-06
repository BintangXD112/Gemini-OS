import React, { useState } from 'react';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const speak = () => {
    if (text.trim()) {
      const utter = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utter);
    }
  };
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Text To Speech</div>
      <textarea className="llm-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="Type something..." />
      <button className="llm-button" onClick={speak} style={{ marginTop: 8 }}>Play</button>
    </div>
  );
};

export default TextToSpeech; 