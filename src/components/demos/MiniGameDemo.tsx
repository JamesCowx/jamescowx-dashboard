import { useState, useEffect } from 'react';

interface Vec2 { x: number; y: number }

const COLORS = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#f87171', '#38bdf8'];

export default function MiniGameDemo() {
  const [ship, setShip] = useState<Vec2>({ x: 140, y: 260 });
  const [bullets, setBullets] = useState<Vec2[]>([]);
  const [targets, setTargets] = useState<Vec2[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || gameOver) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setShip((s) => ({ ...s, x: Math.max(0, s.x - 24) }));
      if (e.key === 'ArrowRight') setShip((s) => ({ ...s, x: Math.min(266, s.x + 24) }));
      if (e.key === ' ') {
        setBullets((b) => [...b, { x: ship.x + 12, y: ship.y - 8 }]);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [started, gameOver, ship]);

  useEffect(() => {
    if (!started || gameOver) return;
    const bInterval = setInterval(() => {
      setBullets((prev) => prev.map((b) => ({ ...b, y: b.y - 12 })).filter((b) => b.y > -20));
    }, 50);
    const tInterval = setInterval(() => {
      setTargets((prev) => {
        const moved = prev.map((t) => ({ ...t, y: t.y + 8 }));
        const alive = moved.filter((t) => t.y < 320);
        if (alive.length < 4 && Math.random() < 0.5) {
          alive.push({ x: Math.random() * 260, y: -20 });
        }
        return alive;
      });
    }, 60);
    return () => { clearInterval(bInterval); clearInterval(tInterval); };
  }, [started, gameOver]);

  useEffect(() => {
    if (!started || gameOver) return;
    const hit: number[] = [];
    const remaining: Vec2[] = [];
    targets.forEach((t, _ti) => {
      let alive = true;
      bullets.forEach((b, bi) => {
        if (Math.abs(b.x - t.x) < 16 && Math.abs(b.y - t.y) < 16) {
          setScore((s) => s + 10);
          hit.push(bi);
          alive = false;
        }
      });
      if (alive) remaining.push(t);
      if (t.y > 280) setGameOver(true);
    });
    if (hit.length) setBullets((b) => b.filter((_, i) => !hit.includes(i)));
    setTargets(remaining);
  }, [bullets, targets, started, gameOver]);

  function restart() { setShip({ x: 140, y: 260 }); setBullets([]); setTargets([]); setScore(0); setGameOver(false); setStarted(true); }

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#f472b6]/15 flex items-center justify-center text-sm">🎮</div>
          <div>
            <h3 className="text-sm font-semibold">Ember Engine</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Galaxy Shooter · Score: {score}</div>
          </div>
        </div>
        {!started && <button onClick={() => setStarted(true)} className="px-4 py-1.5 rounded-xl text-[11px] font-medium bg-[#f472b6] text-white hover:bg-[#ec4899] hover:shadow-[0_4px_16px_rgba(244,114,182,0.3)] transition-all cursor-pointer">Start</button>}
        {started && <button onClick={restart} className="px-3 py-1.5 rounded-xl text-[10px] font-medium bg-white/[0.03] border border-white/[0.06] text-[var(--color-text-muted)] hover:text-white transition-all cursor-pointer">↺</button>}
      </div>

      <div className="relative w-[280px] h-[300px] mx-auto bg-gradient-to-b from-[#050816] to-[#0a0c18] rounded-xl border border-white/[0.06] overflow-hidden">
        {!started && !gameOver && <div className="absolute inset-0 flex items-center justify-center text-[11px] text-[var(--color-text-muted)]">Press Start — ← → to move, Space to fire</div>}
        {gameOver && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10"><p className="text-white text-sm font-bold">Game Over</p><p className="text-[var(--color-text-muted)] text-[11px] mt-1">Score: {score}</p></div>}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-4 bg-[#f472b6] rounded-sm shadow-[0_0_10px_rgba(244,114,182,0.5)]" style={{ marginLeft: -12 }} />
        <div className="absolute" style={{ left: ship.x, top: ship.y }}>
          <div className="w-7 h-5 bg-[#a78bfa] clip-triangle shadow-[0_0_8px_rgba(167,139,250,0.4)]" />
        </div>
        {bullets.map((b, i) => <div key={i} className="absolute w-1 h-3 bg-[#f472b6] rounded-full shadow-[0_0_6px_rgba(244,114,182,0.6)]" style={{ left: b.x, top: b.y }} />)}
        {targets.map((t, i) => <div key={i} className="absolute w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] animate-pulse" style={{ left: t.x, top: t.y, borderColor: COLORS[i % COLORS.length], color: COLORS[i % COLORS.length], backgroundColor: COLORS[i % COLORS.length] + '15' }}>✦</div>)}
      </div>
    </div>
  );
}
