import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const initialCoins = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67432.18, change: 2.4, mcap: '1.32T', color: '#f7931a' },
  { symbol: 'ETH', name: 'Ethereum', price: 3521.45, change: -0.8, mcap: '423.5B', color: '#60a5fa' },
  { symbol: 'SOL', name: 'Solana', price: 142.67, change: 5.1, mcap: '62.8B', color: '#a78bfa' },
  { symbol: 'XRP', name: 'Ripple', price: 0.62, change: 1.8, mcap: '34.2B', color: '#34d399' },
  { symbol: 'ADA', name: 'Cardano', price: 0.48, change: -1.2, mcap: '16.9B', color: '#f472b6' },
];

const trending = ['PEPE', 'WIF', 'BONK', 'DOGE'];
const gainers = ['PEPE (+24.5%)', 'WIF (+18.2%)', 'BONK (+12.7%)'];
const losers = ['ATOM (-6.2%)', 'APT (-5.8%)', 'FIL (-4.9%)'];

export default function CryptoMarketDemo() {
  const [prices, setPrices] = useState(initialCoins);

  useEffect(() => {
    const i = setInterval(() => {
      setPrices((prev) => prev.map((c) => ({
        ...c,
        price: c.price * (1 + (Math.random() - 0.5) * 0.006),
        change: c.change + (Math.random() - 0.5) * 0.2,
      })));
    }, 2500);
    return () => clearInterval(i);
  }, []);

  const totalMcap = prices.reduce((sum, c) => sum + (c.symbol === 'BTC' ? 1320000000000 : c.symbol === 'ETH' ? 423500000000 : c.symbol === 'SOL' ? 62800000000 : c.symbol === 'XRP' ? 34200000000 : 16900000000), 0);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/90">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg bg-[#f7931a]/10 border border-[#f7931a]/20 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-[#f7931a]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.638 14.904c-1.379 1.11-2.52 1.553-3.808 1.797 1.012-.913 2.43-2.59 2.858-4.087.69-2.43.003-4.984-1.82-6.812-1.82-1.828-4.37-2.584-6.81-1.896-1.498.425-3.35 1.58-4.263 2.593.246-1.29.69-2.427 1.797-3.806L7.48.802C5.957 2.332 4.738 4.956 4.416 7.35c-.546 4.096 2.66 7.874 6.724 8.43 2.395.322 5.02-.896 6.55-2.419l-1.19-1.185c-1.108 1.108-2.527 1.72-3.807 1.797-3.276.2-6.065-2.3-6.265-5.575-.2-3.277 2.3-6.067 5.576-6.267 1.28-.078 2.698.535 3.806 1.643l1.186-1.185c-1.53-1.523-4.155-2.741-6.55-2.42-4.095.547-7.873 3.848-8.428 7.944-.555 4.095 2.742 7.873 6.84 8.428 2.395.322 5.02-.895 6.55-2.419l-1.19-1.185z" />
            </svg>
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-white">CowxCrypto</span>
            <span className="text-[10px] text-[var(--color-text-muted)] ml-2">Market Intelligence</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[var(--color-text-muted)]">
            MCap <span className="text-white font-medium">${(totalMcap / 1e12).toFixed(2)}T</span>
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 border-b border-white/[0.04] bg-white/[0.01]">
        <div className="space-y-1">
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Trending</span>
          <div className="flex flex-wrap gap-1">
            {trending.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-[#a78bfa]/10 text-[#a78bfa] text-[10px] font-medium border border-[#a78bfa]/20">{t}</span>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Top Gainers</span>
          {gainers.map((g) => (
            <div key={g} className="text-[11px] text-green-400 font-mono">{g}</div>
          ))}
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Top Losers</span>
          {losers.map((l) => (
            <div key={l} className="text-[11px] text-red-400 font-mono">{l}</div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="text-left py-3 px-5 text-[var(--color-text-muted)] font-medium tracking-wider">#</th>
              <th className="text-left py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Name</th>
              <th className="text-right py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Price</th>
              <th className="text-right py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">24h</th>
              <th className="text-right py-3 px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((c, i) => (
              <motion.tr
                key={c.symbol}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-5 text-[var(--color-text-muted)] font-mono">{i + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: c.color + '20', color: c.color }}>{c.symbol.slice(0, 2)}</span>
                    <span className="text-white font-medium">{c.name}</span>
                    <span className="text-[var(--color-text-muted)]">{c.symbol}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-mono text-white">${c.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className={`py-3 px-4 text-right font-mono ${c.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{c.change >= 0 ? '+' : ''}{c.change.toFixed(1)}%</td>
                <td className="py-3 px-4 text-right font-mono text-[var(--color-text-muted)]">{c.mcap}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[10px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-4">
          <span>⟐ {prices.length} coins tracked</span>
          <span>⟐ {Math.floor(Math.random() * 100 + 50)} signals active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Data feeds: 4/4
          </span>
        </div>
      </div>
    </div>
  );
}
