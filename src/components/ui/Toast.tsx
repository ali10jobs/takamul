'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  open: boolean;
  onClose: () => void;
  duration?: number;
}

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const variantStyles: Record<ToastVariant, string> = {
  success:
    'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
  error:
    'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
  info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
};

export function Toast({ message, variant = 'info', open, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed end-6 bottom-6 z-50 flex max-w-sm items-center gap-3 rounded-xl border px-4 py-3 shadow-lg',
            variantStyles[variant]
          )}
        >
          {icons[variant]}
          <p className="flex-1 text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className="rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
