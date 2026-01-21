'use client'

import { useRef, useEffect, useState } from 'react'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'

interface LoaderProps {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if user has seen loader before
    const hasSeenLoader = localStorage.getItem('hasSeenLoader')

    if (hasSeenLoader || shouldReduceMotion) {
      // Skip loader
      onComplete()
      setIsVisible(false)
      return
    }

    // TODO: GSAP timeline for 4-beat sequence
    // Beat 1: Signal acquisition (line extends)
    // Beat 2: System wake (lines pulse, text appears)
    // Beat 3: Environment build (gradient + name reveal)
    // Beat 4: Handoff (transition to hero)

    // Placeholder: Auto-complete after 3.5s
    const timer = setTimeout(() => {
      localStorage.setItem('hasSeenLoader', 'true')
      onComplete()
    }, 3500)

    return () => clearTimeout(timer)
  }, [onComplete, shouldReduceMotion])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="loader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#0d0d12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* TODO: Beat 1 - Signal line */}
      <div className="loader-line" style={{ width: '60%', height: '1px', backgroundColor: 'white', opacity: 0.6 }} />

      {/* TODO: Beat 2 - System text */}
      <div
        className="loader-text"
        style={{
          marginTop: '2rem',
          fontSize: '12px',
          fontFamily: 'monospace',
          opacity: 0,
        }}
      >
        INITIALIZING CORE MODULES
      </div>

      {/* TODO: Beat 3 - Name reveal */}
      <div
        className="loader-name"
        style={{
          marginTop: '4rem',
          fontSize: '80px',
          fontWeight: 300,
          letterSpacing: '0.05em',
          opacity: 0,
        }}
      >
        KRINC
      </div>
    </div>
  )
}
