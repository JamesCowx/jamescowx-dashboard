import { type ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

interface LayoutProps { children: ReactNode; }

const variants = {
  initial: { opacity: 0, y: 8, filter: 'blur(3px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(2px)' },
};

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => { const h = document.documentElement.scrollHeight - window.innerHeight; setWidth(h > 0 ? (window.scrollY / h) * 100 : 0); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.08] hover:border-[#60a5fa]/30 transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)]">
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main className="relative z-10 pt-16" key={location.pathname} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: 'easeOut' }}>
          {children}
        </motion.main>
      </AnimatePresence>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
