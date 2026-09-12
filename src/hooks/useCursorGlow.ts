import { useState, useEffect } from 'react';

interface CursorPos {
  x: number;
  y: number;
}

export function useCursorGlow() {
  const [cursorPos, setCursorPos] = useState<CursorPos>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { cursorPos };
}
