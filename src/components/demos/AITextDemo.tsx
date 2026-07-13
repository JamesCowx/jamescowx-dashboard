import { useState } from 'react';

const tones = ['Professional', 'Casual', 'Technical', 'Creative', 'Concise'];
const templates = [
  'Write a product launch announcement for our new analytics platform',
  'Draft a blog post about the future of AI in healthcare',
  'Create a social media post promoting our upcoming webinar',
  'Generate a professional email for a client follow-up',
];

export default function AITextDemo() {
  const [prompt, setPrompt] = useState(templates[0]);
  const [tone, setTone] = useState('Professional');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [words, setWords] = useState(0);

  function generate() {
    setGenerating(true);
    setResult('');
    const samples: Record<string, string> = {
      Professional: "I am pleased to announce the launch of our next-generation analytics platform. This release represents a significant milestone in our commitment to delivering actionable insights. Key features include real-time data processing, AI-driven recommendations, and seamless third-party integrations. We invite you to explore the platform and share your feedback.",
      Casual: "Hey everyone! We just shipped a huge update to our analytics platform and we're super excited about it. Think real-time dashboards, AI-powered insights, and a bunch of new integrations. Go check it out and let us know what you think!",
      Technical: "Version 3.2.0 introduces a redesigned ETL pipeline with sub-100ms latency, WebSocket-based real-time streaming, and a new REST API endpoint for batch processing. The inference engine now supports ONNX runtime with GPU acceleration. Migration guide available in docs.",
    };
    const text = samples[tone] || samples['Professional'];
    let i = 0;
    const timer = setInterval(() => {
      setResult(text.slice(0, i));
      setWords(Math.round(text.slice(0, i).split(' ').length));
      i += 2;
      if (i >= text.length) { clearInterval(timer); setGenerating(false); setResult(text); setWords(text.split(' ').length); }
    }, 25);
  }

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center text-sm">🤖</div>
          <div>
            <h3 className="text-sm font-semibold">NeuralScribe AI</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">GPT-4 · Content Generation</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-text-muted)]">{words} words</span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[#a78bfa] font-mono border border-[#a78bfa]/20">AI</span>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {tones.map((t) => (
          <button key={t} onClick={() => setTone(t)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${tone === t ? 'bg-white/[0.06] border-[#a78bfa]/30 text-[#a78bfa]' : 'bg-white/[0.01] border-white/[0.04] text-[var(--color-text-muted)] hover:text-white'}`}>{t}</button>
        ))}
      </div>

      <div>
        <label className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">Prompt</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 text-[12px] text-[var(--color-text-secondary)] outline-none focus:border-[#a78bfa]/20 resize-none h-20 font-mono" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {templates.map((t) => (
          <button key={t} onClick={() => setPrompt(t)} className="px-2.5 py-1 rounded-lg text-[10px] bg-white/[0.02] border border-white/[0.04] text-[var(--color-text-muted)] hover:text-white hover:border-white/[0.08] transition-all cursor-pointer">{t.slice(0, 40)}...</button>
        ))}
      </div>

      <button onClick={generate} disabled={generating || !prompt}
        className="w-full py-2.5 bg-[#a78bfa] text-white rounded-xl text-sm font-medium hover:shadow-[0_4px_20px_rgba(167,139,250,0.2)] disabled:opacity-30 transition-all cursor-pointer">
        {generating ? 'Generating...' : 'Generate with AI ✨'}
      </button>

      {result && (
        <div className="bg-white/[0.02] border border-[#a78bfa]/20 rounded-xl p-4">
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">{result}{generating && <span className="inline-block w-1.5 h-4 bg-[#a78bfa] animate-pulse ml-0.5 align-middle rounded-sm" />}</p>
        </div>
      )}
    </div>
  );
}
