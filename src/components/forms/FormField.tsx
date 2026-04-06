'use client';

import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, error, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-foreground text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs font-medium text-[var(--color-error)]">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ hasError, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'bg-background text-foreground placeholder:text-muted-foreground flex h-11 w-full rounded-xl border px-4 text-sm transition-colors focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-400)]/20 focus:outline-none',
        hasError ? 'border-[var(--color-error)]' : 'border-border',
        className
      )}
      {...props}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function Textarea({ hasError, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'bg-background text-foreground placeholder:text-muted-foreground flex min-h-[120px] w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-400)]/20 focus:outline-none',
        hasError ? 'border-[var(--color-error)]' : 'border-border',
        className
      )}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export function Select({ hasError, className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'bg-background text-foreground flex h-11 w-full appearance-none rounded-xl border px-4 text-sm transition-colors focus:border-[var(--color-primary-400)] focus:ring-2 focus:ring-[var(--color-primary-400)]/20 focus:outline-none',
        hasError ? 'border-[var(--color-error)]' : 'border-border',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
