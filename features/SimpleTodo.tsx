import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'simple-todo';

type Todo = { text: string; done: boolean };

const SimpleTodo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTodos(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    if (input.trim()) {
      setTodos([{ text: input, done: false }, ...todos]);
      setInput('');
    }
  };
  const del = (idx: number) => setTodos(todos.filter((_, i) => i !== idx));
  const toggle = (idx: number) => setTodos(todos.map((t, i) => i === idx ? { ...t, done: !t.done } : t));

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Simple Todo</div>
      <div className="llm-row">
        <input className="llm-input flex-grow" value={input} onChange={e => setInput(e.target.value)} placeholder="Add todo..." />
        <button className="llm-button" onClick={add}>Add</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {todos.length === 0 && <div className="llm-text">No todos.</div>}
        {todos.map((t, idx) => (
          <div key={idx} className="llm-row" style={{ marginBottom: 8 }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(idx)} />
            <div className="llm-text" style={{ flex: 1, textDecoration: t.done ? 'line-through' : undefined }}>{t.text}</div>
            <button className="llm-button bg-red-500 hover:bg-red-600" onClick={() => del(idx)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleTodo; 