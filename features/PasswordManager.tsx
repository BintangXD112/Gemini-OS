import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'password-manager';

type Entry = { site: string; user: string; pass: string };

const PasswordManager: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [site, setSite] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setEntries(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const add = () => {
    if (site && user && pass) {
      setEntries([{ site, user, pass }, ...entries]);
      setSite(''); setUser(''); setPass('');
    }
  };
  const del = (idx: number) => setEntries(entries.filter((_, i) => i !== idx));

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Password Manager</div>
      <div className="llm-row">
        <input className="llm-input" value={site} onChange={e => setSite(e.target.value)} placeholder="Site" />
        <input className="llm-input" value={user} onChange={e => setUser(e.target.value)} placeholder="User" />
        <input className="llm-input" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" type="password" />
        <button className="llm-button" onClick={add}>Add</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {entries.length === 0 && <div className="llm-text">No entries.</div>}
        {entries.map((e, idx) => (
          <div key={idx} className="llm-row" style={{ marginBottom: 8 }}>
            <div className="llm-text" style={{ flex: 1 }}>{e.site} | {e.user} | {e.pass}</div>
            <button className="llm-button bg-red-500 hover:bg-red-600" onClick={() => del(idx)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordManager; 