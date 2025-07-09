import React, { useEffect, useRef, useState } from 'react';

const PHOTOS_KEY = 'gemini-os-photos';

interface Photo {
  id: string;
  url: string;
}

const PhotosApp: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(PHOTOS_KEY);
    if (stored) setPhotos(JSON.parse(stored));
  }, []);

  // Save photos to localStorage
  const savePhotos = (next: Photo[]) => {
    setPhotos(next);
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(next));
  };

  // Handle upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      const newPhoto: Photo = { id: `${Date.now()}`, url };
      savePhotos([newPhoto, ...photos]);
    };
    reader.readAsDataURL(file);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    const next = photos.filter((p: Photo) => p.id !== id);
    savePhotos(next);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Photos</h2>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUpload}
        style={{ marginBottom: 12 }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {photos.length === 0 && <p>No photos yet. Upload to get started!</p>}
        {photos.map((photo: Photo) => (
          <div key={photo.id} style={{ border: '1px solid #ccc', borderRadius: 4, padding: 8, position: 'relative' }}>
            <img src={photo.url} alt="User upload" style={{ maxWidth: 180, maxHeight: 120, display: 'block' }} />
            <button onClick={() => handleDelete(photo.id)} style={{ position: 'absolute', top: 4, right: 4, background: '#fff', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosApp; 