'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { questLog } from '@/data/portfolio-data'
import { questCard, timelineDot, timelineLine, staggerContainer } from '@/animations/variants'
import { SECTION_IDS } from '@/utils/constants'

export default function QuestLog() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id={SECTION_IDS.QUEST_LOG}
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
          QUEST LOG
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          My journey through the realms of code
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <motion.div
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent origin-top"
          variants={timelineLine}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        {/* Quest cards */}
        <motion.div
          className="space-y-12"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {questLog.map((quest, index) => (
            <QuestCard key={quest.id} quest={quest} index={index} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function QuestCard({ quest, index, isInView }: { quest: any; index: number; isInView: boolean }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className={`relative flex items-center ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col`}
      variants={questCard}
      custom={index}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background-primary z-10"
        variants={timelineDot}
        custom={index}
        whileHover={{ scale: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-primary rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        />
      </motion.div>

      {/* Quest card content */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'} pl-20 md:pl-0`}>
        <motion.div
          className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 perspective-1000"
          whileHover={{ scale: 1.02, rotateY: isEven ? 2 : -2 }}
        >
          {/* Quest header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{quest.icon}</span>
                <span className="font-mono text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                  {quest.type}
                </span>
                <span
                  className={`font-mono text-xs px-2 py-1 rounded ${
                    quest.status === 'Completed'
                      ? 'bg-success/20 text-success'
                      : 'bg-accent/20 text-accent'
                  }`}
                >
                  {quest.status}
                </span>
              </div>
              <h3 className="font-heading text-xl text-primary mb-1">
                {quest.title}
              </h3>
              <p className="text-sm text-text-secondary">{quest.company}</p>
            </div>
          </div>

          {/* Duration */}
          <div className="font-mono text-xs text-accent mb-4">
            {quest.duration}
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-4">
            {quest.description}
          </p>

          {/* Achievements */}
          <div className="space-y-2 mb-4">
            <div className="font-mono text-xs text-text-tertiary uppercase">
              Achievements Unlocked:
            </div>
            {quest.achievements.map((achievement: string, i: number) => (
              <motion.div
                key={i}
                className="flex items-start space-x-2 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="text-success mt-1">✓</span>
                <span className="text-text-secondary flex-1">{achievement}</span>
              </motion.div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {quest.techUsed.map((tech: string, i: number) => (
              <span
                key={i}
                className="font-mono text-xs px-2 py-1 bg-background-primary text-text-secondary rounded hover:text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  )
}
