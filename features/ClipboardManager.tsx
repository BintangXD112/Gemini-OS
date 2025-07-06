import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'clipboard-history';

const ClipboardManager: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addToClipboard = () => {
    if (input.trim()) {
      navigator.clipboard.writeText(input);
      setHistory([input, ...history.filter(h => h !== input)].slice(0, 10));
      setInput('');
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Clipboard Manager</div>
      <div className="llm-row">
        <input
          className="llm-input flex-grow"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Copy something..."
        />
        <button className="llm-button" onClick={addToClipboard}>Add</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {history.length === 0 && <div className="llm-text">No clipboard history.</div>}
        {history.map((item, idx) => (
          <div key={idx} className="llm-row" style={{ marginBottom: 8 }}>
            <div className="llm-text" style={{ flex: 1 }}>{item}</div>
            <button className="llm-button" onClick={() => copy(item)}>Copy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipboardManager; 