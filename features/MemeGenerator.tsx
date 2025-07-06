import React, { useRef, useState, useEffect } from 'react';

const MemeGenerator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      const ctx = canvasRef.current!.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.textAlign = 'center';
      ctx.lineWidth = 2;
      ctx.strokeText(top, 150, 40);
      ctx.fillText(top, 150, 40);
      ctx.strokeText(bottom, 150, 280);
      ctx.fillText(bottom, 150, 280);
    };
  }, [url, top, bottom]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="llm-container" style={{ minWidth: 340 }}>
      <div className="llm-title">Meme Generator</div>
      <input type="file" accept="image/*" onChange={handleFile} className="llm-input" />
      <div className="llm-row">
        <input className="llm-input" value={top} onChange={e => setTop(e.target.value)} placeholder="Top text" />
        <input className="llm-input" value={bottom} onChange={e => setBottom(e.target.value)} placeholder="Bottom text" />
      </div>
      <canvas ref={canvasRef} width={300} height={300} style={{ border: '1px solid #ccc', borderRadius: 8, marginTop: 8, background: '#222' }} />
    </div>
  );
};

export default MemeGenerator; 