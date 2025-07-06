import React, { useState } from 'react';

const URLShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const shorten = () => {
    if (url.trim()) setShortUrl('https://gemini.os/s/' + Math.random().toString(36).slice(2, 8));
  };
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">URL Shortener</div>
      <input className="llm-input" value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste URL..." />
      <button className="llm-button" onClick={shorten} style={{ marginTop: 8 }}>Shorten</button>
      {shortUrl && <div className="llm-text" style={{ marginTop: 16 }}>Short URL: <a href={url} target="_blank" rel="noopener noreferrer">{shortUrl}</a></div>}
    </div>
  );
};

export default URLShortener; 