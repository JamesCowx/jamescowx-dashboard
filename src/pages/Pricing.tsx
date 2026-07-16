import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import GlassPanel from '@/components/ui/GlassPanel';
import Button from '@/components/ui/Button';

type Currency = 'CAD' | 'USD' | 'EUR';

const rates: Record<Currency, number> = { CAD: 1, USD: 0.74, EUR: 0.68 };
const symbols: Record<Currency, string> = { CAD: '$', USD: '$', EUR: '€' };

const tiers = [
  {
    name: 'Starter', price: 999,
    badge: 'Landing Page', badgeColor: '#60a5fa',
    features: ['Responsive design', 'Contact form', '1 revision', 'Hosting setup', 'SEO basics'],
    excluded: ['CMS / Blog', 'E-commerce', 'Payment integration', 'Admin dashboard', 'Priority support'],
    popular: false,
  },
  {
    name: 'Standard', price: 2499,
    badge: 'Business Site', badgeColor: '#a78bfa',
    features: ['Everything in Starter', 'CMS (Sanity/WordPress)', 'Up to 5 pages', 'Blog setup', '2 revisions'],
    excluded: ['E-commerce', 'Payment integration', 'Admin dashboard', 'Priority support'],
    popular: true,
  },
  {
    name: 'Pro', price: 5999,
    badge: 'E-commerce / Booking', badgeColor: '#f472b6',
    features: ['Everything in Standard', 'E-commerce / booking', 'Payment integration', 'Admin dashboard', '3 revisions + priority support'],
    excluded: [],
    popular: false,
  },
];

function AnimatedPrice({ value, symbol }: { value: number; symbol: string }) {
  return (
    <div className="relative h-12 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="text-4xl font-extrabold gradient-text-mixed absolute left-0 whitespace-nowrap"
        >
          {symbol}{value.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

const currencyOptions = [
  { code: 'CAD' as Currency, flag: '🇨🇦', label: 'CAD' },
  { code: 'USD' as Currency, flag: '🇺🇸', label: 'USD' },
  { code: 'EUR' as Currency, flag: '🇪🇺', label: 'EUR' },
];

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>('CAD');

  function convert(price: number) {
    return Math.round(price * rates[currency]);
  }

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      <div className="absolute top-40 -left-32 w-96 h-96 rounded-full bg-[#60a5fa]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-32 w-96 h-96 rounded-full bg-[#f472b6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#a78bfa]/3 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Websites</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Websites & <span className="gradient-text-mixed">Web Apps</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
              Custom-built sites tailored to your needs. Every project includes responsive design, hosting setup, and SEO basics.
            </p>
          </div>
        </FadeIn>

        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            {currencyOptions.map((c) => (
              <motion.button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  currency === c.code ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {currency === c.code && (
                  <motion.div
                    layoutId="currency-pill"
                    className="absolute inset-0 rounded-xl bg-[var(--color-accent-blue)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c.flag} {c.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier, i) => (
            <SlideUp key={tier.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative group"
              >
                <motion.div
                  className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    tier.popular
                      ? 'bg-gradient-to-br from-[#60a5fa] via-[#a78bfa] to-[#f472b6]'
                      : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent'
                  }`}
                  style={{ filter: 'blur(2px)' }}
                />
                <GlassPanel className={`relative flex flex-col h-full ${
                  tier.popular
                    ? 'ring-1 ring-[var(--color-accent-blue)]/50 overflow-visible'
                    : ''
                }`}>
                  {tier.popular && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] text-white text-[10px] font-bold uppercase tracking-wider z-10 shadow-[0_4px_20px_rgba(96,165,250,0.3)]"
                    >
                      Most Popular
                    </motion.span>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      <span
                        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider"
                        style={{ backgroundColor: tier.badgeColor + '15', color: tier.badgeColor }}
                      >
                        {tier.badge}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-6">
                      <AnimatedPrice value={convert(tier.price)} symbol={symbols[currency]} />
                    </div>

                    <div className="space-y-2.5 mb-8">
                      {tier.features.map((f) => (
                        <motion.div
                          key={f}
                          className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] group/feature"
                          whileHover={{ x: 3 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          <motion.svg
                            className="w-4 h-4 mt-0.5 shrink-0 text-green-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.4 }}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </motion.svg>
                          <span className="group-hover/feature:text-white transition-colors duration-200">{f}</span>
                        </motion.div>
                      ))}
                      {tier.excluded.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]/40">
                          <svg className="w-4 h-4 mt-0.5 shrink-0 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                          <span className="line-through">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to={`/contact?package=${tier.name}`}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button accent={tier.popular ? 'mixed' : 'blue'} className="w-full">
                        Get Started
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </motion.div>
                  </Link>
                </GlassPanel>
              </motion.div>
            </SlideUp>
          ))}
        </div>

        <FadeIn>
          <motion.div
            className="liquid-glass-elevated rounded-3xl p-10 text-center relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#60a5fa]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f472b6]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3">Need Something Custom?</h2>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
                Complex web apps, SaaS platforms, API integrations — let's build exactly what you need.
              </p>
              <Link to="/contact?package=Custom">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button accent="blue" size="lg">
                    Get a Custom Quote
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </div>
  );
}
