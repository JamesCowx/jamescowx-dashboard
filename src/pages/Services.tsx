import { type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { SERVICES, SERVICES_EMAIL } from '@/data/services';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'James Cowx Services',
  description: 'Professional freelance services tailored to your business needs. Quality work, transparent pricing.',
  url: 'https://jamescowx.com/services',
  provider: { '@type': 'Person', name: 'James Cowx', url: 'https://jamescowx.com' },
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'Offer',
    position: i + 1,
    itemOffered: {
      '@type': 'Service',
      name: s.name,
      description: s.tagline,
      url: `https://jamescowx.com/services/${s.slug}`,
      provider: { '@type': 'Person', name: 'James Cowx', url: 'https://jamescowx.com' },
    },
  })),
};

const trust = [
  { icon: '◈', title: 'Transparent pricing', text: 'Clear per-hour rates for every service. No surprises, no hidden fees.' },
  { icon: '✦', title: 'Free consultation', text: 'Not sure which service is right? A free 15-minute chat to map your needs.' },
  { icon: '⚡', title: 'Professional & reliable', text: 'Quality work, delivered on time — backed by clear communication throughout.' },
];

function Ambient() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 65%)' }} />
      <div className="absolute bottom-[-15%] right-[-10%] w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #f472b6, transparent 65%)', animationDelay: '2.5s' }} />
      <div className="absolute top-[20%] right-[12%] w-[26vw] h-[26vw] max-w-[380px] max-h-[380px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #a78bfa, transparent 65%)', animationDelay: '5s' }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(96,165,250,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 35%, transparent 75%)',
        }}
      />
    </div>
  );
}

function FloatingIcons() {
  const spots = [
    { icon: '🔍', top: '16%', left: '8%', d: 0, s: 'text-4xl' },
    { icon: '🎨', top: '70%', left: '12%', d: 1.2, s: 'text-3xl' },
    { icon: '📊', top: '24%', right: '10%', d: 0.6, s: 'text-3xl' },
    { icon: '💬', top: '64%', right: '16%', d: 1.8, s: 'text-4xl' },
    { icon: '📱', top: '44%', left: '4%', d: 2.4, s: 'text-2xl' },
    { icon: '🎤', top: '40%', right: '6%', d: 0.9, s: 'text-2xl' },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
      {spots.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ ...(sp.top ? { top: sp.top } : {}), ...(sp.left ? { left: sp.left } : {}), ...(sp.right ? { right: sp.right } : {}) }}
          animate={{ y: [0, -20, 0], rotate: [0, i % 2 ? 8 : -8, 0] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut', delay: sp.d }}
        >
          <span className={`block ${sp.s} opacity-[0.14] saturate-50 drop-shadow-[0_0_12px_rgba(96,165,250,0.25)] blur-[0.5px]`}>{sp.icon}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Marquee() {
  const items = [...SERVICES, ...SERVICES];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.04] py-5 marquee">
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, var(--color-bg-deep), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, var(--color-bg-deep), transparent)' }} />
      <div className="marquee-track items-center gap-10">
        {items.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap">
            <span className="text-lg opacity-60">{s.icon}</span>
            <span className="text-sm font-semibold text-white/80">{s.name}</span>
            <span className="text-xs text-[var(--color-text-muted)]">{s.price}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#f472b6] opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  function scrollToGrid(e: MouseEvent<HTMLAnchorElement>) {
    document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Helmet>
        <title>Services — James Cowx | Freelance Services</title>
        <meta name="description" content="All freelance services offered: copywriting, graphic design, social media management, data entry & analysis, website content updates, and customer service chat." />
        <link rel="canonical" href="https://jamescowx.com/services" />
        <meta property="og:title" content="Services — James Cowx | Freelance Services" />
        <meta property="og:description" content="All freelance services offered: copywriting, graphic design, social media management, data entry & analysis, website content updates, and customer service chat." />
        <meta property="og:url" content="https://jamescowx.com/services" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
      </Helmet>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[82vh] flex flex-col justify-center overflow-hidden px-4 sm:px-8">
        <Ambient />
        <FloatingIcons />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <span className="text-[24vw] font-black leading-none text-watermark tracking-tight select-none">SV</span>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div className="flex items-center gap-2 mb-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-[var(--color-text-secondary)]">Freelance · Available Now</span>
            </span>
          </motion.div>

          <motion.h1
            className="text-[2.75rem] leading-[1.02] sm:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] text-balance"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.85, ease }}
          >
            Professional services,
            <br />
            <span className="hero-gradient-text">built around you.</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-[var(--color-text-muted)] max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease }}
          >
            Copywriting, design, social media, data entry, website care, and customer support — flexible freelance
            help for whatever your business needs.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7, ease }}>
            <a
              href="#services-grid"
              onClick={scrollToGrid}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#f472b6] bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-[0_8px_32px_rgba(96,165,250,0.3)] hover:shadow-[0_12px_48px_rgba(244,114,182,0.35)] hover:-translate-y-0.5"
            >
              Explore services
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
            </a>
            <a
              href={`mailto:${SERVICES_EMAIL}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-semibold text-white bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300"
            >
              Free consultation
            </a>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.3em] font-semibold">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/[0.08] flex justify-center pt-1.5">
            <motion.div className="w-1 h-2 rounded-full bg-[var(--color-accent-blue)]" animate={{ y: [0, 7, 0], opacity: [1, 0.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
        </motion.div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <Marquee />

      {/* ═══════ TRUST ═══════ */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" staggerDelay={0.08}>
            {trust.map((t) => (
              <StaggerItem key={t.title}>
                <div className="liquid-glass rounded-2xl p-6 premium-card h-full">
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#60a5fa]/15 to-[#f472b6]/15 border border-white/[0.06] flex items-center justify-center text-lg text-[#93c5fd] mb-4">{t.icon}</span>
                  <h3 className="font-semibold text-white mb-1.5">{t.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{t.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ SERVICES GRID ═══════ */}
      <section id="services-grid" className="py-12 sm:py-16 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">What I Offer</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Every service, <span className="gradient-text-pink">one partner.</span>
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg mt-4 max-w-xl mx-auto">Pick a single service or bundle several — everything is billed hourly with transparent rates.</p>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" staggerDelay={0.08}>
            {SERVICES.map((service) => (
              <StaggerItem key={service.slug}>
                <Link to={`/services/${service.slug}`} className="block h-full">
                  <Card accent="blue" className="living-border h-full flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <span className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#60a5fa]/20 via-[#a78bfa]/10 to-[#f472b6]/20 border border-white/[0.08] flex items-center justify-center text-2xl shadow-[0_4px_20px_rgba(96,165,250,0.15)]">
                        {service.icon}
                        <span className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 20px rgba(96,165,250,0.15)' }} />
                      </span>
                      <Badge variant="blue">{service.price}</Badge>
                    </div>
                    <h3 className="text-lg font-bold leading-snug mb-2 group-hover/card:text-white transition-colors">{service.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 leading-relaxed mb-6">{service.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.04]">
                      <span className="text-xs text-[var(--color-text-muted)]">{service.features.length} offerings</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-blue)] transition-transform duration-300 group-hover/card:translate-x-1">
                        View details
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="conic-border relative rounded-[2rem] p-[1px] overflow-hidden"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="relative rounded-[calc(2rem-1px)] bg-[var(--color-bg-primary)] px-6 py-14 sm:px-14 text-center overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at 50% -20%, rgba(96,165,250,0.1), transparent 60%)' }} />
              <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[80%] h-[200%] pointer-events-none opacity-[0.06]" style={{ background: 'conic-gradient(from 0deg, #60a5fa, #a78bfa, #f472b6, #60a5fa)' }} />
              <div className="relative z-10">
                <span className="text-3xl mb-4 block">🤝</span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
                  Need help <span className="hero-gradient-text">choosing?</span>
                </h2>
                <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                  Not sure which service is right for you? Let's talk — I offer a free 15-minute consultation to discuss your needs.
                </p>
                <a
                  href={`mailto:${SERVICES_EMAIL}`}
                  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-[#60a5fa] to-[#f472b6] shadow-[0_8px_32px_rgba(96,165,250,0.3)] hover:shadow-[0_12px_48px_rgba(244,114,182,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get your free consultation
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}