'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { viewport } from '@/animations/config';
import { useLocale } from '@/hooks/useLocale';

interface CTASectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

export function CTASection({ title, subtitle, ctaText }: CTASectionProps) {
  const { locale } = useLocale();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-900)] via-[var(--color-primary-800)] to-[var(--color-primary-950)]" />

      {/* Decorative mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute end-0 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,var(--color-accent-400)_0%,transparent_70%)] opacity-10 blur-3xl" />
        <div className="absolute start-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-400)_0%,transparent_70%)] opacity-10 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            variants={fadeUp}
            className="mx-auto my-6 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-secondary-400)]"
          />

          <motion.p variants={fadeUp} className="mb-10 text-lg text-white/70">
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-[var(--color-primary-800)]"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
