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
    name: 'Starter',
    price: 999,
    description: 'A single-page landing page to establish your online presence.',
    features: ['Responsive design', 'Contact form', '1 revision', 'Hosting setup', 'SEO basics'],
    cta: 'Choose Starter',
    popular: false,
  },
  {
    name: 'Standard',
    price: 2499,
    description: 'A multi-page business website with a CMS so you can manage content yourself.',
    features: ['Everything in Starter', 'CMS (Sanity/WordPress)', 'Up to 5 pages', 'Blog setup', '2 revisions'],
    cta: 'Choose Standard',
    popular: true,
  },
  {
    name: 'Pro',
    price: 5999,
    description: 'A full-featured e-commerce or booking platform with payments and an admin dashboard.',
    features: ['Everything in Standard', 'E-commerce / booking', 'Payment integration', 'Admin dashboard', '3 revisions + priority support'],
    cta: 'Choose Pro',
    popular: false,
  },
];

const currencyOptions = ['CAD', 'USD', 'EUR'] as Currency[];

const faqs = [
  { q: 'How long does it take?', a: 'Most projects deliver in 2–4 weeks depending on scope. You\'ll get a timeline before we start.' },
  { q: 'Do you offer hosting?', a: 'Yes. Every package includes hosting setup and configuration. Ongoing hosting is $15/month.' },
  { q: 'What if I need changes after launch?', a: 'Each package includes revisions during development. Post-launch support and maintenance are available separately.' },
  { q: 'Can I upgrade later?', a: 'Absolutely. You can start with Starter and upgrade to Standard or Pro as your needs grow.' },
];

const steps = [
  { step: '01', title: 'Discovery Call', desc: 'We discuss your goals, timeline, and requirements.' },
  { step: '02', title: 'Proposal & Contract', desc: 'I outline the scope, deliverables, and pricing. You approve and we begin.' },
  { step: '03', title: 'Design & Development', desc: 'I build your site with regular updates and feedback loops.' },
  { step: '04', title: 'Launch & Handoff', desc: 'We deploy, test, and hand over everything you need to manage your site.' },
];

function AnimatedPrice({ value, symbol }: { value: number; symbol: string }) {
  return (
    <div className="relative h-11 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          className="text-4xl font-bold text-white absolute left-0 whitespace-nowrap tabular-nums"
        >
          {symbol}{value.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>('CAD');

  function convert(price: number) {
    return Math.round(price * rates[currency]);
  }

  return (
    <div className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">
              Websites & Web Apps
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold mt-3 mb-4">
              Custom websites built for <span className="gradient-text-mixed">your business</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg leading-relaxed">
              Every project includes responsive design, hosting setup, SEO basics, and a dedicated revision process.
            </p>
          </div>
        </FadeIn>

        <div className="flex items-center justify-center mb-14">
          <div className="inline-flex items-center gap-1 p-0.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {currencyOptions.map((c) => (
              <motion.button
                key={c}
                onClick={() => setCurrency(c)}
                className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  currency === c ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {currency === c && (
                  <motion.div
                    layoutId="currency-pill"
                    className="absolute inset-0 rounded-lg bg-white/[0.07]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {tiers.map((tier, i) => (
            <SlideUp key={tier.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative group h-full"
              >
                <GlassPanel className={`relative flex flex-col h-full p-7 ${
                  tier.popular ? 'ring-1 ring-[var(--color-accent-blue)]/40 overflow-visible' : ''
                }`}>
                  {tier.popular && (
                    <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--color-accent-blue)] text-white text-[9px] font-semibold uppercase tracking-[0.12em] z-10">
                      Most Popular
                    </span>
                  )}
                  <div className="flex-1">
                    <div className="mb-5">
                      <h3 className="text-base font-semibold text-white mb-1">{tier.name}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{tier.description}</p>
                    </div>
                    <div className="mb-7">
                      <div className="flex items-baseline gap-1.5">
                        <AnimatedPrice value={convert(tier.price)} symbol={symbols[currency]} />
                        <span className="text-sm text-[var(--color-text-muted)]">CAD</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)] mt-1">One-time project fee</p>
                    </div>
                    <div className="space-y-2.5 mb-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                        What's included
                      </p>
                      {tier.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                          <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to={`/contact?package=${tier.name}`} className="block">
                    <Button
                      accent={tier.popular ? 'mixed' : 'blue'}
                      className="w-full text-sm"
                    >
                      {tier.cta}
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                </GlassPanel>
              </motion.div>
            </SlideUp>
          ))}
        </div>

        <FadeIn>
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-[11px] text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.2em]">How It Works</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-3">The process</h2>
              <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
                From idea to launch in four straightforward steps.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <SlideUp key={s.step} delay={i * 0.08}>
                  <div className="liquid-glass rounded-2xl p-6 border border-white/[0.04] h-full">
                    <span className="text-[10px] font-mono text-[var(--color-accent-blue)] font-semibold">{s.step}</span>
                    <h3 className="text-sm font-semibold text-white mt-2 mb-1.5">{s.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{s.desc}</p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Questions</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-3">Frequently asked</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="liquid-glass rounded-2xl p-5 border border-white/[0.04]">
                  <h3 className="text-sm font-semibold text-white mb-1.5">{faq.q}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="liquid-glass-elevated rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#60a5fa]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f472b6]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Not sure which package fits?</h2>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-lg mx-auto leading-relaxed">
                Tell me about your project and I'll recommend the right approach — no obligation, no pressure.
              </p>
              <Link to="/contact">
                <Button accent="blue" size="lg">
                  Get a Recommendation
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
