/**
 * ═══════════════════════════════════════════════════════════════
 * ANIMATION VARIANTS LIBRARY
 * ═══════════════════════════════════════════════════════════════
 *
 * Reusable Framer Motion animation variants for consistent
 * motion design across the portfolio.
 *
 * Each section has unique variants to create distinct personalities.
 */

import { Variants } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// COMMON VARIANTS
// ═══════════════════════════════════════════════════════════════

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// HERO / BOOT SEQUENCE
// ═══════════════════════════════════════════════════════════════

export const terminalLine: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
}

export const glitchText: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      repeat: 3,
      repeatType: 'reverse',
    },
  },
}

export const assemblePanel: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -90,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// PLAYER STATS / HUD
// ═══════════════════════════════════════════════════════════════

export const hudPanel: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotateY: -45,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export const statBar: Variants = {
  hidden: { width: 0 },
  visible: (value: number) => ({
    width: `${value}%`,
    transition: {
      duration: 1,
      delay: 0.3,
      ease: 'easeOut',
    },
  }),
}

export const countUp: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'backOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// SKILL TREE
// ═══════════════════════════════════════════════════════════════

export const skillNode: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  }),
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
}

export const skillConnection: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.5,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// QUEST LOG / TIMELINE
// ═══════════════════════════════════════════════════════════════

export const questCard: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotateY: 45,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export const timelineDot: Variants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.3,
      type: 'spring',
    },
  }),
}

export const timelineLine: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// MISSIONS / PROJECTS
// ═══════════════════════════════════════════════════════════════

export const missionCard: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -90,
    transformPerspective: 1200,
  },
  visible: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
  hover: {
    y: -10,
    boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
    transition: {
      duration: 0.3,
    },
  },
}

export const missionReveal: Variants = {
  hidden: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// ACHIEVEMENTS / BADGES
// ═══════════════════════════════════════════════════════════════

export const badgeUnlock: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      type: 'spring',
      stiffness: 200,
    },
  }),
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
}

export const badgeGlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// TECH ARSENAL
// ═══════════════════════════════════════════════════════════════

export const weaponSlot: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateZ: -10,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateZ: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
  hover: {
    y: -5,
    rotateZ: 5,
    transition: {
      duration: 0.2,
    },
  },
}

export const glitchEffect: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    x: [0, -2, 2, -2, 0],
    y: [0, 2, -2, 2, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// END GAME PORTAL
// ═══════════════════════════════════════════════════════════════

export const portalRing: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: 0,
  },
  visible: (i: number) => ({
    opacity: 0.6,
    scale: 1 + i * 0.2,
    rotate: 360,
    transition: {
      duration: 2,
      delay: i * 0.2,
      repeat: Infinity,
      ease: 'linear',
    },
  }),
}

export const portalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export const floatAnimation: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// CONTAINER VARIANTS (for stagger children)
// ═══════════════════════════════════════════════════════════════

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}
