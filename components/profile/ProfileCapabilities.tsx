'use client'

import { motion } from 'framer-motion'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import type { ProfileData } from '@/lib/types'

interface ProfileCapabilitiesProps {
  data: ProfileData['capabilities']
}

export function ProfileCapabilities({ data }: ProfileCapabilitiesProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

  const columns = [
    { title: 'MOTION', items: data.motion },
    { title: 'DEVELOPMENT', items: data.development },
    { title: 'DESIGN', items: data.design },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const columnVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      className="profile-capabilities"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0 10vw',
      }}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Section header */}
      <motion.h3
        style={{
          fontSize: '20px',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          opacity: 0.6,
          marginBottom: '3rem',
        }}
        variants={headerVariants}
      >
        CAPABILITIES
      </motion.h3>

      {/* Capabilities grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4rem',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        {columns.map((column, columnIndex) => (
          <motion.div key={column.title} className="capability-column" variants={columnVariants}>
            {/* Column header */}
            <h4
              style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '0.1em',
                opacity: 0.8,
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {column.title}
            </h4>

            {/* Column items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {column.items.map((item, index) => (
                <p key={index} style={{ fontSize: '16px', opacity: 0.7 }}>
                  {item}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
