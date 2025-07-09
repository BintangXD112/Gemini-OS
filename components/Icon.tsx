/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React from 'react';
import {AppDefinition} from '../types';

interface IconProps {
  app: AppDefinition;
  onInteract: () => void;
  position: { x: number; y: number };
  onSetPosition: (id: string, pos: { x: number; y: number }) => void;
}

export const Icon: React.FC<IconProps> = ({ app, onInteract, position, onSetPosition }) => {
  const iconRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [offset, setOffset] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!iconRef.current) return;
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      onSetPosition(app.id, {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };
    const handleMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset, app.id, onSetPosition]);

  return (
    <div
      ref={iconRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: dragging ? 10000 : undefined,
        cursor: dragging ? 'grabbing' : 'pointer',
        userSelect: 'none',
      }}
      className="w-28 h-32 flex flex-col items-center justify-start text-center m-2 p-2 select-none rounded-lg transition-colors hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onInteract}
      onKeyDown={(e) => e.key === 'Enter' && onInteract()}
      tabIndex={0}
      role="button"
      aria-label={`Open ${app.name}`}
      onMouseDown={handleMouseDown}
    >
      <div className="text-6xl mb-2 drop-shadow-sm">{app.icon}</div>
      <div className="text-sm text-gray-800 font-semibold break-words max-w-full leading-tight">
        {app.name}
      </div>
    </div>
  );
};
