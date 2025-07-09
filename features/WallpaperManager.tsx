import React, { useRef, useState } from 'react';

interface WallpaperManagerProps {
  onSetWallpaper?: (dataUrl: string | null) => void;
}

const WallpaperManager: React.FC<WallpaperManagerProps> = ({ onSetWallpaper }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      if (onSetWallpaper) {
        onSetWallpaper(dataUrl);
        setStatus('Wallpaper updated!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (onSetWallpaper) {
      onSetWallpaper(null);
      setStatus('Wallpaper removed.');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Wallpaper Manager</h2>
      {onSetWallpaper ? (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ marginBottom: 12 }}
          />
          {preview && (
            <div style={{ margin: '12px 0' }}>
              <img src={preview} alt="Wallpaper preview" style={{ maxWidth: 300, maxHeight: 200, border: '1px solid #ccc' }} />
              <div>
                <button onClick={handleRemove} style={{ marginTop: 8 }}>Remove Wallpaper</button>
              </div>
            </div>
          )}
          <div style={{ color: 'green', marginTop: 8 }}>{status}</div>
        </>
      ) : (
        <p>Wallpaper changing is not available in this context.</p>
      )}
    </div>
  );
};

export default WallpaperManager; 