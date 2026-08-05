import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  watermark?: string;
  accent?: 'blue' | 'pink';
  children?: ReactNode;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function PageHero({ eyebrow, title, subtitle, watermark = '', accent = 'blue', children }: PageHeroProps) {
  const accentColor = accent === 'blue' ? '#60a5fa' : '#f472b6';

  return (
    <section className="relative overflow-hidden px-4 sm:px-8 pt-28 pb-16">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-25%] left-[-10%] w-[55vw] h-[55vw] max-w-[720px] max-h-[720px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 65%)' }} />
        <div className="absolute bottom-[-25%] right-[-12%] w-[45vw] h-[45vw] max-w-[620px] max-h-[620px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #f472b6, transparent 65%)', animationDelay: '3s' }} />
        <div className="absolute top-[8%] right-[18%] w-[24vw] h-[24vw] max-w-[340px] max-h-[340px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #a78bfa, transparent 65%)', animationDelay: '5s' }} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(96,165,250,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.02) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 35%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 35%, transparent 75%)',
          }}
        />
      </div>

      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <span className="text-[24vw] font-black leading-none text-watermark tracking-tight select-none">{watermark}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
            <span className="text-[var(--color-text-secondary)] uppercase tracking-[0.18em] text-[10px] font-semibold">{eyebrow}</span>
          </span>
        </motion.div>

        <motion.h1
          className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-balance"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.85, ease }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mt-5 text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
