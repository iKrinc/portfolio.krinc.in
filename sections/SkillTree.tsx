'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { skillTree } from '@/data/portfolio-data'
import { skillNode, staggerFast } from '@/animations/variants'
import { SECTION_IDS } from '@/utils/constants'

export default function SkillTree() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  return (
    <section
      id={SECTION_IDS.SKILL_TREE}
      ref={sectionRef}
      className="section-container relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"
            style={{ left: `${i * 10}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Section title */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-responsive-xl text-gradient-primary mb-4">
          SKILL TREE
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Unlock the power of modern web development
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Skill categories grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerFast}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillTree.categories.map((category, categoryIndex) => (
            <SkillCategory
              key={category.id}
              category={category}
              index={categoryIndex}
              isSelected={selectedCategory === categoryIndex}
              onSelect={() =>
                setSelectedCategory(selectedCategory === categoryIndex ? null : categoryIndex)
              }
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SkillCategory({
  category,
  index,
  isSelected,
  onSelect,
  isInView,
}: {
  category: any
  index: number
  isSelected: boolean
  onSelect: () => void
  isInView: boolean
}) {
  return (
    <motion.div
      variants={skillNode}
      custom={index}
      className={`glass rounded-lg p-6 cursor-pointer transition-all duration-300 border ${
        isSelected ? 'border-primary shadow-neon-lg' : 'border-primary/20 hover:border-primary/50'
      }`}
      onClick={onSelect}
      whileHover="hover"
    >
      {/* Category header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div
            className="text-4xl"
            animate={isSelected ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {category.icon}
          </motion.div>
          <div>
            <h3
              className="font-heading text-lg"
              style={{ color: category.color }}
            >
              {category.name}
            </h3>
            <p className="text-xs text-text-tertiary font-mono">
              {category.skills.length} skills
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isSelected ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary"
        >
          ▼
        </motion.div>
      </div>

      {/* Category description */}
      <p className="text-sm text-text-secondary mb-4">
        {category.description}
      </p>

      {/* Skills list */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isSelected ? 'auto' : 0,
          opacity: isSelected ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-3 pt-4 border-t border-primary/20">
          {category.skills.map((skill: any, skillIndex: number) => (
            <SkillNode key={skillIndex} skill={skill} categoryColor={category.color} />
          ))}
        </div>
      </motion.div>

      {/* Progress ring (visible when collapsed) */}
      {!isSelected && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-text-tertiary mb-2">
            <span>Mastery</span>
            <span>{Math.round(category.skills.reduce((acc: number, s: any) => acc + s.level, 0) / category.skills.length)}%</span>
          </div>
          <div className="h-2 bg-background-primary rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: category.color }}
              initial={{ width: 0 }}
              animate={
                isInView
                  ? {
                      width: `${
                        category.skills.reduce((acc: number, s: any) => acc + s.level, 0) /
                        category.skills.length
                      }%`,
                    }
                  : {}
              }
              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

function SkillNode({ skill, categoryColor }: { skill: any; categoryColor: string }) {
  return (
    <motion.div
      className="flex items-center justify-between p-3 bg-background-primary/50 rounded-md hover:bg-background-primary transition-colors"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-sm text-text-primary">{skill.name}</span>
          <span
            className="font-mono text-xs px-2 py-1 rounded"
            style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
          >
            {skill.experience}
          </span>
        </div>

        {skill.note && (
          <p className="text-xs text-text-tertiary">{skill.note}</p>
        )}

        {/* Skill level bar */}
        <div className="mt-2 h-1.5 bg-background-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: categoryColor }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
