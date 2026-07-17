import { useState } from 'react';
import { motion } from 'framer-motion';

const initialEntries = [
  { id: 1, name: 'Google', username: 'jane@email.com', password: '••••••••••', strength: 4, category: 'Accounts' },
  { id: 2, name: 'Twitter / X', username: '@janedoe', password: '••••••••••', strength: 3, category: 'Accounts' },
  { id: 3, name: 'Netflix', username: 'jane@email.com', password: '••••••••••', strength: 2, category: 'Accounts' },
  { id: 4, name: 'GitHub', username: 'janedoe', password: '••••••••••', strength: 5, category: 'Accounts' },
  { id: 5, name: 'Chase', username: 'janedoe', password: '••••••••••', strength: 4, category: 'Finance' },
  { id: 6, name: 'Wi-Fi Passphrase', username: '', password: '••••••••••', strength: 4, category: 'Notes' },
];

const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];

export default function VaultDemo() {
  const [entries] = useState(initialEntries);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? entries : entries.filter(e => e.category === activeFilter);
  const categories = ['All', ...new Set(entries.map(e => e.category))];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/90">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-[#a78bfa]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-white">CowxPass</span>
            <span className="text-[10px] text-[var(--color-text-muted)] ml-2">v1.2.0</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] border border-green-500/20">
            AES-256
          </span>
          <span className="text-[var(--color-text-muted)]">{entries.length} entries</span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-5 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
              activeFilter === cat
                ? 'bg-[#a78bfa]/15 text-[#a78bfa] border border-[#a78bfa]/20'
                : 'text-[var(--color-text-muted)] hover:text-white border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="divide-y divide-white/[0.04]">
        {filtered.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
              entry.category === 'Finance' ? 'bg-green-500/10 text-green-400' :
              entry.category === 'Notes' ? 'bg-yellow-500/10 text-yellow-400' :
              'bg-[#a78bfa]/10 text-[#a78bfa]'
            }`}>
              {entry.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{entry.name}</div>
              <div className="text-[11px] text-[var(--color-text-muted)] truncate">{entry.username || '—'}</div>
            </div>
            <div className="text-xs text-[var(--color-text-muted)] font-mono">{entry.password}</div>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map(j => (
                <div key={j} className={`w-1.5 h-1.5 rounded-full ${
                  j < entry.strength ? strengthColors[entry.strength - 1] : 'bg-white/[0.06]'
                }`} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[10px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-4">
          <span>🔒 Zero-knowledge encrypted</span>
          <span>☁️ Cloud sync active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Vault locked
          </span>
        </div>
      </div>
    </div>
  );
}
