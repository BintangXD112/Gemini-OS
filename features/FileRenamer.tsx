import React, { useState } from 'react';

const FileRenamer: React.FC = () => {
  const [oldName, setOldName] = useState('file.txt');
  const [newName, setNewName] = useState('');
  const [result, setResult] = useState('');
  const rename = () => {
    if (oldName && newName) setResult(`Renamed ${oldName} to ${newName}`);
  };
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">File Renamer</div>
      <div className="llm-row">
        <input className="llm-input" value={oldName} onChange={e => setOldName(e.target.value)} placeholder="Old file name" />
        <input className="llm-input" value={newName} onChange={e => setNewName(e.target.value)} placeholder="New file name" />
        <button className="llm-button" onClick={rename}>Rename</button>
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>{result}</div>
    </div>
  );
};

export default FileRenamer; 