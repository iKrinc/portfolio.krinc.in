'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { ProjectData, ProjectFocusState } from '@/lib/types'

interface ProjectCardProps {
  project: ProjectData['projects'][0]
  focusState: ProjectFocusState
}

export function ProjectCard({ project, focusState }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // TODO: Framer Motion
  // - Project-internal reveals (title, metadata, visual, CTA)
  // - Stagger animations when entering focus
  // - Video play/pause based on focus state
  // - Hover states on CTA

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
    <div ref={cardRef} className="project-card" style={getCardStyles()}>
      {/* Top bar: Index + Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '12px', fontFamily: 'monospace', opacity: 0.6 }}>
        <span>MISSION_{project.index.toString().padStart(2, '0')}</span>
        <span>{project.status}</span>
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 35%', gap: '5%', marginBottom: '2rem' }}>
        {/* Left: Visual */}
        <div className="project-visual" style={{ position: 'relative', aspectRatio: project.visual.aspectRatio.replace(':', '/') }}>
          {project.visual.type === 'image' ? (
            <Image
              src={project.visual.src}
              alt={project.visual.alt}
              fill
              style={{ objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            />
          ) : (
            <video
              src={project.visual.src}
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              // TODO: Control play/pause based on focusState
            />
          )}
        </div>

        {/* Right: Metadata */}
        <div className="project-metadata">
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
        </div>
      </div>

      {/* Headline + Role */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, marginBottom: '0.5rem' }}>{project.title}</h3>
        <p style={{ fontSize: '16px', fontFamily: 'monospace', color: '#ff4d00' }}>{project.role}</p>
      </div>

      {/* Brief */}
      <p style={{ fontSize: '16px', opacity: 0.6, lineHeight: 1.6, marginBottom: '2rem' }}>{project.brief}</p>

      {/* CTA */}
      <a
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
      >
        {project.link.label} →
      </a>
    </div>
  )
}
