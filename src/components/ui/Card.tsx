'use client';

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { hoverLift, hoverGlow } from '@/animations/variants';

export interface CardProps {
  hoverable?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, children, ...props }, ref) => {
    if (hoverable) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'border-border bg-card text-card-foreground rounded-2xl border shadow-sm transition-colors',
            className
          )}
          initial="rest"
          whileHover="hover"
          variants={{
            rest: { ...hoverLift.rest, ...hoverGlow.rest },
            hover: {
              ...hoverLift.hover,
              ...hoverGlow.hover,
              transition: hoverLift.hover.transition,
            },
          }}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'border-border bg-card text-card-foreground rounded-2xl border shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pb-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center px-6 pb-6', className)} {...props} />;
}

export { Card, CardHeader, CardContent, CardFooter };
