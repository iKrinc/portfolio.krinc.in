'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const bootLines = [
  '> INITIALIZING SYSTEM...',
  '> LOADING CORE MODULES...',
  '> CHECKING DEPENDENCIES...',
  '> COMPILING ASSETS...',
  '> ESTABLISHING CONNECTION...',
  '> RENDERING UI COMPONENTS...',
  '> SYSTEM READY',
  '',
  '> WELCOME TO THE PORTFOLIO',
]

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootLines.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background-primary flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full px-4">
        {/* Terminal header */}
        <div className="bg-background-secondary border border-primary/30 rounded-t-lg p-3 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-danger" />
          <div className="w-3 h-3 rounded-full bg-warning" />
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="ml-4 font-mono text-xs text-text-secondary">
            system.boot.sh
          </span>
        </div>

        {/* Terminal content */}
        <div className="bg-black/50 border-x border-b border-primary/30 rounded-b-lg p-6 font-mono text-sm min-h-[300px]">
          {bootLines.slice(0, visibleLines).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`${
                line.includes('READY') || line.includes('WELCOME')
                  ? 'text-success glow-text'
                  : 'text-primary'
              } mb-2`}
            >
              {line}
              {index === visibleLines - 1 && (
                <motion.span
                  className="inline-block w-2 h-4 bg-primary ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-1 bg-background-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
