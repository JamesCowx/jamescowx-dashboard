import { useState } from 'react';

const components = [
  { name: 'Primary Button', code: '<Button variant="primary">Click</Button>', preview: 'bg-[#4f8fde] text-white px-4 py-2 rounded-xl text-sm font-medium' },
  { name: 'Glass Card', code: '<Card accent="blue">Content</Card>', preview: 'bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl' },
  { name: 'Badge', code: '<Badge variant="pink">New</Badge>', preview: 'bg-[#f472b6]/10 text-[#f472b6] px-3 py-1 rounded-lg text-[11px] border border-[#f472b6]/20' },
  { name: 'Input Field', code: '<Input placeholder="Email" />', preview: 'bg-white/[0.02] border border-white/[0.06] px-3 py-2 rounded-xl text-sm text-[var(--color-text-muted)]' },
  { name: 'Toggle Switch', code: '<Toggle checked />', preview: 'w-10 h-5 rounded-full' },
  { name: 'Progress Bar', code: '<Progress value={75} />', preview: 'h-2 rounded-full overflow-hidden' },
];

export default function ComponentShowcase() {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(code: string) {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center text-sm">🎨</div>
          <div>
            <h3 className="text-sm font-semibold">OpenGrid</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Design System · 60+ Components · WCAG 2.1 AA</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[var(--color-text-muted)] font-mono">v2.4.0</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {components.map((comp) => (
          <div key={comp.name} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 hover:border-white/[0.1] transition-all group cursor-pointer" onClick={() => copy(comp.code)}>
            <div className="h-16 flex items-center justify-center mb-3 bg-white/[0.01] rounded-lg border border-white/[0.04]">
              {comp.name === 'Toggle Switch' ? (
                <div className="w-10 h-5 rounded-full bg-[#34d399] relative"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" /></div>
              ) : comp.name === 'Progress Bar' ? (
                <div className="w-24 h-2 bg-white/[0.04] rounded-full overflow-hidden"><div className="w-3/4 h-full rounded-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa]" /></div>
              ) : (
                <div className={`${comp.preview} whitespace-nowrap`}>{comp.name === 'Input Field' ? 'example@email.com' : comp.name === 'Glass Card' ? 'Card Content' : comp.name === 'Primary Button' ? 'Click Me' : comp.name === 'Badge' ? 'New' : ''}</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">{comp.name}</span>
              <span className="text-[10px] text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                {copied === comp.code ? 'Copied!' : 'Copy'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
