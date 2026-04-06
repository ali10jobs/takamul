'use client';

import { motion } from 'motion/react';
import { pageEnter } from '@/animations/variants';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div className={className} variants={pageEnter} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
