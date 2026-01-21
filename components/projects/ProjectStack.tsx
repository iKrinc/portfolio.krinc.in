'use client'

import { useRef, useState } from 'react'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import { ProjectCard } from './ProjectCard'
import type { ProjectData, ProjectFocusState } from '@/lib/types'

interface ProjectStackProps {
  projects: ProjectData['projects']
}

export function ProjectStack({ projects }: ProjectStackProps) {
  const stackRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()
  const [focusedIndex, setFocusedIndex] = useState(0)

  // TODO: GSAP ScrollTrigger
  // - Calculate which project is focused based on scroll position
  // - Apply transforms to each project based on focus state
  // - Virtualization: only render prev, current, next projects
  // - Z-index management

  // TODO: Implement virtualization
  // For now, render all projects (will optimize later)

  const getFocusState = (index: number): ProjectFocusState => {
    if (index === focusedIndex) return 'focused'
    if (index < focusedIndex) return 'completed'
    return 'queued'
  }

  return (
    <div
      ref={stackRef}
      className="project-stack"
      style={{
        position: shouldReduceMotion ? 'relative' : 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} focusState={getFocusState(index)} />
      ))}
    </div>
  )
}
