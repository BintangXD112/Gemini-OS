import React, { useRef, useEffect } from 'react';

const DrawingPad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let drawing = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    let lastX = 0, lastY = 0;
    const onDown = (e: MouseEvent) => {
      drawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
    };
    const onMove = (e: MouseEvent) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX = x;
      lastY = y;
    };
    const onUp = () => { drawing = false; };
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);
  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div className="llm-container" style={{ minWidth: 340 }}>
      <div className="llm-title">Drawing Pad</div>
      <canvas ref={canvasRef} width={300} height={200} style={{ border: '1px solid #ccc', borderRadius: 8, background: '#fff' }} />
      <div className="llm-row" style={{ marginTop: 8 }}>
        <button className="llm-button" onClick={clear}>Clear</button>
      </div>
    </div>
  );
};

export default DrawingPad; 