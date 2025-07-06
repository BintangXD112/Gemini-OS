import React, { useState, useEffect } from 'react';

const cities = [
  { name: 'Jakarta', offset: 7 },
  { name: 'London', offset: 0 },
  { name: 'New York', offset: -4 },
  { name: 'Tokyo', offset: 9 },
];

const WorldClock: React.FC = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const getTime = (offset: number) => {
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * offset).toLocaleTimeString();
  };
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">World Clock</div>
      {cities.map(city => (
        <div key={city.name} className="llm-row" style={{ fontSize: 20 }}>
          <span style={{ width: 100 }}>{city.name}</span>
          <span>{getTime(city.offset)}</span>
        </div>
      ))}
    </div>
  );
};

export default WorldClock; 