import React, { useRef, useState } from 'react';

const VoiceRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = e => chunks.current.push(e.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      setAudioUrl(URL.createObjectURL(blob));
      chunks.current = [];
    };
    mediaRecorder.current.start();
    setRecording(true);
  };
  const stop = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Voice Recorder</div>
      <div className="llm-row">
        <button className="llm-button" onClick={start} disabled={recording}>Record</button>
        <button className="llm-button" onClick={stop} disabled={!recording}>Stop</button>
      </div>
      {audioUrl && (
        <audio controls src={audioUrl} style={{ marginTop: 16 }} />
      )}
    </div>
  );
};

export default VoiceRecorder; 