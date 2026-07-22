import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Websites', to: '/websites' },
  { label: 'Contact', to: '/contact' },
];

const socials = [
  { label: 'GitHub', icon: 'GH', href: 'https://jamescowx.github.io/', stats: 'Open source' },
  { label: 'LinkedIn', icon: 'LI', href: 'https://linkedin.com/in/jamescowx', stats: 'Connect' },
  { label: 'Buy Me a Coffee', icon: '☕', href: 'https://buymeacoffee.com/jamescowx', stats: 'Support' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[var(--color-bg-deep)] overflow-hidden">
      <motion.div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #60a5fa30, #a78bfa30, #f472b630, transparent)' }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.025] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <motion.span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#f472b6] flex items-center justify-center text-[12px] font-extrabold text-white shadow-lg"
                whileHover={{ scale: 1.1, rotate: -8 }}
                animate={{ boxShadow: ['0 0 15px rgba(96,165,250,0.15)', '0 0 25px rgba(96,165,250,0.25)', '0 0 15px rgba(96,165,250,0.15)'] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                JC
              </motion.span>
              <span className="text-xl font-bold hero-gradient-text">James Cowx</span>
            </Link>
            <p className="mt-5 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              Full-stack developer building scalable web applications, crafting APIs, and contributing to open source.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-semibold">Available for new projects</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.18em] mb-6">Navigation</h4>
            <div className="space-y-3">
              {footerLinks.map((item) => (
                <Link key={item.label} to={item.to}
                  className="block text-sm text-[var(--color-text-muted)] hover:text-white hover:translate-x-1.5 transition-all">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.18em] mb-6">Expertise</h4>
            <div className="space-y-3">
              {['React & Next.js', 'TypeScript', 'Node.js & Python', 'Cloud & DevOps', 'System Design'].map((item) => (
                <span key={item} className="block text-sm text-[var(--color-text-muted)]">{item}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.18em] mb-6">Connect</h4>
            <div className="space-y-3.5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors group">
                  <span className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[11px] font-bold group-hover:border-white/[0.15] group-hover:bg-white/[0.06] transition-all">
                    {s.icon}
                  </span>
                  <div>
                    <span className="block font-medium">{s.label}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{s.stats}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} James Cowx. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Built with <span className="text-[#60a5fa] font-medium">React</span> · <span className="text-[#f472b6] font-medium">TypeScript</span> · <span className="text-[#a78bfa] font-medium">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
