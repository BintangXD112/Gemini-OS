import React, { useState, useRef, useEffect } from 'react';

const helpText = `Available commands:\nhelp - show this help\necho [text] - print text\nclear - clear terminal`;

const TerminalApp: React.FC = () => {
  const [lines, setLines] = useState<string[]>(['Welcome to Gemini Terminal! Type "help".']);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    if (cmd === 'help') return helpText.split('\n');
    if (cmd.startsWith('echo ')) return [cmd.slice(5)];
    if (cmd === 'clear') return [];
    return [`Unknown command: ${cmd}`];
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (input.trim() === 'clear') {
      setLines([]);
    } else {
      setLines([...lines, `> ${input}`, ...handleCommand(input.trim())]);
    }
    setInput('');
  };

  return (
    <div className="llm-container" style={{ minWidth: 400, background: '#222', color: '#0f0', fontFamily: 'monospace' }}>
      <div className="llm-title" style={{ color: '#fff' }}>Terminal</div>
      <div style={{ minHeight: 200, maxHeight: 300, overflowY: 'auto', marginBottom: 8 }}>
        {lines.map((line, idx) => <div key={idx}>{line}</div>)}
        <div ref={endRef} />
      </div>
      <form onSubmit={onSubmit} className="llm-row">
        <input
          className="llm-input flex-grow"
          style={{ background: '#111', color: '#0f0', fontFamily: 'monospace' }}
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button className="llm-button" type="submit">Send</button>
      </form>
    </div>
  );
};

export default TerminalApp; 