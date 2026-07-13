import { useState } from 'react';

const tasks = [
  { id: 'T-101', name: 'Design system v2 migration', assignee: 'Alice', priority: 'high', progress: 75, start: 'Jul 1', end: 'Jul 20', deps: ['T-102'] },
  { id: 'T-102', name: 'API rate limiting middleware', assignee: 'Bob', priority: 'high', progress: 40, start: 'Jul 5', end: 'Jul 25', deps: [] },
  { id: 'T-103', name: 'User analytics dashboard', assignee: 'Carol', priority: 'medium', progress: 25, start: 'Jul 8', end: 'Aug 5', deps: ['T-101'] },
  { id: 'T-104', name: 'Database migration scripts', assignee: 'Dave', priority: 'critical', progress: 60, start: 'Jul 3', end: 'Jul 18', deps: [] },
  { id: 'T-105', name: 'E2E test suite setup', assignee: 'Eve', priority: 'medium', progress: 15, start: 'Jul 12', end: 'Aug 10', deps: ['T-102', 'T-106'] },
  { id: 'T-106', name: 'CI/CD pipeline optimization', assignee: 'Bob', priority: 'low', progress: 90, start: 'Jun 20', end: 'Jul 15', deps: [] },
  { id: 'T-107', name: 'Documentation refresh', assignee: 'Carol', priority: 'low', progress: 5, start: 'Jul 15', end: 'Aug 15', deps: ['T-101'] },
];

const priorityColors: Record<string, string> = {
  critical: '#f87171',
  high: '#fbbf24',
  medium: '#60a5fa',
  low: '#34d399',
};

const dayWidth = 28;
const startDate = new Date('2025-06-20');
const endDate = new Date('2025-08-15');
const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

function daysSinceStart(dateStr: string) {
  return Math.ceil((new Date(dateStr).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
}

function getWeekLabels() {
  const labels: string[] = [];
  const d = new Date(startDate);
  while (d <= endDate) {
    labels.push(`W${Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7)}`);
    d.setDate(d.getDate() + 7);
  }
  return labels;
}

export default function GanttDemo() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const weekLabels = getWeekLabels();

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#60a5fa]/15 flex items-center justify-center text-sm">📋</div>
          <div>
            <h3 className="text-sm font-semibold">TaskWeaver</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Sprint 15 · 7 tasks · Q3 2025</div>
          </div>
        </div>
        <button className="px-3 py-1.5 rounded-xl text-[10px] font-medium bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20 hover:bg-[#60a5fa]/15 transition-all cursor-pointer">+ Add Task</button>
      </div>

      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="min-w-[600px]">
          <div className="flex mb-1 ml-[130px]">
            {weekLabels.map((w, i) => (
              <div key={i} className="text-[9px] text-[var(--color-text-muted)] text-center font-mono" style={{ width: dayWidth * 7 }}>{w}</div>
            ))}
          </div>

          <div className="flex mb-2 ml-[130px]">
            {Array.from({ length: totalDays }).map((_, i) => {
              const d = new Date(startDate);
              d.setDate(d.getDate() + i);
              return (
                <div key={i} className="text-[8px] text-[var(--color-text-muted)] text-center font-mono border-l border-white/[0.03]" style={{ width: dayWidth }}>
                  {d.getDate()}
                </div>
              );
            })}
          </div>

          <div className="space-y-1.5 relative">
            {tasks.map((task) => {
              const start = daysSinceStart(task.start);
              const end = daysSinceStart(task.end);
              const dur = end - start;
              const isSelected = selectedTask === task.id;

              return (
                <div key={task.id} onClick={() => setSelectedTask(isSelected ? null : task.id)}
                  className="relative cursor-pointer transition-all">
                  <div className="flex items-center">
                    <div className="w-[130px] shrink-0 pr-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priorityColors[task.priority] }} />
                      <span className="text-[10px] font-mono text-[var(--color-text-muted)]">{task.id}</span>
                      <span className="text-[10px] text-white truncate">{task.name}</span>
                    </div>
                    <div className="relative h-7" style={{ width: totalDays * dayWidth }}>
                      <div className="absolute h-5 rounded-md opacity-30" style={{
                        left: start * dayWidth, width: dur * dayWidth,
                        backgroundColor: priorityColors[task.priority],
                      }} />
                      <div className="absolute h-5 rounded-md transition-all" style={{
                        left: start * dayWidth, width: (dur * task.progress / 100) * dayWidth,
                        backgroundColor: priorityColors[task.priority],
                        opacity: 0.7,
                        minWidth: task.progress > 0 ? 4 : 0,
                      }} />
                      <div className="absolute h-5 flex items-center px-2 text-[9px] text-white font-mono" style={{ left: (start + 0.5) * dayWidth }}>
                        {task.assignee}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-[130px] mt-1 p-2 bg-white/[0.02] rounded-lg border border-white/[0.04] text-[10px] text-[var(--color-text-muted)] flex gap-3">
                      <span>Progress: {task.progress}%</span>
                      <span>Start: {task.start}</span>
                      <span>End: {task.end}</span>
                      {task.deps.length > 0 && <span>Depends on: {task.deps.join(', ')}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[10px] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#f87171]" /> Critical</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#fbbf24]" /> High</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#60a5fa]" /> Medium</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#34d399]" /> Low</span>
      </div>
    </div>
  );
}
