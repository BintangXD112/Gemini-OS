/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React, {useEffect, useRef, useState} from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void; // This prop remains, though its direct trigger (the X button) is removed.
  isAppOpen: boolean;
  appId?: string | null;
  onToggleParameters: () => void;
  onExitToDesktop: () => void;
  isParametersPanelOpen?: boolean;
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
  title,
  children,
  onClose,
  isAppOpen,
  onToggleParameters,
  onExitToDesktop,
  isParametersPanelOpen,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [offset, setOffset] = useState({x: 0, y: 0});

  useEffect(() => {
    if (windowRef.current) {
      const {innerWidth, innerHeight} = window;
      const {offsetWidth, offsetHeight} = windowRef.current;
      setPosition({
        x: (innerWidth - offsetWidth) / 2,
        y: (innerHeight - offsetHeight) / 2,
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!windowRef.current) return;
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={windowRef}
      className="w-[800px] h-[600px] bg-white border border-gray-300 rounded-xl shadow-2xl flex flex-col overflow-hidden font-sans backdrop-blur-sm bg-white/80"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
      }}>
      {/* Title Bar */}
      <div
        className="bg-gray-800/90 text-white py-2 px-4 font-semibold text-base flex justify-between items-center select-none rounded-t-xl flex-shrink-0"
        style={{cursor: isDragging ? 'grabbing' : 'grab'}}
        onMouseDown={handleMouseDown}>
        <span className="title-bar-text">{title}</span>
        {/* "X" button removed from here */}
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
    </div>
  );
};
