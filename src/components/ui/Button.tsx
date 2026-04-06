'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-b from-[var(--color-primary-400)] to-[var(--color-primary-600)] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] hover:brightness-110 focus-visible:ring-[var(--color-primary-400)]',
        secondary:
          'bg-gradient-to-b from-[var(--color-secondary-400)] to-[var(--color-secondary-600)] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:brightness-110 focus-visible:ring-[var(--color-secondary-400)]',
        outline:
          'border-2 border-[var(--color-primary-300)] text-[var(--color-primary-600)] bg-transparent hover:bg-[var(--color-primary-50)] hover:border-[var(--color-primary-400)] focus-visible:ring-[var(--color-primary-400)]',
        ghost:
          'text-foreground bg-transparent hover:bg-muted focus-visible:ring-[var(--color-primary-400)]',
        accent:
          'bg-gradient-to-b from-[var(--color-accent-400)] to-[var(--color-accent-600)] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:brightness-110 focus-visible:ring-[var(--color-accent-400)]',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        md: 'h-11 px-6 text-sm rounded-xl',
        lg: 'h-13 px-8 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
