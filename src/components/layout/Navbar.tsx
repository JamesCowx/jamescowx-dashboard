import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/websites', label: 'Websites' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${scrolled ? 'max-w-5xl mt-3' : 'max-w-7xl mt-0'}`}>
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'rounded-2xl px-5 liquid-glass-deep shadow-2xl' : 'rounded-none px-0 bg-transparent'
        }`}
        style={{ height: scrolled ? 56 : 68 }}
        >
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <motion.span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#f472b6] flex items-center justify-center text-[10px] font-extrabold text-white shadow-lg"
              whileHover={{ scale: 1.1, rotate: -8 }}
              animate={{ boxShadow: ['0 0 10px rgba(96,165,250,0.2)', '0 0 20px rgba(96,165,250,0.3)', '0 0 10px rgba(96,165,250,0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              JC
            </motion.span>
            <span className="text-lg font-bold hero-gradient-text group-hover:scale-[1.02] transition-transform">James Cowx</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className="relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              >
                {({ isActive }) => (
                  <>
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-white/80'}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.1), rgba(244,114,182,0.05))', border: '1px solid rgba(96,165,250,0.15)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <motion.a href="https://jamescowx.github.io/" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
            >GH</motion.a>
            <motion.a href="https://linkedin.com/in/jamescowx" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
            >LI</motion.a>
            <a href="https://buymeacoffee.com/jamescowx" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#FFDD00]/10 border border-[#FFDD00]/20 flex items-center justify-center text-[13px] text-[#FFDD00] hover:bg-[#FFDD00]/20 hover:border-[#FFDD00]/30 transition-all font-bold"
              title="Support on Buy Me a Coffee"
            >☕</a>
            <div className="w-px h-5 bg-white/[0.06] mx-1" />
            <Link to="/contact">
              <motion.span className="px-4 py-2 rounded-xl text-[12px] font-semibold bg-gradient-to-r from-[#4f8fde] to-[#60a5fa] text-white cursor-pointer hover:from-[#60a5fa] hover:to-[#93c5fd] transition-all duration-300 shadow-md shadow-[#60a5fa]/15"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
              </motion.span>
            </Link>
          </div>

          <button className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2 rounded-2xl liquid-glass-deep overflow-hidden"
          >
            <div className="px-3 py-3 space-y-0.5">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive ? 'text-white bg-white/[0.08]' : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.04]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-white/[0.04] pt-3 mt-2 px-1">
                <div className="flex items-center gap-2 mb-3">
                  <a href="https://jamescowx.github.io/" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-muted)] hover:text-white transition-all"
                  >GH</a>
                  <a href="https://linkedin.com/in/jamescowx" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[10px] font-bold text-[var(--color-text-muted)] hover:text-white transition-all"
                  >LI</a>
                  <a href="https://buymeacoffee.com/jamescowx" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-[#FFDD00]/10 border border-[#FFDD00]/20 flex items-center justify-center text-[13px] text-[#FFDD00] font-bold"
                    title="Support on Buy Me a Coffee"
                  >☕</a>
                </div>
                <Link to="/contact" onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#4f8fde] to-[#60a5fa] text-white shadow-md"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
