'use client'

import type { ContactData } from '@/lib/types'

interface ProtocolSelectorProps {
  protocols: ContactData['protocols']
  onSelect: (protocol: string) => void
}

export function ProtocolSelector({ protocols, onSelect }: ProtocolSelectorProps) {
  // TODO: Framer Motion
  // - Stagger reveal for protocol buttons
  // - Hover states (border glow, arrow shift)

  const availableProtocols = [
    { key: 'directMessage', data: protocols.directMessage },
    { key: 'socialChannels', data: protocols.socialChannels },
    { key: 'scheduleCall', data: protocols.scheduleCall },
  ].filter((p) => p.data.enabled)

  return (
    <div
      className="protocol-selector"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      {availableProtocols.map((protocol) => (
        <button
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
            transition: 'all 0.3s ease',
          }}
        >
          <span>{protocol.data.label}</span>
          <span>→</span>
        </button>
      ))}
    </div>
  )
}
