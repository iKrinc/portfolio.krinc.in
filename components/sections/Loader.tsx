'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import { EASING, DURATION } from '@/lib/utils/constants'

interface LoaderProps {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const { shouldReduceMotion } = useReducedMotionContext()
  const [isVisible, setIsVisible] = useState(true)

  useLayoutEffect(() => {
    // Check if user has seen loader before
    const hasSeenLoader = localStorage.getItem('hasSeenLoader')

    if (hasSeenLoader || shouldReduceMotion) {
      // Skip loader entirely
      onComplete()
      setIsVisible(false)
      return
    }

    // GSAP Timeline - 4-beat Kernel Initialization
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Mark loader as seen
          localStorage.setItem('hasSeenLoader', 'true')
          // Notify parent to hide loader
          onComplete()
        },
      })

      // ============================================
      // BEAT 1: SIGNAL ACQUISITION (0.0s - 0.8s)
      // ============================================
      tl.addLabel('beat1', 0)
        // Line glow appears
        .fromTo(
          glowRef.current,
          { opacity: 0 },
          { opacity: 0.6, duration: 0.3, ease: EASING.reveal }
        )
        // Line extends left-right using scaleX
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASING.reveal },
          0 // Start at beginning
        )

      // ============================================
      // BEAT 2: SYSTEM WAKE (0.8s - 1.8s)
      // ============================================
      tl.addLabel('beat2', 0.8)
        // Additional lines appear (split effect)
        .fromTo(
          [line2Ref.current, line3Ref.current],
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.6, duration: 0.4, ease: EASING.reveal, stagger: 0.1 },
          0.8
        )
        // Lines pulse (opacity animation)
        .to(
          [lineRef.current, line2Ref.current, line3Ref.current],
          { opacity: 1, duration: 0.2, ease: 'power2.inOut' },
          1.0
        )
        .to(
          [lineRef.current, line2Ref.current, line3Ref.current],
          { opacity: 0.8, duration: 0.2, ease: 'power2.inOut' },
          1.2
        )
        // System text appears letter-by-letter
        .fromTo(
          textRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: EASING.reveal,
            // Note: For true letter-by-letter, would need SplitText plugin
            // Using simple fade for now
          },
          1.0
        )

      // ============================================
      // BEAT 3: ENVIRONMENT BUILD (1.8s - 2.8s)
      // ============================================
      tl.addLabel('beat3', 1.8)
        // Lines dissolve
        .to(
          [lineRef.current, line2Ref.current, line3Ref.current, glowRef.current],
          { opacity: 0, duration: 0.3, ease: EASING.exit },
          1.8
        )
        // Name appears with scale + opacity
        .fromTo(
          nameRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1.0,
            duration: 0.8,
            ease: EASING.reveal,
            // Each letter with slight stagger
            // Note: Using whole word for now, letter-by-letter needs SplitText
          },
          2.0
        )

      // ============================================
      // BEAT 4: HANDOFF (2.8s - 3.5s)
      // ============================================
      tl.addLabel('beat4', 2.8)
        // Name scales up + container fades
        .to(
          nameRef.current,
          { scale: 1.1, opacity: 0.8, duration: 0.4, ease: EASING.smooth },
          2.8
        )
        .to(
          containerRef.current,
          { opacity: 0, duration: 0.3, ease: EASING.exit },
          3.2
        )

      // Total duration: 3.5s
    }, containerRef)

    return () => {
      ctx.revert() // Cleanup GSAP animations
    }
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
      {/* Beat 1: Signal line with glow */}
      <div style={{ position: 'relative', width: '60%', height: '40px', display: 'flex', alignItems: 'center' }}>
        {/* Glow behind line */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '20px',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(10px)',
            opacity: 0,
          }}
        />

        {/* Main line */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '1px',
            backgroundColor: 'white',
            opacity: 0.6,
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />

        {/* Line 2 (above) - for split effect */}
        <div
          ref={line2Ref}
          style={{
            position: 'absolute',
            top: 'calc(50% - 16px)',
            left: 0,
            width: '100%',
            height: '1px',
            backgroundColor: 'white',
            opacity: 0,
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />

        {/* Line 3 (below) - for split effect */}
        <div
          ref={line3Ref}
          style={{
            position: 'absolute',
            top: 'calc(50% + 16px)',
            left: 0,
            width: '100%',
            height: '1px',
            backgroundColor: 'white',
            opacity: 0,
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* Beat 2: System text */}
      <div
        ref={textRef}
        style={{
          marginTop: '2rem',
          fontSize: '12px',
          fontFamily: 'monospace',
          opacity: 0,
          letterSpacing: '0.1em',
        }}
      >
        INITIALIZING CORE MODULES
      </div>

      {/* Beat 3: Name reveal */}
      <div
        ref={nameRef}
        style={{
          marginTop: '4rem',
          fontSize: 'clamp(60px, 8vw, 80px)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          opacity: 0,
          transform: 'scale(0.98)',
        }}
      >
        KRINC
      </div>
    </div>
  )
}
