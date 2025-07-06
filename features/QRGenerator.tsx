import React, { useState } from 'react';

const QRGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [qr, setQr] = useState('');

  const generateQR = async () => {
    try {
      // Try to use qrcode library if available
      if ((window as any).QRCode) {
        const canvas = document.createElement('canvas');
        await (window as any).QRCode.toCanvas(canvas, text);
        setQr(canvas.toDataURL());
      } else {
        // Dummy QR (placeholder)
        setQr('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(text));
      }
    } catch {
      setQr('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(text));
    }
  };

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">QR Code Generator</div>
      <div className="llm-row">
        <input
          className="llm-input flex-grow"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text or URL..."
        />
        <button className="llm-button" onClick={generateQR}>Generate</button>
      </div>
      {qr && <img src={qr} alt="QR Code" style={{ marginTop: 16, width: 150, height: 150 }} />}
    </div>
  );
};

export default QRGenerator; 