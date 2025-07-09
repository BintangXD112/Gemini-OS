import React, { useEffect, useState } from 'react';
import { fileSystemService } from '../services/fileSystemService';
import { FileSystemItem, FileSystemState } from '../types';

const TrashBinApp: React.FC = () => {
  const [fs, setFs] = useState<FileSystemState | null>(null);
  const [trashItems, setTrashItems] = useState<FileSystemItem[]>([]);
  const [status, setStatus] = useState('');

  // Load file system and trash on mount
  useEffect(() => {
    const loaded = fileSystemService.loadFileSystem();
    setFs(loaded);
    setTrashItems(
      loaded.trash.map(id => loaded.items[id]).filter(Boolean)
    );
  }, []);

  // Helper to refresh trash
  const refresh = (nextFs: FileSystemState, msg?: string) => {
    setFs(nextFs);
    setTrashItems(nextFs.trash.map(id => nextFs.items[id]).filter(Boolean));
    fileSystemService.saveFileSystem(nextFs);
    setStatus(msg || '');
  };

  // Restore item
  const handleRestore = (id: string) => {
    if (!fs) return;
    const nextFs = fileSystemService.restoreFromTrash(fs, id);
    refresh(nextFs, 'Restored!');
  };

  // Permanently delete item
  const handleDelete = (id: string) => {
    if (!fs) return;
    const nextFs = fileSystemService.permanentlyDelete(fs, id);
    refresh(nextFs, 'Deleted permanently!');
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Trash Bin</h2>
      <div style={{ color: 'green', marginBottom: 8 }}>{status}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
            <th align="left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trashItems.length === 0 && (
            <tr><td colSpan={3}>Trash is empty.</td></tr>
          )}
          {trashItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>
                <button onClick={() => handleRestore(item.id)}>Restore</button>
                <button onClick={() => handleDelete(item.id)} style={{ marginLeft: 8, color: 'red' }}>Delete Permanently</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrashBinApp; 