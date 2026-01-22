'use client'

import { useRef, useState } from 'react'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ProjectStack } from '@/components/projects/ProjectStack'
import projectsDataImport from '@/data/projects.json'
import type { ProjectData } from '@/lib/types'

const projectsData = projectsDataImport as ProjectData

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()
  const [focusedIndex, setFocusedIndex] = useState(0)

  const totalHeight = shouldReduceMotion ? 'auto' : `${projectsData.projects.length * 150}vh`

  return (
    <section
      ref={containerRef}
      className="projects"
      style={{
        position: 'relative',
        height: totalHeight,
        width: '100%',
        zIndex: 2,
      }}
    >
      <SectionLabel label="// MISSION_ARCHIVE" />

      {/* Project index indicator - fixed bottom-right */}
      {!shouldReduceMotion && (
        <div
          className="project-index-indicator"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            fontSize: '12px',
            fontFamily: 'monospace',
            opacity: 0.6,
            zIndex: 10,
          }}
        >
          MISSION [{(focusedIndex + 1).toString().padStart(2, '0')}/{projectsData.projects.length.toString().padStart(2, '0')}]
        </div>
      )}

      {/* Project stack */}
      <ProjectStack projects={projectsData.projects} containerRef={containerRef} onFocusChange={setFocusedIndex} />
    </section>
  )
}
