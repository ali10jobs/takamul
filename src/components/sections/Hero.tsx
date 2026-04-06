'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
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
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary radial — top-end corner */}
        <div className="absolute end-0 -top-1/4 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,var(--color-primary-400)_0%,transparent_70%)] opacity-20 blur-3xl" />
        {/* Secondary radial — bottom-start */}
        <div className="absolute start-0 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-400)_0%,transparent_70%)] opacity-15 blur-3xl" />
        {/* Accent glow — center */}
        <div className="absolute start-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-accent-400)_0%,transparent_70%)] opacity-10 blur-3xl" />
      </div>

      {/* Geometric grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-primary-500) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-500) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating geometric decorations */}
      <motion.div
        className="absolute end-[15%] top-20 h-20 w-20 rotate-45 rounded-sm border border-[var(--color-primary-300)] opacity-20"
        animate={{ rotate: [45, 90, 45], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute start-[10%] bottom-32 h-14 w-14 rounded-full border border-[var(--color-accent-400)] opacity-15"
        animate={{ scale: [1, 1.2, 1], y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute start-[8%] top-1/3 h-2 w-2 rounded-full bg-[var(--color-accent-400)] opacity-40"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute end-[8%] top-[60%] h-3 w-3 rounded-full bg-[var(--color-primary-400)] opacity-30"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.5, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content */}
      <Container className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center py-20 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary-300)]/30 bg-[var(--color-primary-50)] px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[var(--color-primary-600)] uppercase dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-300)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary-500)]" />
            {eyebrow}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-foreground mx-auto max-w-5xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {/* Decorative line under title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="my-6 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-accent-400)] to-[var(--color-secondary-400)]"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl"
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
          <Link href={`/${locale}/contact`}>
            <Button variant="primary" size="lg" className="group gap-2">
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
          <Link href={`/${locale}/case-studies`}>
            <Button variant="outline" size="lg">
              {ctaSecondary}
            </Button>
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
            className="border-muted-foreground/30 flex h-10 w-6 items-start justify-center rounded-full border-2 p-1.5"
          >
            <motion.div className="bg-muted-foreground/50 h-2 w-1 rounded-full" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
