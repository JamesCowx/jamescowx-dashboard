import { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  { q: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], answer: 1, explanation: 'CSS = Cascading Style Sheets. It describes how HTML elements are displayed.' },
  { q: 'Which data structure uses LIFO?', options: ['Queue', 'Array', 'Stack', 'Linked List'], answer: 2, explanation: 'LIFO = Last In, First Out. Stacks work like a stack of plates — the last one on is the first one off.' },
  { q: 'Time complexity of binary search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'], answer: 2, explanation: 'Binary search halves the search space each iteration, giving O(log n) time complexity.' },
  { q: 'Which HTTP method is idempotent?', options: ['POST', 'PATCH', 'DELETE', 'GET'], answer: 3, explanation: 'GET requests are idempotent — making the same request multiple times produces the same result.' },
  { q: 'Docker uses ___ for container isolation.', options: ['Virtual Machines', 'Linux namespaces & cgroups', 'Hypervisors', 'Chroot only'], answer: 1, explanation: 'Docker relies on Linux kernel features: namespaces for isolation and cgroups for resource limiting.' },
];

export default function QuizDemo() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  function answer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setTimerActive(false);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    if (idx === questions[current].answer) setScore((s) => s + 1);
    setTimeout(() => setShowExplanation(true), 400);
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(answers[current + 1]);
      setShowExplanation(!!answers[current + 1]);
      setTimeLeft(30);
      setTimerActive(!answers[current + 1]);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setCurrent(0); setSelected(null); setScore(0); setFinished(false);
    setAnswers(new Array(questions.length).fill(null)); setShowExplanation(false);
    setTimeLeft(30); setTimerActive(true);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="liquid-glass rounded-2xl p-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-extrabold mb-4 ${pct >= 80 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : pct >= 60 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            {pct}%
          </div>
        </motion.div>
        <h3 className="text-xl font-bold mb-2">{pct >= 80 ? 'Outstanding!' : pct >= 60 ? 'Good effort!' : 'Keep learning!'}</h3>
        <p className="text-[var(--color-text-muted)] mb-6">{score} of {questions.length} correct</p>
        <div className="flex gap-2 justify-center mb-4">
          {answers.map((a, i) => (
            <span key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${a === questions[i].answer ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-red-500/15 text-red-400 border-red-500/30'}`}>
              {i + 1}
            </span>
          ))}
        </div>
        <button onClick={restart} className="px-6 py-2.5 bg-[#4f8fde] text-white rounded-xl text-sm font-medium hover:bg-[#60a5fa] hover:shadow-[0_4px_24px_rgba(96,165,250,0.25)] transition-all cursor-pointer">Try Again</button>
      </div>
    );
  }

  const q = questions[current];
  const progressW = ((current + (selected !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center text-sm">🧠</div>
          <div>
            <h3 className="text-sm font-semibold">Tech Quiz</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Question {current + 1} of {questions.length}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {timerActive && (
            <span className={`text-xs font-mono font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-[var(--color-text-muted)]'}`}>{timeLeft}s</span>
          )}
          <span className="text-[11px] text-[var(--color-text-muted)]">Score: {score}</span>
        </div>
      </div>

      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#f472b6]" animate={{ width: `${progressW}%` }} transition={{ duration: 0.4 }} />
      </div>

      <div className="flex gap-1.5 justify-center">
        {questions.map((_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'w-4 bg-[var(--color-accent-blue)]' : i < current ? (answers[i] === questions[i].answer ? 'bg-green-400' : 'bg-red-400') : 'bg-white/[0.08]'}`} />
        ))}
      </div>

      <h4 className="text-lg font-semibold leading-snug">{q.q}</h4>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let cls = 'bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] text-[var(--color-text-secondary)] hover:text-white';
          if (selected !== null) {
            if (i === q.answer) cls = 'bg-green-500/10 border-green-500/40 text-green-400';
            else if (i === selected && i !== q.answer) cls = 'bg-red-500/10 border-red-500/40 text-red-400';
            else cls = 'bg-white/[0.02] border-white/[0.05] text-[var(--color-text-muted)] opacity-50';
          }
          const isCorrect = selected !== null && i === q.answer;
          const isWrong = selected === i && i !== q.answer;
          return (
            <motion.button key={i} onClick={() => answer(i)} disabled={selected !== null}
              whileHover={selected === null ? { x: 4 } : {}}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all duration-300 cursor-pointer flex items-center gap-3 ${cls}`}>
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${selected === null ? 'bg-white/[0.06]' : isCorrect ? 'bg-green-500/20' : isWrong ? 'bg-red-500/20' : 'bg-white/[0.06]'}`}>
                {isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + i)}
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-start gap-2">
            <span className="text-sm">💡</span>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{q.explanation}</p>
          </div>
        </motion.div>
      )}

      {selected !== null && (
        <div className="text-center pt-2">
          <button onClick={next} className="px-6 py-2.5 bg-[#4f8fde] text-white rounded-xl text-sm font-medium hover:bg-[#60a5fa] hover:shadow-[0_4px_24px_rgba(96,165,250,0.25)] transition-all cursor-pointer">
            {current < questions.length - 1 ? 'Next Question →' : 'See Results ✨'}
          </button>
        </div>
      )}
    </div>
  );
}
