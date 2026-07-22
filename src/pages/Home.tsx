import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useCountUp } from '@/hooks/useCountUp';
import { useGithubStats } from '@/hooks/useGithubStats';
import { projects } from '@/data/projects';
import { getAllPosts } from '@/lib/blog';
import SlideUp from '@/components/animations/SlideUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const SITE_URL = 'https://jamescowx.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'James Cowx',
      url: SITE_URL,
      sameAs: [
        'https://github.com/JamesCowx',
        'https://linkedin.com/in/jamescowx',
        'https://bsky.app/profile/jamescowx.bsky.social',
        'https://jamescowx.github.io/',
      ],
      jobTitle: 'Full-Stack Developer',
      description: 'Full-stack web developer and open source enthusiast based in Canada. Specializing in React, TypeScript, Node.js, and cloud infrastructure.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'James Cowx — Full-Stack Developer',
      description: 'Portfolio and blog of James Cowx, a full-stack developer and open source enthusiast based in Canada.',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

const techStack = [
  { name: 'React', icon: '⚛', color: '#61dafb' },
  { name: 'TypeScript', icon: 'TS', color: '#3178c6' },
  { name: 'Next.js', icon: 'N', color: '#fff' },
  { name: 'Node.js', icon: '◉', color: '#339933' },
  { name: 'Python', icon: '🐍', color: '#3776ab' },
  { name: 'Go', icon: 'Go', color: '#00add8' },
  { name: 'Docker', icon: '⎈', color: '#2496ed' },
  { name: 'Kubernetes', icon: '☸', color: '#326ce5' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'Redis', icon: '⚡', color: '#dc382d' },
  { name: 'GraphQL', icon: '◈', color: '#e10098' },
  { name: 'AWS', icon: '☁', color: '#ff9900' },
];

/* ============================
   HERO COMPONENTS
   ============================ */

function MouseSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.06), transparent 60%)',
          left: pos.x - 300,
          top: pos.y - 300,
          transition: 'left 0.2s ease-out, top 0.2s ease-out',
        }}
      />
    </div>
  );
}

function HeroParticles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.35 + 0.05,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? '#60a5fa' : p.id % 3 === 1 ? '#a78bfa' : '#f472b6',
          }}
          animate={{
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            scale: [1, 2, 1],
            y: [0, -30, 0],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute top-[15%] left-[8%] w-20 h-20 border border-[#60a5fa]/[0.06] rounded-2xl"
        animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute top-[55%] right-[10%] w-12 h-12 border border-[#f472b6]/[0.06] rounded-full"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute top-[25%] right-[22%] w-10 h-10 border border-[#a78bfa]/[0.06]"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{ rotate: [0, 120, 240, 360], y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute bottom-[25%] left-[18%] w-14 h-14 border border-[#60a5fa]/[0.05] rounded-xl"
        animate={{ rotate: [0, 45, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute top-[70%] left-[60%] w-6 h-6 border border-[#f472b6]/[0.05] rounded-full"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function FloatingCode() {
  const snippets = [
    { text: 'const app = createApp()', x: '72%', y: '18%', color: '#60a5fa', delay: 0 },
    { text: 'async function build()', x: '76%', y: '52%', color: '#a78bfa', delay: 2 },
    { text: 'export default {}', x: '68%', y: '72%', color: '#f472b6', delay: 4 },
    { text: '<Component />', x: '82%', y: '35%', color: '#34d399', delay: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
      {snippets.map((s, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[11px] px-3 py-1.5 rounded-lg border"
          style={{ left: s.x, top: s.y, color: s.color + '35', borderColor: s.color + '08', background: s.color + '03' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.5, 0.5, 0], y: [20, 0, -10, -40] }}
          transition={{ duration: 10, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          {s.text}
        </motion.div>
      ))}
    </div>
  );
}

function HeroGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #60a5fa, transparent 65%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute bottom-[-10%] right-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #f472b6, transparent 65%)' }}
        animate={{ scale: [1.05, 1, 1.05], x: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute top-[30%] right-[15%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent 65%)' }}
        animate={{ scale: [1, 1.25, 1], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }}
    >
      <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.25em] font-medium">Scroll</span>
      <motion.div className="w-5 h-8 rounded-full border border-white/[0.1] flex justify-center pt-1.5"
        animate={{ borderColor: ['rgba(255,255,255,0.08)', 'rgba(96,165,250,0.25)', 'rgba(255,255,255,0.08)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.div className="w-1 h-1.5 rounded-full bg-[var(--color-accent-blue)]"
          animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

function AnimatedLine() {
  return (
    <div className="section-divider relative overflow-hidden">
      <motion.div className="absolute inset-y-0 w-1/4"
        style={{ background: 'linear-gradient(90deg, transparent, #60a5fa, #a78bfa, #f472b6, transparent)' }}
        animate={{ x: ['-100%', '500%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
      />
    </div>
  );
}

/* ============================
   MAIN HOME PAGE
   ============================ */

export default function Home() {
  const typedText = useTypewriter([
    'Full-Stack Developer',
    'Open Source Enthusiast',
    'DevOps Engineer',
    'UI/UX Designer',
    'Tech Blogger',
  ]);

  const { repos: ghRepos, followers: ghFollowers } = useGithubStats('JamesCowx');
  const projectCount = useCountUp(projects.length);
  const postCount = useCountUp(getAllPosts().length);
  const yearCount = useCountUp(8);

  const featured = projects.filter((p) => p.featured);
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <>
      <Helmet>
        <title>James Cowx — Full-Stack Developer & Open Source Enthusiast</title>
        <meta name="description" content="Portfolio of James Cowx, a full-stack web developer and open source enthusiast based in Canada. Specializing in React, TypeScript, Node.js, and cloud-native applications." />
        <meta name="keywords" content="James Cowx, jamescowx, full-stack developer, web developer Canada, React developer, TypeScript, open source" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content="James Cowx — Full-Stack Developer & Open Source Enthusiast" />
        <meta property="og:description" content="Full-stack web developer and open source enthusiast based in Canada. Building exceptional digital experiences." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="James Cowx — Full-Stack Developer" />
        <meta name="twitter:description" content="Full-stack web developer and open source enthusiast based in Canada." />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>
      <div>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center px-4 overflow-hidden">
        <HeroGlow />
        <HeroParticles />
        <FloatingShapes />
        <FloatingCode />
        <MouseSpotlight />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Badges */}
              <motion.div className="flex items-center gap-3 mb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                <motion.span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium liquid-glass"
                  whileHover={{ scale: 1.03 }}
                  animate={{ boxShadow: ['0 0 0 0 rgba(74,222,128,0)', '0 0 0 4px rgba(74,222,128,0.08)', '0 0 0 0 rgba(74,222,128,0)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[var(--color-text-secondary)]">Available for new projects</span>
                </motion.span>
                <span className="px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.02] border border-white/[0.04] text-[var(--color-text-muted)]">
                  Canada
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold leading-[0.98] mb-8 tracking-[-0.03em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span className="text-white/90 inline-block"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.7 }}
                >
                  Hi, I'm
                </motion.span>
                <br />
                <motion.span className="hero-gradient-text inline-block"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  James Cowx
                </motion.span>
              </motion.h1>

              {/* Typewriter */}
              <motion.div className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] mb-5 h-9 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <span>{typedText}</span>
                <motion.span className="inline-block w-[2px] h-5 bg-[var(--color-accent-blue)] ml-0.5 align-middle rounded-full"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>

              {/* Description */}
              <motion.p className="text-[var(--color-text-muted)] max-w-lg text-base leading-relaxed mb-12"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                I build exceptional digital experiences with modern technologies.
                Passionate about clean code, scalable architecture, and open source.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div className="flex flex-wrap gap-4 mb-14"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                <Link to="/projects">
                  <Button accent="blue" size="lg" className="btn-glow-blue">
                    View Projects
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="glass" size="lg">Get In Touch</Button>
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.5 }}
              >
                <motion.a href="https://jamescowx.github.io/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-[10px] font-bold group-hover:bg-white/[0.08] transition-colors">GH</span>
                  <div>
                    <span className="block font-medium">{ghRepos}+ repos</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{ghFollowers} followers</span>
                  </div>
                </motion.a>
                <motion.a href="https://linkedin.com/in/jamescowx" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-[10px] font-bold group-hover:bg-white/[0.08] transition-colors">LI</span>
                  <div>
                    <span className="block font-medium">{ghFollowers}+ followers</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">Connect</span>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: Avatar */}
            <motion.div className="lg:col-span-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <motion.div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[3px] hero-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center">
                    <motion.span className="text-9xl font-extrabold hero-gradient-text"
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0, -2, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      JC
                    </motion.span>
                  </div>
                </motion.div>
                <motion.div className="absolute -top-3 -left-5 px-3.5 py-2 rounded-xl liquid-glass text-[10px] font-semibold shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <span className="text-[#60a5fa]">Open Source</span>
                </motion.div>
                <motion.div className="absolute -bottom-3 -right-5 px-3.5 py-2 rounded-xl liquid-glass text-[10px] font-semibold shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <span className="text-[#f472b6]">Full-Stack</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      <AnimatedLine />

      {/* ===== TECH STACK ===== */}
      <section className="py-24 px-4 relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-[0.025]"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, #60a5fa, transparent)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <SlideUp>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
                <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Tech Stack</span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
              </div>
              <p className="text-[var(--color-text-muted)] text-sm">Technologies I work with daily</p>
            </div>
          </SlideUp>

          <motion.div className="flex flex-wrap items-center justify-center gap-3 mb-20"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {techStack.map((t) => (
              <motion.span key={t.name}
                variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ scale: 1.1, borderColor: t.color + '50', y: -6, boxShadow: `0 8px 30px ${t.color}15` }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[12px] font-mono font-medium text-[var(--color-text-muted)] transition-all cursor-default"
              >
                <motion.span className="text-[15px]" style={{ color: t.color }}
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: Math.random() * 3 }}
                >
                  {t.icon}
                </motion.span>
                {t.name}
              </motion.span>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { label: 'Projects Built', value: projectCount, suffix: '+', color: '#60a5fa', icon: '◈' },
              { label: 'GitHub Stars', value: 0, suffix: '', color: '#fbbf24', icon: '★' },
              { label: 'Blog Posts', value: postCount, suffix: '+', color: '#f472b6', icon: '✎' },
              { label: 'Years Experience', value: yearCount, suffix: '+', color: '#a78bfa', icon: '⚡' },
            ].map(({ label, value, suffix, color, icon }, i) => (
              <SlideUp key={label} delay={i * 0.1}>
                <motion.div className="liquid-glass rounded-2xl p-6 text-center border border-white/[0.04] relative overflow-hidden group"
                  whileHover={{ scale: 1.06, borderColor: color + '40', y: -6 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(200px circle at 50% 50%, ${color}10, transparent)` }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
                  />
                  <div className="relative z-10">
                    <motion.div className="flex items-center justify-center gap-1.5 mb-3"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                    >
                      <span className="text-2xl opacity-50" style={{ color }}>{icon}</span>
                    </motion.div>
                    <div className="text-4xl sm:text-5xl font-extrabold mb-1.5" style={{ color }}>
                      {value}{suffix}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] font-medium tracking-wide">{label}</div>
                  </div>
                </motion.div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      <AnimatedLine />

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
                <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Portfolio</span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold mb-5">
                Featured <span className="gradient-text-blue">Projects</span>
              </h2>
              <p className="text-[var(--color-text-muted)] max-w-lg mx-auto text-lg">
                A selection of my best work across different domains.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {featured.map((project) => (
              <StaggerItem key={project.id}>
                <Link to={`/projects/${project.id}`}>
                  <Card accent="blue">
                    <div className="h-48 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(244,114,182,0.04) 50%, rgba(167,139,250,0.06) 100%)' }}
                    >
                      <motion.span className="text-7xl opacity-[0.08]"
                        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        {project.category === 'Web Apps' ? '◈' : project.category === 'Mobile' ? '◉' : project.category === 'AI/ML' ? '◬' : '⬡'}
                      </motion.span>
                      <motion.span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-green-500/15 text-green-400 border border-green-500/20 backdrop-blur-sm"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        Interactive
                      </motion.span>
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="text-[9px] px-2 py-0.5 rounded-md bg-black/40 text-[var(--color-text-muted)]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {project.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="blue">{tag}</Badge>
                      ))}
                      <Badge variant="mixed">{project.category.slice(0, 3).toUpperCase()}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover/card:text-white transition-colors">{project.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">{project.description}</p>
                    <div className="flex items-center gap-3 mt-5 pt-3 border-t border-white/[0.04] text-[11px] text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">⚡ {project.tech.length} tech</span>
                      <motion.span className="flex items-center gap-1 ml-auto"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        View demo →
                      </motion.span>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <motion.div className="text-center mt-14"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/projects">
              <Button variant="outline" accent="blue" size="lg">
                Browse All Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <AnimatedLine />

      {/* ===== BLOG ===== */}
      <section className="py-28 px-4 bg-white/[0.003]">
        <div className="max-w-4xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-accent-pink)]" />
                <span className="text-[11px] text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.2em]">Insights</span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-accent-pink)]" />
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold mb-5">
                Latest <span className="gradient-text-pink">Blog Posts</span>
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg">Tutorials, tips, and thoughts on technology.</p>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPosts.map((post, i) => (
              <SlideUp key={post.slug} delay={i * 0.12}>
                <Link to={`/blog/${post.slug}`}>
                  <Card accent="pink">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="pink">{post.category}</Badge>
                      <span className="text-xs text-[var(--color-text-muted)]">· {post.readTime} min read</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 leading-snug group-hover/card:text-white transition-colors">{post.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <motion.span className="text-sm font-medium text-[var(--color-accent-pink)] group-hover/card:translate-x-1 transition-transform inline-flex items-center gap-1"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Read more
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </motion.span>
                    </div>
                  </Card>
                </Link>
              </SlideUp>
            ))}
          </div>

          <motion.div className="text-center mt-14"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/blog">
              <Button variant="outline" accent="pink" size="lg">
                Read All Posts
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <AnimatedLine />

      {/* ===== CTA ===== */}
      <section className="py-36 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SlideUp>
            <motion.div className="liquid-glass-elevated rounded-3xl p-16 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-[0.07]"
                style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-[0.05]"
                style={{ background: 'radial-gradient(circle, #f472b6, transparent)' }}
                animate={{ scale: [1.1, 1, 1.1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #60a5fa30, #a78bfa30, #f472b630, transparent)' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative z-10">
                <motion.h2 className="text-4xl sm:text-5xl font-bold mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Let's <span className="hero-gradient-text">Work Together</span>
                </motion.h2>
                <motion.p className="text-[var(--color-text-muted)] text-lg mb-12 max-w-md mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Have a project in mind? Let's discuss how we can bring your ideas to life.
                </motion.p>
                <motion.div className="flex gap-5 justify-center flex-wrap"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  <Link to="/contact"><Button accent="mixed" size="lg" className="btn-glow-blue">Start a Conversation</Button></Link>
                  <Link to="/about"><Button variant="glass" size="lg">About Me</Button></Link>
                </motion.div>
              </div>
            </motion.div>
          </SlideUp>
        </div>
      </section>
    </div>
    </>
  );
}
