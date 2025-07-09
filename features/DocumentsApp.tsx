import React, { useEffect, useState } from 'react';
import { fileSystemService } from '../services/fileSystemService';
import { FileSystemItem, FileSystemState } from '../types';

const DOCUMENTS_ID = 'documents';

const DocumentsApp: React.FC = () => {
  const [fs, setFs] = useState<FileSystemState | null>(null);
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');

  // Load file system on mount
  useEffect(() => {
    const loaded = fileSystemService.loadFileSystem();
    setFs(loaded);
    setItems(fileSystemService.getItemsInDirectory(loaded, [DOCUMENTS_ID]));
  }, []);

  // Helper to refresh items
  const refresh = (nextFs: FileSystemState) => {
    setFs(nextFs);
    setItems(fileSystemService.getItemsInDirectory(nextFs, [DOCUMENTS_ID]));
    fileSystemService.saveFileSystem(nextFs);
  };

  // Create file
  const handleCreateFile = () => {
    if (!fs || !newFileName.trim()) return;
    const nextFs = fileSystemService.createFile(fs, newFileName.trim(), '', DOCUMENTS_ID);
    setNewFileName('');
    refresh(nextFs);
  };

  // Create folder
  const handleCreateFolder = () => {
    if (!fs || !newFolderName.trim()) return;
    const nextFs = fileSystemService.createFolder(fs, newFolderName.trim(), DOCUMENTS_ID);
    setNewFolderName('');
    refresh(nextFs);
  };

  // Move to trash
  const handleDelete = (id: string) => {
    if (!fs) return;
    const nextFs = fileSystemService.moveToTrash(fs, id);
    refresh(nextFs);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Documents</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="New file name"
          value={newFileName}
          onChange={e => setNewFileName(e.target.value)}
        />
        <button onClick={handleCreateFile} style={{ marginLeft: 4 }}>Create File</button>
        <input
          type="text"
          placeholder="New folder name"
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
          style={{ marginLeft: 12 }}
        />
        <button onClick={handleCreateFolder} style={{ marginLeft: 4 }}>Create Folder</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
            <th align="left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr><td colSpan={3}>No files or folders.</td></tr>
          )}
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsApp; 