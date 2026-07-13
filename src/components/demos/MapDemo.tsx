import { useState } from 'react';

const zones = [
  { x: 25, y: 30, label: 'Forest (87% health)', color: '#34d399', size: 40 },
  { x: 55, y: 20, label: 'Urban (63% density)', color: '#fbbf24', size: 35 },
  { x: 40, y: 60, label: 'Water body (normal)', color: '#60a5fa', size: 30 },
  { x: 70, y: 55, label: 'Cropland (91% health)', color: '#34d399', size: 25 },
  { x: 15, y: 70, label: 'Deforestation alert', color: '#f87171', size: 20 },
];

const insights = [
  { icon: '🌲', label: 'Forest Cover', value: '73.4%', change: '+2.1%', up: true },
  { icon: '🏙', label: 'Urban Expansion', value: '18.2%', change: '+4.5%', up: false },
  { icon: '💧', label: 'Water Bodies', value: '6.8%', change: '-0.3%', up: false },
  { icon: '🌾', label: 'Agriculture', value: '43.1%', change: '+1.2%', up: true },
];

export default function MapDemo() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#34d399]/15 flex items-center justify-center text-sm">🛰</div>
          <div>
            <h3 className="text-sm font-semibold">TerraScan</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Satellite Analysis · Landsat 9 · NDVI</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[var(--color-text-muted)] font-mono">2025-07-12</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {insights.map((ins) => (
          <div key={ins.label} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-1">
              <span>{ins.icon}</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">{ins.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">{ins.value}</span>
              <span className={`text-[10px] ${ins.up ? 'text-green-400' : 'text-red-400'}`}>{ins.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative h-52 bg-gradient-to-br from-[#0a1a0a] via-[#0a0c18] to-[#0a0c18] rounded-xl border border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%), radial-gradient(circle at 20% 80%, rgba(96,165,250,0.1) 0%, transparent 50%)' }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        {zones.map((z, i) => (
          <div key={i} onClick={() => setSelected(i === selected ? null : i)}
            className="absolute flex items-center justify-center rounded-full cursor-pointer border-2 transition-all duration-300"
            style={{
              left: `${z.x}%`, top: `${z.y}%`, width: z.size, height: z.size,
              borderColor: selected === i ? z.color : z.color + '40',
              backgroundColor: z.color + (selected === i ? '15' : '05'),
              transform: 'translate(-50%, -50%)',
            }}>
            <span className={`text-[10px] font-medium ${selected === i ? 'opacity-100' : 'opacity-0'} transition-opacity whitespace-nowrap absolute -bottom-6`} style={{ color: z.color }}>
              {z.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {['NDVI', 'Thermal', 'RGB', 'NIR', 'SAR'].map((mode) => (
          <span key={mode} className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border cursor-pointer transition-all ${mode === 'NDVI' ? 'bg-white/[0.04] border-white/[0.1] text-white' : 'bg-white/[0.01] border-white/[0.04] text-[var(--color-text-muted)] hover:text-white'}`}>{mode}</span>
        ))}
      </div>
    </div>
  );
}
