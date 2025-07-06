import React, { useState } from 'react';

const MarkdownViewer: React.FC = () => {
  const [md, setMd] = useState('');
  const render = (text: string) => {
    if ((window as any).marked) {
      return { __html: (window as any).marked(text) };
    }
    // Basic markdown: #, **, *, _
    let html = text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/\_(.*?)\_/gim, '<u>$1</u>')
      .replace(/\n/g, '<br/>');
    return { __html: html };
  };
  return (
    <div className="llm-container" style={{ minWidth: 350 }}>
      <div className="llm-title">Markdown Viewer</div>
      <textarea className="llm-textarea" value={md} onChange={e => setMd(e.target.value)} placeholder="# Hello\nType markdown..." style={{ minHeight: 100 }} />
      <div className="llm-title" style={{ fontSize: 16, marginTop: 16 }}>Preview:</div>
      <div className="llm-container" dangerouslySetInnerHTML={render(md)} style={{ background: '#f9fafb', minHeight: 80 }} />
    </div>
  );
};

export default MarkdownViewer; 