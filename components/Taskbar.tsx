/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React from 'react';
import { WindowInstance } from '../types';

interface TaskbarProps {
  windows: WindowInstance[];
  onWindowFocus: (windowId: string) => void;
  onWindowMinimize: (windowId: string) => void;
  onWindowClose: (windowId: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onWindowFocus,
  onWindowMinimize,
  onWindowClose,
}) => {
  const visibleWindows = windows.filter(window => !window.isMinimized);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 text-white h-12 flex items-center px-4 z-50">
      <div className="flex items-center space-x-2">
        {visibleWindows.map((window) => (
          <div
            key={window.id}
            className="flex items-center space-x-2 bg-gray-700/80 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-600/80 transition-colors"
            onClick={() => onWindowFocus(window.id)}
            title={window.title}>
            <span className="text-sm font-medium">{window.title}</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWindowMinimize(window.id);
                }}
                className="w-4 h-4 flex items-center justify-center hover:bg-gray-500 rounded text-xs">
                ─
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWindowClose(window.id);
                }}
                className="w-4 h-4 flex items-center justify-center hover:bg-red-500 rounded text-xs">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {visibleWindows.length === 0 && (
        <div className="text-gray-400 text-sm">
          No applications running
        </div>
      )}
    </div>
  );
}; 