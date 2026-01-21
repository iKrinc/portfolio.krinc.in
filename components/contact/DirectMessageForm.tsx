'use client'

import { useState, FormEvent } from 'react'
import type { ContactData } from '@/lib/types'

interface DirectMessageFormProps {
  data: ContactData['protocols']['directMessage']
  onClose: () => void
}

export function DirectMessageForm({ data, onClose }: DirectMessageFormProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  // TODO: Framer Motion
  // - Form expand animation
  // - Field stagger reveals
  // - Success/error message transitions

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

  if (status === 'success') {
    return (
      <div
        className="form-success"
        style={{
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(26, 26, 36, 0.8)',
        }}
      >
        <p style={{ fontSize: '32px', marginBottom: '1rem', whiteSpace: 'pre-line' }}>{data.successMessage}</p>
      </div>
    )
  }

  return (
    <div
      className="direct-message-form"
      style={{
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(26, 26, 36, 0.8)',
        textAlign: 'left',
      }}
    >
      {/* Header with close button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
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
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div style={{ marginBottom: '1.5rem' }}>
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
        </div>

        {/* Message textarea */}
        <div style={{ marginBottom: '1.5rem' }}>
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
        </div>

        {/* Submit button */}
        <button
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
        >
          {status === 'sending' ? 'SENDING...' : 'SEND_MESSAGE →'}
        </button>

        {/* OR separator */}
        <p style={{ fontSize: '14px', opacity: 0.4, marginBottom: '0.5rem', textAlign: 'center' }}>OR</p>

        {/* Direct email link */}
        <p style={{ fontSize: '14px', opacity: 0.6, textAlign: 'center' }}>
          EMAIL DIRECTLY:{' '}
          <a href={`mailto:${data.email}`} style={{ color: '#ff4d00', textDecoration: 'underline' }}>
            {data.email}
          </a>
        </p>

        {/* Error message */}
        {status === 'error' && (
          <p style={{ fontSize: '14px', color: '#ff4d00', marginTop: '1rem', textAlign: 'center' }}>{data.errorMessage}</p>
        )}
      </form>
    </div>
  )
}
