import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | James Cowx</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 65%)' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full orb-pulse" style={{ background: 'radial-gradient(circle, #f472b6, transparent 65%)', animationDelay: '3s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[30vw] font-black leading-none text-watermark tracking-tight select-none">404</span>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 120, damping: 14 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 hero-ring rounded-full opacity-30 blur-2xl" />
            <span className="relative text-8xl sm:text-9xl font-extrabold hero-gradient-text tracking-tight">404</span>
          </motion.div>

          <motion.div
            className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6] animate-pulse" />
            <span className="text-[var(--color-text-secondary)]">Page not found</span>
          </motion.div>

          <motion.p
            className="text-xl text-[var(--color-text-secondary)] mt-6 mb-10 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-[#60a5fa] to-[#f472b6] shadow-[0_8px_32px_rgba(96,165,250,0.3)] hover:shadow-[0_12px_48px_rgba(244,114,182,0.35)] hover:-translate-y-0.5 transition-all duration-300">
              Back to Home
            </Link>
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/[0.14] hover:-translate-y-0.5 transition-all duration-300">
              View projects
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
