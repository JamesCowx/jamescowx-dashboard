import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useCountUp } from '@/hooks/useCountUp';
import { useGithubStats } from '@/hooks/useGithubStats';
import { projects } from '@/data/projects';
import { getAllPosts } from '@/lib/blog';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const SITE_URL = 'https://jamescowx.com';
const schema = { '@context': 'https://schema.org', '@graph': [{ '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'James Cowx', url: SITE_URL, sameAs: ['https://github.com/JamesCowx', 'https://linkedin.com/in/jamescowx'], jobTitle: 'Full-Stack Developer', description: 'Full-stack developer and open source builder from Vancouver, Canada.' }, { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'James Cowx', publisher: { '@id': `${SITE_URL}/#person` } }] };

const tech = [
  { n: 'React', i: '⚛', c: '#61dafb' }, { n: 'TypeScript', i: 'TS', c: '#3178c6' },
  { n: 'Next.js', i: 'N', c: '#fff' }, { n: 'Node.js', i: '◉', c: '#339933' },
  { n: 'Python', i: '🐍', c: '#3776ab' }, { n: 'Go', i: 'Go', c: '#00add8' },
  { n: 'Docker', i: '⎈', c: '#2496ed' }, { n: 'Kubernetes', i: '☸', c: '#326ce5' },
  { n: 'PostgreSQL', i: '🐘', c: '#336791' }, { n: 'Redis', i: '⚡', c: '#dc382d' },
  { n: 'GraphQL', i: '◈', c: '#e10098' }, { n: 'AWS', i: '☁', c: '#ff9900' },
];

function MouseGlow() {
  const [p, setP] = useState({ x: -999, y: -999 });
  useEffect(() => { const h = (e: MouseEvent) => setP({ x: e.clientX, y: e.clientY }); window.addEventListener('mousemove', h, { passive: true }); return () => window.removeEventListener('mousemove', h); }, []);
  return <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
    <div className="absolute w-[55vw] max-w-[800px] h-[55vw] max-h-[800px] rounded-full opacity-[0.04]" style={{
      background: 'radial-gradient(circle, #60a5fa 0%, transparent 60%)',
      left: p.x - 400, top: p.y - 400,
      transition: 'left 0.5s cubic-bezier(0.22, 1, 0.36, 1), top 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    }} />
  </div>;
}

function IsometricShapes() {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
    <motion.div className="absolute top-[12%] right-[18%]" animate={{ y: [0, -40, 0], rotate: [0, 12, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="w-20 h-20 border border-[#60a5fa]/[0.08] rounded-lg" style={{ transform: 'rotateX(55deg) rotateZ(45deg)' }} />
    </motion.div>
    <motion.div className="absolute top-[45%] right-[10%]" animate={{ y: [0, -30, 0], rotate: [0, -8, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
      <div className="w-14 h-14 border border-[#f472b6]/[0.07] rounded-lg" style={{ transform: 'rotateX(55deg) rotateZ(45deg)' }} />
    </motion.div>
    <motion.div className="absolute top-[30%] right-[30%]" animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
      <div className="w-10 h-10 border border-[#a78bfa]/[0.07] rounded-lg" style={{ transform: 'rotateX(55deg) rotateZ(45deg)' }} />
    </motion.div>
    <motion.div className="absolute top-[70%] right-[25%]" animate={{ y: [0, -35, 0], rotate: [0, -10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}>
      <div className="w-16 h-16 border border-[#34d399]/[0.06] rounded-lg" style={{ transform: 'rotateX(55deg) rotateZ(45deg)' }} />
    </motion.div>
  </div>;
}

function Particles() {
  const items = Array.from({ length: 25 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, s: Math.random() * 2 + 0.5, d: Math.random() * 12 + 5, del: Math.random() * 6, o: Math.random() * 0.25 + 0.05 }));
  return <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {items.map(p => <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: p.id % 5 === 0 ? '#60a5fa' : p.id % 5 === 1 ? '#a78bfa' : p.id % 5 === 2 ? '#f472b6' : p.id % 5 === 3 ? '#34d399' : '#fbbf24' }}
      animate={{ opacity: [p.o, p.o * 4, p.o], scale: [1, 3, 1], y: [0, -70, 0] }} transition={{ duration: p.d, repeat: Infinity, delay: p.del, ease: 'easeInOut' }} />)}
  </div>;
}

function StatCard({ label, value, color, icon }: { label: string; value: string | number; color: string; icon: string }) {
  return (
    <motion.div className="relative p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] text-center overflow-hidden group living-border"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      whileHover={{ y: -8, borderColor: color + '50', scale: 1.04 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(200px circle at 50% 50%, ${color}08, transparent)` }} />
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
      <span className="text-2xl opacity-40 mb-3 block relative z-10">{icon}</span>
      <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 relative z-10">{value}</div>
      <div className="text-xs text-[var(--color-text-muted)] font-medium relative z-10">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const typedText = useTypewriter(['Full-Stack Developer', 'Open Source Builder', 'DevOps Engineer', 'UI Designer', 'Creator']);
  const { repos: ghRepos, followers: ghFollowers } = useGithubStats('JamesCowx');
  const projectCount = useCountUp(projects.length);
  const allPosts = useMemo(() => getAllPosts(), []);
  const postCount = useCountUp(allPosts.length);
  const latestPosts = allPosts.slice(0, 2);

  return (<>
    <Helmet>
      <title>James Cowx — Full-Stack Developer | Vancouver, Canada</title>
      <meta name="description" content="James Cowx is a full-stack developer from Vancouver, Canada. 17+ open source projects. React, TypeScript, Node.js, cloud infrastructure." />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:title" content="James Cowx — Full-Stack Developer" />
      <meta property="og:description" content="Full-stack developer from Vancouver. 17+ open source projects." />
      <meta property="og:url" content={SITE_URL} /><meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="James Cowx — Full-Stack Developer" />
      <meta name="twitter:description" content="Full-stack developer from Vancouver, Canada." />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>

    <MouseGlow />

    {/* ═══════ HERO ═══════ */}
    <section className="relative min-h-screen flex items-center px-4 sm:px-8 overflow-hidden">
      <Particles />
      <IsometricShapes />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 65%)' }} />
        <div className="absolute bottom-[5%] right-[-5%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #f472b6, transparent 65%)' }} />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-center">
          <motion.div className="lg:col-span-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            
            <motion.div className="flex items-center gap-3 mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium bg-white/[0.04] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[var(--color-text-secondary)]">Open to opportunities</span>
              </span>
              <span className="text-[12px] text-[var(--color-text-muted)]">📍 Vancouver, Canada</span>
            </motion.div>

            <motion.h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold leading-[0.9] mb-6 tracking-[-0.05em]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}>
              <span className="text-white/70 block">Full-stack</span>
              <span className="hero-gradient-text block">developer.</span>
            </motion.h1>

            <motion.div className="text-xl sm:text-2xl text-[var(--color-text-muted)] mb-5 h-9 font-medium"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <span>{typedText}</span>
              <span className="inline-block w-[2px] h-5 bg-[var(--color-accent-blue)] ml-1 align-middle rounded-full animate-pulse" />
            </motion.div>

            <motion.p className="text-[var(--color-text-muted)] max-w-lg leading-relaxed mb-12"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
              I build open source tools and ship production-grade software.
              Active across {projects.length}+ repos on GitHub. Self-taught. Based in Canada.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
              <Link to="/projects"><Button accent="blue" size="lg">View projects</Button></Link>
              <Link to="/contact"><Button variant="glass" size="lg">Get in touch</Button></Link>
              <a href="https://github.com/JamesCowx" target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors ml-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.98.1-.76.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.46-2.38 1.22-3.22-.12-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.22a11.3 11.3 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22.66 1.64.24 2.86.12 3.16.76.84 1.22 1.9 1.22 3.22 0 4.6-2.8 5.62-5.48 5.92.44.38.82 1.12.82 2.26v3.36c0 .32.22.7.84.58A12 12 0 0 0 12 0"/></svg>
                {ghRepos} repos · {ghFollowers} followers
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="relative">
              <motion.div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full p-[3px] hero-ring"
                animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                <div className="w-full h-full rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center">
                  <motion.span className="text-[8rem] sm:text-[9rem] font-black hero-gradient-text select-none"
                    animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>JC</motion.span>
                </div>
              </motion.div>
              <motion.div className="absolute -bottom-4 -right-4 px-5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-[13px] font-bold text-white backdrop-blur-2xl shadow-2xl"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>{projectCount}+ projects</motion.div>
              <motion.div className="absolute -top-4 -left-6 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] font-semibold text-[#60a5fa] backdrop-blur-2xl shadow-xl"
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>Open Source</motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.3em] font-semibold">Explore</span>
        <div className="w-5 h-8 rounded-full border border-white/[0.08] flex justify-center pt-1.5">
          <motion.div className="w-1 h-2 rounded-full bg-[var(--color-accent-blue)]"
            animate={{ y: [0, 7, 0], opacity: [1, 0.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </motion.div>
    </section>

    {/* ═══════ TECH ═══════ */}
    <section className="py-24 px-4 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto">
        <motion.div className="flex flex-wrap items-center justify-center gap-2 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}>
          {tech.map(t => (
            <motion.span key={t.n} variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              whileHover={{ scale: 1.12, borderColor: t.c + '60', y: -6, boxShadow: `0 8px 25px ${t.c}10` }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[12px] font-mono font-medium text-[var(--color-text-muted)] transition-all cursor-default">
              <motion.span className="text-[14px]" style={{ color: t.c }} animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 3 }}>{t.i}</motion.span> {t.n}
            </motion.span>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <StatCard label="Projects Built" value={projectCount} color="#60a5fa" icon="⚙" />
          <StatCard label="Blog Posts" value={postCount} color="#f472b6" icon="✎" />
          <StatCard label="Years Exp." value={8} color="#a78bfa" icon="⚡" />
          <StatCard label="Open Source" value="17+" color="#34d399" icon="⌨" />
        </div>
      </div>
    </section>

    {/* ═══════ BLOG ═══════ */}
    <section className="py-28 px-4 border-t border-white/[0.03]">
      <div className="max-w-4xl mx-auto">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[11px] text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.25em]">Writing</span>
          <h2 className="text-4xl sm:text-6xl font-bold mt-3 mb-4">Latest <span className="gradient-text-pink">Posts</span></h2>
          <p className="text-[var(--color-text-muted)] text-lg">Deep dives, tutorials, and stories from the trenches.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {latestPosts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/blog/${post.slug}`}>
                <Card accent="pink">
                  <div className="flex items-center gap-2 mb-4"><Badge variant="pink">{post.category}</Badge><span className="text-xs text-[var(--color-text-muted)]">{post.readTime} min</span></div>
                  <h3 className="text-lg font-semibold mb-2 group-hover/card:text-white transition-colors">{post.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span className="text-[var(--color-accent-pink)] group-hover/card:translate-x-1 transition-transform">Read →</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-14" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link to="/blog"><Button variant="outline" accent="pink" size="lg">All posts →</Button></Link>
        </motion.div>
      </div>
    </section>

    {/* ═══════ CTA ═══════ */}
    <section className="py-40 px-4 border-t border-white/[0.03]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2 className="text-4xl sm:text-6xl font-bold mb-5" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Let's <span className="hero-gradient-text">build something</span></motion.h2>
        <motion.p className="text-[var(--color-text-muted)] text-lg mb-12 max-w-md mx-auto leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>Have a project in mind? I'm currently taking on select freelance work and collaborations.</motion.p>
        <motion.div className="flex gap-4 justify-center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <Link to="/contact"><Button accent="mixed" size="lg">Start a conversation</Button></Link>
          <Link to="/about"><Button variant="glass" size="lg">More about me</Button></Link>
        </motion.div>
      </div>
    </section>
  </>);
}
