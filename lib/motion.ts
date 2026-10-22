import type { Transition, Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.3,
  base: 0.7,
  slow: 1.1,
} as const;

export const STAGGER = 0.06;

export const SIGNATURE_DURATION = 2.4;

export const SIGNATURE_EASE = [0.65, 0, 0.35, 1] as const;

export const SIGNATURE_FONT = "Herr Von Muellerhoff";

export const LENIS_CONFIG = {
  lerp: 0.2,
  wheelMultiplier: 1,
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 1,
  autoRaf: true,
} as const;

export const transitionFast: Transition = {
  duration: DURATION.fast,
  ease: EASE,
};

export const transitionBase: Transition = {
  duration: DURATION.base,
  ease: EASE,
};

export const transitionSlow: Transition = {
  duration: DURATION.slow,
  ease: EASE,
};

export const lineMaskVariants: Variants = {
  hidden: { y: "110%" },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    y: 0,
    transition: {
      duration: custom?.duration ?? DURATION.slow,
      delay: custom?.delay ?? 0,
      ease: EASE,
    },
  }),
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? DURATION.base,
      delay: custom?.delay ?? 0,
      ease: EASE,
    },
  }),
};
