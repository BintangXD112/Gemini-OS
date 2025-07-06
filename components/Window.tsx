/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React, {useEffect, useRef, useState} from 'react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onResize: (size: { width: number; height: number }) => void;
  isAppOpen: boolean;
  appId?: string | null;
  onToggleParameters: () => void;
  onExitToDesktop: () => void;
  isParametersPanelOpen?: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  size?: { width: number; height: number };
  zIndex: number;
  onFocus: () => void;
}

const MenuItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({children, onClick, className}) => (
  <span
    className={`menu-item cursor-pointer hover:text-blue-600 ${className}`}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') onClick?.();
    }}
    tabIndex={0}
    role="button">
    {children}
  </span>
);

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onResize,
  isAppOpen,
  onToggleParameters,
  onExitToDesktop,
  isParametersPanelOpen,
  isMinimized = false,
  isMaximized = false,
  size = { width: 800, height: 600 },
  zIndex,
  onFocus,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [offset, setOffset] = useState({x: 0, y: 0});
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [resizeStart, setResizeStart] = useState({x: 0, y: 0, width: 0, height: 0});

  useEffect(() => {
    if (windowRef.current && !isMaximized) {
      const {innerWidth, innerHeight} = window;
      setPosition({
        x: (innerWidth - size.width) / 2,
        y: (innerHeight - size.height) / 2,
      });
    }
  }, [size.width, size.height, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!windowRef.current) return;
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    onFocus();
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
    
    if (isResizing && !isMaximized) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = position.x;
      let newY = position.y;
      
      if (resizeDirection.includes('e')) {
        newWidth = Math.max(400, resizeStart.width + deltaX);
      }
      if (resizeDirection.includes('w')) {
        const widthChange = Math.min(deltaX, resizeStart.width - 400);
        newWidth = resizeStart.width - widthChange;
        newX = position.x + widthChange;
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(300, resizeStart.height + deltaY);
      }
      if (resizeDirection.includes('n')) {
        const heightChange = Math.min(deltaY, resizeStart.height - 300);
        newHeight = resizeStart.height - heightChange;
        newY = position.y + heightChange;
      }
      
      setPosition({ x: newX, y: newY });
      onResize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    onFocus();
    e.preventDefault();
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, offset, resizeDirection, resizeStart, position, size, isMaximized]);

  if (isMinimized) {
    return null;
  }

  const windowStyle = isMaximized ? {
    position: 'absolute' as const,
    left: '0px',
    top: '0px',
    width: '100vw',
    height: '100vh',
    zIndex,
  } : {
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  };

  return (
    <div
      ref={windowRef}
      className="bg-white border border-gray-300 rounded-xl shadow-2xl flex flex-col overflow-hidden font-sans backdrop-blur-sm bg-white/80"
      style={{
        ...windowStyle,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onClick={onFocus}>
      {/* Title Bar */}
      <div
        className="bg-gray-800/90 text-white py-2 px-4 font-semibold text-base flex justify-between items-center select-none rounded-t-xl flex-shrink-0"
        style={{cursor: isDragging ? 'grabbing' : 'grab'}}
        onMouseDown={handleMouseDown}>
        <span className="title-bar-text">{title}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 rounded"
            title="Minimize">
            <span className="text-xs">─</span>
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 rounded"
            title={isMaximized ? "Restore" : "Maximize"}>
            <span className="text-xs">{isMaximized ? "❐" : "□"}</span>
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-red-600 rounded"
            title="Close">
            <span className="text-xs">✕</span>
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-gray-100/80 py-2 px-3 border-b border-gray-200 select-none flex gap-4 flex-shrink-0 text-sm text-gray-700 items-center">
        {!isParametersPanelOpen && (
          <MenuItem onClick={onToggleParameters}>
            <u>P</u>arameters
          </MenuItem>
        )}
        {isAppOpen && (
          <MenuItem onClick={onExitToDesktop} className="ml-auto">
            Exit to Desktop
          </MenuItem>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto">{children}</div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className="absolute top-0 left-2 right-2 h-2 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-2 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-2 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-2 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
        </>
      )}
    </div>
  );
};
