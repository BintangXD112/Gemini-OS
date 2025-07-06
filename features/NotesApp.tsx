import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'notes-app';

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (input.trim()) {
      setNotes([input, ...notes]);
      setInput('');
    }
  };
  const deleteNote = (idx: number) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Sticky Notes</div>
      <div className="llm-row">
        <input
          className="llm-input flex-grow"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a note..."
        />
        <button className="llm-button" onClick={addNote}>Add</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {notes.length === 0 && <div className="llm-text">No notes yet.</div>}
        {notes.map((note, idx) => (
          <div key={idx} className="llm-container" style={{ background: '#fffde7', marginBottom: 8 }}>
            <div className="llm-text">{note}</div>
            <button className="llm-button bg-red-500 hover:bg-red-600" onClick={() => deleteNote(idx)} style={{ marginTop: 4 }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp; 