import React from 'react';

const cities = [
  { name: 'Jakarta', x: 220, y: 180, icon: '🌧️' },
  { name: 'London', x: 90, y: 80, icon: '☁️' },
  { name: 'New York', x: 60, y: 110, icon: '🌤️' },
  { name: 'Tokyo', x: 270, y: 90, icon: '☀️' },
];

const WeatherMap: React.FC = () => (
  <div className="llm-container" style={{ minWidth: 340 }}>
    <div className="llm-title">Weather Map</div>
    <div style={{ position: 'relative', width: 350, height: 200, background: '#e0f7fa', borderRadius: 8, overflow: 'hidden' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/400px-Equirectangular_projection_SW.jpg" alt="World Map" style={{ width: 350, height: 200, objectFit: 'cover' }} />
      {cities.map(city => (
        <span key={city.name} style={{ position: 'absolute', left: city.x, top: city.y, fontSize: 24 }}>{city.icon}</span>
      ))}
    </div>
  </div>
);

export default WeatherMap; 