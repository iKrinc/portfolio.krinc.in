'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GradientMesh } from '@/components/shared/GradientMesh'
import { FilmGrain } from '@/components/shared/FilmGrain'
import { Loader } from '@/components/sections/Loader'
import { Hero } from '@/components/sections/Hero'
import { Profile } from '@/components/sections/Profile'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Register GSAP plugins once on mount
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return (
    <main
      className="main"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0d0d12',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Loader - shows on first visit only */}
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}

      {/* Fixed background layers */}
      <GradientMesh />
      <FilmGrain />

      {/* Content sections */}
      {!showLoader && (
        <>
          <Hero />
          <Profile />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  )
}
