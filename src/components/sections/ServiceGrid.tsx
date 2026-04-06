'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { viewport } from '@/animations/config';
import { useLocale } from '@/hooks/useLocale';
import type { Service } from '@/types/service';

interface ServiceItemDict {
  title: string;
  excerpt: string;
}

interface ServiceGridProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Record<string, ServiceItemDict>;
  services: Service[];
}

export function ServiceGrid({ eyebrow, title, subtitle, items, services }: ServiceGridProps) {
  const { locale } = useLocale();

  return (
    <section className="bg-muted/30 relative py-20 lg:py-28">
      {/* Top edge accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary-300)] to-transparent opacity-40" />

      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.08, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {services.map((service) => {
            const dict = items[service.id];
            if (!dict) return null;

            return (
              <motion.div key={service.id} variants={fadeUp}>
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group border-border bg-card relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:border-[var(--color-primary-300)] hover:shadow-[var(--color-primary-500)]/5 hover:shadow-xl"
                >
                  {/* Service number + icon row */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="inline-flex rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-50)] p-3 dark:from-[var(--color-primary-900)] dark:to-[var(--color-secondary-950)]">
                      <DynamicIcon
                        name={service.iconName}
                        className="h-6 w-6 text-[var(--color-primary-500)]"
                      />
                    </div>
                    <ArrowUpRight className="text-muted-foreground h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 rtl:group-hover:-translate-x-0.5" />
                  </div>

                  <h3 className="text-foreground mb-2 text-lg font-semibold transition-colors group-hover:text-[var(--color-primary-500)]">
                    {dict.title}
                  </h3>
                  <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                    {dict.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent on hover */}
                  <div className="origin-start absolute inset-x-0 bottom-0 h-0.5 scale-x-0 rounded-b-2xl bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-accent-400)] to-[var(--color-secondary-400)] transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
