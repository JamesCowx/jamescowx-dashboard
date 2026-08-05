import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHero from '@/components/layout/PageHero';
import Badge from '@/components/ui/Badge';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const skills = [
  { name: 'React / Next.js', level: 95, color: '#61dafb' },
  { name: 'TypeScript', level: 92, color: '#3178c6' },
  { name: 'Node.js', level: 88, color: '#339933' },
  { name: 'PostgreSQL', level: 85, color: '#336791' },
  { name: 'System Design', level: 82, color: '#a78bfa' },
  { name: 'Python', level: 80, color: '#3776ab' },
  { name: 'AWS / Cloud', level: 78, color: '#ff9900' },
  { name: 'Docker / Kubernetes', level: 75, color: '#2496ed' },
];

const achievements = [
  { value: '30', label: 'Projects Shipped', icon: '◈', color: '#60a5fa' },
  { value: '8+', label: 'Years Experience', icon: '⚡', color: '#a78bfa' },
  { value: '25', label: 'Blog Posts', icon: '✎', color: '#f472b6' },
  { value: '247', label: 'GitHub Stars', icon: '★', color: '#34d399' },
];

const extraTech = ['GraphQL', 'Redis', 'MongoDB', 'Git', 'CI/CD', 'Terraform', 'Figma', 'Agile', 'Testing', 'Linux'];
const interests = ['Open Source', 'System Design', 'DevOps', 'AI/ML', 'Web Performance', 'DX', 'Security'];

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'James Cowx',
      description: 'Full-stack web developer and open source enthusiast based in Canada.',
      jobTitle: 'Full-Stack Developer',
      url: 'https://jamescowx.com',
      sameAs: [
        'https://github.com/JamesCowx',
        'https://linkedin.com/in/jamescowx',
        'https://bsky.app/profile/jamescowx.bsky.social',
      ],
      knowsAbout: [
        'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
        'Docker', 'Kubernetes', 'PostgreSQL', 'AWS', 'System Design',
      ],
    },
  };

  return (
    <>
      <Helmet>
        <title>About James Cowx — Full-Stack Developer | Vancouver, Canada</title>
        <meta name="description" content="James Cowx is a full-stack developer with 8+ years of experience in React, TypeScript, Node.js, Docker, PostgreSQL, and AWS. Based in Vancouver, Canada. Building open source tools and scalable web apps." />
        <meta name="keywords" content="James Cowx, about, full-stack developer, Vancouver, Canada, React, TypeScript, Node.js, open source" />
        <link rel="canonical" href="https://jamescowx.com/about" />
        <meta property="og:title" content="About James Cowx — Full-Stack Developer | Vancouver, Canada" />
        <meta property="og:description" content="Full-stack developer with 8+ years experience in React, TypeScript, Node.js. Based in Vancouver." />
        <meta property="og:url" content="https://jamescowx.com/about" />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>

      <PageHero
        eyebrow="About"
        title={<>The developer behind <span className="hero-gradient-text">the builds.</span></>}
        subtitle="A passionate developer with 8+ years of experience building products that make a difference — from open source tools to production-grade web apps."
        watermark="AB"
        accent="blue"
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#60a5fa] to-[#f472b6] shadow-[0_8px_24px_rgba(96,165,250,0.25)] hover:shadow-[0_10px_36px_rgba(244,114,182,0.3)] hover:-translate-y-0.5 transition-all duration-300">
            Explore services
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300">
            Get in touch
          </Link>
        </div>
      </PageHero>

      {/* ═══════ ACHIEVEMENTS ═══════ */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
            {achievements.map((a) => (
              <StaggerItem key={a.label}>
                <div className="liquid-glass rounded-2xl p-6 text-center premium-card group/stats h-full">
                  <div className="absolute inset-0 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(200px circle at 50% 0%, ${a.color}10, transparent)` }} />
                  <motion.span
                    className="inline-block text-2xl mb-3 opacity-50"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {a.icon}
                  </motion.span>
                  <div className="text-3xl sm:text-4xl font-extrabold gradient-text-mixed mb-1">{a.value}</div>
                  <div className="text-xs text-[var(--color-text-muted)] font-medium">{a.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ BIO ═══════ */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="conic-border rounded-[2rem] p-[1px]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="rounded-[calc(2rem-1px)] bg-[var(--color-bg-primary)] p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(500px circle at 80% -20%, rgba(167,139,250,0.08), transparent 60%)' }} />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full hero-ring opacity-50 blur-lg" />
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px] hero-ring">
                    <div className="w-full h-full rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center text-4xl font-extrabold">
                      <span className="hero-gradient-text">JC</span>
                    </div>
                  </div>
                  <motion.span
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#f472b6] flex items-center justify-center text-sm shadow-lg"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ⚡
                  </motion.span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3">James Cowx</h2>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    <Badge variant="blue">Full-Stack Developer</Badge>
                    <Badge variant="pink">Open Source</Badge>
                    <Badge variant="gray">DevOps</Badge>
                  </div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    I'm a full-stack developer and open-source enthusiast based in Canada. I specialize in building
                    scalable web applications, designing robust APIs, and creating intuitive user experiences. When I'm not
                    coding, I write technical blog posts and contribute to open-source projects. I believe in clean code,
                    continuous learning, and sharing knowledge with the developer community.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SKILLS ═══════ */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Toolbox</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Skills & <span className="gradient-text-mixed">expertise</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6, ease }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-[var(--color-text-muted)] font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden group/bar">
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover/bar:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${skill.color}40, transparent)`, backgroundSize: '200% 100%', animation: 'shimmer 1.2s infinite' }} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
            <div className="liquid-glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-semibold mb-4 text-[var(--color-text-secondary)]">Additional Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {extraTech.map((s) => (
                  <Badge key={s} variant="mixed">{s}</Badge>
                ))}
              </div>
              <h3 className="text-sm font-semibold mb-4 text-[var(--color-text-secondary)]">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] text-[var(--color-text-muted)] hover:border-[#60a5fa]/30 hover:text-white transition-all">{i}</span>
                ))}
              </div>
            </div>
          </motion.div>
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
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at 50% -20%, rgba(96,165,250,0.1), transparent 60%)' }} />
              <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[80%] h-[200%] pointer-events-none opacity-[0.06]" style={{ background: 'conic-gradient(from 0deg, #60a5fa, #a78bfa, #f472b6, #60a5fa)' }} />
              <div className="relative z-10">
                <span className="text-3xl mb-4 block">🤝</span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
                  Want to work <span className="hero-gradient-text">together?</span>
                </h2>
                <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                  I'm always open to interesting projects, collaborations, and opportunities.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-[#60a5fa] to-[#f472b6] shadow-[0_8px_32px_rgba(96,165,250,0.3)] hover:shadow-[0_12px_48px_rgba(244,114,182,0.35)] hover:-translate-y-0.5 transition-all duration-300">
                  Get in touch
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
