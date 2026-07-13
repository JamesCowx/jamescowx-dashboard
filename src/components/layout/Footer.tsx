import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const socials = [
  { label: 'GitHub', icon: 'GH', href: 'https://jamescowx.github.io/', stats: 'Open source' },
  { label: 'LinkedIn', icon: 'LI', href: 'https://linkedin.com/in/jamescowx', stats: 'Connect' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[var(--color-bg-deep)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#f472b6] flex items-center justify-center text-[11px] font-extrabold text-white">JC</span>
              <span className="text-lg font-bold gradient-text-mixed">James Cowx</span>
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              Full-stack developer building scalable web applications, crafting APIs, and contributing to open source.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Available for new projects</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.15em] mb-5">Navigation</h4>
            <div className="space-y-3">
              {footerLinks.map((item) => (
                <Link key={item.label} to={item.to}
                  className="block text-sm text-[var(--color-text-muted)] hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.15em] mb-5">Expertise</h4>
            <div className="space-y-3">
              {['React & Next.js', 'TypeScript', 'Node.js & Python', 'Cloud & DevOps', 'System Design'].map((item) => (
                <span key={item} className="block text-sm text-[var(--color-text-muted)]">{item}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-[0.15em] mb-5">Connect</h4>
            <div className="space-y-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href}
                  className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors group">
                  <span className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[10px] font-bold group-hover:border-white/[0.15] group-hover:bg-white/[0.06] transition-all">
                    {s.icon}
                  </span>
                  <div>
                    <span className="block">{s.label}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{s.stats}</span>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} James Cowx. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Built with <span className="text-[#60a5fa]">React</span> · <span className="text-[#f472b6]">TypeScript</span> · <span className="text-[#a78bfa]">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
