'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { playerStats } from '@/data/portfolio-data'
import { hudPanel, statBar, countUp, staggerContainer } from '@/animations/variants'
import { SECTION_IDS } from '@/utils/constants'

export default function PlayerStats() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      id={SECTION_IDS.PLAYER_STATS}
      ref={sectionRef}
      className="section-container bg-background-secondary/50 relative"
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-responsive-xl text-gradient-primary mb-4">
          PLAYER PROFILE
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left column: Bio & Quick Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {/* Bio sections */}
          {playerStats.bio.map((section, index) => (
            <motion.div
              key={index}
              variants={hudPanel}
              custom={index}
              className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-heading text-xl text-primary mb-3 flex items-center">
                <span className="text-accent mr-2">{'>'}</span>
                {section.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}

          {/* Quick stats grid */}
          <motion.div
            variants={hudPanel}
            custom={playerStats.bio.length}
            className="grid grid-cols-2 gap-4"
          >
            {playerStats.quickStats.map((stat, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg text-center hover:scale-105 transition-transform"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-heading text-2xl text-primary mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-text-tertiary">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column: Attributes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-4"
        >
          <motion.div
            variants={hudPanel}
            custom={0}
            className="glass p-6 rounded-lg border border-secondary/20"
          >
            <h3 className="font-heading text-xl text-secondary mb-6 flex items-center">
              <span className="text-accent mr-2">{'>'}</span>
              CHARACTER ATTRIBUTES
            </h3>

            <div className="space-y-4">
              {playerStats.attributes.map((attr, index) => (
                <StatBar key={index} attr={attr} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>

          {/* Experience bar */}
          <motion.div
            variants={hudPanel}
            custom={1}
            className="glass p-6 rounded-lg border border-accent/20"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-heading text-accent">EXPERIENCE</span>
              <span className="font-mono text-sm text-text-secondary">
                {playerStats.experience.yearsActive} Years
              </span>
            </div>

            <div className="relative h-8 bg-background-primary rounded-full overflow-hidden border border-accent/30">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-warning to-accent"
                initial={{ width: 0 }}
                animate={
                  isInView
                    ? {
                        width: `${
                          (playerStats.experience.current / playerStats.experience.nextLevel) * 100
                        }%`,
                      }
                    : {}
                }
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs font-bold relative z-10">
                  {playerStats.experience.current} / {playerStats.experience.nextLevel} XP
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StatBar({
  attr,
  index,
  isInView,
}: {
  attr: { name: string; value: number; max: number; icon: string }
  index: number
  isInView: boolean
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 1000
    const steps = 60
    const increment = attr.value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= attr.value) {
        setDisplayValue(attr.value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, attr.value])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm text-text-primary flex items-center">
          <span className="mr-2">{attr.icon}</span>
          {attr.name}
        </span>
        <span className="font-mono text-sm text-primary font-bold">
          {displayValue}
        </span>
      </div>

      <div className="relative h-3 bg-background-primary rounded-full overflow-hidden border border-primary/20">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${attr.value}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary blur-md opacity-50"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${attr.value}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
