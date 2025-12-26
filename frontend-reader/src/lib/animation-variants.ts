import type { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1], // Smooth, elegant easing
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const slideFade: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

// Container for staggered children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Time between each child
      delayChildren: 0.1, // Delay before first child
    },
  },
};

// Fast stagger for lists/grids
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Faster stagger for lists/grids
export const staggerContainerFaster: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

// Viewport options for scroll-triggered animations
export const viewportOptions = {
  once: true, // Animate only once
  margin: "-100px", // Trigger 100px before element enters viewport
  amount: 0.2, // Trigger when 20% of element is visible
};
