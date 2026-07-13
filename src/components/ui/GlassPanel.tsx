import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`liquid-glass rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function GlassPanelElevated({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`liquid-glass-elevated rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}
