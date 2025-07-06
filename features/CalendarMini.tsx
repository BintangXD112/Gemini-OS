import React, { useState } from 'react';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CalendarMini: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const today = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prev = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const next = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Mini Calendar</div>
      <div className="llm-row" style={{ justifyContent: 'space-between' }}>
        <button className="llm-button" onClick={prev}>{'<'}</button>
        <span>{months[date.getMonth()]} {date.getFullYear()}</span>
        <button className="llm-button" onClick={next}>{'>'}</button>
      </div>
      <table className="llm-container" style={{ marginTop: 8, width: '100%' }}>
        <thead>
          <tr>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <th key={d}>{d}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil((days.length + firstDay) / 7) }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const day = weekIdx * 7 + dayIdx - firstDay + 1;
                return (
                  <td key={dayIdx} style={{ background: day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() ? '#ffe082' : undefined }}>
                    {day > 0 && day <= daysInMonth ? day : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarMini; 