'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { viewport } from '@/animations/config';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialsSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  eyebrow,
  title,
  subtitle,
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="bg-muted/30 relative py-20 lg:py-28">
      {/* Accent edges */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary-300)] to-transparent opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary-300)] to-transparent opacity-40" />

      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              className="border-border bg-card relative rounded-2xl border p-6"
            >
              {/* Quote icon */}
              <Quote className="mb-4 h-8 w-8 text-[var(--color-primary-200)] dark:text-[var(--color-primary-800)]" />

              <blockquote className="text-foreground mb-6 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] text-sm font-bold text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-foreground text-sm font-semibold">{t.author}</p>
                  <p className="text-muted-foreground text-xs">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute end-0 top-0 h-12 w-12 overflow-hidden rounded-se-2xl">
                <div className="absolute end-0 top-0 h-16 w-16 translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-br from-[var(--color-primary-100)] to-transparent opacity-50 dark:from-[var(--color-primary-900)]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
