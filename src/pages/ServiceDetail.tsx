import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { getServiceBySlug, SERVICES, SERVICES_EMAIL } from '@/data/services';
import Badge from '@/components/ui/Badge';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const others = service ? SERVICES.filter((s) => s.slug !== service.slug) : [];

  if (!service) {
    return (
      <>
        <Helmet>
          <title>Service Not Found — James Cowx</title>
        </Helmet>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <span className="text-5xl block mb-6">🫥</span>
            <h1 className="text-4xl font-bold mb-3">Service Not Found</h1>
            <p className="text-[var(--color-text-muted)] mb-6">The service you're looking for doesn't exist (yet).</p>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-blue)] hover:text-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to services
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.name} Services — James Cowx</title>
        <meta name="description" content={`Professional ${service.name.toLowerCase()} services at ${service.price}. ${service.tagline}`} />
        <link rel="canonical" href={`https://jamescowx.com/services/${service.slug}`} />
        <meta property="og:title" content={`${service.name} Services — James Cowx`} />
        <meta property="og:description" content={`Professional ${service.name.toLowerCase()} services at ${service.price}.`} />
        <meta property="og:url" content={`https://jamescowx.com/services/${service.slug}`} />
        <meta name="author" content="James Cowx" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${service.name} Services`,
            description: service.tagline,
            url: `https://jamescowx.com/services/${service.slug}`,
            provider: { '@type': 'Person', name: 'James Cowx', url: 'https://jamescowx.com' },
            offers: { '@type': 'Offer', priceCurrency: 'USD', description: `Billed at ${service.price}` },
          })}
        </script>
      </Helmet>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[72vh] flex flex-col justify-center overflow-hidden px-4 sm:px-8 pt-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #a78bfa, transparent 65%)' }} />
          <div className="absolute bottom-[-15%] left-[-10%] w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 65%)', animationDelay: '3s' }} />
          <div className="absolute top-[10%] right-[-10%] w-[34vw] h-[34vw] max-w-[460px] max-h-[460px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #f472b6, transparent 65%)', animationDelay: '5s' }} />
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6, ease }}>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors mb-10">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              All services
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-14 items-center">
            <motion.div
              className="relative w-40 h-40 sm:w-48 sm:h-48 justify-self-start lg:justify-self-auto"
              initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.9, ease }}
            >
              <div className="absolute inset-0 rounded-full hero-ring opacity-40 blur-xl" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(96,165,250,0.15)" strokeWidth="0.5" strokeDasharray="4 5" />
                  <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(244,114,182,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
                </svg>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl liquid-glass flex items-center justify-center text-5xl sm:text-6xl shadow-[0_20px_60px_rgba(96,165,250,0.25)]">
                  {service.icon}
                </span>
              </div>
              <motion.span className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-[#60a5fa] backdrop-blur-xl shadow-xl"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                {service.price}
              </motion.span>
            </motion.div>

            <div>
              <motion.h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease }}>
                <span className="hero-gradient-text">{service.name}</span>
              </motion.h1>
              <motion.p className="mt-6 text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7, ease }}>
                {service.tagline}
              </motion.p>
              <motion.div className="mt-8 flex flex-wrap items-center gap-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
                <Badge variant="blue">{`Billed at ${service.price}`}</Badge>
                <a href={`mailto:${SERVICES_EMAIL}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#60a5fa] to-[#f472b6] shadow-[0_8px_24px_rgba(96,165,250,0.25)] hover:shadow-[0_10px_36px_rgba(244,114,182,0.3)] hover:-translate-y-0.5 transition-all duration-300">
                  {service.ctaButton}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT'S INCLUDED ═══════ */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">What's Included</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">{service.sectionTitle}</h2>
            <p className="text-lg text-[var(--color-text-muted)] mt-3 max-w-2xl leading-relaxed">{service.sectionSubtitle}</p>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {service.features.map((feature, i) => (
              <StaggerItem key={feature.title}>
                <div className="liquid-glass rounded-2xl p-6 premium-card h-full group/feature">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#60a5fa]/20 to-[#f472b6]/20 border border-white/[0.08] flex items-center justify-center text-xs font-bold text-[#93c5fd]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{feature.description}</p>
                  <span className="mt-4 block h-px w-0 group-hover/feature:w-full transition-all duration-500" style={{ background: 'linear-gradient(90deg, #60a5fa, #f472b6)' }} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="conic-border relative rounded-[2rem] p-[1px] overflow-hidden"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="relative rounded-[calc(2rem-1px)] bg-[var(--color-bg-primary)] px-6 py-14 sm:px-14 text-center overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at 50% -20%, rgba(244,114,182,0.1), transparent 60%)' }} />
              <div className="relative z-10">
                <span className="text-3xl mb-4 block">{service.icon}</span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">{service.ctaTitle}</h2>
                <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto mb-8 leading-relaxed">{service.ctaText}</p>
                <a
                  href={`mailto:${SERVICES_EMAIL}`}
                  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-[#60a5fa] to-[#f472b6] shadow-[0_8px_32px_rgba(96,165,250,0.3)] hover:shadow-[0_12px_48px_rgba(244,114,182,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {service.ctaButton}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ OTHER SERVICES ═══════ */}
      {others.length > 0 && (
        <section className="pb-28 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <span className="text-[11px] text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.2em]">Keep exploring</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">Other <span className="gradient-text-pink">services</span></h2>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
              {others.map((other) => (
                <StaggerItem key={other.slug}>
                  <Link to={`/services/${other.slug}`} className="block h-full">
                    <div className="liquid-glass rounded-2xl p-6 premium-card living-border h-full group/other">
                      <div className="flex items-start justify-between mb-4">
                        <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f472b6]/20 to-[#60a5fa]/20 border border-white/[0.08] flex items-center justify-center text-2xl">{other.icon}</span>
                        <Badge variant="gray">{other.price}</Badge>
                      </div>
                      <h3 className="font-semibold mb-1.5 group-hover/other:text-white transition-colors">{other.name}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">{other.description}</p>
                      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[var(--color-accent-pink)] transition-transform duration-300 group-hover/other:translate-x-1">
                        View details
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}