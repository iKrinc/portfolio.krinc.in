'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { techArsenal } from '@/data/portfolio-data'
import { weaponSlot, glitchEffect, staggerContainer } from '@/animations/variants'
import { SECTION_IDS } from '@/utils/constants'

export default function TechArsenal() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id={SECTION_IDS.TECH_ARSENAL}
      ref={sectionRef}
      className="section-container relative"
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="font-heading text-responsive-xl text-gradient-primary mb-4"
          variants={glitchEffect}
          animate={isInView ? 'visible' : 'hidden'}
        >
          TECH ARSENAL
        </motion.h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          My equipment loadout for conquering digital realms
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Weapons (Primary & Secondary) */}
        <ArsenalCategory
          title="⚔️ WEAPONS"
          subtitle="Primary & Secondary Technologies"
          items={[
            { label: 'PRIMARY', items: techArsenal.weapons.primary },
            { label: 'SECONDARY', items: techArsenal.weapons.secondary },
          ]}
          isInView={isInView}
          type="weapon"
        />

        {/* Armor (Testing) */}
        <ArsenalCategory
          title="🛡️ ARMOR"
          subtitle="Testing & Quality Assurance"
          items={[{ label: 'TESTING', items: techArsenal.armor.testing }]}
          isInView={isInView}
          type="armor"
        />

        {/* Accessories (Productivity) */}
        <ArsenalCategory
          title="💎 ACCESSORIES"
          subtitle="Productivity & Development Tools"
          items={[{ label: 'PRODUCTIVITY', items: techArsenal.accessories.productivity }]}
          isInView={isInView}
          type="accessory"
        />

        {/* Consumables (Daily) */}
        <ArsenalCategory
          title="⚗️ CONSUMABLES"
          subtitle="Daily Essentials"
          items={[{ label: 'DAILY', items: techArsenal.consumables.daily }]}
          isInView={isInView}
          type="consumable"
        />
      </div>
    </section>
  )
}

function ArsenalCategory({
  title,
  subtitle,
  items,
  isInView,
  type,
}: {
  title: string
  subtitle: string
  items: { label: string; items: any[] }[]
  isInView: boolean
  type: string
}) {
  return (
    <motion.div
      className="glass rounded-lg p-6 md:p-8 border border-primary/20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-tertiary font-mono">{subtitle}</p>
      </div>

      <div className="space-y-8">
        {items.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="font-mono text-xs text-accent mb-4 uppercase tracking-wider">
              {category.label}
            </div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {category.items.map((item: any, index: number) => (
                <TechItem key={index} item={item} index={index} type={type} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function TechItem({ item, index, type }: { item: any; index: number; type: string }) {
  const getStatDisplay = () => {
    if (item.power) return `PWR: ${item.power}`
    if (item.defense) return `DEF: ${item.defense}`
    if (item.bonus) return item.bonus
    if (item.effect) return item.effect
    return ''
  }

  const getStatColor = () => {
    if (item.power || item.defense) {
      const value = item.power || item.defense
      if (value >= 90) return 'text-accent'
      if (value >= 80) return 'text-primary'
      return 'text-secondary'
    }
    return 'text-success'
  }

  return (
    <motion.div
      variants={weaponSlot}
      custom={index}
      whileHover="hover"
      className="relative group"
    >
      <div className="aspect-square glass rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer border border-primary/10 hover:border-primary/50 transition-all duration-300">
        {/* Icon */}
        <motion.div
          className="text-4xl mb-2"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {item.icon}
        </motion.div>

        {/* Name */}
        <div className="font-mono text-xs text-center text-text-primary line-clamp-2 mb-1">
          {item.name}
        </div>

        {/* Stat */}
        <div className={`font-mono text-xs ${getStatColor()}`}>
          {getStatDisplay()}
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-primary blur-md opacity-0 group-hover:opacity-20 transition-opacity -z-10"
        />
      </div>

      {/* Tooltip on hover (desktop only) */}
      <div className="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
        <div className="glass border border-primary/30 rounded px-3 py-2 whitespace-nowrap">
          <div className="font-mono text-sm text-primary">{item.name}</div>
          <div className={`font-mono text-xs ${getStatColor()}`}>
            {getStatDisplay()}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
