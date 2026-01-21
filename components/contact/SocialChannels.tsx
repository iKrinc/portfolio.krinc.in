'use client'

import type { ContactData } from '@/lib/types'

interface SocialChannelsProps {
  data: ContactData['protocols']['socialChannels']
  onClose: () => void
}

export function SocialChannels({ data, onClose }: SocialChannelsProps) {
  // TODO: Framer Motion
  // - Container expand animation
  // - Channel link stagger reveals
  // - Hover states (row highlight, arrow shift)

  return (
    <div
      className="social-channels"
      style={{
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(26, 26, 36, 0.8)',
        textAlign: 'left',
      }}
    >
      {/* Header with close button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
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
      </div>

      {/* Channel links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {data.channels.map((channel, index) => (
          <a
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
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'baseline' }}>
              <span style={{ fontSize: '16px', fontFamily: 'monospace', fontWeight: 600 }}>{channel.platform}</span>
              <span style={{ fontSize: '16px', fontFamily: 'monospace', opacity: 0.6 }}>{channel.username}</span>
            </div>
            <span style={{ fontSize: '16px', opacity: 0.6 }}>→</span>
          </a>
        ))}
      </div>
    </div>
  )
}
