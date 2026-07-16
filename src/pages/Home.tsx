import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const techStack = [
  { name: 'React', icon: '⚛' }, { name: 'TypeScript', icon: 'TS' }, { name: 'Next.js', icon: 'N' },
  { name: 'Node.js', icon: '◉' }, { name: 'Python', icon: '🐍' }, { name: 'Go', icon: 'Go' },
  { name: 'Docker', icon: '⎈' }, { name: 'Kubernetes', icon: '☸' }, { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Redis', icon: '⚡' }, { name: 'GraphQL', icon: '◈' }, { name: 'AWS', icon: '☁' },
];

export default function Home() {
  const typedText = useTypewriter([
    'Full-Stack Developer',
    'Open Source Enthusiast',
    'DevOps Engineer',
    'UI/UX Designer',
    'Tech Blogger',
  ]);

  const { repos: ghRepos, followers: ghFollowers } = useGithubStats('jamescowx');
  const projectCount = useCountUp(30);
  const postCount = useCountUp(getAllPosts().length);
  const starCount = useCountUp(247);
  const yearCount = useCountUp(8);

  const featured = projects.filter((p) => p.featured);
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <div>
      <section className="relative min-h-screen flex items-center px-4">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium liquid-glass">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[var(--color-text-secondary)]">Available for new projects</span>
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.02] border border-white/[0.04] text-[var(--color-text-muted)]">
                  Based in Canada
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] mb-5 tracking-tight">
                <span className="text-white">Hi, I'm</span>
                <br />
                <span className="gradient-text-mixed">James Cowx</span>
              </h1>

              <div className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] mb-3 h-9 font-medium">
                <span>{typedText}</span>
                <span className="inline-block w-[2px] h-5 bg-[var(--color-accent-blue)] ml-0.5 animate-pulse align-middle rounded-full" />
              </div>

              <p className="text-[var(--color-text-muted)] max-w-lg text-base leading-relaxed mb-8">
                I build exceptional digital experiences with modern technologies.
                Passionate about clean code, scalable architecture, and open source.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/projects">
                  <Button accent="blue" size="lg">
                    View Projects
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="glass" size="lg">Get In Touch</Button>
                </Link>

              </div>

              <div className="flex items-center gap-5">
                <a href="https://jamescowx.github.io/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.1] transition-all">
                  <span className="w-6 h-6 rounded-md bg-white/[0.04] flex items-center justify-center text-[10px] font-bold">GH</span>
                  <span>{ghRepos}+ repos</span>
                </a>
                <a href="https://linkedin.com/in/jamescowx" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.1] transition-all">
                  <span className="w-6 h-6 rounded-md bg-white/[0.04] flex items-center justify-center text-[10px] font-bold">LI</span>
                  <span>{ghFollowers}+ followers</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-[#60a5fa] via-[#a78bfa] to-[#f472b6] p-[3px]">
                  <div className="w-full h-full rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center">
                    <span className="text-7xl font-extrabold gradient-text-mixed">JC</span>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl liquid-glass text-[11px] font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#34d399]/15 flex items-center justify-center text-[10px]">⎈</span>
                    <span className="text-[var(--color-text-secondary)]">{yearCount}+ yrs · {starCount} ★</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="text-[11px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider mr-2">Tech Stack</span>
            {techStack.map((t, i) => (
              <motion.span
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono font-medium text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.1] transition-all"
              >
                <span className="text-[13px]">{t.icon}</span>
                {t.name}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Projects Built', value: projectCount, suffix: '+', color: 'text-[#60a5fa]', icon: '◈' },
              { label: 'GitHub Stars', value: starCount, suffix: '+', color: 'text-[#fbbf24]', icon: '★' },
              { label: 'Blog Posts', value: postCount, suffix: '+', color: 'text-[#f472b6]', icon: '✎' },
              { label: 'Years Experience', value: yearCount, suffix: '+', color: 'gradient-text-mixed', icon: '⚡' },
            ].map(({ label, value, suffix, color, icon }) => (
              <SlideUp key={label}>
                <div className="liquid-glass rounded-2xl p-5 text-center border border-white/[0.04]">
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <span className="text-lg opacity-40">{icon}</span>
                  </div>
                  <div className={`text-3xl font-extrabold mb-0.5 ${color}`}>{value}{suffix}</div>
                  <div className="text-xs text-[var(--color-text-muted)] font-medium">{label}</div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white/[0.005]">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
                <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Portfolio</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
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
                      <span className="flex items-center gap-1">View demo →</span>
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
                Browse All 30 Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-pink)]" />
                <span className="text-[11px] text-[var(--color-accent-pink)] font-semibold uppercase tracking-[0.2em]">Insights</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-pink)]" />
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

      <section className="py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <SlideUp>
            <div className="liquid-glass-elevated rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#60a5fa]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f472b6]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Let's <span className="gradient-text-mixed">Work Together</span>
                </h2>
                <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-sm mx-auto leading-relaxed">
                  Have a project in mind? Let's discuss how we can bring your ideas to life.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/contact"><Button accent="mixed" size="lg">Start a Conversation</Button></Link>
                  <Link to="/about"><Button variant="glass" size="lg">About Me</Button></Link>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
