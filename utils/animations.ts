import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const scaleFade = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.85 },
} as const;

//===== Reusable hover scale effect =====//
export const hoverScale = {
  whileHover: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};

//===== Continuous floating motion for decorative shapes =====//
export const floatShape: Variants = {
  initial: { y: 0, x: 0 },
  animate: {
    y: [0, -20, 0],
    x: [0, 30, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

//===== Gradient background shift (two‑step cycle) =====//
export const gradientShift: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.05) 0%, transparent 50%)",
  },
  animate: {
    background:
      "radial-gradient(circle at 80% 50%, rgba(99,102,241,0.08) 0%, transparent 50%)",
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

//===== Gentle pulse scale =====//
export const pulseScale: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
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
      duration: 12,
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
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

//===== Slide down for mobile menu =====//
export const slideDown: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
