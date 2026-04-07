import type { Variants } from 'motion/react';
import { duration, ease } from './config';

/** Fade up from below */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

/** Page enter animation */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.outExpo },
  },
};

/** Container that staggers its children */
export const staggerContainer = (staggerDelay = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/** Hover lift effect for cards */
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.02,
    transition: { duration: duration.fast, ease: ease.outBack },
  },
};

/** Subtle hover glow for interactive elements */
export const hoverGlow = {
  rest: { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  hover: {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    transition: { duration: duration.normal, ease: ease.outCubic },
  },
};
