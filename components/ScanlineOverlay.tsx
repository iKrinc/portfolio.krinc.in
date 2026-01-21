'use client'

export default function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 217, 255, 0.05) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 14, 39, 0.8) 100%)',
        }}
      />
    </>
  )
}
