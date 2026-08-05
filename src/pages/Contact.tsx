import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHero from '@/components/layout/PageHero';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }

const contactInfo = [
  { icon: '📍', label: 'Location', value: 'Vancouver, B.C, Canada', color: '#60a5fa' },
  { icon: '✉️', label: 'Email', value: 'hello@jamescowx.com', color: '#f472b6' },
  { icon: '🌐', label: 'Website', value: 'www.jamescowx.com', color: '#a78bfa' },
];

const socialLinks = [
  { label: 'GitHub', handle: '@jamescowx', color: '#60a5fa', href: 'https://github.com/JamesCowx' },
  { label: 'LinkedIn', handle: 'in/jamescowx', color: '#f472b6', href: 'https://linkedin.com/in/jamescowx' },
  { label: 'Bluesky', handle: '@jamescowx', color: '#0085ff', href: 'https://bsky.app/profile/jamescowx.bsky.social' },
  { label: 'Discord', handle: 'jamescowx', color: '#a78bfa', href: '#' },
];

const FORMSPREE = 'https://formspree.io/f/xaqryngo';
const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormData>(() => {
    const pkg = searchParams.get('package');
    return {
      name: '',
      email: '',
      subject: pkg ? `Interested in the ${pkg} package` : '',
      message: pkg ? `Hi James, I'm interested in the ${pkg} package. Let's discuss!` : '',
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
    <>
      <Helmet>
        <title>Contact James Cowx — Hire a Full-Stack Developer | Vancouver, Canada</title>
        <meta name="description" content="Get in touch with James Cowx for web development, freelance projects, or collaborations. Full-stack developer in Vancouver, Canada. React, TypeScript, Node.js. Fast response." />
        <meta name="keywords" content="contact James Cowx, hire developer, Vancouver web developer, freelance React developer, TypeScript developer" />
        <link rel="canonical" href="https://jamescowx.com/contact" />
        <meta property="og:title" content="Contact James Cowx — Hire a Full-Stack Developer" />
        <meta property="og:description" content="Get in touch with James Cowx for web development, freelance projects, or collaborations." />
        <meta property="og:url" content="https://jamescowx.com/contact" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: 'https://jamescowx.com/contact',
            name: 'Contact James Cowx',
            description: 'Get in touch with James Cowx for web development, freelance projects, or collaborations.',
          })}
        </script>
      </Helmet>

      <PageHero
        eyebrow="Contact"
        title={<>Let's build something <span className="hero-gradient-text">together.</span></>}
        subtitle="Have a question or want to work together? Fill out the form and I'll get back to you within 24 hours."
        watermark="CT"
        accent="blue"
      />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ═══════ FORM ═══════ */}
          <div className="lg:col-span-2">
            <motion.div
              className="conic-border rounded-[2rem] p-[1px] h-full"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="rounded-[calc(2rem-1px)] bg-[var(--color-bg-primary)] p-7 sm:p-10 h-full relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(500px circle at 10% 0%, rgba(96,165,250,0.07), transparent 55%)' }} />
                <div className="relative z-10 h-full">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-20 h-full flex flex-col items-center justify-center"
                      >
                        <motion.div
                          className="w-20 h-20 rounded-2xl bg-green-400/10 flex items-center justify-center mb-6 border border-green-400/20"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                        >
                          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
                            <motion.polyline points="20 6 9 17 4 12" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }} />
                          </svg>
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-2 hero-gradient-text">Message Sent!</h2>
                        <p className="text-[var(--color-text-muted)] mb-8">Thanks for reaching out. I'll get back to you within 24 hours.</p>
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
                          <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#60a5fa]/20 to-[#f472b6]/20 border border-white/[0.08] flex items-center justify-center text-lg">✉</span>
                          <div>
                            <h2 className="text-lg font-bold">Send a Message</h2>
                            <p className="text-xs text-[var(--color-text-muted)]">I usually reply within 24 hours</p>
                          </div>
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
                </div>
              </div>
            </motion.div>
          </div>

          {/* ═══════ SIDE PANELS ═══════ */}
          <div className="space-y-6">
            <StaggerContainer className="space-y-6" staggerDelay={0.08}>
              <StaggerItem>
                <div className="liquid-glass rounded-2xl p-6 premium-card">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#60a5fa]/20 to-[#a78bfa]/20 border border-white/[0.08] flex items-center justify-center text-lg">📍</span>
                    <h2 className="text-base font-bold">Contact Info</h2>
                  </div>
                  <div className="space-y-4">
                    {contactInfo.map(({ icon, label, value, color }) => (
                      <div key={label} className="flex items-start gap-3.5 group">
                        <span className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 border border-white/[0.06] transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: color + '12', color }}>{icon}</span>
                        <div>
                          <p className="text-[11px] text-[var(--color-text-muted)]">{label}</p>
                          <p className="text-sm font-medium">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="liquid-glass rounded-2xl p-6 premium-card">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f472b6]/20 to-[#60a5fa]/20 border border-white/[0.08] flex items-center justify-center text-lg">@</span>
                    <h2 className="text-base font-bold">Social</h2>
                  </div>
                  <div className="space-y-2.5">
                    {socialLinks.map((sl) => (
                      <a key={sl.label} href={sl.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all group">
                        <span className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: sl.color + '15', color: sl.color }}>
                          {sl.label.slice(0, 2)}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white">{sl.label}</p>
                          <p className="text-[10px] text-[var(--color-text-muted)]">{sl.handle}</p>
                        </div>
                        <svg className="ml-auto w-3.5 h-3.5 text-[var(--color-text-muted)] group-hover:text-white group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                      </a>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="liquid-glass rounded-2xl p-6 premium-card">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#34d399]/20 to-[#60a5fa]/20 border border-white/[0.08] flex items-center justify-center text-lg">⏰</span>
                    <h2 className="text-base font-bold">Availability</h2>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex w-2.5 h-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                    </span>
                    <span className="text-sm font-medium text-green-400">Available for new projects</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Response time: within 24 hours
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
                    <span>🕐</span>
                    <span>Pacific Time (PST/PDT)</span>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  );
}
