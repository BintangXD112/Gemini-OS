/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface InteractionData {
  id: string;
  type: string;
  value?: string;
  elementType: string;
  elementText: string;
  appContext: string | null;
}

// New types for multi-window support
export interface WindowInstance {
  id: string;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content: string;
  isLoading: boolean;
  error: string | null;
  interactionHistory: InteractionData[];
  currentAppPath: string[];
}

// File system types
export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  created: Date;
  modified: Date;
  content?: string;
  parentId?: string;
}

export interface FileSystemState {
  items: Record<string, FileSystemItem>;
  trash: string[]; // Array of item IDs in trash
  currentPath: string[];
}

// Theme types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
}
