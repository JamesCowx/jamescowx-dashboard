import { motion } from 'framer-motion';

const messages = [
  { role: 'user', text: 'Create a function to merge two sorted arrays' },
  { role: 'assistant', text: '```\nfunction mergeSorted(a, b) {\n  const res = [];\n  let i = 0, j = 0;\n  while (i < a.length && j < b.length) {\n    res.push(a[i] < b[j] ? a[i++] : b[j++]);\n  }\n  return res.concat(a.slice(i)).concat(b.slice(j));\n}\n```' },
  { role: 'user', text: 'Add TypeScript types and JSDoc' },
  { role: 'assistant', text: '```ts\n/**\n * Merges two sorted arrays into one sorted array.\n * @param a - First sorted array\n * @param b - Second sorted array\n * @returns A new sorted array containing all elements\n */\nfunction mergeSorted<T extends number>(a: T[], b: T[]): T[] {\n  const res: T[] = [];\n  let i = 0, j = 0;\n  while (i < a.length && j < b.length) {\n    res.push(a[i] < b[j] ? a[i++] : b[j++]);\n  }\n  return res.concat(a.slice(i)).concat(b.slice(j));\n}\n```' },
];

export default function CodingAgentDemo() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/90">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]" style={{ background: '#1a1a1e' }}>
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: '#2a2a2e', border: '1px solid #dc2626' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-[#dc2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-white">CowxCode</span>
            <span className="text-[10px] text-[var(--color-text-muted)] ml-2">v2.0.0</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium border flex items-center gap-1" style={{ background: '#dc262615', color: '#dc2626', borderColor: '#dc262630' }}>
            <span className="w-1 h-1 rounded-full" style={{ background: '#dc2626' }} />
            Provider: OpenAI
          </span>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4 min-h-[280px]" style={{ background: '#121214' }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-xl px-4 py-3 text-[13px] leading-relaxed ${
              msg.role === 'user'
                ? 'rounded-br-lg'
                : 'rounded-bl-lg'
            }`}
              style={msg.role === 'user'
                ? { background: '#dc262615', border: '1px solid #dc262630' }
                : { background: '#1a1a1e', border: '1px solid #2a2a2e' }
              }
            >
              {msg.role === 'assistant' ? (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px]" style={{ background: '#dc2626', color: 'white' }}>C</span>
                    <span className="text-[10px] font-medium" style={{ color: '#dc2626' }}>CowxCode</span>
                  </div>
                  <pre className="text-[12px] font-mono whitespace-pre-wrap text-[var(--color-text-secondary)]">{msg.text}</pre>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5 justify-end">
                    <span className="text-[10px] font-medium text-[var(--color-text-muted)]">You</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)]">{msg.text}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-5 py-3 border-t border-white/[0.06]" style={{ background: '#1a1a1e' }}>
        <span className="flex-1 text-[12px] text-[var(--color-text-muted)]">Ask CowxCode to write, edit, or explain code...</span>
        <span className="text-[10px] px-2 py-1 rounded" style={{ background: '#2a2a2e', color: '#888' }}>Ctrl+K</span>
      </div>

      <div className="flex items-center justify-between px-5 py-2 text-[10px]" style={{ background: '#121214', borderTop: '1px solid #1a1a1e', color: '#555' }}>
        <div className="flex items-center gap-3">
          <span>⟐ 4 messages</span>
          <span>⟐ Model: gpt-4o</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Local: running
          </span>
        </div>
      </div>
    </div>
  );
}
