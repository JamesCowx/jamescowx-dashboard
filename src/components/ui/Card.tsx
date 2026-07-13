import { type ReactNode, useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  accent?: 'blue' | 'pink' | 'none';
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = true, accent = 'none', onClick }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!hover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--mouse-x', `${x}%`);
    ref.current.style.setProperty('--mouse-y', `${y}%`);
  }

  return (
    <motion.div
      ref={ref}
      className={`liquid-glass rounded-2xl p-6 card-glow group/card cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
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
