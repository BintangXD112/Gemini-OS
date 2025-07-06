import React, { useState } from 'react';

const caesar = (str: string, shift: number) =>
  str.replace(/[a-z]/gi, c =>
    String.fromCharCode(
      ((c.toLowerCase().charCodeAt(0) - 97 + shift + 26) % 26) + 97
    )
  );

const TextEncryptor: React.FC = () => {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const encrypt = () => setEncrypted(caesar(text, shift));
  const decrypt = () => setDecrypted(caesar(encrypted, 26 - shift));

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Text Encryptor</div>
      <div className="llm-row">
        <input className="llm-input flex-grow" value={text} onChange={e => setText(e.target.value)} placeholder="Text to encrypt..." />
        <input className="llm-input" type="number" value={shift} onChange={e => setShift(Number(e.target.value))} style={{ width: 60 }} />
        <button className="llm-button" onClick={encrypt}>Encrypt</button>
      </div>
      <div className="llm-textarea" style={{ minHeight: 40 }}>{encrypted}</div>
      <div className="llm-row" style={{ marginTop: 8 }}>
        <button className="llm-button" onClick={decrypt}>Decrypt</button>
      </div>
      <div className="llm-textarea" style={{ minHeight: 40 }}>{decrypted}</div>
    </div>
  );
};

export default TextEncryptor; 