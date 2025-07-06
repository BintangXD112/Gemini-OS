import React, { useState, useEffect } from 'react';

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const SystemMonitor: React.FC = () => {
  const [cpu, setCpu] = useState(20);
  const [ram, setRam] = useState(40);
  const [storage, setStorage] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(getRandom(10, 90));
      setRam(getRandom(20, 95));
      setStorage(getRandom(30, 99));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">System Monitor</div>
      <div className="llm-text">CPU Usage: {cpu}%</div>
      <div className="llm-text">RAM Usage: {ram}%</div>
      <div className="llm-text">Storage Usage: {storage}%</div>
    </div>
  );
};

export default SystemMonitor; 