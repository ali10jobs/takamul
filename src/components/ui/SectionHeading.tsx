'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { viewport } from '@/animations/config';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'start' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-12 max-w-3xl lg:mb-16',
        align === 'center' && 'mx-auto text-center',
        align === 'start' && 'text-start',
        className
      )}
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="mb-3 inline-block text-sm font-semibold tracking-widest text-[var(--color-primary-500)] uppercase"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="text-muted-foreground mt-4 text-lg lg:text-xl">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
