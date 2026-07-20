import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const worlds = ['Overworld', 'Nether', 'End'];
const onlinePlayers = [
  { name: 'DiamondKing', world: 'Overworld', health: 18, level: 42 },
  { name: 'EnderSlayer', world: 'Nether', health: 12, level: 67 },
  { name: 'CraftMaster', world: 'Overworld', health: 20, level: 31 },
  { name: 'BlockBuilder', world: 'Overworld', health: 16, level: 24 },
  { name: 'NightOwl', world: 'End', health: 8, level: 55 },
  { name: 'RedstoneWiz', world: 'Overworld', health: 20, level: 38 },
];

export default function MinecraftDemo() {
  const [tps, setTps] = useState(19.8);
  const playerCount = onlinePlayers.length;
  const [uptime, setUptime] = useState(14);

  useEffect(() => {
    const i = setInterval(() => {
      setTps((prev) => Math.max(18, Math.min(20, prev + (Math.random() - 0.5) * 0.3)));
      setUptime((prev) => prev + 0.001);
    }, 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/90">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="6" height="6" rx="1" />
              <rect x="3" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="3" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
              <rect x="15" y="3" width="6" height="6" rx="1" />
              <rect x="15" y="9" width="6" height="6" rx="1" />
            </svg>
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-white">Black Tuesday</span>
            <span className="text-[10px] text-[var(--color-text-muted)] ml-2">Minecraft Server</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-[10px] border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 p-4 border-b border-white/[0.04] bg-white/[0.01]">
        <div className="text-center">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Players</p>
          <p className="text-lg font-bold text-white mt-0.5">{playerCount}<span className="text-xs text-[var(--color-text-muted)]">/20</span></p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">TPS</p>
          <p className={`text-lg font-bold mt-0.5 ${tps >= 19 ? 'text-green-400' : tps >= 17 ? 'text-yellow-400' : 'text-red-400'}`}>{tps.toFixed(1)}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Uptime</p>
          <p className="text-lg font-bold text-white mt-0.5">{Math.floor(uptime)}d</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Worlds</p>
          <p className="text-lg font-bold text-white mt-0.5">{worlds.length}</p>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-white/[0.04]">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Server Address</p>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
          <span className="text-[12px] font-mono text-[#4ade80]">play.blacktuesday.online</span>
          <span className="ml-auto text-[10px] text-[var(--color-text-muted)]">1.20.4</span>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Online Players</p>
        <div className="space-y-1.5">
          {onlinePlayers.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.015] border border-white/[0.03] hover:border-white/[0.06] transition-colors"
            >
              <div className="w-6 h-6 rounded bg-[#4ade80]/10 flex items-center justify-center text-[10px] font-bold text-[#4ade80]">
                {p.name.charAt(0)}
              </div>
              <span className="text-[12px] font-medium text-white">{p.name}</span>
              <span className="text-[10px] text-[var(--color-text-muted)] ml-auto">{p.world}</span>
              <span className="text-[10px] text-red-400">❤ {p.health}</span>
              <span className="text-[10px] text-green-400">Lv {p.level}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[10px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-3">
          <span>Paper 1.20.4</span>
          <span>14 plugins</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Java & Bedrock
          </span>
        </div>
      </div>
    </div>
  );
}
