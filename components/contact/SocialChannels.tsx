'use client'

import { motion } from 'framer-motion'
import type { ContactData } from '@/lib/types'

interface SocialChannelsProps {
  data: ContactData['protocols']['socialChannels']
  onClose: () => void
  shouldReduceMotion: boolean
}

export function SocialChannels({ data, onClose, shouldReduceMotion }: SocialChannelsProps) {
  // Container expand animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  // Individual channel link reveal (fade + drift up)
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      className="social-channels"
      style={{
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(26, 26, 36, 0.8)',
        textAlign: 'left',
      }}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      animate={shouldReduceMotion ? undefined : 'visible'}
      variants={containerVariants}
    >
      {/* Header with close button */}
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
        variants={itemVariants}
      >
        <h3 style={{ fontSize: '18px', fontFamily: 'monospace' }}>{data.label}</h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            opacity: 0.6,
          }}
        >
          ×
        </button>
      </motion.div>

      {/* Channel links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {data.channels.map((channel, index) => (
          <motion.a
            key={index}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: index < data.channels.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              textDecoration: 'none',
              color: 'white',
            }}
            variants={itemVariants}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    marginLeft: '-0.5rem',
                    marginRight: '-0.5rem',
                    transition: { duration: 0.2 },
                  }
            }
          >
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'baseline' }}>
              <span style={{ fontSize: '16px', fontFamily: 'monospace', fontWeight: 600 }}>{channel.platform}</span>
              <span style={{ fontSize: '16px', fontFamily: 'monospace', opacity: 0.6 }}>{channel.username}</span>
            </div>
            <motion.span
              style={{ fontSize: '16px', opacity: 0.6 }}
              animate={{ x: 0 }}
              whileHover={shouldReduceMotion ? undefined : { x: 5 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
