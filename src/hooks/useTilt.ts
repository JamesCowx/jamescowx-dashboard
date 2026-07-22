import { useRef, useCallback, type MouseEvent } from 'react';

interface TiltOptions {
  maxDegrees?: number;
  scale?: number;
  speed?: number;
  perspective?: number;
}

export function useTilt(options: TiltOptions = {}) {
  const { maxDegrees = 8, scale = 1.03, speed = 400, perspective = 1000 } = options;
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxDegrees;
    const rotateY = (x - 0.5) * maxDegrees;

    el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    el.style.transition = `transform ${speed}ms ease-out`;

    // glow follows mouse
    el.style.setProperty('--tilt-x', `${x * 100}%`);
    el.style.setProperty('--tilt-y', `${y * 100}%`);
  }, [maxDegrees, scale, speed, perspective]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = `transform ${speed}ms ease-out`;
  }, [speed]);

  return { ref, onMouseMove, onMouseLeave };
}
