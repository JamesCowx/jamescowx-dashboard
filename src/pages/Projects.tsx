import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { projects, categories } from '@/data/projects';
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
};

const allDemoTypes = ['All', ...Object.keys(demoTypeLabels)];

const demoIcons: Record<string, string> = {
  charts: '📊', canvas: '🎨', chat: '💬', terminal: '⚡', kanban: '📋',
  codeplayground: '🖥', quiz: '🧠', auth: '🔐', pipeline: '🚀', tracker: '💪',
  vision: '👁', monitor: '📈', aitext: '✍', pipelinebuilder: '🔧', invoice: '💰',
  componentshowcase: '🧩', crypto: '₿', mobilepreview: '📱', map: '🗺', scanner: '🛡',
  document: '📄', blockchain: '🔗', iot: '📡', codereview: '🔍', minigame: '🎮',
  dorametrics: '📉', journal: '📓', testresults: '🧪', voice: '🎙', gantt: '📋',
};

const techColors: Record<string, string> = {
  React: '#61dafb', TypeScript: '#3178c6', 'Next.js': '#000', Go: '#00add8',
  Python: '#3776ab', Rust: '#dea584', Docker: '#2496ed', Kubernetes: '#326ce5',
  PostgreSQL: '#336791', Redis: '#dc382d', 'Node.js': '#339933', GraphQL: '#e10098',
  TensorFlow: '#ff6f00', PyTorch: '#ee4c2c', Swift: '#f05138', Kotlin: '#7f52ff',
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDemo, setActiveDemo] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchDemo = activeDemo === 'All' || p.demoType === activeDemo;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCategory && matchDemo && matchSearch;
    });
  }, [activeCategory, activeDemo, search]);

  return (
    <>
      <Helmet>
        <title>Projects & Portfolio — James Cowx | Web Developer Canada</title>
        <meta name="description" content="Explore 30 interactive project demos by James Cowx. Full-stack web applications, AI tools, developer tools, and more built with React, TypeScript, Node.js, and cloud technologies." />
        <link rel="canonical" href="https://jamescowx.com/projects" />
        <meta property="og:title" content="Projects & Portfolio — James Cowx" />
        <meta property="og:description" content="30 interactive project demos showcasing full-stack development, AI, DevOps, and more." />
        <meta property="og:url" content="https://jamescowx.com/projects" />
      </Helmet>
      <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SlideUp>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Portfolio</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              My <span className="gradient-text-blue">Projects</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
              A collection of 30 projects with interactive demos. Each project includes a live preview.
            </p>
          </div>
        </SlideUp>

        <SlideUp delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-xl pl-10 pr-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all duration-300 focus:border-[var(--color-accent-blue)] focus:ring-1 focus:ring-[var(--color-accent-blue)]/50 text-sm"
              />
            </div>
          </div>
        </SlideUp>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-[11px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Category</span>
          {categories.map((cat) => (
            <SlideUp key={cat} delay={0.1}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[var(--color-accent-blue)] text-white shadow-[0_2px_8px_rgba(96,165,250,0.2)]'
                    : 'bg-white/[0.02] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-white/[0.04] hover:border-[var(--color-accent-blue)]/40'
                }`}
              >
                {cat}
              </button>
            </SlideUp>
          ))}
        </div>

        <SlideUp delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="text-[11px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider self-center mr-1">Demo</span>
            <div className="flex flex-wrap gap-1.5">
              {allDemoTypes.map((dt) => (
                <button
                  key={dt}
                  onClick={() => setActiveDemo(dt)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200 cursor-pointer ${
                    activeDemo === dt
                      ? 'bg-[var(--color-accent-pink)] text-white shadow-[0_2px_8px_rgba(244,114,182,0.2)]'
                      : 'bg-white/[0.02] text-[var(--color-text-secondary)] hover:text-white border border-white/[0.03] hover:border-[var(--color-accent-pink)]/30'
                  }`}
                >
                  {dt === 'All' ? 'All Types' : `${demoIcons[dt] || '◈'} ${demoTypeLabels[dt] || dt}`}
                </button>
              ))}
            </div>
          </div>
        </SlideUp>

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-[var(--color-text-muted)]">
            Showing <span className="text-[var(--color-accent-blue)] font-semibold">{filtered.length}</span> of <span className="text-white font-semibold">{projects.length}</span> projects
          </span>
          {(activeCategory !== 'All' || activeDemo !== 'All' || search) && (
            <button
              onClick={() => { setActiveCategory('All'); setActiveDemo('All'); setSearch(''); }}
              className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              Clear filters <span className="text-sm">✕</span>
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + activeDemo + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <span className="text-5xl block mb-4 opacity-30">◈</span>
                <p className="text-[var(--color-text-muted)] text-lg">No projects found matching your criteria.</p>
                <button onClick={() => { setActiveCategory('All'); setActiveDemo('All'); setSearch(''); }} className="mt-4 text-sm text-[var(--color-accent-blue)] hover:underline cursor-pointer">
                  Clear all filters
                </button>
              </div>
            ) : (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
                {filtered.map((project) => (
                  <StaggerItem key={project.id}>
                    <Link to={`/projects/${project.id}`}>
                      <Card accent="blue">
                        <div className="h-40 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative"
                          style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(244,114,182,0.04) 50%, rgba(167,139,250,0.06) 100%)' }}
                        >
                          <div className="flex flex-wrap gap-2 p-4 justify-center z-10">
                            {project.tech.slice(0, 4).map((t) => (
                              <span key={t}
                                className="text-[10px] px-2 py-1 rounded-md bg-black/50 text-[var(--color-text-secondary)]"
                                style={techColors[t] ? { borderLeft: `2px solid ${techColors[t]}` } : {}}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-green-500/15 text-green-400 text-[10px] font-medium border border-green-500/20 backdrop-blur-sm flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                            Demo
                          </span>
                        </div>
                        <div className="flex gap-1.5 mb-3 flex-wrap">
                          <Badge variant="pink">{project.category}</Badge>
                          {project.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="blue">{tag}</Badge>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover/card:text-white transition-colors">{project.title}</h3>
                        <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-3">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04] text-[11px] text-[var(--color-text-muted)]">
                          <span className="flex items-center gap-1">⚡ {project.tech.length} technologies</span>
                          <span className="flex items-center gap-1 ml-auto">{demoIcons[project.demoType] || '◈'} {demoTypeLabels[project.demoType] || project.demoType}</span>
                        </div>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
