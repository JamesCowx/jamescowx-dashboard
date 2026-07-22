import { type ReactNode, useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  accent?: 'blue' | 'pink' | 'none';
  tilt?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = true, accent = 'none', tilt = false, onClick }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!hover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--mouse-x', `${x}%`);
    ref.current.style.setProperty('--mouse-y', `${y}%`);

    if (tilt) {
      const rotateX = (0.5 - (e.clientY - rect.top) / rect.height) * 10;
      const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      ref.current.style.transition = 'transform 0.4s ease-out';
      ref.current.style.setProperty('--tilt-x', `${x}%`);
      ref.current.style.setProperty('--tilt-y', `${y}%`);
    }
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = tilt ? 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' : '';
    ref.current.style.transition = 'transform 0.6s ease-out';
  }

  return (
    <motion.div
      ref={ref}
      className={`liquid-glass rounded-2xl p-6 card-glow premium-card group/card cursor-pointer ${tilt ? 'tilt-card' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hover ? { y: -6, scale: 1.015 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      <div className="relative z-10">{children}</div>
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none ${
        accent === 'blue' ? 'glass-bleed-blue' :
        accent === 'pink' ? 'glass-bleed-pink' : ''
      }`} />
    </motion.div>
  );
}
