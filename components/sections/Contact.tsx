'use client'

import { useRef, useState, useEffect } from 'react'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ProtocolSelector } from '@/components/contact/ProtocolSelector'
import { DirectMessageForm } from '@/components/contact/DirectMessageForm'
import { SocialChannels } from '@/components/contact/SocialChannels'
import contactDataImport from '@/data/contact.json'
import type { ContactData } from '@/lib/types'

const contactData = contactDataImport as ContactData

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null)

  // Escape key closes expanded protocol
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProtocol) {
        setSelectedProtocol(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedProtocol])

  return (
    <section
      ref={containerRef}
      className="contact"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
      }}
    >
      <SectionLabel label="// CONNECTION_PROTOCOL" />

      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
        {/* Headline */}
        <h2
          style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            marginBottom: '1rem',
          }}
        >
          {contactData.headline}
        </h2>

        {/* Instruction */}
        <p
          style={{
            fontSize: '16px',
            fontFamily: 'monospace',
            opacity: 0.6,
            marginBottom: '3rem',
          }}
        >
          {contactData.instruction}
        </p>

        {/* Protocol selection or expanded protocol */}
        {!selectedProtocol ? (
          <ProtocolSelector
            protocols={contactData.protocols}
            onSelect={(protocol) => setSelectedProtocol(protocol)}
            shouldReduceMotion={shouldReduceMotion}
          />
        ) : (
          <>
            {selectedProtocol === 'directMessage' && contactData.protocols.directMessage.enabled && (
              <DirectMessageForm
                data={contactData.protocols.directMessage}
                onClose={() => setSelectedProtocol(null)}
                shouldReduceMotion={shouldReduceMotion}
              />
            )}
            {selectedProtocol === 'socialChannels' && contactData.protocols.socialChannels.enabled && (
              <SocialChannels
                data={contactData.protocols.socialChannels}
                onClose={() => setSelectedProtocol(null)}
                shouldReduceMotion={shouldReduceMotion}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}
