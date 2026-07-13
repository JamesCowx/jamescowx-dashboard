import { useState } from 'react';

const starter = `<div style="
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  height:100%; gap:12px;
">
  <h2 style="color:#60a5fa; font-family:system-ui; margin:0;">
    Hello JamesCowx 👋
  </h2>
  <p style="color:#94a3b8; font-family:system-ui; margin:0; font-size:14px;">
    Edit the code to see live results
  </p>
  <div style="
    display:flex; gap:8px; margin-top:8px;
  ">
    <span style="
      padding:4px 12px; border-radius:8px;
      font-size:12px; font-family:monospace;
      background:rgba(96,165,250,0.15); color:#60a5fa;
    ">HTML</span>
    <span style="
      padding:4px 12px; border-radius:8px;
      font-size:12px; font-family:monospace;
      background:rgba(244,114,182,0.15); color:#f472b6;
    ">CSS</span>
    <span style="
      padding:4px 12px; border-radius:8px;
      font-size:12px; font-family:monospace;
      background:rgba(167,139,250,0.15); color:#a78bfa;
    ">JS</span>
  </div>
</div>`;

export default function CodePlayground() {
  const [html, setHtml] = useState(starter);
  const [css, setCss] = useState('body { margin:0; }');
  const [js, setJs] = useState('');
  const [tab, setTab] = useState<'html' | 'css' | 'js'>('html');

  const tabs = [
    { key: 'html' as const, label: 'HTML', color: '#60a5fa', value: html, set: setHtml },
    { key: 'css' as const, label: 'CSS', color: '#f472b6', value: css, set: setCss },
    { key: 'js' as const, label: 'JS', color: '#a78bfa', value: js, set: setJs },
  ];

  const current = tabs.find((t) => t.key === tab)!;
  const lineCount = current.value.split('\n').length;

  const srcDoc = `<!DOCTYPE html>
<html><head><style>
body{margin:0;background:#060810;color:#eef2ff;font-family:system-ui,Inter,sans-serif;}
${css}
</style></head>
<body>${html}<script>${js}</script></body></html>`;

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center text-sm">🖥</div>
          <div>
            <h3 className="text-sm font-semibold">Code Playground</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Live HTML/CSS/JS editor</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[var(--color-text-muted)] font-mono">{lineCount} lines</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-[11px] font-medium uppercase tracking-wider rounded-t-xl transition-all cursor-pointer border-b-0 ${tab === t.key ? `bg-white/[0.04] text-[${t.color}] border border-white/[0.06]` : 'text-[var(--color-text-muted)] hover:text-white'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <textarea value={current.value}
              onChange={(e) => current.set(e.target.value)}
              spellCheck={false}
              className="w-full h-[340px] bg-[#050710] border border-white/[0.04] rounded-b-xl rounded-tr-xl p-4 font-mono text-[13px] leading-relaxed text-[#e2e8f0] outline-none focus:border-[#60a5fa]/20 resize-none" />
            <div className="absolute top-2 right-3 flex flex-col gap-px">
              {current.value.split('\n').map((_, i) => (
                <span key={i} className="text-[9px] text-[var(--color-text-muted)]/30 font-mono text-right leading-[22px] select-none">{i + 1}</span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Live Preview</span>
          </div>
          <iframe srcDoc={srcDoc}
            className="w-full h-[340px] rounded-xl border border-white/[0.04] bg-white"
            sandbox="allow-scripts" title="Preview" />
        </div>
      </div>
    </div>
  );
}
