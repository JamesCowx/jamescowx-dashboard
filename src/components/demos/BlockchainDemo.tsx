import { useState } from 'react';

const blocks = [
  { hash: '0000...a1f3', time: '0:12:34 ago', txs: 142, size: '1.24 MB', from: 'Miner 0x7F1E...B9C2' },
  { hash: '0000...b8d2', time: '0:10:18 ago', txs: 89, size: '0.87 MB', from: 'Miner 0x3A2B...F4D1' },
  { hash: '0000...c7e1', time: '0:08:02 ago', txs: 211, size: '2.01 MB', from: 'Miner 0xC4D9...E7F3' },
  { hash: '0000...d4f0', time: '0:05:47 ago', txs: 67, size: '0.62 MB', from: 'Miner 0xE5F8...A1B3' },
  { hash: '0000...e2a9', time: '0:03:21 ago', txs: 178, size: '1.56 MB', from: 'Validated' },
  { hash: '0000...f1b8', time: '0:01:05 ago', txs: 304, size: '2.34 MB', from: 'Validated' },
];

const stats = [
  { label: 'TPS', value: '2,847', change: '+12.3%' },
  { label: 'Gas Price', value: '8 Gwei', change: '-3.1%' },
  { label: 'Total Tx', value: '1.4M', change: '+5.7%' },
  { label: 'Validators', value: '892', change: '+2' },
];

export default function BlockchainDemo() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#fbbf24]/15 flex items-center justify-center text-sm">🔗</div>
          <div>
            <h3 className="text-sm font-semibold">BlockLedger</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Layer-1 Explorer · Mainnet</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-green-400/10 text-green-400 animate-pulse">Synced</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]">
            <p className="text-[10px] text-[var(--color-text-muted)]">{s.label}</p>
            <p className="text-sm font-bold text-white">{s.value}</p>
            <p className="text-[10px] text-green-400">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 justify-center">
        {blocks.slice(0, 6).map((b, i) => (
          <div key={i} onClick={() => setSelected(i)}
            className={`h-20 flex-1 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${selected === i ? 'border-[#fbbf24]/40 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : 'border-white/[0.04] hover:border-white/[0.1]'}`}
            style={{ background: selected === i ? 'linear-gradient(180deg, rgba(251,191,36,0.08), transparent)' : 'rgba(255,255,255,0.015)' }}>
            <div className="absolute bottom-1 left-2 right-2">
              <p className="text-[8px] font-mono text-[var(--color-text-muted)]">{b.hash}</p>
              <p className="text-[8px] text-green-400/70">{b.txs} tx</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.015] rounded-xl p-4 border border-white/[0.04] space-y-2">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Block Details</p>
        {[
          { label: 'Hash', value: blocks[selected].hash },
          { label: 'Timestamp', value: blocks[selected].time },
          { label: 'Transactions', value: blocks[selected].txs.toLocaleString() },
          { label: 'Size', value: blocks[selected].size },
          { label: 'Mined By', value: blocks[selected].from },
        ].map((d) => (
          <div key={d.label} className="flex items-center justify-between py-1 border-b border-white/[0.02] last:border-0">
            <span className="text-[11px] text-[var(--color-text-muted)]">{d.label}</span>
            <span className="text-[11px] font-mono text-white">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
