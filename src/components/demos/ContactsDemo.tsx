import { motion } from 'framer-motion';

const contacts = [
  { name: 'Sarah Chen', email: 'sarah@acme.com', phone: '+1 (604) 555-0123', company: 'Acme Corp', role: 'CTO', color: '#60a5fa' },
  { name: 'Marcus Webb', email: 'marcus@forge.io', phone: '+1 (778) 555-0456', company: 'Forge.io', role: 'Lead Engineer', color: '#a78bfa' },
  { name: 'Elena Rodriguez', email: 'elena@nexus.dev', phone: '+1 (250) 555-0789', company: 'Nexus Dev', role: 'Product Manager', color: '#f472b6' },
  { name: 'Dev Patel', email: 'dev@startup.ca', phone: '+1 (403) 555-0321', company: 'StartupCA', role: 'Founder', color: '#34d399' },
  { name: 'Jamie Torres', email: 'jamie@cloud9.com', phone: '+1 (514) 555-0654', company: 'Cloud9', role: 'DevOps Lead', color: '#fbbf24' },
  { name: 'Alex Kim', email: 'alex@dataflow.io', phone: '+1 (416) 555-0987', company: 'DataFlow', role: 'Data Scientist', color: '#38bdf8' },
];

export default function ContactsDemo() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a1a]/90">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <motion.div className="w-8 h-8 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-[#a78bfa]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </motion.div>
          <div>
            <span className="text-sm font-semibold text-white">Nexus Contacts</span>
            <span className="text-[10px] text-[var(--color-text-muted)] ml-2">v2.1.0</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-md bg-[#a78bfa]/10 text-[#a78bfa] text-[10px] border border-[#a78bfa]/20">
            {contacts.length} contacts
          </span>
        </div>
      </div>

      <div className="px-5 py-2 border-b border-white/[0.04] bg-white/[0.01] flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <span className="text-[10px] text-[var(--color-text-muted)]">Search contacts...</span>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {contacts.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors"
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: c.color + '20', color: c.color }}>
              {c.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-white">{c.name}</div>
              <div className="text-[10px] text-[var(--color-text-muted)]">{c.email}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-[var(--color-text-secondary)]">{c.company}</div>
              <div className="text-[10px] text-[var(--color-text-muted)]">{c.role}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06] bg-white/[0.01] text-[10px] text-[var(--color-text-muted)]">
        <span>{contacts.length} contacts · CSV import enabled</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          All synced
        </span>
      </div>
    </div>
  );
}
