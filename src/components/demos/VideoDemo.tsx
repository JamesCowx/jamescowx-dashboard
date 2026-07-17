import { motion } from 'framer-motion';

const videos = [
  { title: 'Getting Started with VidTorret', views: '2.4K', duration: '12:34', user: 'VidTorret', color: '#60a5fa' },
  { title: 'Self-Hosted Streaming Guide', views: '1.8K', duration: '18:22', user: 'VidTorret', color: '#a78bfa' },
  { title: 'Building a Video Pipeline', views: '892', duration: '24:15', user: 'VidTorret', color: '#f472b6' },
  { title: 'Adaptive Bitrate Explained', views: '1.2K', duration: '9:47', user: 'VidTorret', color: '#34d399' },
];

export default function VideoDemo() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/80">
      <div className="aspect-video bg-gradient-to-br from-[#1a1a3e] to-[#0a0a1a] relative flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'radial-gradient(600px circle at 30% 40%, rgba(96,165,250,0.15), transparent 50%), radial-gradient(400px circle at 70% 60%, rgba(244,114,182,0.1), transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
        <motion.div
          className="relative z-10 flex flex-col items-center gap-3"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center"
            animate={{ boxShadow: ['0 0 0 0 rgba(96,165,250,0)', '0 0 0 12px rgba(96,165,250,0.08)', '0 0 0 0 rgba(96,165,250,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-7 h-7 text-white/80 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </motion.div>
          <div className="text-center">
            <p className="text-xs text-[var(--color-text-muted)]">VidTorret Player</p>
            <p className="text-[10px] text-[var(--color-text-muted)] opacity-60">Click to preview</p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
          <motion.div className="h-1 flex-1 rounded-full bg-white/[0.1] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa]"
              initial={{ width: '0%' }}
              animate={{ width: '35%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
          <span className="text-[10px] text-white/50 font-mono">12:34 / 1:23:45</span>
        </div>
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/50 text-[9px] text-white/70 border border-white/[0.06]">
          HLS · 1080p
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-[var(--color-accent-blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          <span className="text-xs font-semibold text-white">Recommended</span>
          <span className="text-[10px] text-[var(--color-text-muted)]">· From your library</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {videos.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-lg bg-white/[0.03] border border-white/[0.06] overflow-hidden relative mb-1.5 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${v.color}08, ${v.color}02)` }}
              >
                <span className="text-2xl opacity-10">{'▶'}</span>
                <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/60 text-[8px] text-white/70 font-mono">{v.duration}</span>
              </div>
              <p className="text-[11px] font-medium text-white truncate">{v.title}</p>
              <p className="text-[9px] text-[var(--color-text-muted)] truncate">{v.user} · {v.views} views</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
