'use client'

import { useRef } from 'react'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()

  // TODO: GSAP ScrollTrigger
  // - Pin container for 200vh
  // - Scale down headline (1.0 → 0.7)
  // - Move headline to top-left
  // - Reduce opacity (100% → 60%)
  // - Parallax between headline layers
  // - Gradient mesh center shift

  // TODO: Framer Motion
  // - Initial entry (after loader)
  // - Metadata line drawing
  // - Scroll indicator pulse

  return (
    <section
      ref={containerRef}
      className="hero"
      style={{
        position: 'relative',
        height: '200vh',
        width: '100%',
        zIndex: 2,
      }}
    >
      <div
        className="hero-content"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
        }}
      >
        {/* Main headline */}
        <div ref={headlineRef} className="hero-headline" style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(64px, 10vw, 120px)',
              fontWeight: 300,
              letterSpacing: '0.05em',
              marginBottom: '1rem',
            }}
          >
            KRINC
          </h1>
          <h2
            style={{
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 300,
              letterSpacing: '0.05em',
              opacity: 0.8,
            }}
          >
            PORTFOLIO
          </h2>
        </div>

        {/* Metadata lines - positioned in bottom-right quadrant */}
        <div
          className="hero-metadata"
          style={{
            position: 'absolute',
            bottom: '20vh',
            right: '10vw',
            textAlign: 'right',
          }}
        >
          {/* TODO: Animate line drawing + text reveals */}
          <div className="metadata-line" style={{ marginBottom: '1rem' }}>
            <div style={{ height: '1px', backgroundColor: 'white', opacity: 0.3, marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.6 }}>CREATIVE DEVELOPER</p>
          </div>
          <div className="metadata-line" style={{ marginBottom: '1rem' }}>
            <div style={{ height: '1px', backgroundColor: 'white', opacity: 0.3, marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.6 }}>MOTION × INTERACTION</p>
          </div>
          <div className="metadata-line">
            <div style={{ height: '1px', backgroundColor: 'white', opacity: 0.3, marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.6 }}>AVAILABLE FOR HIRE</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator"
          style={{
            position: 'absolute',
            bottom: '5vh',
            fontSize: '12px',
            fontFamily: 'monospace',
            opacity: 0.4,
          }}
        >
          ↓ SCROLL TO EXPLORE
        </div>
      </div>
    </section>
  )
}
