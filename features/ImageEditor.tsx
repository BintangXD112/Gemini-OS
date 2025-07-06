import React, { useState } from 'react';

const ImageEditor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
      setRotation(0);
      setFlip(false);
    }
  };

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Image Editor</div>
      <input type="file" accept="image/*" onChange={handleFile} className="llm-input" />
      {url && (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <img
            src={url}
            alt="Preview"
            style={{
              maxWidth: 200,
              maxHeight: 200,
              transform: `rotate(${rotation}deg) scaleX(${flip ? -1 : 1})`,
              borderRadius: 8,
              border: '1px solid #ccc',
            }}
          />
          <div className="llm-row" style={{ justifyContent: 'center', marginTop: 8 }}>
            <button className="llm-button" onClick={() => setRotation(r => r + 90)}>Rotate</button>
            <button className="llm-button" onClick={() => setFlip(f => !f)}>Flip</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor; 