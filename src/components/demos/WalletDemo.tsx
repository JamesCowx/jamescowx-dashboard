import { motion } from 'framer-motion';

const assets = [
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.42, value: 28321.50, change: 2.4, color: '#f7931a' },
  { symbol: 'ETH', name: 'Ethereum', balance: 5.2, value: 18311.54, change: -0.8, color: '#60a5fa' },
  { symbol: 'SOL', name: 'Solana', balance: 45, value: 6420.15, change: 5.1, color: '#a78bfa' },
  { symbol: 'USDC', name: 'USD Coin', balance: 2500, value: 2500.00, change: 0, color: '#2775ca' },
];

const recentTx = [
  { type: 'Received', asset: 'ETH', amount: '+0.5', from: '0x7F3e...9bD2', time: '2 min ago', status: 'Confirmed' },
  { type: 'Sent', asset: 'BTC', amount: '-0.05', from: '0x1A2b...cF8e', time: '1 hour ago', status: 'Confirmed' },
  { type: 'Swapped', asset: 'SOL → USDC', amount: '+2,450', from: '0x4D9f...eF12', time: '3 hours ago', status: 'Confirmed' },
  { type: 'Received', asset: 'BTC', amount: '+0.1', from: '0x8B7c...2dE3', time: '1 day ago', status: 'Confirmed' },
];

export default function WalletDemo() {
  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/90">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg bg-[#2775ca]/10 border border-[#2775ca]/20 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-[#2775ca]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0" />
              <path d="M12 9v1m0 4v1" />
            </svg>
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-white">CowxWallet</span>
            <span className="text-[10px] text-[var(--color-text-muted)] ml-2">v0.3.0</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] border border-green-500/20">
            Connected
          </span>
        </div>
      </div>

      <div className="px-5 py-5 border-b border-white/[0.04] bg-white/[0.01]">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Balance</p>
        <p className="text-2xl font-bold text-white">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] text-green-400">+$1,423.18 (2.4%)</span>
          <span className="text-[10px] text-[var(--color-text-muted)]">today</span>
        </div>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {assets.map((a, i) => (
          <motion.div
            key={a.symbol}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: a.color + '20', color: a.color }}>
              {a.symbol.slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">{a.name}</div>
              <div className="text-[11px] text-[var(--color-text-muted)]">{a.balance} {a.symbol}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-white">${a.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              <div className={`text-[11px] font-mono ${a.change > 0 ? 'text-green-400' : a.change < 0 ? 'text-red-400' : 'text-[var(--color-text-muted)]'}`}>
                {a.change > 0 ? '+' : ''}{a.change}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.01]">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Recent Transactions</p>
        <div className="space-y-2">
          {recentTx.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${tx.type === 'Received' || tx.type === 'Swapped' ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-[var(--color-text-secondary)]">{tx.type}</span>
                <span className="text-white font-medium">{tx.asset}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-text-muted)]">{tx.time}</span>
                <span className={`font-mono ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{tx.amount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[10px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-4">
          <span>⟐ 4 networks</span>
          <span>⟐ 24 transactions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Wallet ready
          </span>
        </div>
      </div>
    </div>
  );
}
