import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import PageHero from '@/components/layout/PageHero';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const demoLabels: Record<string, string> = {
  charts: 'Charts', canvas: 'Canvas', chat: 'Chat', terminal: 'Terminal',
  kanban: 'Kanban', codeplayground: 'Playground', quiz: 'Quiz', auth: 'Auth',
  pipeline: 'Pipeline', tracker: 'Tracker', vision: 'Vision', monitor: 'Monitor',
  aitext: 'AI Text', pipelinebuilder: 'Builder', invoice: 'Invoice',
  componentshowcase: 'Components', crypto: 'Crypto', mobilepreview: 'Mobile',
  map: 'Map', scanner: 'Scanner', document: 'Document', blockchain: 'Blockchain',
  iot: 'IoT', codereview: 'Review', minigame: 'Game', dorametrics: 'DORA',
  journal: 'Journal', testresults: 'Tests', voice: 'Voice', gantt: 'Gantt',
  torrent: 'Torrent', vault: 'Password Vault', cryptomarket: 'Crypto Market',
  wallet: 'Crypto Wallet',   codingagent: 'AI Agent', minecraft: 'Minecraft',
  pokemon: 'Pokemon', contacts: 'Contacts',
  shop: 'Online Store',
};

const demoIcons: Record<string, string> = {
  charts: '📊', canvas: '🎨', chat: '💬', terminal: '⚡', kanban: '📋',
  codeplayground: '🖥', quiz: '🧠', auth: '🔐', pipeline: '🚀', tracker: '💪',
  vision: '👁', monitor: '📈', aitext: '✍', pipelinebuilder: '🔧', invoice: '💰',
  componentshowcase: '🧩', crypto: '₿', mobilepreview: '📱', map: '🗺', scanner: '🛡',
  document: '📄', blockchain: '🔗', iot: '📡', codereview: '🔍', minigame: '🎮',
  dorametrics: '📉', journal: '📓', testresults: '🧪', voice: '🎙', gantt: '📋',
  torrent: '⬇', vault: '🔐', cryptomarket: '₿', wallet: '💳',
  codingagent: '⌨', minecraft: '⛏', pokemon: '🔴', contacts: '👥',
  shop: '🛒',
};

const techColors: Record<string, string> = {
  React: '#61dafb', TypeScript: '#3178c6', 'Next.js': '#fff', Go: '#00add8',
  Python: '#3776ab', Rust: '#dea584', Docker: '#2496ed', Kubernetes: '#326ce5',
  PostgreSQL: '#336791', Redis: '#dc382d', 'Node.js': '#339933', GraphQL: '#e10098',
  TensorFlow: '#ff6f00', PyTorch: '#ee4c2c', Swift: '#f05138', Kotlin: '#7f52ff',
};

const bgAccents = [
  'linear-gradient(135deg, rgba(96,165,250,0.08), rgba(167,139,250,0.04))',
  'linear-gradient(135deg, rgba(244,114,182,0.07), rgba(96,165,250,0.04))',
  'linear-gradient(135deg, rgba(167,139,250,0.08), rgba(244,114,182,0.04))',
  'linear-gradient(135deg, rgba(52,211,153,0.06), rgba(96,165,250,0.05))',
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const demoCount = projects.filter((p) => p.demoType).length;
  const liveCount = projects.filter((p) => p.siteUrl).length;
  const featuredCount = projects.filter((p) => p.featured).length;

  const stats = [
    { value: `${projects.length}`, label: 'Projects', icon: '⚙', color: '#60a5fa' },
    { value: `${demoCount}`, label: 'Interactive demos', icon: '▶', color: '#f472b6' },
    { value: `${liveCount}`, label: 'Live sites', icon: '🌐', color: '#34d399' },
    { value: `${featuredCount}`, label: 'Featured', icon: '★', color: '#a78bfa' },
  ];

  return (
    <>
      <Helmet>
        <title>Projects — James Cowx | Portfolio of 17+ Open Source Apps</title>
        <meta name="description" content="Browse 17+ open source projects by James Cowx. Web apps, desktop tools, Minecraft servers, crypto dashboards, AI agents, and more. Interactive demos and live previews." />
        <link rel="canonical" href="https://jamescowx.com/projects" />
        <meta property="og:title" content="Projects — James Cowx | 17+ Open Source Apps" />
        <meta property="og:description" content="Interactive demos of 17+ open source projects including web apps, desktop tools, AI agents, and games." />
        <meta property="og:url" content="https://jamescowx.com/projects" />
        <meta property="og:type" content="website" />
      </Helmet>

      <PageHero
        eyebrow="Portfolio"
        title={<>My <span className="hero-gradient-text">Projects</span></>}
        subtitle={`${projects.length} open source projects with interactive demos and live previews. Every one is real, shipped, and on GitHub.`}
        watermark="PR"
        accent="blue"
      />

      {/* ═══════ STATS ═══════ */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.07}>
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="liquid-glass rounded-2xl p-5 text-center premium-card group/stats h-full">
                  <div className="absolute inset-0 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(200px circle at 50% 0%, ${s.color}10, transparent)` }} />
                  <motion.span className="inline-block text-xl mb-2 opacity-50" animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>{s.icon}</motion.span>
                  <div className="text-2xl sm:text-3xl font-extrabold gradient-text-mixed">{s.value}</div>
                  <div className="text-xs text-[var(--color-text-muted)] font-medium mt-0.5">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════ GRID ═══════ */}
      <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
          {projects.map((p, i) => (
            <StaggerItem key={p.id}>
              <Link to={`/projects/${p.id}`}>
                <Card accent={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'pink' : 'none'} tilt className="living-border">
                  <div className="h-44 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden" style={{ background: bgAccents[i % bgAccents.length] }}>
                    <div className="flex flex-wrap gap-1.5 p-4 justify-center z-10">
                      {p.tech.slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] px-2.5 py-1 rounded-md bg-black/45 text-[var(--color-text-secondary)] border border-white/[0.04]" style={techColors[t] ? { borderLeftColor: techColors[t], borderLeftWidth: '2px' } : {}}>{t}</span>
                      ))}
                    </div>
                    {p.featured && <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20">★ Featured</span>}
                    {p.siteUrl && <span className="absolute bottom-3 right-3 text-[10px] text-[var(--color-text-muted)]">🌐 live</span>}
                  </div>
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    <Badge variant="pink">{p.category}</Badge>
                    {p.tags.slice(0, 2).map(t => <Badge key={t} variant="blue">{t}</Badge>)}
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover/card:text-white transition-colors">{p.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-3">{p.description}</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04] text-[11px] text-[var(--color-text-muted)]">
                    <span>⚡ {p.tech.length} tech</span>
                    {p.demoType && <span className="ml-auto">{demoIcons[p.demoType] || '◈'} {demoLabels[p.demoType] || p.demoType}</span>}
                  </div>
                </Card>
              </Link>
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
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(600px circle at 50% -20%, rgba(96,165,250,0.1), transparent 60%)' }} />
              <div className="relative z-10">
                <span className="text-3xl mb-4 block">🚀</span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
                  Like what you <span className="hero-gradient-text">see?</span>
                </h2>
                <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                  Every project is open source on GitHub. Want something custom built for you? Let's talk.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="https://github.com/JamesCowx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-[#60a5fa] to-[#f472b6] shadow-[0_8px_32px_rgba(96,165,250,0.3)] hover:shadow-[0_12px_48px_rgba(244,114,182,0.35)] hover:-translate-y-0.5 transition-all duration-300">
                    View on GitHub
                  </a>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl text-[15px] font-semibold text-white bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300">
                    Hire me
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
