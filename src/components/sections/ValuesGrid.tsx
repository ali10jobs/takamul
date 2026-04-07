'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { viewport } from '@/animations/config';
import type { Value } from '@/types/value';

interface ValueItemDict {
  title: string;
  description: string;
}

interface ValuesGridProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Record<string, ValueItemDict>;
  values: Value[];
}

export function ValuesGrid({ eyebrow, title, subtitle, items, values }: ValuesGridProps) {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Subtle diagonal accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -start-20 top-0 h-full w-[1px] rotate-12 bg-gradient-to-b from-transparent via-[var(--color-primary-300)] to-transparent opacity-30 dark:via-[var(--color-primary-700)] dark:opacity-20" />
        <div className="absolute -end-10 top-0 h-full w-[1px] -rotate-12 bg-gradient-to-b from-transparent via-[var(--color-accent-300)] to-transparent opacity-20 dark:via-[var(--color-accent-700)] dark:opacity-15" />
      </div>

      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {values.map((value) => {
            const dict = items[value.id];
            if (!dict) return null;

            return (
              <motion.div
                key={value.id}
                variants={fadeUp}
                className="group border-border bg-card relative rounded-2xl border p-6 transition-all duration-300 hover:border-[var(--color-primary-300)] hover:shadow-[var(--color-primary-500)]/5 hover:shadow-lg dark:hover:border-[var(--color-primary-700)]"
              >
                {/* Icon container with gradient background */}
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] p-3 dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-950)]">
                  <DynamicIcon
                    name={value.iconName}
                    className="h-6 w-6 text-[var(--color-primary-500)]"
                  />
                </div>

                {/* Hover accent line */}
                <div className="origin-start absolute inset-x-6 top-0 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-accent-400)] transition-transform duration-300 group-hover:scale-x-100" />

                <h3 className="text-foreground mb-2 text-lg font-semibold">{dict.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{dict.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
