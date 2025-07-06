/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import { FileSystemItem, FileSystemState } from '../types';

const STORAGE_KEY = 'gemini-os-file-system';

// Initialize default file system
const getDefaultFileSystem = (): FileSystemState => {
  const now = new Date();
  return {
    items: {
      'root': {
        id: 'root',
        name: 'Root',
        type: 'folder',
        created: now,
        modified: now,
      },
      'documents': {
        id: 'documents',
        name: 'Documents',
        type: 'folder',
        created: now,
        modified: now,
        parentId: 'root',
      },
      'welcome.txt': {
        id: 'welcome.txt',
        name: 'Welcome.txt',
        type: 'file',
        size: 156,
        created: now,
        modified: now,
        parentId: 'documents',
        content: 'Welcome to Gemini OS!\n\nThis is your personal file system. You can create, edit, and manage files here.\n\nEnjoy exploring your virtual desktop!',
      },
      'notes.txt': {
        id: 'notes.txt',
        name: 'Notes.txt',
        type: 'file',
        size: 89,
        created: now,
        modified: now,
        parentId: 'documents',
        content: 'My Notes\n\n- Remember to check the settings\n- Create more documents\n- Organize files properly',
      },
      'photos': {
        id: 'photos',
        name: 'Photos',
        type: 'folder',
        created: now,
        modified: now,
        parentId: 'root',
      },
    },
    trash: [],
    currentPath: ['root'],
  };
};

export const fileSystemService = {
  // Load file system from localStorage
  loadFileSystem: (): FileSystemState => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const items: Record<string, FileSystemItem> = {};
        Object.keys(parsed.items).forEach(key => {
          const item = parsed.items[key];
          items[key] = {
            ...item,
            created: new Date(item.created),
            modified: new Date(item.modified),
          };
        });
        return {
          ...parsed,
          items,
          currentPath: parsed.currentPath || ['root'],
        };
      }
    } catch (error) {
      console.error('Error loading file system:', error);
    }
    return getDefaultFileSystem();
  },

  // Save file system to localStorage
  saveFileSystem: (fileSystem: FileSystemState): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fileSystem));
    } catch (error) {
      console.error('Error saving file system:', error);
    }
  },

  // Get items in current directory
  getItemsInDirectory: (fileSystem: FileSystemState, path: string[] = []): FileSystemItem[] => {
    const currentFolderId = path.length > 0 ? path[path.length - 1] : 'root';
    return Object.values(fileSystem.items).filter(
      item => item.parentId === currentFolderId
    );
  },

  // Create new file
  createFile: (fileSystem: FileSystemState, name: string, content: string = '', parentId: string = 'root'): FileSystemState => {
    const now = new Date();
    const newFile: FileSystemItem = {
      id: `${name}_${Date.now()}`,
      name,
      type: 'file',
      size: content.length,
      created: now,
      modified: now,
      parentId,
      content,
    };

    return {
      ...fileSystem,
      items: {
        ...fileSystem.items,
        [newFile.id]: newFile,
      },
    };
  },

  // Create new folder
  createFolder: (fileSystem: FileSystemState, name: string, parentId: string = 'root'): FileSystemState => {
    const now = new Date();
    const newFolder: FileSystemItem = {
      id: `${name}_${Date.now()}`,
      name,
      type: 'folder',
      created: now,
      modified: now,
      parentId,
    };

    return {
      ...fileSystem,
      items: {
        ...fileSystem.items,
        [newFolder.id]: newFolder,
      },
    };
  },

  // Update file content
  updateFile: (fileSystem: FileSystemState, fileId: string, content: string): FileSystemState => {
    const file = fileSystem.items[fileId];
    if (!file || file.type !== 'file') {
      return fileSystem;
    }

    return {
      ...fileSystem,
      items: {
        ...fileSystem.items,
        [fileId]: {
          ...file,
          content,
          size: content.length,
          modified: new Date(),
        },
      },
    };
  },

  // Move item to trash
  moveToTrash: (fileSystem: FileSystemState, itemId: string): FileSystemState => {
    return {
      ...fileSystem,
      trash: [...fileSystem.trash, itemId],
    };
  },

  // Restore item from trash
  restoreFromTrash: (fileSystem: FileSystemState, itemId: string): FileSystemState => {
    return {
      ...fileSystem,
      trash: fileSystem.trash.filter(id => id !== itemId),
    };
  },

  // Permanently delete item
  permanentlyDelete: (fileSystem: FileSystemState, itemId: string): FileSystemState => {
    const newItems = { ...fileSystem.items };
    delete newItems[itemId];
    
    return {
      ...fileSystem,
      items: newItems,
      trash: fileSystem.trash.filter(id => id !== itemId),
    };
  },

  // Get item by ID
  getItem: (fileSystem: FileSystemState, itemId: string): FileSystemItem | null => {
    return fileSystem.items[itemId] || null;
  },

  // Get path to item
  getItemPath: (fileSystem: FileSystemState, itemId: string): string[] => {
    const path: string[] = [];
    let currentId = itemId;
    
    while (currentId && currentId !== 'root') {
      const item = fileSystem.items[currentId];
      if (!item) break;
      path.unshift(currentId);
      currentId = item.parentId || 'root';
    }
    
    return path;
  },

  // Check if item is in trash
  isInTrash: (fileSystem: FileSystemState, itemId: string): boolean => {
    return fileSystem.trash.includes(itemId);
  },
}; 