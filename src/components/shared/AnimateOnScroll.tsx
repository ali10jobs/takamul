'use client';

import { motion, type Variants } from 'motion/react';
import { viewport } from '@/animations/config';
import { fadeUp } from '@/animations/variants';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  as?: React.ElementType;
}

export function AnimateOnScroll({
  children,
  variants = fadeUp,
  className,
  as,
}: AnimateOnScrollProps) {
  const Component = as ? (motion.create(as) as typeof motion.div) : motion.div;

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </Component>
  );
}
