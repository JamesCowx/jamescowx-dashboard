import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SlideUp from '@/components/animations/SlideUp';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';

const SITE_URL = 'https://jamescowx-dashboard.vercel.app';

type Currency = 'CAD' | 'USD' | 'EUR';

const rates: Record<Currency, number> = { CAD: 1, USD: 0.74, EUR: 0.68 };
const symbols: Record<Currency, string> = { CAD: '$', USD: '$', EUR: '€' };

const tiers = [
  {
    name: 'Starter',
    price: 999,
    monthly: 79,
    description: 'A single-page landing page to establish your online presence.',
    features: ['Responsive design', 'Contact form', '1 revision round', 'Hosting setup & config', 'Basic SEO'],
    cta: 'Choose Starter',
    popular: false,
  },
  {
    name: 'Standard',
    price: 2499,
    monthly: 149,
    description: 'A multi-page business website with a CMS so you can manage content yourself.',
    features: ['Everything in Starter', 'CMS (Sanity or WordPress)', 'Up to 5 pages', 'Blog setup', '2 revision rounds'],
    cta: 'Choose Standard',
    popular: true,
  },
  {
    name: 'Pro',
    price: 5999,
    monthly: 299,
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
  { step: '01', title: 'Discovery', desc: 'A 30-minute call to discuss your goals, audience, and timeline.', icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' },
  { step: '02', title: 'Proposal', desc: 'A detailed scope document with deliverables, milestones, and pricing.', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
  { step: '03', title: 'Development', desc: 'I build your site with regular check-ins and revision rounds.', icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5' },
  { step: '04', title: 'Launch', desc: 'Deployment, final testing, and a full handoff with documentation.', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/websites`,
      url: `${SITE_URL}/websites`,
      name: 'Website Pricing & Packages — James Cowx',
      description: 'Fixed-price website packages from $999 CAD. Starter landing pages, Standard business sites with CMS, and Pro e-commerce platforms.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Websites & Pricing', item: `${SITE_URL}/websites` },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    ...tiers.map((tier) => ({
      '@type': 'Product',
      name: `${tier.name} Website Package`,
      description: tier.description,
      offers: {
        '@type': 'Offer',
        price: tier.price,
        priceCurrency: 'CAD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/contact?package=${tier.name}`,
      },
    })),
  ],
};

function Counter({ value, symbol }: { value: number; symbol: string }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const diff = value - from;
    const duration = 600;
    const steps = 30;
    const stepSize = diff / steps;
    let i = 0;

    const interval = setInterval(() => {
      i++;
      if (i >= steps) {
        setDisplay(value);
        prev.current = value;
        clearInterval(interval);
      } else {
        setDisplay(Math.round(from + stepSize * i));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-white tabular-nums">
      {symbol}{display.toLocaleString()}
    </span>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-500/10 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-purple-500/10 blur-[100px]"
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-pink-500/8 blur-[80px]"
        animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-cyan-500/8 blur-[70px]"
        animate={{ scale: [1.1, 0.9, 1.1], x: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}

function FeatureCheck({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
      className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
    >
      <motion.svg
        className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
      >
        <polyline points="20 6 9 17 4 12" />
      </motion.svg>
      {children}
    </motion.div>
  );
}

function AnimatedFAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-sm font-medium text-white cursor-pointer text-left"
        aria-expanded={open}
      >
        <span>{q}</span>
        <motion.svg
          className="w-4 h-4 text-[var(--color-text-muted)] shrink-0 ml-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            <div className="px-5 pb-4 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>('CAD');
  const [annual, setAnnual] = useState(false);

  function convert(price: number) {
    return Math.round(price * rates[currency]);
  }

  return (
    <>
      <Helmet>
        <title>Website Pricing & Packages — James Cowx | Web Developer Canada</title>
        <meta name="description" content="Fixed-price website packages from $999 CAD. Responsive landing pages, multi-page business sites with CMS, and full e-commerce platforms. Transparent pricing, no hidden fees." />
        <meta name="keywords" content="website pricing, web development packages, website cost, freelance web developer Canada, responsive design pricing, CMS website cost, e-commerce development pricing" />
        <link rel="canonical" href={`${SITE_URL}/websites`} />
        <meta property="og:title" content="Website Pricing & Packages — James Cowx" />
        <meta property="og:description" content="Fixed-price website packages from $999 CAD. Transparent pricing for landing pages, business sites, and e-commerce platforms." />
        <meta property="og:url" content={`${SITE_URL}/websites`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Website Pricing & Packages — James Cowx" />
        <meta name="twitter:description" content="Fixed-price website packages from $999 CAD. Transparent pricing for landing pages, business sites, and e-commerce platforms." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <main className="py-24 px-4 relative" id="main-content">
        <FloatingOrbs />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.15em]"
            >
              Pricing
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl sm:text-5xl font-bold mt-4 mb-4 text-white"
            >
              Websites for <span className="gradient-text-mixed">every stage</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed"
            >
              Fixed-price project fees starting at $999 CAD. Each package includes responsive&nbsp;design,
              hosting&nbsp;setup, and&nbsp;SEO — no hidden costs.
            </motion.p>
          </div>

          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
            aria-label="Pricing options"
          >
            <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]" role="group" aria-label="Currency selector">
              {(['CAD', 'USD', 'EUR'] as Currency[]).map((c) => (
                <motion.button
                  key={c}
                  onClick={() => setCurrency(c)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    currency === c
                      ? 'bg-white/[0.08] text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                  aria-pressed={currency === c}
                >
                  {c}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]" role="group" aria-label="Billing frequency">
              <motion.span
                animate={{ color: annual ? 'var(--color-text-muted)' : 'rgb(255,255,255)', fontWeight: annual ? 400 : 500 }}
              >
                One-time
              </motion.span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border border-white/[0.08] transition-colors cursor-pointer ${
                  annual ? 'bg-white/[0.12]' : 'bg-white/[0.04]'
                }`}
                role="switch"
                aria-checked={annual}
                aria-label="Toggle monthly pricing"
              >
                <motion.span
                  className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm mt-[1.5px] ml-[2px]"
                  animate={{ x: annual ? 15 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </button>
              <motion.span
                animate={{ color: annual ? 'rgb(255,255,255)' : 'var(--color-text-muted)', fontWeight: annual ? 500 : 400 }}
              >
                Monthly
              </motion.span>
            </div>
          </motion.nav>

          <section aria-labelledby="pricing-heading">
            <h2 id="pricing-heading" className="sr-only">Website packages and pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
              {tiers.map((tier, i) => (
                <SlideUp key={tier.name} delay={i * 0.12}>
                  <motion.div
                    className="relative group h-full"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <div className={`relative flex flex-col h-full rounded-2xl border overflow-hidden ${
                      tier.popular
                        ? 'border-[var(--color-accent-blue)]/30'
                        : 'border-white/[0.06]'
                    } bg-white/[0.02] backdrop-blur-sm p-7`}>
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(96,165,250,0.06), transparent 40%)`,
                        }}
                      />
                      {tier.popular && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                              background: 'radial-gradient(600px circle at 50% 0%, rgba(96,165,250,0.08), transparent 40%)',
                            }}
                          />
                          <motion.div
                            className="absolute -top-px left-4 right-4 h-px"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.6), transparent)',
                              backgroundSize: '200% 100%',
                            }}
                            animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          />
                        </>
                      )}
                      {tier.popular && (
                        <motion.span
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="absolute -top-3 left-7 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-[var(--color-accent-blue)] to-purple-500 text-white text-[10px] font-semibold shadow-lg z-10"
                        >
                          Most popular
                        </motion.span>
                      )}
                      <div className="flex-1 relative z-[1]">
                        <div className="mb-6">
                          <motion.h3
                            className="text-base font-semibold text-white mb-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                          >
                            {tier.name}
                          </motion.h3>
                          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{tier.description}</p>
                        </div>
                        <div className="mb-8">
                          <div className="flex items-baseline gap-1">
                            <AnimatePresence mode="popLayout">
                              <motion.div
                                key={`${currency}-${annual}-${tier.name}`}
                                initial={{ y: 12, opacity: 0, scale: 0.95 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -12, opacity: 0, scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                              >
                                <Counter value={convert(annual ? tier.monthly : tier.price)} symbol={symbols[currency]} />
                              </motion.div>
                            </AnimatePresence>
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
                          {tier.features.map((f, fi) => (
                            <FeatureCheck key={f} delay={fi * 0.06}>
                              {f}
                            </FeatureCheck>
                          ))}
                        </div>
                      </div>
                      <motion.div
                        className="relative z-[1]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link to={`/contact?package=${tier.name}`} className="block" aria-label={`${tier.cta} — $${tier.price} ${tier.name} package`}>
                          <Button
                            accent={tier.popular ? 'mixed' : 'blue'}
                            className="w-full text-sm"
                          >
                            {tier.cta}
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </SlideUp>
              ))}
            </div>
          </section>

          <ScrollReveal>
            <section aria-labelledby="compare-heading" className="mb-24">
              <div className="text-center mb-12">
                <span className="text-xs text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.15em]">
                  Compare
                </span>
                <h2 id="compare-heading" className="text-2xl sm:text-3xl font-bold mt-3 text-white">
                  Feature comparison
                </h2>
              </div>
              <motion.div
                className="rounded-2xl border border-white/[0.06] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <table className="w-full text-sm" aria-label="Comparison of features across Starter, Standard, and Pro website packages">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-4 px-5 text-[var(--color-text-muted)] font-medium" scope="col">Feature</th>
                      <th className="text-center py-4 px-5 text-[var(--color-text-primary)] font-medium" scope="col">Starter</th>
                      <th className="text-center py-4 px-5 text-[var(--color-accent-blue)] font-medium bg-white/[0.02]" scope="col">Standard</th>
                      <th className="text-center py-4 px-5 text-[var(--color-text-primary)] font-medium" scope="col">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFeatures.map((f, i) => (
                      <motion.tr
                        key={f.name}
                        className={`border-b border-white/[0.04] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                      >
                        <th className="py-3.5 px-5 text-[var(--color-text-secondary)] text-left font-normal" scope="row">{f.name}</th>
                        {(['starter', 'standard', 'pro'] as const).map((tier) => {
                          const val = f[tier];
                          return (
                            <td key={tier} className={`text-center py-3.5 px-5 ${tier === 'standard' ? 'bg-white/[0.02]' : ''}`}>
                              {val === true ? (
                                <motion.svg
                                  className="w-4 h-4 mx-auto text-green-400"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  whileInView={{ pathLength: 1, opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: i * 0.04 + 0.2, duration: 0.4 }}
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </motion.svg>
                              ) : val === false ? (
                                <span className="text-[var(--color-text-muted)]" aria-label="Not included">&mdash;</span>
                              ) : (
                                <span className="text-[var(--color-text-secondary)]">{val}</span>
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section aria-labelledby="process-heading" className="mb-24">
              <div className="text-center mb-12">
                <span className="text-xs text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.15em]">
                  Process
                </span>
                <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold mt-3 text-white">
                  How it works
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {steps.map((s, i) => (
                  <SlideUp key={s.step} delay={i * 0.1}>
                    <motion.div
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full transition-colors"
                      whileHover={{ y: -4, borderColor: 'rgba(96,165,250,0.2)' }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <svg className="w-4 h-4 text-[var(--color-accent-blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d={s.icon} />
                        </svg>
                      </motion.div>
                      <span className="text-[10px] font-mono text-[var(--color-accent-blue)] font-semibold tracking-wide">{s.step}</span>
                      <h3 className="text-sm font-semibold text-white mt-2 mb-1.5">{s.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{s.desc}</p>
                    </motion.div>
                  </SlideUp>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section aria-labelledby="faq-heading" className="mb-24 max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.15em]">
                  FAQ
                </span>
                <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold mt-3 text-white">
                  Frequently asked questions
                </h2>
              </div>
              <div className="space-y-2">
                {faqs.map((faq) => (
                  <AnimatedFAQ key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section aria-label="Get a personalized recommendation">
              <motion.div
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center relative overflow-hidden"
                whileHover={{ borderColor: 'rgba(96,165,250,0.15)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                  <motion.div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 blur-[80px]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-pink-500/10 blur-[80px]"
                    animate={{ scale: [1.1, 0.9, 1.1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Not sure which plan fits?</h2>
                  <p className="text-[var(--color-text-muted)] mb-6 max-w-lg mx-auto leading-relaxed">
                    Tell me about your project and I'll recommend the right approach — no commitment needed.
                  </p>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/contact">
                      <Button accent="blue" size="lg">
                        Get a recommendation
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </section>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
