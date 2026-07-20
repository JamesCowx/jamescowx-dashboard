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

function HeroParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.3 + 0.05,
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
            opacity: [p.opacity, p.opacity * 2, p.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function HeroGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #f472b6, transparent 70%)' }}
        animate={{ scale: [1.05, 1, 1.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[30%] right-[15%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
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

  const { repos: ghRepos, followers: ghFollowers, stars: ghStars } = useGithubStats('JamesCowx');
  const projectCount = useCountUp(projects.length);
  const postCount = useCountUp(getAllPosts().length);
  const starCount = useCountUp(ghStars || 0);
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
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium liquid-glass"
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[var(--color-text-secondary)]">Available for new projects</span>
                </motion.span>
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.02] border border-white/[0.04] text-[var(--color-text-muted)]">
                  Canada
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.04] mb-6 tracking-tight"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-white">Hi, I'm</span>
                <br />
                <span className="hero-gradient-text">James Cowx</span>
              </motion.h1>

              <motion.div
                className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] mb-4 h-9 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span>{typedText}</span>
                <motion.span
                  className="inline-block w-[2px] h-5 bg-[var(--color-accent-blue)] ml-0.5 align-middle rounded-full"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>

              <motion.p
                className="text-[var(--color-text-muted)] max-w-lg text-base leading-relaxed mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                I build exceptional digital experiences with modern technologies.
                Passionate about clean code, scalable architecture, and open source.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-12"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
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

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <a href="https://jamescowx.github.io/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group">
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-[10px] font-bold group-hover:bg-white/[0.08] transition-colors">GH</span>
                  <div>
                    <span className="block font-medium">{ghRepos}+ repos</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{ghStars ?? 0} stars</span>
                  </div>
                </a>
                <a href="https://linkedin.com/in/jamescowx" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group">
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-[10px] font-bold group-hover:bg-white/[0.08] transition-colors">LI</span>
                  <div>
                    <span className="block font-medium">{ghFollowers}+ followers</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">Connect</span>
                  </div>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <motion.div
                  className="w-60 h-60 sm:w-72 sm:h-72 rounded-full p-[3px] hero-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center">
                    <motion.span
                      className="text-8xl font-extrabold hero-gradient-text"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      JC
                    </motion.span>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -bottom-3 -right-3 px-4 py-2.5 rounded-2xl liquid-glass text-[11px] font-medium shadow-lg"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#34d399]/15 flex items-center justify-center text-[10px]">⎈</span>
                    <span className="text-[var(--color-text-secondary)]">{yearCount}+ yrs</span>
                    <span className="w-px h-3 bg-white/[0.1]" />
                    <span className="text-[#fbbf24]">★ {starCount}</span>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-2 -left-4 px-3 py-1.5 rounded-xl liquid-glass text-[10px] font-medium"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-[#60a5fa]">Open Source</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.005] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SlideUp>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
                <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Tech Stack</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
              </div>
              <p className="text-[var(--color-text-muted)] text-sm">Technologies I work with daily</p>
            </div>
          </SlideUp>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {techStack.map((t, i) => (
              <motion.span
                key={t.name}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.06, borderColor: t.color + '50', y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[12px] font-mono font-medium text-[var(--color-text-muted)] transition-all"
              >
                <span className="text-[14px]" style={{ color: t.color }}>{t.icon}</span>
                {t.name}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Projects Built', value: projectCount, suffix: '+', color: '#60a5fa', icon: '◈' },
              { label: 'GitHub Stars', value: starCount, suffix: '', color: '#fbbf24', icon: '★' },
              { label: 'Blog Posts', value: postCount, suffix: '+', color: '#f472b6', icon: '✎' },
              { label: 'Years Experience', value: yearCount, suffix: '+', color: '#a78bfa', icon: '⚡' },
            ].map(({ label, value, suffix, color, icon }) => (
              <SlideUp key={label}>
                <motion.div
                  className="liquid-glass rounded-2xl p-5 text-center border border-white/[0.04] relative overflow-hidden group"
                  whileHover={{ scale: 1.03, borderColor: color + '30' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(200px circle at 50% 50%, ${color}08, transparent)` }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-1.5 mb-3">
                      <span className="text-xl opacity-50" style={{ color }}>{icon}</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold mb-1" style={{ color }}>
                      {value}{suffix}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] font-medium">{label}</div>
                  </div>
                </motion.div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
                <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Portfolio</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Featured <span className="gradient-text-blue">Projects</span>
              </h2>
              <p className="text-[var(--color-text-muted)] max-w-lg mx-auto text-lg">
                A selection of my best work across different domains.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" staggerDelay={0.1}>
            {featured.map((project) => (
              <StaggerItem key={project.id}>
                <Link to={`/projects/${project.id}`}>
                  <Card accent="blue">
                    <div className="h-44 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(244,114,182,0.04) 50%, rgba(167,139,250,0.06) 100%)' }}
                    >
                      <motion.span className="text-6xl opacity-15" animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                        {project.category === 'Web Apps' ? '◈' : project.category === 'Mobile' ? '◉' : project.category === 'AI/ML' ? '◬' : '⬡'}
                      </motion.span>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-green-500/15 text-green-400 border border-green-500/20 backdrop-blur-sm">
                        Interactive
                      </span>
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
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">⚡ {project.tech.length} tech</span>
                      <span className="flex items-center gap-1 ml-auto">View demo →</span>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 10 }}
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

      {/* ===== BLOG ===== */}
      <section className="py-24 px-4 bg-white/[0.005]">
        <div className="max-w-4xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-accent-pink)]" />
                <span className="text-[11px] text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.2em]">Insights</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-accent-pink)]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Latest <span className="gradient-text-pink">Blog Posts</span>
              </h2>
              <p className="text-[var(--color-text-muted)]">Tutorials, tips, and thoughts on technology.</p>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      <span className="text-sm font-medium text-[var(--color-accent-pink)] group-hover/card:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read more
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </Card>
                </Link>
              </SlideUp>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 10 }}
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

      {/* ===== CTA ===== */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SlideUp>
            <motion.div
              className="liquid-glass-elevated rounded-3xl p-14 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-[0.08]"
                style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, #f472b6, transparent)' }}
                animate={{ scale: [1.1, 1, 1.1] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Let's <span className="hero-gradient-text">Work Together</span>
                </h2>
                <p className="text-[var(--color-text-muted)] text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  Have a project in mind? Let's discuss how we can bring your ideas to life.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/contact"><Button accent="mixed" size="lg" className="btn-glow-blue">Start a Conversation</Button></Link>
                  <Link to="/about"><Button variant="glass" size="lg">About Me</Button></Link>
                </div>
              </div>
            </motion.div>
          </SlideUp>
        </div>
      </section>
    </div>
    </>
  );
}
