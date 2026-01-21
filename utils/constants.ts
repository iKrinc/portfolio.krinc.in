/**
 * Application-wide constants
 */

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
} as const

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1280,
  WIDE: 1536,
} as const

export const SECTION_IDS = {
  HERO: 'hero',
  PLAYER_STATS: 'player-stats',
  SKILL_TREE: 'skill-tree',
  QUEST_LOG: 'quest-log',
  MISSIONS: 'missions',
  ACHIEVEMENTS: 'achievements',
  TECH_ARSENAL: 'tech-arsenal',
  CONTACT: 'contact',
} as const

export const RARITY_COLORS = {
  Common: '#9CA3AF',
  Uncommon: '#10B981',
  Rare: '#3B82F6',
  Epic: '#A855F7',
  Legendary: '#F59E0B',
} as const
