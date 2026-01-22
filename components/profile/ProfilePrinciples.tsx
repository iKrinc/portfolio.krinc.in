'use client'

import { motion } from 'framer-motion'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import type { ProfileData } from '@/lib/types'

interface ProfilePrinciplesProps {
  data: ProfileData['principles']
}

export function ProfilePrinciples({ data }: ProfilePrinciplesProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const principleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      className="profile-principles"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0 15vw',
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
          marginBottom: '4rem',
        }}
        variants={principleVariants}
      >
        OPERATING_PRINCIPLES
      </motion.h3>

      {/* Principle list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%', maxWidth: '800px' }}>
        {data.map((principle, index) => (
          <motion.div key={index} className="principle-block" variants={principleVariants}>
            {/* Principle statement */}
            <p
              style={{
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 300,
                letterSpacing: '0.02em',
                lineHeight: 1.4,
                textAlign: 'center',
              }}
            >
              {principle.statement}
            </p>

            {/* Separator line (except for last item) */}
            {index < data.length - 1 && (
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'white',
                  opacity: 0.2,
                  marginTop: '4rem',
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
