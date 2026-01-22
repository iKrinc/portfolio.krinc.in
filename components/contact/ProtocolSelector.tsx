'use client'

import { motion } from 'framer-motion'
import type { ContactData } from '@/lib/types'

interface ProtocolSelectorProps {
  protocols: ContactData['protocols']
  onSelect: (protocol: string) => void
  shouldReduceMotion: boolean
}

export function ProtocolSelector({ protocols, onSelect, shouldReduceMotion }: ProtocolSelectorProps) {
  const availableProtocols = [
    { key: 'directMessage', data: protocols.directMessage },
    { key: 'socialChannels', data: protocols.socialChannels },
    { key: 'scheduleCall', data: protocols.scheduleCall },
  ].filter((p) => p.data.enabled)

  // Container stagger for button reveals
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

  // Individual button reveal (fade + drift up)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      },
    },
  }

  return (
    <motion.div
      className="protocol-selector"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '500px',
        margin: '0 auto',
      }}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      animate={shouldReduceMotion ? undefined : 'visible'}
      variants={containerVariants}
    >
      {availableProtocols.map((protocol) => (
        <motion.button
          key={protocol.key}
          onClick={() => onSelect(protocol.key)}
          className="protocol-button"
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontFamily: 'monospace',
            fontSize: '18px',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          variants={itemVariants}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  transition: { duration: 0.2 },
                }
          }
        >
          <span>{protocol.data.label}</span>
          <motion.span
            animate={{ x: 0 }}
            whileHover={shouldReduceMotion ? undefined : { x: 5 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </motion.button>
      ))}
    </motion.div>
  )
}
