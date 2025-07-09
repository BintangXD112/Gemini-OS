import React, { useState } from 'react';

const DEFAULT_URL = 'https://www.google.com/search?igu=1&source=hp&ei=&iflsig=&output=embed';

const WebBrowserApp: React.FC = () => {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [input, setInput] = useState('');

  const handleGo = () => {
    if (!input.trim()) return;
    let newUrl = input.trim();
    if (!/^https?:\/\//.test(newUrl)) {
      // treat as search
      newUrl = `https://www.google.com/search?q=${encodeURIComponent(newUrl)}&igu=1&source=hp&ei=&iflsig=&output=embed`;
    }
    setUrl(newUrl);
  };

  return (
    <div style={{ padding: 16, height: '100%', boxSizing: 'border-box' }}>
      <h2>Web Browser</h2>
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter URL or search..."
          style={{ width: '60%', marginRight: 8 }}
          onKeyDown={e => e.key === 'Enter' && handleGo()}
        />
        <button onClick={handleGo}>Go</button>
      </div>
      <div style={{ border: '1px solid #ccc', borderRadius: 4, height: 400, overflow: 'hidden' }}>
        <iframe
          title="Web Browser"
          src={url}
          style={{ width: '100%', height: 400, border: 'none' }}
        />
      </div>
    </div>
  );
};

export default WebBrowserApp; 