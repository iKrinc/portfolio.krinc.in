'use client'

import { useRef } from 'react'
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

  // TODO: GSAP ScrollTrigger
  // - Pin container for 300vh
  // - Horizontal scroll: translateX based on scroll progress
  // - Background parallax (grid moves with content)
  // - Progress indicator sync

  // TODO: If reduced motion, show zones stacked vertically instead

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
        {/* TODO: Update based on current zone */}
        [01/04] ANCHOR
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={contentRef}
        className="profile-content"
        style={{
          position: shouldReduceMotion ? 'relative' : 'sticky',
          top: 0,
          height: '100vh',
          width: shouldReduceMotion ? '100%' : '500vw', // 5 zones × 100vw each
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
