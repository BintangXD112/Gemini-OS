import React, { useEffect, useState } from 'react';
import { fileSystemService } from '../services/fileSystemService';
import { FileSystemItem, FileSystemState } from '../types';

const DOCUMENTS_ID = 'documents';

const NotepadApp: React.FC = () => {
  const [fs, setFs] = useState<FileSystemState | null>(null);
  const [files, setFiles] = useState<FileSystemItem[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  // Load file system and files on mount
  useEffect(() => {
    const loaded = fileSystemService.loadFileSystem();
    setFs(loaded);
    const docs = fileSystemService.getItemsInDirectory(loaded, [DOCUMENTS_ID]);
    setFiles(docs.filter(f => f.type === 'file'));
  }, []);

  // Select file to edit
  const handleSelectFile = (id: string) => {
    if (!fs) return;
    const file = fs.items[id];
    setSelectedFileId(id);
    setContent(file?.content || '');
    setStatus('');
  };

  // Save file
  const handleSave = () => {
    if (!fs || !selectedFileId) return;
    const nextFs = fileSystemService.updateFile(fs, selectedFileId, content);
    setFs(nextFs);
    fileSystemService.saveFileSystem(nextFs);
    setStatus('Saved!');
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Notepad</h2>
      <div style={{ marginBottom: 12 }}>
        <label>
          Select file:
          <select
            value={selectedFileId || ''}
            onChange={e => handleSelectFile(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="">-- Choose a file --</option>
            {files.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </label>
      </div>
      {selectedFileId && (
        <div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={12}
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 16 }}
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={handleSave}>Save</button>
            <span style={{ marginLeft: 12, color: 'green' }}>{status}</span>
          </div>
        </div>
      )}
      {!selectedFileId && <p>Select a file to edit.</p>}
    </div>
  );
};

export default NotepadApp; 