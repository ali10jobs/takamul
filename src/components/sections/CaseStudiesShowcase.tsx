'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { viewport } from '@/animations/config';
import { useLocale } from '@/hooks/useLocale';
import type { CaseStudy } from '@/types/case-study';

interface CaseStudyItemDict {
  title: string;
  excerpt: string;
}

interface CaseStudiesShowcaseProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  filterAll: string;
  items: Record<string, CaseStudyItemDict>;
  caseStudies: CaseStudy[];
}

export function CaseStudiesShowcase({
  eyebrow,
  title,
  subtitle,
  filterAll,
  items,
  caseStudies,
}: CaseStudiesShowcaseProps) {
  const { locale } = useLocale();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect unique tags
  const allTags = Array.from(new Set(caseStudies.flatMap((cs) => cs.tags)));

  const filtered = activeTag
    ? caseStudies.filter((cs) => cs.tags.includes(activeTag))
    : caseStudies;

  return (
    <section className="relative py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        {/* Tag filter bar */}
        <motion.div
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeTag === null
                ? 'bg-[var(--color-primary-500)] text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {filterAll}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all ${
                activeTag === tag
                  ? 'bg-[var(--color-primary-500)] text-white shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Case study cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((cs) => {
              const dict = items[cs.id];
              if (!dict) return null;

              return (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/${locale}/case-studies/${cs.slug}`}
                    className="group border-border bg-card relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:border-[var(--color-primary-300)] hover:shadow-[var(--color-primary-500)]/5 hover:shadow-xl"
                  >
                    {/* Image placeholder with gradient overlay */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-secondary-200)] dark:from-[var(--color-primary-800)] dark:to-[var(--color-secondary-800)]">
                      <div className="from-card/80 absolute inset-0 bg-gradient-to-t to-transparent" />
                      {/* Client name overlay */}
                      <span className="text-muted-foreground absolute start-4 bottom-3 text-xs font-medium tracking-wider uppercase">
                        {cs.client}
                      </span>
                      <ArrowUpRight className="absolute end-4 top-4 h-5 w-5 text-white opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-foreground mb-2 text-xl font-semibold transition-colors group-hover:text-[var(--color-primary-500)]">
                        {dict.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
                        {dict.excerpt}
                      </p>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-2">
                        {cs.metrics.map((m) => (
                          <Badge key={m.label} variant="secondary">
                            {m.value} {m.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
