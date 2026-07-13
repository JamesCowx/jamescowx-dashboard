import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { DemoComponent } from '@/components/demos';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-4 opacity-30">◈</span>
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-[var(--color-text-muted)] mb-6">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="text-[var(--color-accent-blue)] hover:underline">← Back to projects</Link>
        </div>
      </div>
    );
  }

  const prev = projects.find((p) => p.id === project.id - 1);
  const next = projects.find((p) => p.id === project.id + 1);

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-green-400 font-medium uppercase tracking-wider">Interactive Demo</span>
              <span className="text-[11px] text-[var(--color-text-muted)]">· {project.category}</span>
            </div>
            <DemoComponent demoType={project.demoType} />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="pink">{project.category}</Badge>
            {project.tags.map((tag) => (
              <Badge key={tag} variant="blue">{tag}</Badge>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 gradient-text-mixed">
            {project.title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            {project.longDescription}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <SlideUp>
            <GlassPanel>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[var(--color-accent-blue)]/10 flex items-center justify-center text-[10px]">⚡</span>
                <span className="gradient-text-blue">Tech Stack</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-accent-blue)]/40 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </SlideUp>

          <SlideUp delay={0.15}>
            <GlassPanel>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[var(--color-accent-pink)]/10 flex items-center justify-center text-[10px]">🔗</span>
                <span className="gradient-text-pink">Links</span>
              </h2>
              <div className="flex flex-wrap gap-4">
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" accent="pink">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.98.1-.76.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.46-2.38 1.22-3.22-.12-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.22a11.3 11.3 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22.66 1.64.24 2.86.12 3.16.76.84 1.22 1.9 1.22 3.22 0 4.6-2.8 5.62-5.48 5.92.44.38.82 1.12.82 2.26v3.36c0 .32.22.7.84.58A12 12 0 0 0 12 0"/></svg>
                    Source Code
                  </Button>
                </a>
              </div>
            </GlassPanel>
          </SlideUp>
        </div>

        {project.id > 1 || project.id < projects.length ? (
          <SlideUp>
            <div className="flex items-center justify-between pt-8 border-t border-[var(--color-border-subtle)]">
              {prev ? (
                <Link to={`/projects/${prev.id}`}>
                  <Button variant="ghost">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    {prev.title}
                  </Button>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/projects/${next.id}`}>
                  <Button variant="ghost">
                    {next.title}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Button>
                </Link>
              ) : <div />}
            </div>
          </SlideUp>
        ) : null}
      </div>
    </div>
  );
}
