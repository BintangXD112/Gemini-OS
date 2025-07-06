import React, { useState } from 'react';

const dummyWeather = {
  city: 'Jakarta',
  temp: 31,
  condition: 'Partly Cloudy',
  icon: '⛅',
};

const WeatherApp: React.FC = () => {
  const [weather] = useState(dummyWeather);
  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Weather</div>
      <div style={{ fontSize: 48, textAlign: 'center' }}>{weather.icon}</div>
      <div className="llm-text" style={{ fontSize: 24 }}>{weather.city}</div>
      <div className="llm-text" style={{ fontSize: 18 }}>{weather.temp}&deg;C</div>
      <div className="llm-text">{weather.condition}</div>
    </div>
  );
};

export default WeatherApp; 