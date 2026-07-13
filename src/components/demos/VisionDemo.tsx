import { useState } from 'react';
import { motion } from 'framer-motion';

const mockDetections = [
  { label: 'Person (98%)', confidence: 98, color: '#60a5fa', x: 15, y: 8, w: 80, h: 70 },
  { label: 'Laptop (94%)', confidence: 94, color: '#f472b6', x: 40, y: 30, w: 50, h: 35 },
  { label: 'Coffee Cup (87%)', confidence: 87, color: '#a78bfa', x: 65, y: 55, w: 25, h: 30 },
  { label: 'Book (76%)', confidence: 76, color: '#34d399', x: 5, y: 60, w: 30, h: 25 },
  { label: 'Phone (69%)', confidence: 69, color: '#fbbf24', x: 20, y: 75, w: 15, h: 20 },
];

export default function VisionDemo() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof mockDetections | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inferenceTime, setInferenceTime] = useState<string | null>(null);

  const images = [
    { label: 'Office', emoji: '🏢', gradient: 'from-[#60a5fa]/10 via-[#0a0c18] to-[#f472b6]/5' },
    { label: 'Street', emoji: '🏙', gradient: 'from-[#f472b6]/10 via-[#0a0c18] to-[#a78bfa]/5' },
    { label: 'Nature', emoji: '🌲', gradient: 'from-[#34d399]/10 via-[#0a0c18] to-[#60a5fa]/5' },
  ];

  function analyze() {
    setAnalyzing(true);
    setResults(null);
    setInferenceTime(null);
    const time = (Math.random() * 100 + 30).toFixed(1);
    setTimeout(() => {
      setResults(mockDetections.map((d) => ({ ...d, confidence: Math.min(99, d.confidence + (Math.random() - 0.3) * 8) })));
      setInferenceTime(time);
      setAnalyzing(false);
    }, 1800);
  }

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center text-sm">👁</div>
          <div>
            <h3 className="text-sm font-semibold">VisionLens Detection</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">YOLOv8 · Real-time inference</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[var(--color-text-muted)] font-mono">{inferenceTime ? `${inferenceTime}ms` : 'idle'}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex gap-1.5">
            {images.map((img, i) => (
              <button key={i} onClick={() => { setSelectedImage(i); setResults(null); setInferenceTime(null); }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${selectedImage === i ? 'bg-white/[0.06] border-white/[0.1] text-white' : 'bg-white/[0.01] border-white/[0.04] text-[var(--color-text-muted)] hover:text-white'}`}>
                {img.emoji} {img.label}
              </button>
            ))}
          </div>

          <div className={`relative h-72 rounded-xl bg-gradient-to-br ${images[selectedImage].gradient} border border-white/[0.04] flex items-center justify-center overflow-hidden`}>
            <motion.span className="text-7xl opacity-10" animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity }}>
              {images[selectedImage].emoji}
            </motion.span>

            {analyzing && (
              <div className="absolute inset-0 bg-[#04050f]/80 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#60a5fa]/30 border-t-[#60a5fa] animate-spin" />
                  <p className="text-xs text-[#60a5fa] font-medium">Processing frame...</p>
                </div>
              </div>
            )}

            {results && !analyzing && results.map((det, i) => (
              <motion.div key={det.label}
                initial={{ opacity: 0, borderColor: 'transparent' }}
                animate={{ opacity: 1, borderColor: det.color }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="absolute border-2 rounded-lg"
                style={{ top: `${det.y}%`, left: `${det.x}%`, width: `${det.w}px`, height: `${det.h}px` }}>
                <span className="absolute -top-6 left-0 text-[10px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap"
                  style={{ backgroundColor: det.color, color: '#000', fontWeight: 600 }}>
                  {det.label}
                </span>
              </motion.div>
            ))}

            {results && !analyzing && (
              <div className="absolute bottom-3 left-3 text-[9px] text-[var(--color-text-muted)] font-mono bg-[#04050f]/80 px-2 py-1 rounded-lg border border-white/[0.04]">
                {results.length} objects · {inferenceTime}ms · {Math.round(1000 / Number(inferenceTime || 50))} FPS
              </div>
            )}
          </div>

          <button onClick={analyze} disabled={analyzing}
            className="w-full py-2.5 bg-[#4f8fde] text-white rounded-xl text-sm font-medium disabled:opacity-30 hover:bg-[#60a5fa] hover:shadow-[0_4px_16px_rgba(96,165,250,0.2)] transition-all cursor-pointer">
            {analyzing ? 'Scanning...' : results ? 'Scan Again' : 'Run Object Detection'}
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Results</h4>
            {results && <span className="text-[10px] text-[var(--color-text-muted)] font-mono">{results.length} objects</span>}
          </div>

          {!results ? (
            <div className="flex-1 flex items-center justify-center text-center py-20">
              <div className="space-y-2">
                <div className="text-3xl opacity-20">🔍</div>
                <p className="text-xs text-[var(--color-text-muted)]">Run detection to see results</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((det, i) => (
                <motion.div key={det.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: det.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-medium">{det.label}</span>
                      <span className="text-[11px] font-mono font-bold" style={{ color: det.color }}>{det.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: det.color }}
                        initial={{ width: 0 }} animate={{ width: `${det.confidence}%` }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
