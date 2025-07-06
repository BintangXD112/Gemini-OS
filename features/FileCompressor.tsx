import React, { useState } from 'react';

const FileCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCompressed(false);
    }
  };
  const compress = () => {
    if (file) setCompressed(true);
  };
  const decompress = () => {
    if (file) setCompressed(false);
  };

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">File Compressor</div>
      <input type="file" onChange={handleFile} className="llm-input" />
      {file && (
        <div className="llm-text">File: {file.name} {compressed && '(compressed)'}</div>
      )}
      <div className="llm-row">
        <button className="llm-button" onClick={compress} disabled={!file || compressed}>Compress</button>
        <button className="llm-button" onClick={decompress} disabled={!file || !compressed}>Decompress</button>
      </div>
    </div>
  );
};

export default FileCompressor; 