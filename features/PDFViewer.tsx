import React, { useState } from 'react';

const PDFViewer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">PDF Viewer</div>
      <input type="file" accept="application/pdf" onChange={handleFile} className="llm-input" />
      {file && (
        <div style={{ marginTop: 16 }}>
          <div className="llm-text">{file.name}</div>
          {url ? (
            <iframe src={url} width="100%" height={400} title="PDF Preview" style={{ border: '1px solid #ccc', borderRadius: 8 }} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PDFViewer; 