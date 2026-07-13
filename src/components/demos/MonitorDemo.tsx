import { useState, useEffect } from 'react';

const servers = [
  { name: 'US-East-1', region: 'Virginia', status: 'healthy', cpu: 42, mem: 61, uptime: '99.99%', latency: 12 },
  { name: 'EU-West-1', region: 'Ireland', status: 'healthy', cpu: 28, mem: 45, uptime: '99.97%', latency: 28 },
  { name: 'AP-South-1', region: 'Mumbai', status: 'warning', cpu: 78, mem: 83, uptime: '99.92%', latency: 142 },
  { name: 'SA-East-1', region: 'São Paulo', status: 'healthy', cpu: 35, mem: 52, uptime: '99.95%', latency: 89 },
];

export default function MonitorDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const i = setInterval(() => setTick((t) => t + 1), 3000); return () => clearInterval(i); }, []);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#34d399]/15 flex items-center justify-center text-sm">📡</div>
          <div>
            <h3 className="text-sm font-semibold">CloudPulse Monitor</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">4 clusters · Multi-cloud · {tick}s ago</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 font-mono border border-green-500/20">All Systems Operational</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {servers.map((s) => (
          <div key={s.name} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 hover:border-white/[0.1] transition-all">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[13px] font-semibold">{s.name}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">{s.region}</p>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${s.status === 'healthy' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400 animate-pulse'}`} />
            </div>
            <div className="space-y-2">
              {[
                { label: 'CPU', value: s.cpu, color: s.cpu > 70 ? 'bg-yellow-500' : 'bg-[#60a5fa]' },
                { label: 'Memory', value: s.mem, color: s.mem > 80 ? 'bg-yellow-500' : 'bg-[#a78bfa]' },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-[var(--color-text-muted)] w-12">{m.label}</span>
                  <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${m.color}`} style={{ width: `${m.value + (tick % 3) - 1}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] w-8 text-right">{m.value + (tick % 3) - 1}%</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-white/[0.04]">
                <span className="text-[10px] text-[var(--color-text-muted)]">Uptime: {s.uptime}</span>
                <span className="text-[10px] text-[var(--color-text-muted)]">Latency: {s.latency}ms</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
