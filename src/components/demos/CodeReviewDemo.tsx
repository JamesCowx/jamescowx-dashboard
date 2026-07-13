import { useState } from 'react';

const files = [
  { name: 'api/routes/auth.ts', author: '@alice', time: '2h ago', comments: 3, status: 'changes-requested' },
  { name: 'src/components/Header.tsx', author: '@bob', time: '4h ago', comments: 7, status: 'approved' },
  { name: 'lib/database/migrations/012_add_users.sql', author: '@carol', time: '6h ago', comments: 1, status: 'pending' },
  { name: 'tests/api/auth.test.ts', author: '@alice', time: '8h ago', comments: 5, status: 'changes-requested' },
  { name: 'config/deploy.yml', author: '@dave', time: '12h ago', comments: 0, status: 'approved' },
  { name: 'docs/architecture.md', author: '@carol', time: '1d ago', comments: 12, status: 'pending' },
];

const commentList = [
  { file: 'api/routes/auth.ts', user: '@bob', text: 'Should we add rate limiting here?', line: 42, time: '2h ago' },
  { file: 'api/routes/auth.ts', user: '@carol', text: 'Use the RateLimit middleware from utils', line: 42, time: '1h ago' },
  { file: 'src/components/Header.tsx', user: '@alice', text: 'LGTM, great refactor', line: 15, time: '3h ago' },
  { file: 'tests/api/auth.test.ts', user: '@carol', text: 'Missing test for token refresh case', line: 88, time: '5h ago' },
  { file: 'tests/api/auth.test.ts', user: '@alice', text: 'Good catch, adding now', line: 88, time: '4h ago' },
];

const statusColors: Record<string, string> = {
  approved: 'text-green-400 border-green-400/30 bg-green-400/5',
  'changes-requested': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  pending: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
};

export default function CodeReviewDemo() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center text-sm">🔍</div>
          <div>
            <h3 className="text-sm font-semibold">CodeCollab</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Pull Request #142 · feat/user-auth</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">Open</span>
      </div>

      <div className="space-y-1">
        {files.map((f, i) => (
          <div key={f.name} onClick={() => setSelected(i)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-[11px] cursor-pointer transition-all ${selected === i ? 'bg-white/[0.04] border-white/[0.1]' : 'bg-white/[0.01] border-white/[0.03] hover:border-white/[0.07]'}`}>
            <span className="flex-1 truncate text-white">{f.name}</span>
            <span className="text-[var(--color-text-muted)]">{f.author}</span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${statusColors[f.status]}`}>{f.status.replace('-', ' ')}</span>
            {f.comments > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.03] text-[var(--color-text-muted)]">{f.comments}</span>}
          </div>
        ))}
      </div>

      {commentList.filter((c) => c.file === files[selected].name).length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Comments on this file</p>
          {commentList.filter((c) => c.file === files[selected].name).map((c, i) => (
            <div key={i} className="flex gap-3 p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
              <div className="w-1 shrink-0 bg-[#a78bfa]/30 rounded-full" />
              <div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="font-medium text-[#a78bfa]">{c.user}</span>
                  <span className="text-[var(--color-text-muted)]">L{c.line}</span>
                  <span className="text-[var(--color-text-muted)]">{c.time}</span>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button className="flex-1 py-2 bg-green-400/10 text-green-400 rounded-xl text-[11px] font-medium border border-green-400/20 hover:bg-green-400/15 transition-all cursor-pointer">✓ Approve</button>
        <button className="flex-1 py-2 bg-yellow-400/10 text-yellow-400 rounded-xl text-[11px] font-medium border border-yellow-400/20 hover:bg-yellow-400/15 transition-all cursor-pointer">Request Changes</button>
        <button className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-[var(--color-text-muted)] rounded-xl text-[11px] hover:text-white transition-all cursor-pointer">⏬</button>
      </div>
    </div>
  );
}
