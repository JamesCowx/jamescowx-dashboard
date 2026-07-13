import { useState } from 'react';

const entries = [
  { date: '2025-07-12', mood: 'productive', title: 'Sprint Retro & New Architecture', preview: 'Today we wrapped up sprint 14. The team decided to adopt a micro-frontend architecture for the dashboard module. I\'ll be leading the migration...', tags: ['engineering', 'leadership'], likes: 12, comments: 3 },
  { date: '2025-07-11', mood: 'focused', title: 'Deep Dive into WebAssembly', preview: 'Spent the day experimenting with WASM for our image processing pipeline. The performance gains are staggering — 40x improvement over JS for pixel ops...', tags: ['wasm', 'performance'], likes: 18, comments: 5 },
  { date: '2025-07-10', mood: 'neutral', title: 'Code Review Culture', preview: 'We had a discussion about making code reviews more effective. Some key takeaways: keep PRs under 200 lines, use checklists, and always review within 4 hours...', tags: ['culture', 'best-practices'], likes: 9, comments: 2 },
  { date: '2025-07-09', mood: 'frustrated', title: 'Debugging a Memory Leak', preview: 'Spent 6 hours tracking down a memory leak in the real-time sync service. Turned out to be an unclosed WebSocket connection in the reconnection logic...', tags: ['debugging', 'backend'], likes: 24, comments: 7 },
  { date: '2025-07-08', mood: 'productive', title: 'Automated Migration Scripts', preview: 'Built a set of migration scripts to move our legacy database to the new schema. Zero-downtime migration with rollback support...', tags: ['devops', 'database'], likes: 15, comments: 4 },
];

const moodColors: Record<string, string> = {
  productive: '#34d399',
  focused: '#60a5fa',
  neutral: '#a78bfa',
  frustrated: '#f87171',
};

export default function JournalDemo() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center text-sm">📓</div>
          <div>
            <h3 className="text-sm font-semibold">VaultScribe</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Dev Journal · 142 entries this year</div>
          </div>
        </div>
        <button className="px-3 py-1.5 rounded-xl text-[10px] font-medium bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20 hover:bg-[#a78bfa]/15 transition-all cursor-pointer">+ New Entry</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {entries.map((e, i) => (
          <button key={e.date} onClick={() => setSelected(i)}
            className={`shrink-0 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${selected === i ? 'bg-white/[0.06] border-white/[0.1]' : 'bg-white/[0.01] border-white/[0.04] hover:border-white/[0.08]'}`}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: moodColors[e.mood] }} />
              <span className="text-[10px] text-[var(--color-text-muted)]">{e.date.slice(5)}</span>
            </div>
            <p className="text-[11px] font-medium text-white mt-1">{e.title.split(' ').slice(0, 3).join(' ')}…</p>
          </button>
        ))}
      </div>

      <div className="bg-white/[0.015] rounded-xl p-4 border border-white/[0.04] space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white">{entries[selected].title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: moodColors[entries[selected].mood] }} />
              <span className="text-[10px] text-[var(--color-text-muted)]">{entries[selected].date} · {entries[selected].mood}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
            <span>❤ {entries[selected].likes}</span>
            <span>💬 {entries[selected].comments}</span>
          </div>
        </div>
        <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">{entries[selected].preview}</p>
        <div className="flex gap-1.5">
          {entries[selected].tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[10px] text-[var(--color-text-muted)]">#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
