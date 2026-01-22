'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ContactData } from '@/lib/types'

interface DirectMessageFormProps {
  data: ContactData['protocols']['directMessage']
  onClose: () => void
  shouldReduceMotion: boolean
}

export function DirectMessageForm({ data, onClose, shouldReduceMotion }: DirectMessageFormProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // TODO: Implement actual form submission
    // For now, simulate API call
    setTimeout(() => {
      // Simulate success
      setStatus('success')
      setTimeout(() => {
        onClose()
      }, 3000)
    }, 1500)
  }

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
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  }

  // Individual field reveal (fade + drift up)
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

  // Success message animation
  const successVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  if (status === 'success') {
    return (
      <motion.div
        className="form-success"
        style={{
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(26, 26, 36, 0.8)',
        }}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        animate={shouldReduceMotion ? undefined : 'visible'}
        variants={successVariants}
      >
        <p style={{ fontSize: '32px', marginBottom: '1rem', whiteSpace: 'pre-line' }}>{data.successMessage}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="direct-message-form"
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
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}
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

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <motion.div style={{ marginBottom: '1.5rem' }} variants={itemVariants}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '16px',
            }}
          />
        </motion.div>

        {/* Message textarea */}
        <motion.div style={{ marginBottom: '1.5rem' }} variants={itemVariants}>
          <textarea
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            style={{
              width: '100%',
              padding: '0.75rem 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '16px',
              resize: 'none',
            }}
          />
        </motion.div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            border: '1px solid #ff4d00',
            color: '#ff4d00',
            fontFamily: 'monospace',
            fontSize: '16px',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            marginBottom: '1.5rem',
          }}
          variants={itemVariants}
          whileHover={shouldReduceMotion || status === 'sending' ? undefined : { borderColor: '#ff7a3d', transition: { duration: 0.2 } }}
        >
          {status === 'sending' ? 'SENDING...' : 'SEND_MESSAGE →'}
        </motion.button>

        {/* OR separator */}
        <motion.p style={{ fontSize: '14px', opacity: 0.4, marginBottom: '0.5rem', textAlign: 'center' }} variants={itemVariants}>
          OR
        </motion.p>

        {/* Direct email link */}
        <motion.p style={{ fontSize: '14px', opacity: 0.6, textAlign: 'center' }} variants={itemVariants}>
          EMAIL DIRECTLY:{' '}
          <a href={`mailto:${data.email}`} style={{ color: '#ff4d00', textDecoration: 'underline' }}>
            {data.email}
          </a>
        </motion.p>

        {/* Error message */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.p
              style={{ fontSize: '14px', color: '#ff4d00', marginTop: '1rem', textAlign: 'center' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {data.errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}
