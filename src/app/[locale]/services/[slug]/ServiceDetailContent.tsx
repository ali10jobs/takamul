'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { fadeUp, staggerContainer } from '@/animations/variants';
import type { Service } from '@/types/service';

interface ServiceDetailContentProps {
  service: Service;
  dictionary: { title: string; excerpt: string; description: string };
  ctaText: string;
  locale: string;
}

export function ServiceDetailContent({
  service,
  dictionary,
  ctaText,
  locale,
}: ServiceDetailContentProps) {
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
            href={`/${locale}/services`}
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            Services
          </Link>
        </motion.div>

        <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
          {/* Icon + Title */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-50)] p-4 dark:from-[var(--color-primary-900)] dark:to-[var(--color-secondary-950)]">
              <DynamicIcon
                name={service.iconName}
                className="h-10 w-10 text-[var(--color-primary-500)]"
              />
            </div>
            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {dictionary.title}
            </h1>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div variants={fadeUp} className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {dictionary.description}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-12">
            <Link href={`/${locale}/contact`}>
              <Button variant="primary" size="lg">
                {ctaText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
