import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getServiceBySlug, SERVICES, SERVICES_EMAIL } from '@/data/services';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Badge from '@/components/ui/Badge';

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
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link to="/services" className="text-[var(--color-accent-blue)] hover:underline">Back to services</Link>
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
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Services
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-14 h-14 rounded-2xl bg-[#60a5fa]/10 border border-[#60a5fa]/15 flex items-center justify-center text-2xl">
                {service.icon}
              </span>
              <Badge variant="blue">{service.price}</Badge>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">{service.name} Services</h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-12">{service.tagline}</p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-2">{service.sectionTitle}</h2>
              <p className="text-[var(--color-text-muted)] mb-8">{service.sectionSubtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature.title} className="liquid-glass rounded-2xl p-5 premium-card">
                    <h4 className="font-semibold mb-2 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)] shrink-0" />
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <SlideUp delay={0.15}>
            <div className="rounded-2xl p-8 sm:p-10 text-center premium-card">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">{service.ctaTitle}</h2>
              <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-6">{service.ctaText}</p>
              <a
                href={`mailto:${SERVICES_EMAIL}`}
                className="inline-flex px-7 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#60a5fa] to-[#f472b6] text-white shadow-lg shadow-[#60a5fa]/20 hover:shadow-[#f472b6]/30 hover:-translate-y-0.5 transition-all"
              >
                {service.ctaButton}
              </a>
            </div>
          </SlideUp>

          {others.length > 0 && (
            <SlideUp delay={0.2}>
              <div className="mt-16 pt-10 border-t border-[var(--color-border-subtle)]">
                <h2 className="text-2xl font-bold mb-6">Other Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {others.map((other) => (
                    <Link key={other.slug} to={`/services/${other.slug}`}>
                      <div className="liquid-glass rounded-2xl p-5 premium-card h-full">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg">{other.icon}</span>
                          <Badge variant="gray">{other.price}</Badge>
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{other.name}</h3>
                        <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">{other.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </SlideUp>
          )}
        </div>
      </div>
    </>
  );
}
