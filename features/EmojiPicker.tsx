import React from 'react';

const emojis = ['😀','😂','😍','😎','😭','😡','👍','🙏','🎉','🔥','💡','🍕','🚀','🌈','⚡','🐱','🐶','🍀','🌻','🎵'];

const EmojiPicker: React.FC = () => {
  const copy = (e: string) => navigator.clipboard.writeText(e);
  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Emoji Picker</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {emojis.map(e => (
          <span
            key={e}
            style={{ fontSize: 32, cursor: 'pointer', border: '1px solid #eee', borderRadius: 8, padding: 8 }}
            onClick={() => copy(e)}
            title="Copy emoji"
          >{e}</span>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker; 