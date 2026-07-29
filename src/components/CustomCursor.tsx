import { useEffect, useRef, useState } from 'react';

type CustomCursorProps = {
  isDarkMode: boolean;
};

export default function CustomCursor({ isDarkMode }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const reqRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Fix: Initialize state by checking for touch devices upfront
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !('ontouchstart' in window);
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Fix: If it's a touch device, just return. The state is already initialized to false.
    if ('ontouchstart' in window) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (!t) return;
      const interactive = t.closest(
        'a,button,[role="button"],input,textarea,select,summary,[data-cursor],.cursor-pointer'
      );
      setIsHovering(Boolean(interactive));
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOver);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, n = 0.2) => (1 - n) * a + n * b;

    const render = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.18);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.left = `${posRef.current.x}px`;
        cursorRef.current.style.top = `${posRef.current.y}px`;
        cursorRef.current.style.opacity = visible ? '1' : '0';
        if (isHovering) {
          cursorRef.current.classList.add('cursor--hover');
        } else {
          cursorRef.current.classList.remove('cursor--hover');
        }
      }

      reqRef.current = requestAnimationFrame(render);
    };

    reqRef.current = requestAnimationFrame(render);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isHovering, visible]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isDarkMode ? 'cursor-dark' : 'cursor-light'}`}
      aria-hidden
      style={{ left: 0, top: 0 }}
    />
  );
}