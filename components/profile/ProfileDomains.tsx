'use client'

import { motion } from 'framer-motion'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import type { ProfileData } from '@/lib/types'

interface ProfileDomainsProps {
  data: ProfileData['domains']
}

export function ProfileDomains({ data }: ProfileDomainsProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

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

  const domainVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const ruleVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      className="profile-domains"
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
      {/* Vertical rule on left */}
      <motion.div
        style={{
          position: 'absolute',
          left: '10vw',
          top: '20vh',
          bottom: '20vh',
          width: '1px',
          backgroundColor: 'white',
          opacity: 0.2,
          transformOrigin: 'top center',
        }}
        variants={ruleVariants}
      />

      {/* Section header */}
      <motion.h3
        style={{
          fontSize: '20px',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          opacity: 0.6,
          marginBottom: '3rem',
        }}
        variants={domainVariants}
      >
        PRIMARY_DOMAINS
      </motion.h3>

      {/* Domain list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
        {data.map((domain) => (
          <motion.div key={domain.index} className="domain-block" variants={domainVariants}>
            {/* Domain header */}
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.4, marginRight: '1rem' }}>
                [{domain.index.toString().padStart(2, '0')}]
              </span>
              <span style={{ fontSize: '24px', fontWeight: 600 }}>{domain.title}</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '16px', opacity: 0.6, marginBottom: '1rem', marginLeft: '3rem' }}>{domain.description}</p>

            {/* Sub-points */}
            <div style={{ marginLeft: '3rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {domain.subPoints.map((point, index) => (
                <p key={index} style={{ fontSize: '16px', fontFamily: 'monospace', opacity: 0.8 }}>
                  {point}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
