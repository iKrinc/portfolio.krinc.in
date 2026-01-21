'use client'

import type { ProfileData } from '@/lib/types'

interface ProfileAnchorProps {
  data: ProfileData['anchor']
}

export function ProfileAnchor({ data }: ProfileAnchorProps) {
  // TODO: Framer Motion
  // - Letter-by-letter reveal on name
  // - Stagger reveal for specializations
  // - Fade in metadata

  return (
    <div
      className="profile-anchor"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        padding: '0 10vw',
      }}
    >
      {/* Horizontal rule above name */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'white', opacity: 0.2, marginBottom: '2rem' }} />

      {/* Name */}
      <h2
        style={{
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          marginBottom: '1rem',
        }}
      >
        {data.name}
      </h2>

      {/* Role */}
      <p
        style={{
          fontSize: '18px',
          fontFamily: 'monospace',
          color: '#ff4d00',
          marginBottom: '3rem',
        }}
      >
        {data.role}
      </p>

      {/* Specializations */}
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.6, marginBottom: '1rem' }}>SPECIALIZATION:</p>
        {data.specializations.map((spec, index) => (
          <div key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem', opacity: 0.4 }}>—</span>
            <span style={{ fontSize: '16px', fontFamily: 'monospace' }}>{spec}</span>
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '14px', fontFamily: 'monospace', opacity: 0.6 }}>
        <p>LOCATION: {data.metadata.location}</p>
        <p>TIMEZONE: {data.metadata.timezone}</p>
        <p>STATUS: {data.metadata.status}</p>
      </div>
    </div>
  )
}
