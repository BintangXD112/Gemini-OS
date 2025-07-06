import React, { useState } from 'react';

const morse: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/',
};
const invMorse = Object.fromEntries(Object.entries(morse).map(([k, v]) => [v, k]));

const MorseCodeTool: React.FC = () => {
  const [text, setText] = useState('');
  const [morseCode, setMorseCode] = useState('');
  const [decoded, setDecoded] = useState('');

  const encode = () => setMorseCode(text.toUpperCase().split('').map(c => morse[c] || '').join(' '));
  const decode = () => setDecoded(morseCode.split(' ').map(m => invMorse[m] || '').join(''));

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Morse Code Tool</div>
      <div className="llm-row">
        <input className="llm-input flex-grow" value={text} onChange={e => setText(e.target.value)} placeholder="Text to encode..." />
        <button className="llm-button" onClick={encode}>Encode</button>
      </div>
      <div className="llm-textarea" style={{ minHeight: 40 }}>{morseCode}</div>
      <div className="llm-row" style={{ marginTop: 8 }}>
        <input className="llm-input flex-grow" value={morseCode} onChange={e => setMorseCode(e.target.value)} placeholder="Morse to decode..." />
        <button className="llm-button" onClick={decode}>Decode</button>
      </div>
      <div className="llm-textarea" style={{ minHeight: 40 }}>{decoded}</div>
    </div>
  );
};

export default MorseCodeTool; 