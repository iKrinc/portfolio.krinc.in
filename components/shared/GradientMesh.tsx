'use client'

import { useRef } from 'react'

export function GradientMesh() {
  const meshRef = useRef<HTMLDivElement>(null)

  // TODO: Add GSAP scroll-linked position shift (subtle, 0.3x parallax)
  // useEffect(() => {
  //   if (!meshRef.current) return
  //   // GSAP ScrollTrigger code here
  // }, [])

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
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 77, 0, 0.15) 0%, rgba(13, 13, 18, 1) 70%)',
      }}
    />
  )
}
