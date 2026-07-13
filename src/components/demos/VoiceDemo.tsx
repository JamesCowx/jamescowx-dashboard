import { useState, useEffect } from 'react';

const languages = [
  { name: 'English (US)', code: 'en-US', flag: '🇺🇸', confidence: 98 },
  { name: 'Spanish', code: 'es-ES', flag: '🇪🇸', confidence: 92 },
  { name: 'Mandarin', code: 'zh-CN', flag: '🇨🇳', confidence: 85 },
  { name: 'Arabic', code: 'ar-SA', flag: '🇸🇦', confidence: 78 },
  { name: 'Hindi', code: 'hi-IN', flag: '🇮🇳', confidence: 72 },
];

const transcripts = [
  { time: '0:00', text: 'Good morning. Today we\'re reviewing the Q3 revenue projections.' },
  { time: '0:04', text: 'Our team has identified three key growth areas in the Asian markets.' },
  { time: '0:09', text: 'First, expanding our cloud infrastructure in Southeast Asia.' },
  { time: '0:14', text: 'Second, launching localized versions of our SaaS platform.' },
  { time: '0:19', text: 'And third, establishing strategic partnerships with regional leaders.' },
];

const commands = [
  { icon: '🎤', label: 'Start Recording', shortcut: 'Ctrl+R' },
  { icon: '⏸', label: 'Pause', shortcut: 'Ctrl+P' },
  { icon: '📝', label: 'Transcribe', shortcut: 'Ctrl+T' },
  { icon: '🌐', label: 'Translate', shortcut: 'Ctrl+Shift+T' },
  { icon: '💾', label: 'Export', shortcut: 'Ctrl+S' },
];

export default function VoiceDemo() {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    if (!recording) return;
    const i = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(i);
  }, [recording]);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#f472b6]/15 flex items-center justify-center text-sm">🎙</div>
          <div>
            <h3 className="text-sm font-semibold">SynthVoice</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Speech-to-Text · Real-time</div>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${recording ? 'bg-red-400/10 text-red-400 animate-pulse' : 'bg-white/[0.03] text-[var(--color-text-muted)]'}`}>
          {recording ? `${elapsed}s` : 'Idle'}
        </span>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setRecording(!recording)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all cursor-pointer ${recording ? 'bg-red-400/20 text-red-400 shadow-[0_0_20px_rgba(248,113,113,0.3)]' : 'bg-[#f472b6]/15 text-[#f472b6] hover:bg-[#f472b6]/25'}`}>
            {recording ? '⬡' : '🎤'}
          </button>
          <div>
            <p className="text-[11px] font-medium text-white">{recording ? 'Recording...' : 'Ready to record'}</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">{recording ? 'Speak clearly into your microphone' : 'Click mic to start'}</p>
          </div>
        </div>
        <div className="flex -space-x-1">
          {[60, 40, 80, 50, 70].map((h, i) => (
            <div key={i} className={`w-1 rounded-full ${recording ? 'bg-[#f472b6]' : 'bg-white/[0.05]'} transition-all`} style={{ height: recording ? h : 20 }} />
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Live Transcript</p>
        {transcripts.map((t, i) => (
          <div key={i} className="flex gap-3 px-3 py-2 bg-white/[0.015] rounded-lg border border-white/[0.03] text-[11px]">
            <span className="text-[10px] font-mono text-[var(--color-text-muted)] w-8 shrink-0">{t.time}</span>
            <span className="text-[var(--color-text-secondary)]">{t.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <select value={selectedLang} onChange={(e) => setSelectedLang(Number(e.target.value))}
          className="flex-1 bg-white/[0.02] border border-white/[0.04] rounded-xl px-3 py-2 text-[11px] text-white outline-none appearance-none cursor-pointer">
          {languages.map((l, i) => (
            <option key={l.code} value={i} className="bg-[#0a0c18]">{l.flag} {l.name} ({l.confidence}%)</option>
          ))}
        </select>
        <button className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-[var(--color-text-muted)] rounded-xl text-[11px] hover:text-white transition-all cursor-pointer">⏬</button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {commands.map((cmd) => (
          <span key={cmd.label} className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-[var(--color-text-muted)]">
            <span>{cmd.icon}</span>
            <span>{cmd.label}</span>
            <span className="text-[8px] px-1 py-0.5 rounded bg-white/[0.03]">{cmd.shortcut}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
