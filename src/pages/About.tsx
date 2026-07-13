import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import GlassPanel from '@/components/ui/GlassPanel';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 92 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 80 },
  { name: 'Docker / Kubernetes', level: 75 },
  { name: 'PostgreSQL', level: 85 },
  { name: 'AWS / Cloud', level: 78 },
  { name: 'System Design', level: 82 },
];

const achievements = [
  { value: '30', label: 'Projects Shipped', icon: '◈' },
  { value: '8+', label: 'Years Experience', icon: '⚡' },
  { value: '25', label: 'Blog Posts', icon: '✎' },
  { value: '247', label: 'GitHub Stars', icon: '★' },
];

export default function About() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">About</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              About <span className="gradient-text-mixed">Me</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
              A passionate developer with 8+ years of experience building products that make a difference.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {achievements.map((a) => (
            <FadeIn key={a.label}>
              <div className="liquid-glass rounded-2xl p-5 text-center border border-white/[0.04]">
                <div className="text-[10px] mb-2 opacity-30">{a.icon}</div>
                <div className="text-3xl font-extrabold gradient-text-mixed mb-0.5">{a.value}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{a.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <SlideUp>
          <GlassPanel className="mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-pink)] p-[2px] shrink-0">
                <div className="w-full h-full rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center text-3xl font-extrabold">
                  <span className="gradient-text-mixed">JC</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">James Cowx</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20">Full-Stack Developer</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#f472b6]/10 text-[#f472b6] border border-[#f472b6]/20">Open Source</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/20">DevOps</span>
                </div>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                  I'm a full-stack developer and open-source enthusiast based in San Francisco. I specialize in building
                  scalable web applications, designing robust APIs, and creating intuitive user experiences. When I'm not
                  coding, I write technical blog posts and contribute to open-source projects. I believe in clean code,
                  continuous learning, and sharing knowledge with the developer community.
                </p>
              </div>
            </div>
          </GlassPanel>
        </SlideUp>

        <div className="mb-16">
          <div>
            <SlideUp delay={0.1}>
              <h2 className="text-xl font-bold mb-8">
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[var(--color-accent-pink)]/10 flex items-center justify-center text-[10px]">⚡</span>
                  Skills
                </span>
              </h2>
            </SlideUp>

            <div className="space-y-5">
              {skills.map((skill, index) => (
                <SlideUp key={skill.name} delay={0.1 + index * 0.05}>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-[var(--color-text-muted)] font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </SlideUp>
              ))}
            </div>

            <SlideUp delay={0.6}>
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-4 text-[var(--color-text-secondary)]">Additional Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {['GraphQL', 'Redis', 'MongoDB', 'Git', 'CI/CD', 'Terraform', 'Figma', 'Agile', 'Testing', 'Linux'].map((s) => (
                    <Badge key={s} variant="mixed">{s}</Badge>
                  ))}
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.7}>
              <div className="mt-8 p-5 liquid-glass rounded-2xl border border-white/[0.04]">
                <h3 className="text-sm font-semibold mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {['Open Source', 'System Design', 'DevOps', 'AI/ML', 'Web Performance', 'DX', 'Security'].map((i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] text-[var(--color-text-muted)]">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </SlideUp>
          </div>
        </div>

        <SlideUp>
          <div className="text-center">
            <div className="liquid-glass-elevated rounded-3xl p-10">
              <h2 className="text-2xl font-bold mb-3">Want to work together?</h2>
              <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
                I'm always open to interesting projects, collaborations, and opportunities.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/contact"><Button accent="mixed" size="lg">Get In Touch</Button></Link>
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}
