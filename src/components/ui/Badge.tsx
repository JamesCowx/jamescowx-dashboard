interface BadgeProps {
  children: string;
  variant?: 'blue' | 'pink' | 'gray' | 'mixed';
  className?: string;
}

export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  const variants: Record<string, string> = {
    blue: 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/15',
    pink: 'bg-[#f472b6]/10 text-[#f472b6] border-[#f472b6]/15',
    gray: 'bg-white/[0.04] text-[var(--color-text-muted)] border-white/[0.06]',
    mixed: 'bg-gradient-to-r from-[#60a5fa]/10 to-[#f472b6]/10 text-[#a78bfa] border-[#a78bfa]/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium border backdrop-blur-sm ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
