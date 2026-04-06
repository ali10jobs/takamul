'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { viewport } from '@/animations/config';
import { Target, Eye, BookOpen, Users } from 'lucide-react';
import type { Dictionary } from '@/types/dictionary';
import type { Value } from '@/types/value';

interface AboutContentProps {
  dictionary: Dictionary;
  values: Value[];
  locale: string;
}

export function AboutContent({ dictionary, values }: AboutContentProps) {
  const { about, home } = dictionary;

  const pillars = [
    { dict: about.story, icon: BookOpen },
    { dict: about.mission, icon: Target },
    { dict: about.vision, icon: Eye },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute end-0 -top-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,var(--color-primary-400)_0%,transparent_70%)] opacity-15 blur-3xl" />
        </div>
        <Container className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block text-sm font-semibold tracking-[0.2em] text-[var(--color-primary-500)] uppercase"
          >
            {about.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-foreground mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {about.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg"
          >
            {about.hero.subtitle}
          </motion.p>
        </Container>
      </section>

      {/* Story, Mission, Vision */}
      <section className="py-16 lg:py-24">
        <Container>
          <motion.div
            className="grid gap-8 lg:grid-cols-3"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {pillars.map(({ dict: pillar, icon: Icon }) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="border-border bg-card rounded-2xl border p-8"
              >
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] p-3 dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-950)]">
                  <Icon className="h-6 w-6 text-[var(--color-primary-500)]" />
                </div>
                <h2 className="text-foreground mb-3 text-xl font-bold">{pillar.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow={home.values.eyebrow}
            title={home.values.title}
            subtitle={home.values.subtitle}
          />
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {values.map((value) => {
              const dict = home.values.items[value.id as keyof typeof home.values.items];
              if (!dict) return null;
              return (
                <motion.div
                  key={value.id}
                  variants={fadeUp}
                  className="border-border bg-card rounded-2xl border p-6 text-center"
                >
                  <div className="mx-auto mb-4 inline-flex rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] p-3 dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-950)]">
                    <DynamicIcon
                      name={value.iconName}
                      className="h-6 w-6 text-[var(--color-primary-500)]"
                    />
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">{dict.title}</h3>
                  <p className="text-muted-foreground text-sm">{dict.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading title={about.team.title} subtitle={about.team.subtitle} />
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group border-border bg-card overflow-hidden rounded-2xl border"
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] dark:from-[var(--color-primary-900)] dark:to-[var(--color-secondary-900)]">
                  <Users className="h-12 w-12 text-[var(--color-primary-300)]" />
                </div>
                <div className="p-4 text-center">
                  <div className="bg-muted mx-auto h-4 w-24 animate-pulse rounded" />
                  <div className="bg-muted mx-auto mt-2 h-3 w-16 animate-pulse rounded" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
