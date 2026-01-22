'use client'

import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import { ProjectCard } from './ProjectCard'
import type { ProjectData, ProjectFocusState } from '@/lib/types'

interface ProjectStackProps {
  projects: ProjectData['projects']
  containerRef: React.RefObject<HTMLDivElement>
  onFocusChange: (index: number) => void
}

export function ProjectStack({ projects, containerRef, onFocusChange }: ProjectStackProps) {
  const stackRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()
  const [focusedIndex, setFocusedIndex] = useState(0)

  useLayoutEffect(() => {
    if (shouldReduceMotion || !containerRef.current || !stackRef.current) return

    const ctx = gsap.context(() => {
      // Create ScrollTrigger to track scroll position through all projects
      // Each project occupies 150vh of scroll space
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stackRef.current,
        pinSpacing: false,
        scrub: 1.2,
        onUpdate: (self) => {
          // Calculate which project should be focused
          // self.progress goes from 0 to 1 across the entire container
          // Container height: projects.length * 150vh
          // Each project gets 1/projects.length of total scroll
          const totalProjects = projects.length
          const rawIndex = Math.floor(self.progress * totalProjects)

          // Clamp to valid range [0, totalProjects - 1]
          const newIndex = Math.min(Math.max(rawIndex, 0), totalProjects - 1)

          // Only update if index changed (prevents continuous re-renders)
          if (newIndex !== focusedIndex) {
            setFocusedIndex(newIndex)
            onFocusChange(newIndex)
          }
        },
      })
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [shouldReduceMotion, focusedIndex, projects.length, containerRef, onFocusChange])

  const getFocusState = (index: number): ProjectFocusState => {
    if (index === focusedIndex) return 'focused'
    if (index < focusedIndex) return 'completed'
    return 'queued'
  }

  // Virtualization: only render projects that are visible or adjacent
  // Render: focusedIndex - 1, focusedIndex, focusedIndex + 1
  const getVisibleProjects = () => {
    if (shouldReduceMotion) {
      // No virtualization in reduced motion mode
      return projects.map((project, index) => ({ project, index }))
    }

    const visibleIndices = [
      focusedIndex - 1,
      focusedIndex,
      focusedIndex + 1,
    ].filter((i) => i >= 0 && i < projects.length)

    return visibleIndices.map((index) => ({
      project: projects[index],
      index,
    }))
  }

  return (
    <div
      ref={stackRef}
      className="project-stack"
      style={{
        position: shouldReduceMotion ? 'relative' : 'sticky',
        top: 0,
        height: shouldReduceMotion ? 'auto' : '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: shouldReduceMotion ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: shouldReduceMotion ? '4rem' : 0,
        padding: shouldReduceMotion ? '4rem 0' : 0,
      }}
    >
      {getVisibleProjects().map(({ project, index }) => (
        <ProjectCard key={project.id} project={project} focusState={getFocusState(index)} />
      ))}
    </div>
  )
}
