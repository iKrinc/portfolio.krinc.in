'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import type { ProjectData, ProjectFocusState } from '@/lib/types'

interface ProjectCardProps {
  project: ProjectData['projects'][0]
  focusState: ProjectFocusState
}

export function ProjectCard({ project, focusState }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()

  // Animate reveals only when entering focused state
  const isFocused = focusState === 'focused'

  // Video autoplay control based on focus state
  useEffect(() => {
    if (!videoRef.current || project.visual.type !== 'video') return

    if (isFocused) {
      // Play video when focused
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors (browser policies)
      })
    } else {
      // Pause video when not focused
      videoRef.current.pause()
    }
  }, [isFocused, project.visual.type])

  // Container stagger for all child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  // Individual item reveal (fade + drift up)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      },
    },
  }

  // Calculate styles based on focus state
  const getCardStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      width: '85vw',
      maxWidth: '1200px',
      backgroundColor: 'rgba(26, 26, 36, 0.8)',
      backdropFilter: 'blur(40px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    }

    switch (focusState) {
      case 'queued':
        return {
          ...baseStyles,
          transform: 'translateY(40vh) scale(0.85)',
          opacity: 0.35,
          zIndex: 5,
        }
      case 'focused':
        return {
          ...baseStyles,
          transform: 'translateY(0) scale(1.0)',
          opacity: 1,
          zIndex: 10,
          willChange: 'transform, opacity',
        }
      case 'completed':
        return {
          ...baseStyles,
          transform: 'translateY(-40vh) scale(0.85)',
          opacity: 0.2,
          filter: 'blur(4px)',
          zIndex: 1,
        }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      style={getCardStyles()}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      animate={shouldReduceMotion ? undefined : isFocused ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Top bar: Index + Status */}
      <motion.div
        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '12px', fontFamily: 'monospace', opacity: 0.6 }}
        variants={itemVariants}
      >
        <span>MISSION_{project.index.toString().padStart(2, '0')}</span>
        <span>{project.status}</span>
      </motion.div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 35%', gap: '5%', marginBottom: '2rem' }}>
        {/* Left: Visual */}
        <motion.div
          className="project-visual"
          style={{ position: 'relative', aspectRatio: project.visual.aspectRatio.replace(':', '/') }}
          variants={itemVariants}
        >
          {project.visual.type === 'image' ? (
            <Image
              src={project.visual.src}
              alt={project.visual.alt}
              fill
              style={{ objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            />
          ) : (
            <video
              ref={videoRef}
              src={project.visual.src}
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            />
          )}
        </motion.div>

        {/* Right: Metadata */}
        <motion.div className="project-metadata" variants={itemVariants}>
          {/* Tech Stack */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '12px', fontFamily: 'monospace', opacity: 0.6, marginBottom: '1rem' }}>TECH_STACK</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.techStack.map((tech, index) => (
                <p key={index} style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.8 }}>
                  — {tech}
                </p>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 style={{ fontSize: '12px', fontFamily: 'monospace', opacity: 0.6, marginBottom: '1rem' }}>ROLE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.responsibilities.map((task, index) => (
                <p key={index} style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.8 }}>
                  — {task}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Headline + Role */}
      <motion.div style={{ marginBottom: '1.5rem' }} variants={itemVariants}>
        <h3 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, marginBottom: '0.5rem' }}>{project.title}</h3>
        <p style={{ fontSize: '16px', fontFamily: 'monospace', color: '#ff4d00' }}>{project.role}</p>
      </motion.div>

      {/* Brief */}
      <motion.p style={{ fontSize: '16px', opacity: 0.6, lineHeight: 1.6, marginBottom: '2rem' }} variants={itemVariants}>
        {project.brief}
      </motion.p>

      {/* CTA */}
      <motion.a
        href={project.link.href}
        target={project.link.external ? '_blank' : undefined}
        rel={project.link.external ? 'noopener noreferrer' : undefined}
        style={{
          display: 'inline-block',
          fontSize: '16px',
          fontFamily: 'monospace',
          color: '#ff4d00',
          textDecoration: 'underline',
        }}
        variants={itemVariants}
        whileHover={shouldReduceMotion ? undefined : { x: 5, transition: { duration: 0.2 } }}
      >
        {project.link.label} →
      </motion.a>
    </motion.div>
  )
}
