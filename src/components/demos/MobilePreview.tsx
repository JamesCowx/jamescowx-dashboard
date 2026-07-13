import { useState } from 'react';

const previews = [
  { name: 'Login Screen', emoji: '🔐', elements: ['Email field', 'Password field', 'Sign In button', 'Forgot password link'], color: '#60a5fa' },
  { name: 'Dashboard', emoji: '📊', elements: ['Header with avatar', '4 stat cards', 'Line chart', 'Recent activity list'], color: '#f472b6' },
  { name: 'Profile', emoji: '👤', elements: ['Avatar + cover photo', 'Edit form fields', 'Save changes button', 'Account settings'], color: '#a78bfa' },
  { name: 'Settings', emoji: '⚙', elements: ['Navigation sidebar', 'Toggle switches', 'Notification prefs', 'Theme selector'], color: '#34d399' },
  { name: 'Chat List', emoji: '💬', elements: ['Search bar', 'Contact list', 'Online indicators', 'Unread badges'], color: '#fbbf24' },
  { name: 'Media Gallery', emoji: '🖼', elements: ['Photo grid', 'Upload button', 'Album filters', 'Share options'], color: '#38bdf8' },
];

export default function MobilePreview() {
  const [selected, setSelected] = useState(0);
  const comp = previews[selected];

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#60a5fa]/15 flex items-center justify-center text-sm">📱</div>
          <div>
            <h3 className="text-sm font-semibold">SwiftUI Kit</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">iOS Components · 50+ Templates</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[var(--color-text-muted)] font-mono">iOS 18</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {previews.map((p, i) => (
          <button key={p.name} onClick={() => setSelected(i)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${selected === i ? 'bg-white/[0.06] border-white/[0.1] text-white' : 'bg-white/[0.01] border-white/[0.04] text-[var(--color-text-muted)] hover:text-white'}`}>
            {p.emoji} {p.name}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-[220px] h-[400px] rounded-[2.5rem] border-[3px] border-white/[0.1] bg-[#0a0c18] overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-2xl z-10" />
          <div className="h-full flex flex-col">
            <div className="h-10 flex items-center justify-center text-[10px] font-semibold text-white/80 border-b border-white/[0.04]">{comp.name}</div>
            <div className="flex-1 p-4 space-y-2.5 overflow-hidden">
              {comp.elements.map((el) => (
                <div key={el} className="rounded-lg py-2 px-3 text-[10px] text-[var(--color-text-muted)]" style={{ backgroundColor: comp.color + '10', borderLeft: `3px solid ${comp.color}` }}>
                  {el}
                </div>
              ))}
            </div>
            <div className="h-8 border-t border-white/[0.04] flex items-center justify-around">
              {['◻', '●', '⬡', '△'].map((icon, i) => (
                <span key={i} className="text-[14px] text-[var(--color-text-muted)]">{icon}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
