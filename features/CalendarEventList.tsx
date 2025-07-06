import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'calendar-events';

type Event = { date: string; desc: string };

const CalendarEventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setEvents(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const add = () => {
    if (date && desc) {
      setEvents([{ date, desc }, ...events]);
      setDate(''); setDesc('');
    }
  };
  const del = (idx: number) => setEvents(events.filter((_, i) => i !== idx));

  return (
    <div className="llm-container" style={{ minWidth: 340 }}>
      <div className="llm-title">Calendar Event List</div>
      <div className="llm-row">
        <input className="llm-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input className="llm-input" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Event description" />
        <button className="llm-button" onClick={add}>Add</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {events.length === 0 && <div className="llm-text">No events.</div>}
        {events.map((e, idx) => (
          <div key={idx} className="llm-row" style={{ marginBottom: 8 }}>
            <div className="llm-text" style={{ flex: 1 }}>{e.date}: {e.desc}</div>
            <button className="llm-button bg-red-500 hover:bg-red-600" onClick={() => del(idx)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarEventList; 