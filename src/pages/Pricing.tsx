import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import GlassPanel from '@/components/ui/GlassPanel';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

type Currency = 'CAD' | 'USD' | 'EUR';

const rates: Record<Currency, number> = { CAD: 1, USD: 0.74, EUR: 0.68 };
const symbols: Record<Currency, string> = { CAD: '$', USD: '$', EUR: '€' };

const tiers = [
  {
    name: 'Starter', price: 999,
    features: ['Responsive design', 'Contact form', '1 revision', 'Hosting setup', 'SEO basics'],
    popular: false,
  },
  {
    name: 'Standard', price: 2499,
    features: ['Everything in Starter', 'CMS (Sanity/WordPress)', 'Up to 5 pages', 'Blog setup', '2 revisions'],
    popular: true,
  },
  {
    name: 'Pro', price: 5999,
    features: ['Everything in Standard', 'E-commerce / booking', 'Payment integration', 'Admin dashboard', '3 revisions + priority support'],
    popular: false,
  },
];

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>('CAD');

  function convert(price: number) {
    return Math.round(price * rates[currency]);
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
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

        <div className="flex items-center justify-center gap-2 mb-12">
          {(['CAD', 'USD', 'EUR'] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currency === c
                  ? 'bg-[var(--color-accent-blue)] text-white shadow-[0_4px_16px_rgba(96,165,250,0.25)]'
                  : 'bg-white/[0.03] text-[var(--color-text-muted)] hover:text-white border border-white/[0.06]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier, i) => (
            <SlideUp key={tier.name} delay={i * 0.1}>
              <GlassPanel className={`relative flex flex-col h-full ${tier.popular ? 'ring-2 ring-[var(--color-accent-blue)] overflow-visible' : ''}`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-accent-blue)] text-white text-[10px] font-bold uppercase tracking-wider z-10">
                    Most Popular
                  </span>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold gradient-text-mixed">
                      {symbols[currency]}{convert(tier.price).toLocaleString()}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                        <svg className="w-4 h-4 mt-0.5 shrink-0 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={`/contact?package=${tier.name}`}>
                  <Button accent={tier.popular ? 'mixed' : 'blue'} className="w-full">Get Started</Button>
                </Link>
              </GlassPanel>
            </SlideUp>
          ))}
        </div>

        <SlideUp delay={0.3}>
          <FadeIn>
            <div className="liquid-glass-elevated rounded-3xl p-10 text-center">
              <h2 className="text-2xl font-bold mb-3">Need Something Custom?</h2>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
                Complex web apps, SaaS platforms, API integrations — let's build exactly what you need.
              </p>
              <Link to="/contact?package=Custom">
                <Button accent="blue" size="lg">Get a Custom Quote</Button>
              </Link>
            </div>
          </FadeIn>
        </SlideUp>
      </div>
    </div>
  );
}
