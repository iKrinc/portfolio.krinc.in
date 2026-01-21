'use client'

import type { ProfileData } from '@/lib/types'

interface ProfilePrinciplesProps {
  data: ProfileData['principles']
}

export function ProfilePrinciples({ data }: ProfilePrinciplesProps) {
  // TODO: Framer Motion
  // - Large statement reveals (fade + upward drift)
  // - Horizontal rule draw-in between statements
  // - Optional: Mask reveals (horizontal clipping)

  return (
    <div
      className="profile-principles"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0 15vw',
      }}
    >
      {/* Section header */}
      <h3
        style={{
          fontSize: '20px',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          opacity: 0.6,
          marginBottom: '4rem',
        }}
      >
        OPERATING_PRINCIPLES
      </h3>

      {/* Principle list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%', maxWidth: '800px' }}>
        {data.map((principle, index) => (
          <div key={index} className="principle-block">
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
          </div>
        ))}
      </div>
    </div>
  )
}
