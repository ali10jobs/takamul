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
  // 2× duplication — translateX(-50%) scrolls exactly one full set, then loops seamlessly
  const track = [...partners, ...partners];
  const duration = `${partners.length * 5}s`;

  return (
    <section className="bg-foreground/5 py-16 lg:py-24">
      <Container>
        <motion.p
          className="text-muted-foreground mb-12 text-center text-sm font-semibold tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.p>
      </Container>

      {/* Infinite scroll strip — CSS-driven on compositor thread */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="from-background pointer-events-none absolute inset-y-0 inset-s-0 z-10 w-24 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 inset-e-0 z-10 w-24 bg-linear-to-l to-transparent" />

        {/* w-max is critical — lets the div expand beyond viewport to fit all items */}
        <div
          className="animate-marquee flex w-max items-center gap-16"
          style={{ '--marquee-duration': duration } as React.CSSProperties}
        >
          {track.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex h-10 w-28 shrink-0 items-center justify-center opacity-40 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0"
              title={partner.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.logo} alt={partner.name} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
