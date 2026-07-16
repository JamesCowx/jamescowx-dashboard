import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Button from '@/components/ui/Button';

type Currency = 'CAD' | 'USD' | 'EUR';

const rates: Record<Currency, number> = { CAD: 1, USD: 0.74, EUR: 0.68 };
const symbols: Record<Currency, string> = { CAD: '$', USD: '$', EUR: '€' };

const tiers = [
  {
    name: 'Starter',
    price: 999,
    monthly: 29,
    description: 'A single-page landing page to establish your online presence.',
    features: ['Responsive design', 'Contact form', '1 revision round', 'Hosting setup & config', 'Basic SEO'],
    cta: 'Choose Starter',
    popular: false,
  },
  {
    name: 'Standard',
    price: 2499,
    monthly: 49,
    description: 'A multi-page business website with a CMS so you can manage content yourself.',
    features: ['Everything in Starter', 'CMS (Sanity or WordPress)', 'Up to 5 pages', 'Blog setup', '2 revision rounds'],
    cta: 'Choose Standard',
    popular: true,
  },
  {
    name: 'Pro',
    price: 5999,
    monthly: 99,
    description: 'A full e-commerce or booking platform with payments and an admin dashboard.',
    features: ['Everything in Standard', 'E-commerce or booking', 'Payment gateway integration', 'Admin dashboard', '3 revision rounds + priority'],
    cta: 'Choose Pro',
    popular: false,
  },
];

const allFeatures = [
  { name: 'Responsive design', starter: true, standard: true, pro: true },
  { name: 'Contact form', starter: true, standard: true, pro: true },
  { name: 'Basic SEO setup', starter: true, standard: true, pro: true },
  { name: 'Hosting configuration', starter: true, standard: true, pro: true },
  { name: 'Revision rounds', starter: '1', standard: '2', pro: '3 + priority' },
  { name: 'Content management (CMS)', starter: false, standard: true, pro: true },
  { name: 'Number of pages', starter: '1', standard: '5', pro: 'Unlimited' },
  { name: 'Blog setup', starter: false, standard: true, pro: true },
  { name: 'E-commerce or booking', starter: false, standard: false, pro: true },
  { name: 'Payment integration', starter: false, standard: false, pro: true },
  { name: 'Admin dashboard', starter: false, standard: false, pro: true },
  { name: 'Priority support', starter: false, standard: false, pro: true },
];

const faqs = [
  { q: 'How long does a project take?', a: 'Most projects deliver in 2–4 weeks. You\'ll receive a clear timeline before we begin.' },
  { q: 'Is hosting included?', a: 'Every package includes hosting setup and configuration. Ongoing hosting & maintenance is $15–30/month depending on the plan.' },
  { q: 'What if I need changes after launch?', a: 'Each package includes revision rounds during development. Post-launch support and content updates are available through a maintenance retainer.' },
  { q: 'Can I upgrade plans later?', a: 'Yes — you can start with Starter and upgrade to Standard or Pro as your needs grow. We\'ll only charge the difference.' },
  { q: 'Do you work with clients outside Canada?', a: 'Absolutely. We\'ve worked with clients across North America and Europe. Everything is handled remotely.' },
];

const steps = [
  { step: '01', title: 'Discovery', desc: 'A 30-minute call to discuss your goals, audience, and timeline.' },
  { step: '02', title: 'Proposal', desc: 'A detailed scope document with deliverables, milestones, and pricing.' },
  { step: '03', title: 'Development', desc: 'I build your site with regular check-ins and revision rounds.' },
  { step: '04', title: 'Launch', desc: 'Deployment, final testing, and a full handoff with documentation.' },
];

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>('CAD');
  const [annual, setAnnual] = useState(false);

  function convert(price: number) {
    return Math.round(price * rates[currency]);
  }

  return (
    <div className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-xs text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.15em]">
              Pricing
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold mt-4 mb-4 text-white">
              Websites for <span className="gradient-text-mixed">every stage</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
              Fixed-price project fees with no hidden costs. Each package includes responsive&nbsp;design,
              hosting&nbsp;setup, and&nbsp;SEO.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            {(['CAD', 'USD', 'EUR'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`relative px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  currency === c
                    ? 'bg-white/[0.08] text-white'
                    : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <span className={annual ? 'text-[var(--color-text-muted)]' : 'text-white font-medium'}>One-time</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border border-white/[0.08] transition-colors cursor-pointer ${
                annual ? 'bg-white/[0.1]' : 'bg-white/[0.04]'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white/50 shadow-sm transform transition-transform mt-[1.5px] ml-[2px] ${
                  annual ? 'translate-x-[15px]' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={annual ? 'text-white font-medium' : 'text-[var(--color-text-muted)]'}>Monthly</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {tiers.map((tier, i) => (
            <SlideUp key={tier.name} delay={i * 0.08}>
              <div className="relative group h-full">
                <div className={`relative flex flex-col h-full rounded-2xl border bg-white/[0.02] ${
                  tier.popular
                    ? 'border-[var(--color-accent-blue)]/30 shadow-[0_0_30px_-8px_rgba(96,165,250,0.15)]'
                    : 'border-white/[0.06] hover:border-white/[0.12]'
                } transition-colors p-7`}>
                  {tier.popular && (
                    <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-blue)]/60 to-transparent" />
                  )}
                  {tier.popular && (
                    <span className="absolute -top-3 left-7 px-2.5 py-0.5 rounded-md bg-[var(--color-accent-blue)] text-white text-[10px] font-semibold">
                      Most popular
                    </span>
                  )}
                  <div className="flex-1">
                    <div className="mb-6">
                      <h3 className="text-base font-semibold text-white mb-1">{tier.name}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{tier.description}</p>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white tabular-nums">
                          {symbols[currency]}{convert(annual ? tier.monthly : tier.price).toLocaleString()}
                        </span>
                        <span className="text-sm text-[var(--color-text-muted)]">
                          {annual ? '/mo' : ` ${currency}`}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        {annual ? 'Monthly retainer — cancel anytime' : 'One-time project fee'}
                      </p>
                    </div>
                    <div className="space-y-3 mb-8">
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
                    </Button>
                  </Link>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>

        <FadeIn>
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.15em]">
                Compare
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-white">
                Feature comparison
              </h2>
            </div>
            <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 px-5 text-[var(--color-text-muted)] font-medium">Feature</th>
                    <th className="text-center py-4 px-5 text-[var(--color-text-primary)] font-medium">Starter</th>
                    <th className="text-center py-4 px-5 text-[var(--color-accent-blue)] font-medium bg-white/[0.02]">Standard</th>
                    <th className="text-center py-4 px-5 text-[var(--color-text-primary)] font-medium">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((f, i) => (
                    <tr key={f.name} className={`border-b border-white/[0.04] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="py-3.5 px-5 text-[var(--color-text-secondary)]">{f.name}</td>
                      {(['starter', 'standard', 'pro'] as const).map((tier) => {
                        const val = f[tier];
                        return (
                          <td key={tier} className={`text-center py-3.5 px-5 ${tier === 'standard' ? 'bg-white/[0.02]' : ''}`}>
                            {val === true ? (
                              <svg className="w-4 h-4 mx-auto text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : val === false ? (
                              <span className="text-[var(--color-text-muted)]">&mdash;</span>
                            ) : (
                              <span className="text-[var(--color-text-secondary)]">{val}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.15em]">
                Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-white">
                How it works
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <SlideUp key={s.step} delay={i * 0.08}>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full transition-colors hover:border-white/[0.12]">
                    <span className="text-[10px] font-mono text-[var(--color-accent-blue)] font-semibold tracking-wide">{s.step}</span>
                    <h3 className="text-sm font-semibold text-white mt-3 mb-1.5">{s.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{s.desc}</p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mb-24 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.15em]">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-white">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-white/[0.06] bg-white/[0.01] open:bg-white/[0.02] transition-colors">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-white list-none">
                    {faq.q}
                    <svg className="w-4 h-4 text-[var(--color-text-muted)] transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Not sure which plan fits?</h2>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-lg mx-auto leading-relaxed">
                Tell me about your project and I'll recommend the right approach — no commitment needed.
              </p>
              <Link to="/contact">
                <Button accent="blue" size="lg">
                  Get a recommendation
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
