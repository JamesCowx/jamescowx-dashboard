import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task { id: number; text: string; column: string; priority: string; }
const initial: Task[] = [
  { id: 1, text: 'Design onboarding flow', column: 'todo', priority: 'high' },
  { id: 2, text: 'Implement REST API v2', column: 'todo', priority: 'high' },
  { id: 3, text: 'Database migration plan', column: 'todo', priority: 'medium' },
  { id: 4, text: 'Set up CI/CD pipeline', column: 'in-progress', priority: 'high' },
  { id: 5, text: 'Write unit tests', column: 'in-progress', priority: 'medium' },
  { id: 6, text: 'Update documentation', column: 'review', priority: 'low' },
  { id: 7, text: 'Optimize DB queries', column: 'review', priority: 'medium' },
  { id: 8, text: 'Deploy staging env', column: 'done', priority: 'high' },
  { id: 9, text: 'Code review PR #142', column: 'done', priority: 'medium' },
];

const cols = [
  { id: 'todo', label: 'To Do', color: '#64748b', count: 3 },
  { id: 'in-progress', label: 'In Progress', color: '#60a5fa', count: 2 },
  { id: 'review', label: 'Review', color: '#fbbf24', count: 2 },
  { id: 'done', label: 'Done', color: '#34d399', count: 2 },
];

const priorityColors: Record<string, string> = { high: 'border-l-[#f87171]', medium: 'border-l-[#fbbf24]', low: 'border-l-[#64748b]' };
const priorityLabels: Record<string, string> = { high: '🔴', medium: '🟡', low: '⚪' };

export default function KanbanDemo() {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [newText, setNewText] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [dragId, setDragId] = useState<number | null>(null);

  function add() {
    if (!newText.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: newText.trim(), column: 'todo', priority: newPriority }]);
    setNewText('');
  }

  function move(id: number, to: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, column: to } : t)));
  }

  function remove(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#f472b6]/15 flex items-center justify-center text-sm">📋</div>
          <div>
            <h3 className="text-sm font-semibold">TaskWeaver Board</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">{tasks.length} tasks · Sprint 24</div>
          </div>
        </div>
        <div className="flex gap-2">
          <input value={newText} onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="New task..."
            className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-xs text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[#60a5fa]/30 w-40 transition-all" />
          <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}
            className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-2 py-2 text-xs text-white outline-none cursor-pointer">
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">⚪ Low</option>
          </select>
          <button onClick={add}
            className="px-4 py-2 bg-[#4f8fde] text-white rounded-xl text-xs font-medium hover:bg-[#60a5fa] hover:shadow-[0_4px_16px_rgba(96,165,250,0.2)] transition-all cursor-pointer">
            + Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cols.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);
          return (
            <div key={col.id} className="bg-white/[0.015] rounded-xl p-3 min-h-[260px] flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); if (dragId !== null) move(dragId, col.id); setDragId(null); }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                  <h4 className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{col.label}</h4>
                </div>
                <span className="text-[11px] font-bold text-[var(--color-text-muted)]">{colTasks.length}</span>
              </div>
              <div className="space-y-2 flex-1">
                <AnimatePresence>
                  {colTasks.map((task) => (
                    <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      draggable onDragStart={() => setDragId(task.id)} onDragEnd={() => setDragId(null)}
                      className={`bg-white/[0.02] border border-white/[0.04] border-l-2 ${priorityColors[task.priority]} rounded-lg p-2.5 cursor-grab active:cursor-grabbing hover:border-white/[0.1] transition-all group`}>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] mt-0.5">{priorityLabels[task.priority]}</span>
                        <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed flex-1">{task.text}</p>
                        <button onClick={() => remove(task.id)}
                          className="opacity-0 group-hover:opacity-100 text-[var(--color-text-muted)] hover:text-red-400 transition-all cursor-pointer text-sm">×</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {colTasks.length === 0 && (
                  <p className="text-[11px] text-[var(--color-text-muted)] text-center py-8">Drop tasks here</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
