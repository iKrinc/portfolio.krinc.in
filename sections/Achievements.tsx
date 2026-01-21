'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { achievements } from '@/data/portfolio-data'
import { badgeUnlock, badgeGlow, staggerFast } from '@/animations/variants'
import { SECTION_IDS, RARITY_COLORS } from '@/utils/constants'

export default function Achievements() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const groupedAchievements = {
    Legendary: achievements.filter((a) => a.rarity === 'Legendary'),
    Epic: achievements.filter((a) => a.rarity === 'Epic'),
    Rare: achievements.filter((a) => a.rarity === 'Rare'),
    Uncommon: achievements.filter((a) => a.rarity === 'Uncommon'),
    Common: achievements.filter((a) => a.rarity === 'Common'),
  }

  return (
    <section
      id={SECTION_IDS.ACHIEVEMENTS}
      ref={sectionRef}
      className="section-container bg-background-secondary/50 relative overflow-hidden"
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-responsive-xl text-gradient-primary mb-4">
          ACHIEVEMENT VAULT
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Badges earned, milestones reached, legends created
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Stats overview */}
      <motion.div
        className="max-w-4xl mx-auto mb-12 flex justify-center gap-4 flex-wrap"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="glass px-6 py-3 rounded-lg">
          <div className="font-mono text-xs text-text-tertiary">TOTAL UNLOCKED</div>
          <div className="font-heading text-3xl text-primary">
            {achievements.filter((a) => a.unlocked).length}
          </div>
        </div>
        {Object.entries(groupedAchievements).map(([rarity, items]) => (
          items.length > 0 && (
            <div key={rarity} className="glass px-4 py-2 rounded-lg">
              <div className="font-mono text-xs" style={{ color: RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] }}>
                {rarity.toUpperCase()}
              </div>
              <div className="font-heading text-xl text-center" style={{ color: RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] }}>
                {items.length}
              </div>
            </div>
          )
        ))}
      </motion.div>

      {/* Achievement badges */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={staggerFast}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {achievements.map((achievement, index) => (
          <AchievementBadge key={achievement.id} achievement={achievement} index={index} />
        ))}
      </motion.div>
    </section>
  )
}

function AchievementBadge({ achievement, index }: { achievement: any; index: number }) {
  const rarityColor = RARITY_COLORS[achievement.rarity as keyof typeof RARITY_COLORS]

  return (
    <motion.div
      variants={badgeUnlock}
      custom={index}
      whileHover="hover"
      className="relative group"
    >
      {/* Badge container */}
      <div
        className="relative aspect-square glass rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2"
        style={{
          borderColor: achievement.unlocked ? `${rarityColor}40` : 'transparent',
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
          style={{ backgroundColor: rarityColor }}
        />

        {/* Badge icon */}
        <motion.div
          className="text-5xl mb-2 relative z-10"
          style={{
            filter: achievement.unlocked ? 'none' : 'grayscale(100%) opacity(0.3)',
          }}
        >
          {achievement.icon}
        </motion.div>

        {/* Rarity indicator */}
        <div
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{ backgroundColor: rarityColor }}
        />

        {/* Unlock date (if unlocked) */}
        {achievement.unlocked && (
          <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-xs text-text-tertiary">
            {achievement.dateUnlocked}
          </div>
        )}

        {/* Pulsing glow for legendary */}
        {achievement.unlocked && achievement.rarity === 'Legendary' && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: rarityColor }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      {/* Tooltip on hover */}
      <motion.div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        <div className="glass border border-primary/30 rounded-lg p-3 min-w-[200px]">
          <div className="font-heading text-sm mb-1" style={{ color: rarityColor }}>
            {achievement.title}
          </div>
          <div className="text-xs text-text-secondary mb-2">
            {achievement.description}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs" style={{ color: rarityColor }}>
              {achievement.rarity}
            </span>
            {achievement.unlocked && (
              <span className="font-mono text-xs text-success">✓ Unlocked</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
