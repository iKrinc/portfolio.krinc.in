'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotionContext } from './ReducedMotionProvider'

export function GradientMesh() {
  const meshRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()

  // Track gradient position for dynamic background update
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 })

  useLayoutEffect(() => {
    if (shouldReduceMotion || !meshRef.current) return

    // Subtle gradient shift during hero scroll (0.3x parallax)
    // Center moves from 50% 50% → 50% 40% (shifts upward slightly)
    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '200vh top', // Matches hero height
            scrub: 1.2,
            onUpdate: (self) => {
              // Calculate new gradient center (subtle vertical shift)
              const progress = self.progress
              const newY = 50 - progress * 10 // 50% → 40% (10% total shift)
              setGradientPos({ x: 50, y: newY })
            },
          },
        }
      )
    }, meshRef)

    return () => {
      ctx.revert()
    }
  }, [shouldReduceMotion])

  return (
    <div
      ref={meshRef}
      className="gradient-mesh"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(255, 77, 0, 0.15) 0%, rgba(13, 13, 18, 1) 70%)`,
        transition: shouldReduceMotion ? 'none' : 'background 0.1s ease-out', // Smooth between updates
      }}
    />
  )
}
