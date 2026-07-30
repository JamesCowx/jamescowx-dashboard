import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { projects } from '@/data/projects';
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

export default function Projects() {
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
      <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Portfolio</span>
          <h1 className="text-4xl sm:text-6xl font-bold mt-3 mb-4">
            My <span className="hero-gradient-text">Projects</span>
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-lg text-lg">{projects.length} open source projects with interactive demos and live previews.</p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
          {projects.map((p, i) => (
            <StaggerItem key={p.id}>
              <Link to={`/projects/${p.id}`}>
                <Card accent={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'pink' : 'none'} tilt>
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
                    <span className="ml-auto">{demoIcons[p.demoType] || '◈'} {demoLabels[p.demoType] || p.demoType}</span>
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
