'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// Sections
import BootSequence from '@/sections/BootSequence'
import Hero from '@/sections/Hero'
import PlayerStats from '@/sections/PlayerStats'
import SkillTree from '@/sections/SkillTree'
import QuestLog from '@/sections/QuestLog'
import Missions from '@/sections/Missions'
import Achievements from '@/sections/Achievements'
import TechArsenal from '@/sections/TechArsenal'
import EndGamePortal from '@/sections/EndGamePortal'

// Components
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import CursorEffect from '@/components/CursorEffect'
import ScanlineOverlay from '@/components/ScanlineOverlay'

export default function Home() {
  const [isBooting, setIsBooting] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Boot sequence timer
    const bootTimer = setTimeout(() => {
      setIsBooting(false)
      setTimeout(() => setShowContent(true), 500)
    }, 3500) // 3.5 seconds boot sequence

    return () => clearTimeout(bootTimer)
  }, [])

  return (
    <main className="relative min-h-screen bg-background-primary overflow-x-hidden">
      {/* Cursor effect */}
      <CursorEffect />

      {/* Scanline overlay for retro effect */}
      <ScanlineOverlay />

      {/* Boot sequence */}
      <AnimatePresence mode="wait">
        {isBooting && <BootSequence key="boot" onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {/* Main content */}
      {showContent && (
        <>
          <Navigation />
          <ScrollProgress />

          {/* All sections */}
          <Hero />
          <PlayerStats />
          <SkillTree />
          <QuestLog />
          <Missions />
          <Achievements />
          <TechArsenal />
          <EndGamePortal />
        </>
      )}
    </main>
  )
}
