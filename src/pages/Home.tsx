import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useCountUp } from '@/hooks/useCountUp';
import { useGithubStats } from '@/hooks/useGithubStats';
import { projects } from '@/data/projects';
import { getAllPosts } from '@/lib/blog';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const SITE_URL = 'https://jamescowx.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'James Cowx', url: SITE_URL, sameAs: ['https://github.com/JamesCowx', 'https://linkedin.com/in/jamescowx', 'https://bsky.app/profile/jamescowx.bsky.social', 'https://jamescowx.github.io/'], jobTitle: 'Full-Stack Developer', description: 'Full-stack web developer and open source enthusiast based in Canada. Specializing in React, TypeScript, Node.js, and cloud infrastructure.' },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'James Cowx — Full-Stack Developer', description: 'Portfolio and blog of James Cowx, a full-stack developer and open source enthusiast based in Canada.', publisher: { '@id': `${SITE_URL}/#person` } },
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
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => { const on = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY }); window.addEventListener('mousemove', on, { passive: true }); return () => window.removeEventListener('mousemove', on); }, []);
  return <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"><div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 55%)', left: pos.x - 250, top: pos.y - 250, transition: 'left 0.3s ease-out, top 0.3s ease-out' }} /></div>;
}

function HeroParticles() {
  const items = Array.from({ length: 20 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, s: Math.random() * 1.5 + 0.5, d: Math.random() * 8 + 5, delay: Math.random() * 5, o: Math.random() * 0.25 + 0.03 }));
  return <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">{items.map(p => <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: p.id % 4 === 0 ? '#60a5fa' : p.id % 4 === 1 ? '#a78bfa' : p.id % 4 === 2 ? '#f472b6' : '#34d399' }} animate={{ opacity: [p.o, p.o * 3, p.o], scale: [1, 2.5, 1], y: [0, -40, 0] }} transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }} />)}</div>;
}

export default function Home() {
  const typedText = useTypewriter(['Full-Stack Developer', 'Open Source Enthusiast', 'DevOps Engineer', 'UI Designer', 'Builder']);
  const { repos: ghRepos, followers: ghFollowers } = useGithubStats('JamesCowx');
  const projectCount = useCountUp(projects.length);
  const postCount = useCountUp(getAllPosts().length);
  const featured = projects.filter(p => p.featured).slice(0, 6);
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <>
      <Helmet>
        <title>James Cowx — Full-Stack Developer | Vancouver, Canada</title>
        <meta name="description" content="James Cowx is a full-stack developer from Vancouver, Canada. Building open source tools, web apps, and cloud infrastructure. React, TypeScript, Node.js." />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content="James Cowx — Full-Stack Developer" />
        <meta property="og:description" content="Full-stack developer from Vancouver, Canada. Open source builder." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="James Cowx — Full-Stack Developer" />
        <meta name="twitter:description" content="Full-stack developer from Vancouver, Canada." />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-8 overflow-hidden">
        <MouseSpotlight />
        <HeroParticles />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 65%)' }} />
          <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #f472b6, transparent 65%)' }} />
        </div>
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div className="flex items-center gap-3 mb-8" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.03] border border-white/[0.06]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[var(--color-text-secondary)]">Available for work</span>
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)] font-medium">📍 Vancouver, CA</span>
              </motion.div>

              <motion.h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold leading-[0.94] mb-6 tracking-[-0.04em]" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <span className="text-white/80 block">Hey,</span>
                <span className="hero-gradient-text">I'm James</span>
              </motion.h1>

              <motion.div className="text-xl sm:text-2xl md:text-3xl text-[var(--color-text-muted)] mb-6 h-9 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <span>{typedText}</span>
                <span className="inline-block w-[2px] h-6 bg-[var(--color-accent-blue)] ml-1 align-middle rounded-full animate-pulse" />
              </motion.div>

              <motion.p className="text-[var(--color-text-muted)] max-w-md text-base leading-relaxed mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                I ship open source tools and build production infrastructure.
                Currently hacking on 17+ projects across web, desktop, and cloud.
              </motion.p>

              <motion.div className="flex flex-wrap items-center gap-4 mb-14" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Link to="/projects"><Button accent="blue" size="lg">See my work →</Button></Link>
                <Link to="/contact"><Button variant="glass" size="lg">Get in touch</Button></Link>
                <a href="https://github.com/JamesCowx" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors ml-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.98.1-.76.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.46-2.38 1.22-3.22-.12-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.22a11.3 11.3 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22.66 1.64.24 2.86.12 3.16.76.84 1.22 1.9 1.22 3.22 0 4.6-2.8 5.62-5.48 5.92.44.38.82 1.12.82 2.26v3.36c0 .32.22.7.84.58A12 12 0 0 0 12 0"/></svg>
                  {ghRepos} repos · {ghFollowers} followers
                </a>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-2 flex justify-center lg:justify-end" initial={{ opacity: 0, scale: 0.8, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[3px] hero-ring">
                  <div className="w-full h-full rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center">
                    <span className="text-[7rem] sm:text-[8rem] font-extrabold hero-gradient-text">JC</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] font-semibold text-[var(--color-text-secondary)] backdrop-blur-xl">
                  {projectCount} projects shipped
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TECH + STATS */}
      <section className="py-20 px-4 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            {techStack.map((t, i) => (
              <motion.span key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.08, borderColor: t.color + '50', y: -4 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[12px] font-mono font-medium text-[var(--color-text-muted)] transition-all cursor-default">
                <span className="text-[14px]" style={{ color: t.color }}>{t.icon}</span> {t.name}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{ label: 'Projects Built', value: projectCount, color: '#60a5fa', icon: '⚙' }, { label: 'Blog Posts', value: postCount, color: '#f472b6', icon: '✎' }, { label: 'Years Exp.', value: 8, color: '#a78bfa', icon: '⚡' }, { label: 'Open Source', value: '17+', color: '#34d399', icon: '⌨' }].map((s, i) => (
              <motion.div key={s.label} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] group hover:border-white/[0.08] transition-all" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
                <div className="text-2xl mb-2 opacity-40">{s.icon}</div>
                <div className="text-3xl sm:text-4xl font-extrabold mb-1 text-white">{typeof s.value === 'number' ? s.value : s.value}</div>
                <div className="text-xs text-[var(--color-text-muted)] font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 px-4 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Recent work</span>
            <h2 className="text-3xl sm:text-5xl font-bold mt-3 mb-4">Featured <span className="gradient-text-blue">Projects</span></h2>
            <div className="h-px w-16 bg-gradient-to-r from-[var(--color-accent-blue)] to-transparent mt-2" />
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" staggerDelay={0.08}>
            {featured.map(p => (
              <StaggerItem key={p.id}>
                <Link to={`/projects/${p.id}`}>
                  <Card accent="blue" tilt>
                    <div className="h-44 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.id % 3 === 0 ? 'rgba(96,165,250,0.1)' : p.id % 3 === 1 ? 'rgba(244,114,182,0.07)' : 'rgba(167,139,250,0.08)'} 0%, rgba(255,255,255,0.01) 50%, ${p.id % 3 === 0 ? 'rgba(244,114,182,0.05)' : p.id % 3 === 1 ? 'rgba(96,165,250,0.06)' : 'rgba(244,114,182,0.04)'} 100%)` }}>
                      <div className="flex flex-wrap gap-1.5 p-4 justify-center z-10">
                        {p.tech.slice(0, 4).map(t => <span key={t} className="text-[10px] px-2.5 py-1 rounded-md bg-black/40 text-[var(--color-text-muted)] border border-white/[0.04]">{t}</span>)}
                      </div>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20">Demo</span>
                    </div>
                    <div className="flex gap-2 mb-3">{p.tags.slice(0, 2).map(t => <Badge key={t} variant="blue">{t}</Badge>)}</div>
                    <h3 className="text-lg font-semibold mb-2 group-hover/card:text-white transition-colors">{p.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">{p.description}</p>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-12">
            <Link to="/projects"><Button variant="outline" accent="blue" size="lg">Browse all {projects.length} projects →</Button></Link>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-24 px-4 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="text-[11px] text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.2em]">Writing</span>
            <h2 className="text-3xl sm:text-5xl font-bold mt-3 mb-4">Latest <span className="gradient-text-pink">Posts</span></h2>
            <div className="h-px w-16 bg-gradient-to-r from-[var(--color-accent-pink)] to-transparent mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {latestPosts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/blog/${post.slug}`}>
                  <Card accent="pink">
                    <div className="flex items-center gap-2 mb-4"><Badge variant="pink">{post.category}</Badge><span className="text-xs text-[var(--color-text-muted)]">{post.readTime} min</span></div>
                    <h3 className="text-lg font-semibold mb-2 group-hover/card:text-white transition-colors">{post.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                      <span>{new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <span className="text-[var(--color-accent-pink)] group-hover/card:translate-x-1 transition-transform">Read →</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10"><Link to="/blog"><Button variant="outline" accent="pink" size="lg">All posts →</Button></Link></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-5">Let's <span className="hero-gradient-text">build something</span></h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-10 max-w-md mx-auto leading-relaxed">Have a project you want to get off the ground? I'm currently taking on select freelance work.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact"><Button accent="mixed" size="lg">Start a conversation</Button></Link>
            <Link to="/about"><Button variant="glass" size="lg">More about me</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
