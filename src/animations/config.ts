/** Animation duration tokens (seconds) */
export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
  xslow: 1.0,
} as const;

/** Easing curves */
export const ease = {
  /** Smooth deceleration — great for entrances */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Snappy spring-like — great for micro-interactions */
  outBack: [0.34, 1.56, 0.64, 1] as const,
  /** Gentle ease — great for subtle movements */
  outCubic: [0.33, 1, 0.68, 1] as const,
  /** Standard ease in-out */
  inOutCubic: [0.65, 0, 0.35, 1] as const,
} as const;

/** Stagger delay between children (seconds) */
export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

/** Viewport trigger settings for scroll animations */
export const viewport = {
  once: true,
  amount: 0.2,
} as const;
