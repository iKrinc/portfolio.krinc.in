'use client'

import type { ProfileData } from '@/lib/types'

interface ProfileCapabilitiesProps {
  data: ProfileData['capabilities']
}

export function ProfileCapabilities({ data }: ProfileCapabilitiesProps) {
  // TODO: Framer Motion
  // - Column stagger (left → right)
  // - Item stagger within each column (top → bottom)
  // - Header lock-in animation

  const columns = [
    { title: 'MOTION', items: data.motion },
    { title: 'DEVELOPMENT', items: data.development },
    { title: 'DESIGN', items: data.design },
  ]

  return (
    <div
      className="profile-capabilities"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0 10vw',
      }}
    >
      {/* Section header */}
      <h3
        style={{
          fontSize: '20px',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          opacity: 0.6,
          marginBottom: '3rem',
        }}
      >
        CAPABILITIES
      </h3>

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
        {columns.map((column) => (
          <div key={column.title} className="capability-column">
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
          </div>
        ))}
      </div>
    </div>
  )
}
