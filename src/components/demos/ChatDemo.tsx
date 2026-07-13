import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

const replies: Record<string, string> = {
  'hi': 'Hey there! How can I help you today? 👋',
  'hello': 'Hello! Welcome to EchoChat. What would you like to discuss?',
  'how are you': "I'm doing great, thanks for asking! How about you?",
  'help': 'Sure! I can help with general chat, tech questions, or just hanging out.',
  'bye': 'Goodbye! Have a wonderful day! 😊',
  'thanks': "You're welcome! Anything else I can help with?",
  'cool': "Right? Technology is amazing! What tech topics interest you?",
  'react': 'React is awesome! Are you using hooks, server components, or something specific?',
  'docker': 'Docker is essential for modern dev. Using compose files or standalone containers?',
};

function botReply(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const [key, reply] of Object.entries(replies)) {
    if (lower.includes(key)) return reply;
  }
  const fallbacks = [
    "That's interesting! Tell me more about that.",
    'I see what you mean. What are your thoughts?',
    'Good point! Have you considered other approaches?',
    "Fascinating! Let's explore that idea.",
    'I understand. How long have you been working on this?',
    'That sounds like a challenging problem to solve.',
    'Interesting perspective! What led you to that conclusion?',
    'You make a great point. I had not thought of it that way.',
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export default function ChatDemo() {
  const [msgs, setMsgs] = useState<Message[]>([
    { id: 0, text: 'Welcome to EchoChat! 👋 Messages are end-to-end encrypted. Try typing a message!', sender: 'bot', time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), status: 'read' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, isTyping]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const userMsg: Message = { id: Date.now(), text, sender: 'user', time, status: 'sent' };
    setMsgs((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMsgs((prev) => prev.map((m) => m.id === userMsg.id ? { ...m, status: 'read' } : m));
    }, 600);

    setTimeout(() => {
      setMsgs((prev) => [...prev, {
        id: Date.now() + 1,
        text: botReply(text),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        status: 'read',
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  }

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#f472b6] flex items-center justify-center text-xs font-bold">EC</div>
          <div>
            <h3 className="text-sm font-semibold">EchoChat Messenger</h3>
            <div className="flex items-center gap-1.5 text-[11px] text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Encrypted · Online
            </div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-md bg-white/[0.03] text-[var(--color-text-muted)] font-mono">
          🔒 E2EE · Signal Protocol
        </span>
      </div>

      <div className="h-[340px] overflow-y-auto space-y-3 pr-1">
        <AnimatePresence initial={false}>
          {msgs.map((msg) => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#f472b6] flex items-center justify-center text-[10px] font-bold shrink-0 mt-1 mr-2">EC</div>
              )}
              <div className={`max-w-[75%] ${msg.sender === 'user' ? 'order-1' : ''}`}>
                <div className={`px-3.5 py-2.5 text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-[#4f8fde] text-white rounded-2xl rounded-br-md'
                    : 'bg-white/[0.04] border border-white/[0.05] text-[var(--color-text-secondary)] rounded-2xl rounded-bl-md'}`}>
                  {msg.text}
                </div>
                <div className={`flex items-center gap-1.5 mt-1 ${msg.sender === 'user' ? 'justify-end' : 'pl-1'}`}>
                  <span className="text-[10px] text-[var(--color-text-muted)]">{msg.time}</span>
                  {msg.sender === 'user' && (
                    <span className="text-[10px]">
                      {msg.status === 'sent' && <span className="text-[var(--color-text-muted)]">✓</span>}
                      {msg.status === 'delivered' && <span className="text-[var(--color-text-muted)]">✓✓</span>}
                      {msg.status === 'read' && <span className="text-[#60a5fa]">✓✓</span>}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div className="flex justify-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#f472b6] flex items-center justify-center text-[10px] font-bold shrink-0 mt-1 mr-2">EC</div>
            <div className="bg-white/[0.04] border border-white/[0.05] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 150, 300].map((delay) => (
                  <span key={delay} className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[#60a5fa]/30 transition-all" />
        <button type="submit"
          className="w-10 h-10 rounded-2xl bg-[#4f8fde] text-white flex items-center justify-center hover:bg-[#60a5fa] hover:shadow-[0_4px_16px_rgba(96,165,250,0.25)] transition-all cursor-pointer shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>
        </button>
      </form>
    </div>
  );
}
