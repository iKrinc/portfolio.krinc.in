'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { missions } from '@/data/portfolio-data'
import { missionCard, staggerContainer } from '@/animations/variants'
import { SECTION_IDS } from '@/utils/constants'

export default function Missions() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [selectedMission, setSelectedMission] = useState<string | null>(null)

  return (
    <section
      id={SECTION_IDS.MISSIONS}
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
        <h2 className="font-heading text-responsive-xl text-gradient-primary mb-4">
          MISSION ARCHIVE
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Epic battles fought, legendary projects delivered
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Missions grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {missions.map((mission, index) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            index={index}
            isSelected={selectedMission === mission.id}
            onSelect={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
          />
        ))}
      </motion.div>

      {/* Mission detail modal */}
      {selectedMission && (
        <MissionDetailModal
          mission={missions.find((m) => m.id === selectedMission)!}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </section>
  )
}

function MissionCard({
  mission,
  index,
  isSelected,
  onSelect,
}: {
  mission: any
  index: number
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      variants={missionCard}
      custom={index}
      whileHover="hover"
      className="glass rounded-lg overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer perspective-1000"
      onClick={onSelect}
    >
      {/* Mission header */}
      <div className="relative h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
        <motion.div
          className="text-6xl"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {mission.thumbnail}
        </motion.div>

        {/* Difficulty indicator */}
        <div className="absolute top-4 right-4 font-mono text-xs px-2 py-1 bg-background-primary/80 rounded">
          {mission.difficulty}
        </div>

        {/* Mission type badge */}
        <div className="absolute top-4 left-4 font-mono text-xs px-2 py-1 bg-accent/80 text-background-primary rounded">
          {mission.type}
        </div>
      </div>

      {/* Mission content */}
      <div className="p-6">
        <h3 className="font-heading text-lg text-primary mb-2 line-clamp-2">
          {mission.projectName}
        </h3>
        <p className="text-sm text-text-tertiary mb-3">{mission.subtitle}</p>

        <p className="text-sm text-text-secondary mb-4 line-clamp-3">
          {mission.tldr}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mission.technologies.slice(0, 3).map((tech: string, i: number) => (
            <span
              key={i}
              className="font-mono text-xs px-2 py-1 bg-background-primary text-text-secondary rounded"
            >
              {tech}
            </span>
          ))}
          {mission.technologies.length > 3 && (
            <span className="font-mono text-xs px-2 py-1 text-text-tertiary">
              +{mission.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Status and completion time */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-success">✓ {mission.status}</span>
          <span className="font-mono text-text-tertiary">{mission.completionTime}</span>
        </div>
      </div>
    </motion.div>
  )
}

function MissionDetailModal({ mission, onClose }: { mission: any; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-primary/90 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-lg border border-primary/50 p-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
        >
          ✕
        </button>

        {/* Mission header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="text-5xl">{mission.thumbnail}</div>
          <div className="flex-1">
            <h2 className="font-heading text-2xl text-primary mb-2">
              {mission.projectName}
            </h2>
            <p className="text-text-secondary mb-3">{mission.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-xs px-3 py-1 bg-accent/20 text-accent rounded">
                {mission.type}
              </span>
              <span className="font-mono text-xs px-3 py-1 bg-success/20 text-success rounded">
                {mission.status}
              </span>
              <span className="font-mono text-xs px-3 py-1 bg-primary/20 text-primary rounded">
                {mission.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Mission content sections */}
        <div className="space-y-6">
          <Section title="TL;DR" content={mission.tldr} />
          <Section title="Problem Context" content={mission.problemContext} />
          <Section title="My Role" content={mission.myRole} />
          <Section title="Approach & Architecture" content={mission.approachAndArchitecture} />

          {mission.keyFeatures && (
            <div>
              <h3 className="font-heading text-lg text-secondary mb-3">Key Features</h3>
              <ul className="space-y-2">
                {mission.keyFeatures.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2 text-text-secondary">
                    <span className="text-success mt-1">▸</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {mission.whatToCallOut && (
            <Section title="What to Call Out" content={mission.whatToCallOut} />
          )}

          {/* Technologies */}
          <div>
            <h3 className="font-heading text-lg text-secondary mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {mission.technologies.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="font-mono text-sm px-3 py-2 bg-background-primary border border-primary/20 text-primary rounded hover:border-primary/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="font-heading text-lg text-secondary mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{content}</p>
    </div>
  )
}
