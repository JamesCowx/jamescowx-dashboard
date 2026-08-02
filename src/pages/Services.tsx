import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES, SERVICES_EMAIL } from '@/data/services';
import SlideUp from '@/components/animations/SlideUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

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

export default function Services() {
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
      <div className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SlideUp>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
                <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Services</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                All <span className="gradient-text-pink">Services</span>
              </h1>
              <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
                Professional, reliable freelance services tailored to your business needs.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {SERVICES.map((service) => (
              <StaggerItem key={service.slug}>
                <Link to={`/services/${service.slug}`}>
                  <Card accent="blue" className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-11 h-11 rounded-xl bg-[#60a5fa]/10 border border-[#60a5fa]/15 flex items-center justify-center text-xl">
                        {service.icon}
                      </span>
                      <Badge variant="blue">{service.price}</Badge>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 leading-snug">{service.name}</h2>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-xs text-[var(--color-text-muted)]">{service.features.length} offerings</span>
                      <span className="text-[var(--color-accent-blue)] font-medium">View Details →</span>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <SlideUp delay={0.2}>
            <div className="mt-14 rounded-2xl p-8 sm:p-10 text-center premium-card">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Need Help Choosing?</h2>
              <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-6">
                Not sure which service is right for you? Let's talk — I offer a free 15-minute consultation to discuss your needs.
              </p>
              <a
                href={`mailto:${SERVICES_EMAIL}`}
                className="inline-flex px-7 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#60a5fa] to-[#f472b6] text-white shadow-lg shadow-[#60a5fa]/20 hover:shadow-[#f472b6]/30 hover:-translate-y-0.5 transition-all"
              >
                Free Consultation
              </a>
            </div>
          </SlideUp>
        </div>
      </div>
    </>
  );
}
