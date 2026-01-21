// Animation constants

export const EASING = {
  reveal: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out-expo
  exit: 'cubic-bezier(0.7, 0, 0.84, 0)', // ease-in-expo
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out (gentle)
  snap: 'cubic-bezier(0.87, 0, 0.13, 1)', // ease-in-out-expo (faster)
} as const

export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  base: 0.6,
  slow: 1.0,
  epic: 1.8,
} as const

export const STAGGER = {
  letter: 0.02,
  listItem: 0.1,
  gridItem: 0.05,
} as const

// Section viewport heights
export const SECTION_HEIGHTS = {
  hero: 200, // vh
  profile: 300, // vh
  projectSegment: 150, // vh per project
  contact: 100, // vh
} as const

// Scroll trigger defaults
export const SCROLL_CONFIG = {
  scrub: 1.2,
  start: 'top top',
  end: 'bottom top',
} as const
