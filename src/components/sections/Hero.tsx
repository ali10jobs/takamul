'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FloatingPaths } from '@/components/ui/background-paths';
import { useLocale } from '@/hooks/useLocale';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
}

export function Hero({ eyebrow, title, subtitle, cta, ctaSecondary }: HeroProps) {
  const { locale } = useLocale();

  return (
    <section className="relative -mt-16 min-h-svh overflow-hidden lg:-mt-20">
      {/* Base background — light: soft blue-white, dark: deep navy */}
      <div className="absolute inset-0 z-0 bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-950)]" />

      {/* Floating path lines — light: slate tones, dark: white tones */}
      <div className="pointer-events-none absolute inset-0 z-[1] text-slate-900 opacity-40 dark:text-white dark:opacity-30">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex min-h-svh flex-col items-center justify-center py-24 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary-400)]/40 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[var(--color-primary-700)] uppercase backdrop-blur-sm dark:border-[var(--color-primary-500)]/30 dark:bg-[var(--color-primary-950)]/80 dark:text-[var(--color-primary-300)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary-500)] dark:bg-[var(--color-primary-400)]" />
            {eyebrow}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl text-4xl leading-[1.1] font-bold tracking-tight text-[var(--color-primary-900)] sm:text-5xl md:text-6xl lg:text-7xl dark:text-white"
        >
          {title}
        </motion.h1>

        {/* Decorative line under title */}
        <div className="relative my-6 flex w-120 max-w-full items-center justify-center gap-3">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-[var(--color-primary-400)] opacity-50 dark:to-[var(--color-primary-500)] dark:opacity-60" />
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)] opacity-80 dark:bg-[var(--color-accent-400)]" />
          <div className="h-px flex-1 bg-linear-to-l from-transparent to-[var(--color-primary-400)] opacity-50 dark:to-[var(--color-primary-500)] dark:opacity-60" />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--color-primary-700)] md:text-xl dark:text-[var(--color-primary-200)]"
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={`/${locale}/contact`}
            className="group flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary-400)] px-6 py-4 text-white hover:bg-[var(--color-primary-500)] dark:bg-[var(--color-primary-600)] dark:hover:bg-[var(--color-primary-700)]"
          >
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
          <Link
            href={`/${locale}/case-studies`}
            className="text-foreground/40 hover:text-foreground/80 hover:bg-foreground/10 rounded-full border border-white/60 px-6 py-4 dark:border-[var(--color-primary-600)] dark:text-[var(--color-primary-200)] dark:hover:bg-[var(--color-primary-900)]"
          >
            {ctaSecondary}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[var(--color-primary-400)]/40 p-1.5 dark:border-[var(--color-primary-500)]/30"
          >
            <motion.div className="h-2 w-1 rounded-full bg-[var(--color-primary-500)]/60 dark:bg-[var(--color-primary-400)]/50" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
