import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const games = [
  { name: 'Pokemon FireRed', gen: 'GBA', year: 2004, color: '#ef4444' },
  { name: 'Pokemon Emerald', gen: 'GBA', year: 2004, color: '#10b981' },
  { name: 'Pokemon Crystal', gen: 'GBC', year: 2000, color: '#06b6d4' },
  { name: 'Pokemon SoulSilver', gen: 'NDS', year: 2009, color: '#a78bfa' },
  { name: 'Pokemon Red', gen: 'GB', year: 1996, color: '#dc2626' },
  { name: 'Pokemon Platinum', gen: 'NDS', year: 2008, color: '#8b5cf6' },
];

const party = [
  { name: 'Pikachu', level: 36, type: 'Electric', hp: 82, color: '#facc15' },
  { name: 'Charizard', level: 42, type: 'Fire', hp: 67, color: '#ef4444' },
  { name: 'Blastoise', level: 40, type: 'Water', hp: 91, color: '#3b82f6' },
  { name: 'Venusaur', level: 38, type: 'Grass', hp: 74, color: '#22c55e' },
  { name: 'Snorlax', level: 35, type: 'Normal', hp: 100, color: '#6b7280' },
  { name: 'Gengar', level: 44, type: 'Ghost', hp: 58, color: '#7c3aed' },
];

export default function PokemonDemo() {
  const [activeGame, setActiveGame] = useState(games[0]);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/90">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-[#ef4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-white">PokeCloud</span>
            <span className="text-[10px] text-[var(--color-text-muted)] ml-2">v1.0</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] border border-green-500/20">
            Cloud Saved
          </span>
          <span className="text-[var(--color-text-muted)]">{games.length} games</span>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-white/[0.04] bg-white/[0.01]">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Your Games</p>
        <div className="grid grid-cols-3 gap-2">
          {games.map((g) => (
            <motion.button
              key={g.name}
              onClick={() => setActiveGame(g)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-3 py-2 rounded-lg text-[11px] font-medium text-left transition-all cursor-pointer ${
                activeGame.name === g.name
                  ? 'border-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/10 text-white'
                  : 'bg-white/[0.02] border border-white/[0.04] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.08]'
              }`}
              style={activeGame.name === g.name ? { borderColor: g.color + '60', background: g.color + '15' } : {}}
            >
              <div className="font-medium truncate">{g.name.replace('Pokemon ', '')}</div>
              <div className="text-[9px] text-[var(--color-text-muted)] mt-0.5">{g.gen} · {g.year}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 border-b border-white/[0.04]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Your Party</p>
          <span className="text-[10px] text-green-400">Auto-saved</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {party.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.015] border border-white/[0.03]"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: p.color + '20', color: p.color }}>
                {p.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-white truncate">{p.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-[var(--color-text-muted)]">Lv {p.level}</span>
                  <span className="text-[9px] px-1 rounded" style={{ backgroundColor: p.color + '15', color: p.color }}>{p.type}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-12 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-green-400" style={{ width: `${p.hp}%` }} />
                </div>
                <span className="text-[9px] text-[var(--color-text-muted)]">{p.hp}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeGame.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="px-5 py-4"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: activeGame.color + '10', border: `1px solid ${activeGame.color}20` }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold" style={{ backgroundColor: activeGame.color + '20', color: activeGame.color }}>
              {activeGame.name.replace('Pokemon ', '').charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{activeGame.name}</div>
              <div className="text-[10px] text-[var(--color-text-muted)]">{activeGame.gen} · {activeGame.year} · Last played 2 hours ago</div>
            </div>
            <motion.button
              className="ml-auto px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white"
              style={{ background: activeGame.color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[10px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-3">
          <span>Cloud sync: active</span>
          <span>6 saves backed up</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Emulator: running
          </span>
        </div>
      </div>
    </div>
  );
}
