'use client'

interface SectionLabelProps {
  label: string
}

export function SectionLabel({ label }: SectionLabelProps) {
  // TODO: Add Framer Motion fade-in animation

  return (
    <div
      className="section-label"
      style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        fontSize: '12px',
        fontFamily: 'monospace',
        opacity: 0.6,
        zIndex: 10,
      }}
    >
      {label}
    </div>
  )
}
