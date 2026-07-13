import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'outline' | 'ghost';
  accent?: 'blue' | 'pink' | 'mixed';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  accent = 'blue',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden';

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  const variants: Record<string, string> = {
    primary: accent === 'blue'
      ? 'bg-[#4f8fde] text-white shadow-[0_4px_24px_rgba(96,165,250,0.2)] hover:bg-[#60a5fa] hover:shadow-[0_4px_32px_rgba(96,165,250,0.35)]'
      : accent === 'pink'
      ? 'bg-[#e864a8] text-white shadow-[0_4px_24px_rgba(244,114,182,0.2)] hover:bg-[#f472b6] hover:shadow-[0_4px_32px_rgba(244,114,182,0.35)]'
      : 'bg-gradient-to-r from-[#4f8fde] to-[#e864a8] text-white shadow-[0_4px_24px_rgba(96,165,250,0.15)] hover:shadow-[0_4px_32px_rgba(96,165,250,0.25)]',
    glass: 'bg-white/[0.04] backdrop-blur-md border border-white/[0.06] text-white hover:bg-white/[0.08] hover:border-white/[0.12]',
    outline: accent === 'blue'
      ? 'bg-transparent border border-[var(--color-accent-blue)]/30 text-[var(--color-accent-blue)] hover:border-[var(--color-accent-blue)]/60 hover:bg-[var(--color-accent-blue)]/5'
      : 'bg-transparent border border-[var(--color-accent-pink)]/30 text-[var(--color-accent-pink)] hover:border-[var(--color-accent-pink)]/60 hover:bg-[var(--color-accent-pink)]/5',
    ghost: 'bg-transparent text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.04]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...(props as object)}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      )}
    </motion.button>
  );
}
