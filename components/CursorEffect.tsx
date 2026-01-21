'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-full h-full border-2 border-primary rounded-full" />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-50 bg-primary rounded-full hidden md:block"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 50,
        }}
      />
    </>
  )
}
