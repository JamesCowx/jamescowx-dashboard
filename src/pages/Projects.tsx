import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { projects } from '@/data/projects';
import SlideUp from '@/components/animations/SlideUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const demoTypeLabels: Record<string, string> = {
  charts: 'Charts', canvas: 'Canvas', chat: 'Chat', terminal: 'Terminal',
  kanban: 'Kanban', codeplayground: 'Playground', quiz: 'Quiz', auth: 'Auth',
  pipeline: 'Pipeline', tracker: 'Tracker', vision: 'Vision', monitor: 'Monitor',
  aitext: 'AI Text', pipelinebuilder: 'Builder', invoice: 'Invoice',
  componentshowcase: 'Components', crypto: 'Crypto', mobilepreview: 'Mobile',
  map: 'Map', scanner: 'Scanner', document: 'Document', blockchain: 'Blockchain',
  iot: 'IoT', codereview: 'Review', minigame: 'Game', dorametrics: 'DORA',
  journal: 'Journal', testresults: 'Tests', voice: 'Voice', gantt: 'Gantt',
  torrent: 'Torrent Client', vault: 'Password Vault',
  cryptomarket: 'Crypto Market', wallet: 'Crypto Wallet',
  codingagent: 'AI Coding Agent', minecraft: 'Minecraft Server', pokemon: 'Pokemon Emulator',
};

const demoIcons: Record<string, string> = {
  charts: '📊', canvas: '🎨', chat: '💬', terminal: '⚡', kanban: '📋',
  codeplayground: '🖥', quiz: '🧠', auth: '🔐', pipeline: '🚀', tracker: '💪',
  vision: '👁', monitor: '📈', aitext: '✍', pipelinebuilder: '🔧', invoice: '💰',
  componentshowcase: '🧩', crypto: '₿', mobilepreview: '📱', map: '🗺', scanner: '🛡',
  document: '📄', blockchain: '🔗', iot: '📡', codereview: '🔍', minigame: '🎮',
  dorametrics: '📉', journal: '📓', testresults: '🧪', voice: '🎙', gantt: '📋',
  torrent: '⬇', vault: '🔐', cryptomarket: '₿', wallet: '💳',
  codingagent: '⌨', minecraft: '⛏', pokemon: '🔴',
};

const techColors: Record<string, string> = {
  React: '#61dafb', TypeScript: '#3178c6', 'Next.js': '#000', Go: '#00add8',
  Python: '#3776ab', Rust: '#dea584', Docker: '#2496ed', Kubernetes: '#326ce5',
  PostgreSQL: '#336791', Redis: '#dc382d', 'Node.js': '#339933', GraphQL: '#e10098',
  TensorFlow: '#ff6f00', PyTorch: '#ee4c2c', Swift: '#f05138', Kotlin: '#7f52ff',
};

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects & Portfolio — James Cowx | Web Developer Canada</title>
        <meta name="description" content="Explore VoidTorrent, CowxPass, CowxCrypto, CowxCode and more projects by James Cowx." />
        <link rel="canonical" href="https://jamescowx.com/projects" />
        <meta property="og:title" content="Projects & Portfolio — James Cowx" />
        <meta property="og:description" content="Explore open source projects by James Cowx." />
        <meta property="og:url" content="https://jamescowx.com/projects" />
      </Helmet>
      <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SlideUp>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.25em]">Portfolio</span>
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-5">
              My <span className="hero-gradient-text">Projects</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
              Interactive demos and live previews of my featured projects.
            </p>
          </div>
        </SlideUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <Card accent="blue" tilt>
                  <div className="h-44 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative"
                    style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.06) 0%, rgba(244,114,182,0.03) 50%, rgba(167,139,250,0.04) 100%)' }}
                  >
                    <motion.span className="text-7xl opacity-[0.06]"
                      animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      {project.category === 'Web Apps' ? '◈' : project.category === 'Desktop Apps' ? '⬡' : '◉'}
                    </motion.span>
                    <div className="flex flex-wrap gap-2 p-4 justify-center z-10">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-black/50 text-[var(--color-text-secondary)]"
                          style={techColors[t] ? { borderLeft: `2px solid ${techColors[t]}` } : {}}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <motion.span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] font-medium border border-green-500/20 backdrop-blur-sm flex items-center gap-1"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      Demo
                    </motion.span>
                  </div>
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    <Badge variant="pink">{project.category}</Badge>
                    {project.tags.slice(0, 2).map((tag) => (<Badge key={tag} variant="blue">{tag}</Badge>))}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover/card:text-white transition-colors">{project.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-3">{project.description}</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04] text-[11px] text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">⚡ {project.tech.length} technologies</span>
                    <motion.span className="flex items-center gap-1 ml-auto"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {demoIcons[project.demoType] || '◈'} {demoTypeLabels[project.demoType] || project.demoType}
                    </motion.span>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
    </>
  );
}
