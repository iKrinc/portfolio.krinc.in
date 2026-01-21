'use client'

import type { ProfileData } from '@/lib/types'

interface ProfileDomainsProps {
  data: ProfileData['domains']
}

export function ProfileDomains({ data }: ProfileDomainsProps) {
  // TODO: Framer Motion
  // - Stagger reveal for each domain block
  // - Sub-point reveals with connecting lines
  // - Vertical rule draw-in

  return (
    <div
      className="profile-domains"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0 15vw',
      }}
    >
      {/* Vertical rule on left */}
      <div
        style={{
          position: 'absolute',
          left: '10vw',
          top: '20vh',
          bottom: '20vh',
          width: '1px',
          backgroundColor: 'white',
          opacity: 0.2,
        }}
      />

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
        PRIMARY_DOMAINS
      </h3>

      {/* Domain list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
        {data.map((domain) => (
          <div key={domain.index} className="domain-block">
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
          </div>
        ))}
      </div>
    </div>
  )
}
