import { useState } from 'react';

const history = [
  { id: 'REL-2025-07', version: 'v2.4.0', date: '12 Jul 2025', leadTime: '4.2h', deployFreq: '3/day', changeFail: '2%', recovery: '12min', status: 'stable' },
  { id: 'REL-2025-06', version: 'v2.3.1', date: '18 Jun 2025', leadTime: '6.8h', deployFreq: '2/day', changeFail: '5%', recovery: '25min', status: 'stable' },
  { id: 'REL-2025-05', version: 'v2.3.0', date: '22 May 2025', leadTime: '12.1h', deployFreq: '1/day', changeFail: '11%', recovery: '48min', status: 'degraded' },
  { id: 'REL-2025-04', version: 'v2.2.0', date: '09 Apr 2025', leadTime: '18.5h', deployFreq: '3/week', changeFail: '8%', recovery: '35min', status: 'stable' },
  { id: 'REL-2025-03', version: 'v2.1.0', date: '15 Mar 2025', leadTime: '24.0h', deployFreq: '2/week', changeFail: '14%', recovery: '62min', status: 'unstable' },
  { id: 'REL-2025-02', version: 'v2.0.0', date: '10 Feb 2025', leadTime: '36.2h', deployFreq: '1/week', changeFail: '20%', recovery: '90min', status: 'degraded' },
];

const metrics = [
  { label: 'Lead Time', value: '4.2h', trend: '-38%', up: true },
  { label: 'Deploy Freq', value: '3/day', trend: '+50%', up: true },
  { label: 'Change Fail', value: '2.0%', trend: '-60%', up: true },
  { label: 'MTTR', value: '12min', trend: '-52%', up: true },
];

export default function DoraMetricsDemo() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#34d399]/15 flex items-center justify-center text-sm">📊</div>
          <div>
            <h3 className="text-sm font-semibold">Prism Metrics</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">DORA · Elite Performer</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-green-400/10 text-green-400 border border-green-400/20">Elite</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[var(--color-text-muted)]">{m.label}</span>
              <span className={`text-[10px] font-medium ${m.up ? 'text-green-400' : 'text-red-400'}`}>{m.trend}</span>
            </div>
            <p className="text-lg font-bold text-white mt-0.5">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Release History</p>
        {history.map((r) => (
          <div key={r.id}>
            <div onClick={() => setExpanded(expanded === r.id ? null : r.id)}
              className="flex items-center gap-3 px-3 py-2.5 bg-white/[0.015] rounded-xl border border-white/[0.04] text-[11px] cursor-pointer hover:border-white/[0.08] transition-all">
              <span className="w-20 font-mono text-[var(--color-text-secondary)]">{r.version}</span>
              <span className="flex-1 text-[var(--color-text-muted)]">{r.date}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[var(--color-text-muted)]">LT: {r.leadTime}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${r.status === 'stable' ? 'text-green-400 border-green-400/30 bg-green-400/5' : r.status === 'degraded' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5' : 'text-red-400 border-red-400/30 bg-red-400/5'}`}>{r.status}</span>
              </div>
            </div>
            {expanded === r.id && (
              <div className="mx-3 mt-1 p-3 bg-white/[0.01] rounded-lg border border-white/[0.03] text-[10px] text-[var(--color-text-muted)] flex gap-4">
                <span>Deploy: {r.deployFreq}</span>
                <span>Fail: {r.changeFail}</span>
                <span>MTTR: {r.recovery}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
