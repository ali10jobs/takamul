'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, staggerContainer } from '@/animations/variants';
import type { CaseStudy } from '@/types/case-study';

interface CaseStudyDetailContentProps {
  caseStudy: CaseStudy;
  dictionary: { title: string; excerpt: string; description: string };
  ctaText: string;
  backLabel: string;
  locale: string;
}

export function CaseStudyDetailContent({
  caseStudy,
  dictionary,
  ctaText,
  backLabel,
  locale,
}: CaseStudyDetailContentProps) {
  return (
    <div className="py-16 lg:py-24">
      <Container className="max-w-4xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/${locale}/case-studies`}
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {backLabel}
          </Link>
        </motion.div>

        <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
          {/* Hero image placeholder */}
          {/* <motion.div
            variants={fadeUp}
            className="mb-8 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-secondary-200)] sm:h-80 lg:h-96 dark:from-[var(--color-primary-800)] dark:to-[var(--color-secondary-800)]"
          /> */}
          <Image
            src={caseStudy.image}
            alt={dictionary.title}
            className="mb-8 w-full overflow-hidden rounded-2xl object-cover sm:h-80 lg:h-[800px]"
            width={800}
            height={450}
          />

          {/* Client + Title */}
          <motion.div variants={fadeUp}>
            <p className="mb-2 text-sm font-semibold tracking-wider text-[var(--color-primary-500)] uppercase">
              {caseStudy.client}
            </p>
            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {dictionary.title}
            </h1>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </motion.div>

          {/* Metrics */}
          <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-3">
            {caseStudy.metrics.map((m) => (
              <div
                key={m.label}
                className="border-border bg-card rounded-xl border p-4 text-center"
              >
                <p className="text-2xl font-bold text-[var(--color-primary-500)]">{m.value}</p>
                <p className="text-muted-foreground mt-1 text-sm">{m.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div variants={fadeUp} className="mt-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {dictionary.description}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-12">
            <Link
              className="rounded-full bg-[var(--color-primary-500)] px-6 py-4"
              href={`/${locale}/contact`}
            >
              {ctaText}
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
