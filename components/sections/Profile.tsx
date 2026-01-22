'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ProfileAnchor } from '@/components/profile/ProfileAnchor'
import { ProfileDomains } from '@/components/profile/ProfileDomains'
import { ProfilePrinciples } from '@/components/profile/ProfilePrinciples'
import { ProfileCapabilities } from '@/components/profile/ProfileCapabilities'
import profileDataImport from '@/data/profile.json'
import type { ProfileData } from '@/lib/types'

const profileData = profileDataImport as ProfileData

export function Profile() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { shouldReduceMotion } = useReducedMotionContext()

  // Track current zone for progress indicator
  const [currentZone, setCurrentZone] = useState(1)

  const zoneLabels = ['ANCHOR', 'DOMAIN_FOCUS', 'PRINCIPLES', 'CAPABILITIES']

  useLayoutEffect(() => {
    if (shouldReduceMotion || !containerRef.current || !contentRef.current) return

    // GSAP ScrollTrigger - Horizontal scroll system
    const ctx = gsap.context(() => {
      // Pin container while scrolling through 300vh
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: contentRef.current,
        pinSpacing: false,
        scrub: 1.2, // Smooth lag, consistent with hero
      })

      // Horizontal translateX animation
      // Container width: 400vw (4 zones × 100vw)
      // We need to move -300vw to show all zones
      // (starts at 0, ends at -300vw)
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          onUpdate: (self) => {
            // Calculate current zone based on scroll progress
            // progress 0-0.25 = zone 1
            // progress 0.25-0.5 = zone 2
            // progress 0.5-0.75 = zone 3
            // progress 0.75-1.0 = zone 4
            const progress = self.progress
            const newZone = Math.min(Math.floor(progress * 4) + 1, 4)

            // Only update if zone changed (prevents continuous re-renders)
            if (newZone !== currentZone) {
              setCurrentZone(newZone)
            }
          },
        },
        // Move from 0 to -300vw (shows zones 1-4)
        x: '-300vw',
        ease: 'none', // Linear with scrub for smooth tracking
      })
    }, containerRef)

    return () => {
      ctx.revert() // Cleanup
    }
  }, [shouldReduceMotion, currentZone])

  return (
    <section
      ref={containerRef}
      className="profile"
      style={{
        position: 'relative',
        height: shouldReduceMotion ? 'auto' : '300vh',
        width: '100%',
        zIndex: 2,
      }}
    >
      <SectionLabel label="// PROFILE_RUNTIME" />

      {/* Progress indicator - fixed bottom-right */}
      {!shouldReduceMotion && (
        <div
          className="profile-progress"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            fontSize: '12px',
            fontFamily: 'monospace',
            opacity: 0.6,
            zIndex: 10,
          }}
        >
          [{currentZone.toString().padStart(2, '0')}/04] {zoneLabels[currentZone - 1]}
        </div>
      )}

      {/* Horizontal scroll container */}
      <div
        ref={contentRef}
        className="profile-content"
        style={{
          position: shouldReduceMotion ? 'relative' : 'sticky',
          top: 0,
          height: '100vh',
          width: shouldReduceMotion ? '100%' : '400vw', // 4 zones × 100vw each
          display: 'flex',
          flexDirection: shouldReduceMotion ? 'column' : 'row',
          overflow: shouldReduceMotion ? 'visible' : 'hidden',
        }}
      >
        {/* Zone 1: Anchor */}
        <div className="profile-zone" style={{ minWidth: shouldReduceMotion ? '100%' : '100vw', height: shouldReduceMotion ? 'auto' : '100vh' }}>
          <ProfileAnchor data={profileData.anchor} />
        </div>

        {/* Zone 2: Domains */}
        <div className="profile-zone" style={{ minWidth: shouldReduceMotion ? '100%' : '100vw', height: shouldReduceMotion ? 'auto' : '100vh' }}>
          <ProfileDomains data={profileData.domains} />
        </div>

        {/* Zone 3: Principles */}
        <div className="profile-zone" style={{ minWidth: shouldReduceMotion ? '100%' : '100vw', height: shouldReduceMotion ? 'auto' : '100vh' }}>
          <ProfilePrinciples data={profileData.principles} />
        </div>

        {/* Zone 4: Capabilities */}
        <div className="profile-zone" style={{ minWidth: shouldReduceMotion ? '100%' : '100vw', height: shouldReduceMotion ? 'auto' : '100vh' }}>
          <ProfileCapabilities data={profileData.capabilities} />
        </div>
      </div>
    </section>
  )
}
