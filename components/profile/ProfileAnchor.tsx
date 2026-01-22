'use client'

import { motion } from 'framer-motion'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import type { ProfileData } from '@/lib/types'

interface ProfileAnchorProps {
  data: ProfileData['anchor']
}

export function ProfileAnchor({ data }: ProfileAnchorProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

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

  return (
    <motion.div
      className="profile-anchor"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        padding: '0 10vw',
      }}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Horizontal rule above name */}
      <motion.div
        style={{ width: '100%', height: '1px', backgroundColor: 'white', opacity: 0.2, marginBottom: '2rem' }}
        variants={itemVariants}
      />

      {/* Name */}
      <motion.h2
        style={{
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          marginBottom: '1rem',
        }}
        variants={itemVariants}
      >
        {data.name}
      </motion.h2>

      {/* Role */}
      <motion.p
        style={{
          fontSize: '18px',
          fontFamily: 'monospace',
          color: '#ff4d00',
          marginBottom: '3rem',
        }}
        variants={itemVariants}
      >
        {data.role}
      </motion.p>

      {/* Specializations */}
      <motion.div style={{ marginBottom: '3rem' }} variants={itemVariants}>
        <p style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.6, marginBottom: '1rem' }}>SPECIALIZATION:</p>
        {data.specializations.map((spec, index) => (
          <div key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem', opacity: 0.4 }}>—</span>
            <span style={{ fontSize: '16px', fontFamily: 'monospace' }}>{spec}</span>
          </div>
        ))}
      </motion.div>

      {/* Metadata */}
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '14px', fontFamily: 'monospace', opacity: 0.6 }}
        variants={itemVariants}
      >
        <p>LOCATION: {data.metadata.location}</p>
        <p>TIMEZONE: {data.metadata.timezone}</p>
        <p>STATUS: {data.metadata.status}</p>
      </motion.div>
    </motion.div>
  )
}
