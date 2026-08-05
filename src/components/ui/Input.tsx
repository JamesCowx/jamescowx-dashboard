import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label>}
      <input
        id={id}
        className={`liquid-glass rounded-2xl px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all duration-300 focus:border-[var(--color-accent-blue)]/40 focus:ring-0 ${error ? '!border-red-500/30' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label>}
      <textarea
        id={id}
        className={`liquid-glass rounded-2xl px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all duration-300 focus:border-[var(--color-accent-blue)]/40 focus:ring-0 resize-none ${error ? '!border-red-500/30' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
