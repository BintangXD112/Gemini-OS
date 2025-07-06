import React, { useState } from 'react';

const dummyFeed = [
  { title: 'Gemini OS Launches 50 Modular Features!', link: '#' },
  { title: 'How to Build a Modular React App', link: '#' },
  { title: 'Productivity Tips for Developers', link: '#' },
];

const RssReader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [feed] = useState(dummyFeed);
  return (
    <div className="llm-container" style={{ minWidth: 340 }}>
      <div className="llm-title">RSS Reader</div>
      <input className="llm-input" value={url} onChange={e => setUrl(e.target.value)} placeholder="RSS Feed URL (dummy)" />
      <div style={{ marginTop: 16 }}>
        {feed.map((item, idx) => (
          <div key={idx} className="llm-row" style={{ marginBottom: 8 }}>
            <a href={item.link} className="llm-text" target="_blank" rel="noopener noreferrer">{item.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RssReader; 