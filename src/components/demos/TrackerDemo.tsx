import { useState } from 'react';

const exercises = [
  { name: 'Push-ups', sets: 3, reps: 15, cal: 8, icon: '💪', target: 'Chest & Triceps' },
  { name: 'Squats', sets: 4, reps: 20, cal: 12, icon: '🦵', target: 'Legs & Glutes' },
  { name: 'Plank', sets: 3, reps: 60, cal: 5, icon: '🧘', target: 'Core', isTime: true },
  { name: 'Burpees', sets: 3, reps: 10, cal: 15, icon: '🏃', target: 'Full Body' },
  { name: 'Pull-ups', sets: 3, reps: 8, cal: 10, icon: '🏋️', target: 'Back & Biceps' },
];

export default function TrackerDemo() {
  const [done, setDone] = useState<Record<string, number>>({});
  const [water, setWater] = useState(0);

  function toggle(name: string, sets: number) {
    setDone((prev) => {
      const cur = prev[name] || 0;
      if (cur >= sets) { const { [name]: _, ...rest } = prev; return rest; }
      return { ...prev, [name]: cur + 1 };
    });
  }

  const totalCal = Object.entries(done).reduce((sum, [name, count]) => {
    const ex = exercises.find((e) => e.name === name);
    return sum + (ex ? ex.cal * count : 0);
  }, 0);

  const totalDone = Object.values(done).reduce((a, b) => a + b, 0);
  const totalPossible = exercises.reduce((a, e) => a + e.sets, 0);
  const progress = totalPossible > 0 ? (totalDone / totalPossible) * 100 : 0;

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#34d399]/15 flex items-center justify-center text-sm">💪</div>
          <div>
            <h3 className="text-sm font-semibold">FitTrack Pro</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Today's workout · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[var(--color-text-muted)] font-mono">{totalDone}/{totalPossible} sets</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Progress', value: `${Math.round(progress)}%`, color: '#60a5fa', icon: '📊' },
          { label: 'Calories', value: totalCal, color: '#f472b6', icon: '🔥' },
          { label: 'Water', value: `${water}/8`, color: '#38bdf8', icon: '💧' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/[0.02] rounded-xl p-3 text-center border border-white/[0.04]">
            <div className="text-lg mb-0.5">{stat.icon}</div>
            <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        {exercises.map((ex) => {
          const d = done[ex.name] || 0;
          const pct = (d / ex.sets) * 100;
          return (
            <div key={ex.name} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
              <span className="text-xl">{ex.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-medium">{ex.name}</span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">{ex.sets}×{ex.reps}{ex.isTime ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#60a5fa] to-[#34d399] transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] w-8 text-right">{d}/{ex.sets}</span>
                </div>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{ex.target} · {ex.cal * d} cal</p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: ex.sets }).map((_, i) => (
                  <button key={i} onClick={() => toggle(ex.name, ex.sets)}
                    className={`w-7 h-7 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer border ${
                      i < d ? 'bg-[#4f8fde] border-[#60a5fa]/30 text-white shadow-[0_2px_8px_rgba(96,165,250,0.15)]' : 'bg-white/[0.02] border-white/[0.05] text-[var(--color-text-muted)] hover:border-white/[0.1]'
                    }`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">Water Intake</span>
          <span className="text-[11px] font-mono text-[var(--color-text-muted)]">{water} / 8 cups</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i} onClick={() => setWater(i < water ? i : i + 1)}
              className={`flex-1 h-7 rounded-lg transition-all duration-200 cursor-pointer border ${i < water ? 'bg-[#38bdf8]/20 border-[#38bdf8]/30' : 'bg-white/[0.02] border-white/[0.04]'}`}>
              <span className={`text-[10px] ${i < water ? 'text-[#38bdf8]' : 'text-transparent'}`}>💧</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
