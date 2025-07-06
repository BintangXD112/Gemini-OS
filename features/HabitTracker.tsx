import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'habit-tracker';
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

type Habit = { name: string; checks: boolean[] };

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setHabits(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const add = () => {
    if (input.trim()) {
      setHabits([{ name: input, checks: Array(7).fill(false) }, ...habits]);
      setInput('');
    }
  };
  const del = (idx: number) => setHabits(habits.filter((_, i) => i !== idx));
  const toggle = (hIdx: number, dIdx: number) => {
    setHabits(habits.map((h, i) => i === hIdx ? { ...h, checks: h.checks.map((c, j) => j === dIdx ? !c : c) } : h));
  };

  return (
    <div className="llm-container" style={{ minWidth: 340 }}>
      <div className="llm-title">Habit Tracker</div>
      <div className="llm-row">
        <input className="llm-input flex-grow" value={input} onChange={e => setInput(e.target.value)} placeholder="New habit..." />
        <button className="llm-button" onClick={add}>Add</button>
      </div>
      <table className="llm-container" style={{ marginTop: 16, width: '100%' }}>
        <thead>
          <tr>
            <th>Habit</th>
            {days.map(d => <th key={d}>{d}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {habits.map((h, hIdx) => (
            <tr key={hIdx}>
              <td>{h.name}</td>
              {h.checks.map((c, dIdx) => (
                <td key={dIdx}>
                  <input type="checkbox" checked={c} onChange={() => toggle(hIdx, dIdx)} />
                </td>
              ))}
              <td><button className="llm-button bg-red-500 hover:bg-red-600" onClick={() => del(hIdx)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTracker; 