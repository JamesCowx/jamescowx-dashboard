import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import GlassPanel from '@/components/ui/GlassPanel';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }

const contactInfo = [
  { icon: '📍', label: 'Location', value: 'Vancouver, B.C, Canada' },
  { icon: '✉️', label: 'Email', value: 'hello@jamescowx.com' },
  { icon: '🌐', label: 'Website', value: 'www.jamescowx.com' },
];

const socialLinks = [
  { label: 'GitHub', handle: '@jamescowx', color: '#60a5fa', href: 'https://github.com/JamesCowx' },
  { label: 'LinkedIn', handle: 'in/jamescowx', color: '#f472b6', href: 'https://linkedin.com/in/jamescowx' },
  { label: 'Bluesky', handle: '@jamescowx', color: '#0085ff', href: 'https://bsky.app/profile/jamescowx' },
  { label: 'Discord', handle: 'jamescowx', color: '#a78bfa', href: '#' },
];

const FORMSPREE = 'https://formspree.io/f/xaqryngo';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormData>(() => {
    const pkg = searchParams.get('package');
    return {
      name: '',
      email: '',
      subject: pkg ? `Interested in the ${pkg} package` : '',
      message: pkg ? `Hi James, I'm interested in the **${pkg}** package. Let's discuss!` : '',
    };
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSubmitError('');
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setSubmitError('Something went wrong. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent-blue)]" />
              <span className="text-[11px] text-[var(--color-accent-blue)] font-semibold uppercase tracking-[0.2em]">Contact</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-accent-blue)]" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Get In <span className="gradient-text-mixed">Touch</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
              Have a question or want to work together? Fill out the form and I'll get back to you.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SlideUp>
              <GlassPanel>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-green-400/10 flex items-center justify-center mx-auto mb-5 border border-green-400/20">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <h2 className="text-2xl font-bold mb-2 gradient-text-mixed">Message Sent!</h2>
                      <p className="text-[var(--color-text-muted)] mb-6">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                      <Button variant="outline" accent="blue" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-blue)]/10 flex items-center justify-center text-sm">✉</div>
                        <h2 className="text-lg font-semibold">Send a Message</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input label="Name" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
                        <Input label="Email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
                      </div>
                      <Input label="Subject" placeholder="What's this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} error={errors.subject} />
                      <Textarea label="Message" placeholder="Tell me about your project or idea..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} />
                      {submitError && (
                        <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{submitError}</p>
                      )}
                      <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" accent="mixed" size="lg" disabled={sending}>
                          {sending ? 'Sending...' : 'Send Message'}
                          {!sending && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          )}
                        </Button>
                        <span className="text-[11px] text-[var(--color-text-muted)]">Response within 24h</span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </GlassPanel>
            </SlideUp>
          </div>

          <div className="space-y-6">
            <SlideUp delay={0.1}>
              <GlassPanel>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-blue)]/10 flex items-center justify-center text-sm">📍</div>
                  <h2 className="text-base font-semibold">Contact Info</h2>
                </div>
                <div className="space-y-5">
                  {contactInfo.map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="text-base mt-0.5">{icon}</span>
                      <div>
                        <p className="text-[11px] text-[var(--color-text-muted)]">{label}</p>
                        <p className="text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </SlideUp>

            <SlideUp delay={0.15}>
              <GlassPanel>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-pink)]/10 flex items-center justify-center text-sm">@</div>
                  <h2 className="text-base font-semibold">Social</h2>
                </div>
                <div className="space-y-2.5">
                  {socialLinks.map((sl) => (
                    <a key={sl.label} href={sl.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all group">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: sl.color + '15', color: sl.color }}>
                        {sl.label.slice(0, 2)}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{sl.label}</p>
                        <p className="text-[10px] text-[var(--color-text-muted)]">{sl.handle}</p>
                      </div>
                      <svg className="ml-auto w-3.5 h-3.5 text-[var(--color-text-muted)] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                    </a>
                  ))}
                </div>
              </GlassPanel>
            </SlideUp>

            <SlideUp delay={0.2}>
              <GlassPanel>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center text-sm">⏰</div>
                  <h2 className="text-base font-semibold">Availability</h2>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium text-green-400">Available for new projects</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Response time: within 24 hours
                </p>
                <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
                  <span>🕐</span>
                  <span>Pacific Time (PST/PDT)</span>
                </div>
              </GlassPanel>
            </SlideUp>
          </div>
        </div>
      </div>
    </div>
  );
}
