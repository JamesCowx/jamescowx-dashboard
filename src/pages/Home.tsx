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

function MouseSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.05), transparent 60%)',
          left: pos.x - 350, top: pos.y - 350,
          transition: 'left 0.25s ease-out, top 0.25s ease-out',
        }}
      />
    </div>
  );
}

function HeroParticles() {
  const items = Array.from({ length: 40 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, duration: Math.random() * 7 + 4,
    delay: Math.random() * 6, opacity: Math.random() * 0.3 + 0.05,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {items.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: p.id % 4 === 0 ? '#60a5fa' : p.id % 4 === 1 ? '#a78bfa' : p.id % 4 === 2 ? '#f472b6' : '#34d399' }}
          animate={{ opacity: [p.opacity, p.opacity * 3, p.opacity], scale: [1, 2, 1], y: [0, -40, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute top-[12%] left-[6%] w-24 h-24 border border-[#60a5fa]/[0.05] rounded-2xl"
        animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -25, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute top-[50%] right-[8%] w-14 h-14 border border-[#f472b6]/[0.05] rounded-full"
        animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute top-[22%] right-[20%] w-12 h-12 border border-[#a78bfa]/[0.05]"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{ rotate: [0, 120, 240, 360], y: [0, -18, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute bottom-[22%] left-[15%] w-16 h-16 border border-[#60a5fa]/[0.04] rounded-xl"
        animate={{ rotate: [0, 45, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute bottom-[35%] right-[30%] w-8 h-8 border border-[#34d399]/[0.04] rounded-full"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function FloatingCode() {
  const snippets = [
    { text: 'const app = createApp()', x: '72%', y: '15%', c: '#60a5fa', d: 0 },
    { text: 'async function build()', x: '76%', y: '50%', c: '#a78bfa', d: 2 },
    { text: 'export default {}', x: '68%', y: '70%', c: '#f472b6', d: 4.5 },
    { text: '<Component />', x: '82%', y: '32%', c: '#34d399', d: 1 },
    { text: 'useEffect(() => {})', x: '70%', y: '60%', c: '#fbbf24', d: 3 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
      {snippets.map((s, i) => (
        <motion.div key={i} className="absolute font-mono text-[12px] px-4 py-2 rounded-lg border"
          style={{ left: s.x, top: s.y, color: s.c + '30', borderColor: s.c + '06', background: s.c + '02' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.45, 0.45, 0], y: [20, 0, -10, -45] }}
          transition={{ duration: 11, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
        >
          {s.text}
        </motion.div>
      ))}
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }}
    >
      <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.3em] font-semibold">Scroll</span>
      <motion.div className="w-5 h-8 rounded-full border border-white/[0.08] flex justify-center pt-1.5"
        animate={{ borderColor: ['rgba(255,255,255,0.08)', 'rgba(96,165,250,0.25)', 'rgba(255,255,255,0.08)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div className="w-1 h-2 rounded-full bg-[var(--color-accent-blue)]"
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
      <motion.div className="absolute inset-y-0 w-1/3"
        style={{ background: 'linear-gradient(90deg, transparent, #60a5fa, #a78bfa, #f472b6, transparent)' }}
        animate={{ x: ['-100%', '450%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3.5 }}
      />
    </div>
  );
}

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
        <div className="mesh-gradient" />
        <HeroParticles />
        <FloatingShapes />
        <FloatingCode />
        <MouseSpotlight />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div className="flex items-center gap-3 mb-10"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium liquid-glass"
                  whileHover={{ scale: 1.03 }}
                  animate={{ boxShadow: ['0 0 0 0 rgba(74,222,128,0)', '0 0 0 5px rgba(74,222,128,0.06)', '0 0 0 0 rgba(74,222,128,0)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[var(--color-text-secondary)]">Available for new projects</span>
                </motion.span>
                <span className="px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.02] border border-white/[0.04] text-[var(--color-text-muted)]">
                  Canada
                </span>
              </motion.div>

              <motion.h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold leading-[0.95] mb-8 tracking-[-0.04em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span className="text-white/85 inline-block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Hi, I'm
                </motion.span>
                <br />
                <motion.span className="hero-gradient-text inline-block"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  James Cowx
                </motion.span>
              </motion.h1>

              <motion.div className="text-xl sm:text-2xl md:text-3xl text-[var(--color-text-secondary)] mb-5 h-10 font-medium"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
              >
                <span>{typedText}</span>
                <motion.span className="inline-block w-[2px] h-6 bg-[var(--color-accent-blue)] ml-1 align-middle rounded-full"
                  animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>

              <motion.p className="text-[var(--color-text-muted)] max-w-lg text-lg leading-relaxed mb-14"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                I build exceptional digital experiences with modern technologies.
                Passionate about clean code, scalable architecture, and open source.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4 mb-16"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
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

              <motion.div className="flex items-center gap-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}
              >
                <motion.a href="https://jamescowx.github.io/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group"
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <span className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-[10px] font-bold group-hover:bg-white/[0.08] transition-colors">GH</span>
                  <div>
                    <span className="block font-medium">{ghRepos}+ repos</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{ghFollowers} followers</span>
                  </div>
                </motion.a>
                <motion.a href="https://linkedin.com/in/jamescowx" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group"
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <span className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-[10px] font-bold group-hover:bg-white/[0.08] transition-colors">LI</span>
                  <div>
                    <span className="block font-medium">{ghFollowers}+ followers</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">Connect</span>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <motion.div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full p-[3px] hero-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center">
                    <motion.span className="text-[7rem] sm:text-[8rem] font-extrabold hero-gradient-text"
                      animate={{ scale: [1, 1.06, 1], rotate: [0, 3, 0, -3, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      JC
                    </motion.span>
                  </div>
                </motion.div>
                <motion.div className="absolute -top-4 -left-6 px-4 py-2 rounded-xl liquid-glass text-[10px] font-semibold shadow-xl"
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  whileHover={{ scale: 1.12, y: -4 }}
                >
                  <span className="text-[#60a5fa]">Open Source</span>
                </motion.div>
                <motion.div className="absolute -bottom-4 -right-6 px-4 py-2 rounded-xl liquid-glass text-[10px] font-semibold shadow-xl"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  whileHover={{ scale: 1.12, y: -4 }}
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
      <section className="py-28 px-4 relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, #60a5fa, transparent)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <SlideUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
                <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.25em]">Tech Stack</span>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
              </div>
              <p className="text-[var(--color-text-muted)] text-sm">Technologies I work with daily</p>
            </div>
          </SlideUp>

          <motion.div className="flex flex-wrap items-center justify-center gap-3 mb-24"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {techStack.map((t) => (
              <motion.span key={t.name}
                variants={{ hidden: { opacity: 0, y: 24, scale: 0.88 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ scale: 1.12, borderColor: t.color + '60', y: -8, boxShadow: `0 10px 40px ${t.color}15` }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[12px] font-mono font-medium text-[var(--color-text-muted)] transition-all cursor-default"
              >
                <motion.span className="text-[16px]" style={{ color: t.color }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: Math.random() * 4 }}
                >
                  {t.icon}
                </motion.span>
                {t.name}
              </motion.span>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { label: 'Projects Built', value: projectCount, suffix: '+', c: '#60a5fa', icon: '◈' },
              { label: 'GitHub Stars', value: 0, suffix: '', c: '#fbbf24', icon: '★' },
              { label: 'Blog Posts', value: postCount, suffix: '+', c: '#f472b6', icon: '✎' },
              { label: 'Years Experience', value: yearCount, suffix: '+', c: '#a78bfa', icon: '⚡' },
            ].map(({ label, value, suffix, c, icon }, i) => (
              <SlideUp key={label} delay={i * 0.1}>
                <motion.div className="liquid-glass rounded-2xl p-7 text-center border border-white/[0.04] relative overflow-hidden group"
                  whileHover={{ scale: 1.07, borderColor: c + '45', y: -8 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(250px circle at 50% 50%, ${c}10, transparent)` }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${c}50, transparent)` }}
                  />
                  <div className="relative z-10">
                    <motion.div className="flex items-center justify-center gap-1.5 mb-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                    >
                      <span className="text-2xl opacity-50" style={{ color: c }}>{icon}</span>
                    </motion.div>
                    <div className="text-4xl sm:text-5xl font-extrabold mb-2" style={{ color: c }}>
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
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
                <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.25em]">Portfolio</span>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold mb-5">
                Featured <span className="gradient-text-blue">Projects</span>
              </h2>
              <p className="text-[var(--color-text-muted)] max-w-lg mx-auto text-lg">
                A selection of my best work across different domains.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {featured.map((project) => (
              <StaggerItem key={project.id}>
                <Link to={`/projects/${project.id}`}>
                  <Card accent="blue" tilt>
                    <div className="h-48 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.06) 0%, rgba(244,114,182,0.03) 50%, rgba(167,139,250,0.04) 100%)' }}
                    >
                      <motion.span className="text-7xl opacity-[0.06]"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        {project.category === 'Web Apps' ? '◈' : project.category === 'Mobile' ? '◉' : '⬡'}
                      </motion.span>
                      <motion.span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20 backdrop-blur-sm"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Interactive
                      </motion.span>
                      <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                        {project.tech.slice(0, 4).map((t) => (
                          <span key={t} className="text-[9px] px-2 py-0.5 rounded-md bg-black/50 text-[var(--color-text-muted)]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {project.tags.slice(0, 2).map((tag) => (<Badge key={tag} variant="blue">{tag}</Badge>))}
                      <Badge variant="mixed">{project.category.slice(0, 3).toUpperCase()}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover/card:text-white transition-colors">{project.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">{project.description}</p>
                    <div className="flex items-center gap-3 mt-5 pt-3 border-t border-white/[0.04] text-[11px] text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">⚡ {project.tech.length} tech</span>
                      <motion.span className="flex items-center gap-1 ml-auto"
                        animate={{ x: [0, 5, 0] }}
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

          <motion.div className="text-center mt-16"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--color-accent-pink)]" />
                <span className="text-[11px] text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.25em]">Insights</span>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--color-accent-pink)]" />
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
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Read more →
                      </motion.span>
                    </div>
                  </Card>
                </Link>
              </SlideUp>
            ))}
          </div>

          <motion.div className="text-center mt-16"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
      <section className="py-40 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SlideUp>
            <motion.div className="liquid-glass-elevated rounded-3xl p-16 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
                animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 12, repeat: Infinity }}
              />
              <motion.div className="absolute bottom-0 left-0 w-[25rem] h-[25rem] rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2 opacity-[0.04]"
                style={{ background: 'radial-gradient(circle, #f472b6, transparent)' }}
                animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #60a5fa30, #a78bfa30, #f472b630, transparent)' }}
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative z-10">
                <motion.h2 className="text-4xl sm:text-5xl font-bold mb-5"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}
                >
                  Let's <span className="hero-gradient-text">Work Together</span>
                </motion.h2>
                <motion.p className="text-[var(--color-text-muted)] text-lg mb-14 max-w-md mx-auto leading-relaxed"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Have a project in mind? Let's discuss how we can bring your ideas to life.
                </motion.p>
                <motion.div className="flex gap-5 justify-center flex-wrap"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}
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
