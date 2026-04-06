import type { Variants } from 'motion/react';
import { duration, ease } from './config';

/** Fade in from transparent */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: ease.outCubic },
  },
};

/** Fade up from below */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

/** Fade down from above */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

/**
 * Slide in from the inline-start direction.
 * Uses x offset — automatically respects RTL via parent dir context
 * since motion.dev transforms are relative to the element's flow.
 */
export const slideInStart: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

/** Slide in from the inline-end direction */
export const slideInEnd: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

/** Scale up from smaller */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: ease.outBack },
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

/** Page exit animation */
export const pageExit: Variants = {
  visible: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.fast, ease: ease.inOutCubic },
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
