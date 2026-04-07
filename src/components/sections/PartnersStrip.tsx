'use client';

import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { viewport } from '@/animations/config';
import type { Partner } from '@/data/partners';

interface PartnersStripProps {
  title: string;
  partners: Partner[];
}

export function PartnersStrip({ title, partners }: PartnersStripProps) {
  // Double the array for seamless infinite scroll
  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <motion.p
          className="text-muted-foreground mb-10 text-center text-sm font-semibold tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.p>
      </Container>

      {/* Infinite scroll strip */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="from-background pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-l to-transparent" />

        <motion.div
          className="flex w-max items-center gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {doubled.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex h-12 w-32 shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              title={partner.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.logo} alt={partner.name} className="h-full w-full object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
