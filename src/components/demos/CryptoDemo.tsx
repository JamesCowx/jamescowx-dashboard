import { useState, useEffect } from 'react';

const coins = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67432.18, change: 2.4, holdings: 0.42, color: '#f7931a' },
  { symbol: 'ETH', name: 'Ethereum', price: 3521.45, change: -0.8, holdings: 5.2, color: '#60a5fa' },
  { symbol: 'SOL', name: 'Solana', price: 142.67, change: 5.1, holdings: 45, color: '#a78bfa' },
  { symbol: 'MATIC', name: 'Polygon', price: 0.89, change: 1.3, holdings: 2500, color: '#f472b6' },
  { symbol: 'LINK', name: 'Chainlink', price: 15.42, change: -2.1, holdings: 180, color: '#34d399' },
];

export default function CryptoDemo() {
  const [prices, setPrices] = useState(coins);

  useEffect(() => {
    const i = setInterval(() => {
      setPrices((prev) => prev.map((c) => ({
        ...c,
        price: c.price * (1 + (Math.random() - 0.5) * 0.008),
        change: c.change + (Math.random() - 0.5) * 0.3,
      })));
    }, 2000);
    return () => clearInterval(i);
  }, []);

  const portfolio = prices.reduce((sum, c) => sum + c.price * c.holdings, 0);
  const dayChange = prices.reduce((sum, c) => sum + c.price * c.holdings * (c.change / 100), 0);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#f7931a]/15 flex items-center justify-center text-sm">₿</div>
          <div>
            <h3 className="text-sm font-semibold">CryptoSage</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Portfolio Tracker · Live Prices</div>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Portfolio Value</p>
          <p className="text-xl font-bold mt-1 text-white">${portfolio.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className={`text-[11px] mt-1 ${dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>{dayChange >= 0 ? '+' : ''}{dayChange.toLocaleString(undefined, { maximumFractionDigits: 0 })} today</p>
        </div>
        <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Total Gain/Loss</p>
          <p className={`text-xl font-bold mt-1 ${dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>{dayChange >= 0 ? '+' : ''}{(portfolio * 0.12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="text-[11px] mt-1 text-green-400">+12.4% all time</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-6 text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider px-1">
          <span className="col-span-2">Asset</span><span className="text-right">Price</span><span className="text-right">24h</span><span className="text-right">Holdings</span><span className="text-right">Value</span>
        </div>
        {prices.map((c) => (
          <div key={c.symbol} className="grid grid-cols-6 items-center px-3 py-2.5 bg-white/[0.015] rounded-xl border border-white/[0.03] text-[12px] hover:border-white/[0.06] transition-all">
            <div className="col-span-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: c.color + '20', color: c.color }}>{c.symbol.slice(0, 2)}</span>
              <span className="font-medium text-[var(--color-text-secondary)]">{c.name}</span>
            </div>
            <span className="text-right font-mono text-white">${c.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={`text-right font-mono ${c.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{c.change >= 0 ? '+' : ''}{c.change.toFixed(1)}%</span>
            <span className="text-right font-mono text-[var(--color-text-muted)]">{c.holdings}</span>
            <span className="text-right font-mono text-white">${(c.price * c.holdings).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
