import type { MotionProps, Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
  },
};

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const scaleFade = {
  hidden: { opacity: 0, scale: 0.94, y: 2 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -2,
    transition: { duration: 0.14, ease: [0.4, 0, 1, 1] },
  },
} as const;

//===== Reusable hover scale effect =====//
export const hoverScale: Pick<MotionProps, "whileHover" | "whileTap"> = {
  whileHover: {
    y: -2,
    scale: 1.012,
    transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.5 },
  },
  whileTap: { scale: 0.992, y: 0 },
};

//===== Continuous floating motion for decorative shapes =====//
export const floatShape: Variants = {
  initial: { y: 0, x: 0 },
  animate: {
    y: [0, -12, 0],
    x: [0, 14, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

//===== Gradient background shift (two‑step cycle) =====//
export const gradientShift: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 20% 50%, rgba(201,168,76,0.05) 0%, transparent 50%)",
  },
  animate: {
    background:
      "radial-gradient(circle at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 50%)",
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

//===== Gentle pulse scale =====//
export const pulseScale: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.025, 1],
    transition: {
      duration: 4.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

//===== Continuous rotation (orbit) =====//
export const orbit: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 18,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const orbitReverse: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: -360,
    transition: {
      duration: 22,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

//===== Slide down for mobile menu =====//
export const slideDown: Variants = {
  hidden: { opacity: 0, height: 0, y: -6 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -4,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};
