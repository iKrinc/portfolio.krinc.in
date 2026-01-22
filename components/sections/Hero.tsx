'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useReducedMotionContext } from '@/components/shared/ReducedMotionProvider'
import { EASING, STAGGER } from '@/lib/utils/constants'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const metadataRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  const { shouldReduceMotion } = useReducedMotionContext()

  useLayoutEffect(() => {
    if (shouldReduceMotion) return

    // GSAP ScrollTrigger - Scroll-driven spatial transforms
    const ctx = gsap.context(() => {
      // Pin the hero content while scrolling through 200vh
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: contentRef.current,
        pinSpacing: false,
        scrub: 1.2, // Smooth lag, feels heavy not laggy
      })

      // Headline transforms (scale + reposition + opacity)
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        // Scale: 1.0 → 0.7 (shrinks as scrolling)
        scale: 0.7,
        // Move to top-left: Center (50%) → ~20vh from top, ~10vw from left
        y: '-30vh', // Move up
        x: '-35vw', // Move left
        // Opacity: 100% → 60%
        opacity: 0.6,
        ease: 'none', // Linear with scrub for smooth tracking
      })

      // Name and subtitle parallax (different speeds create depth)
      gsap.to(nameRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        // Name moves slightly faster than subtitle
        y: '-10vh',
        ease: 'none',
      })

      gsap.to(subtitleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        // Subtitle moves slower (creates separation)
        y: '-5vh',
        ease: 'none',
      })

      // Metadata fades out as scrolling
      gsap.to(metadataRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top', // Fades out halfway through scroll
          scrub: 1.2,
        },
        opacity: 0,
        y: '10vh', // Slight downward drift
        ease: 'none',
      })

      // Scroll indicator fades out early
      gsap.to(scrollIndicatorRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '30% top', // Gone by 30% scroll
          scrub: 1.2,
        },
        opacity: 0,
        ease: 'none',
      })
    }, containerRef)

    return () => {
      ctx.revert() // Cleanup
    }
  }, [shouldReduceMotion])

  // Framer Motion variants for initial entry
  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // ease-out-expo
      }
    },
  }

  const metadataLineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: (i: number) => ({
      scaleX: 1,
      opacity: 0.3,
      transition: {
        duration: 0.8,
        delay: 0.4 + i * 0.15, // Stagger: 0.4s base + 0.15s per line
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const metadataTextVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 0.6,
      transition: {
        duration: 0.4,
        delay: 1.0 + i * 0.15, // Text appears after line completes
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.4, 0.4],
      transition: {
        duration: 1.5,
        delay: 1.5,
        ease: 'easeInOut',
      },
    },
    pulse: {
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const metadata = [
    'CREATIVE DEVELOPER',
    'MOTION × INTERACTION',
    'AVAILABLE FOR HIRE',
  ]

  return (
    <section
      ref={containerRef}
      className="hero"
      style={{
        position: 'relative',
        height: shouldReduceMotion ? '100vh' : '200vh', // Single screen if reduced motion
        width: '100%',
        zIndex: 2,
      }}
    >
      <div
        ref={contentRef}
        className="hero-content"
        style={{
          position: shouldReduceMotion ? 'relative' : 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
        }}
      >
        {/* Main headline */}
        <motion.div
          ref={headlineRef}
          className="hero-headline"
          style={{
            textAlign: 'center',
            // If reduced motion, show final "scrolled" state immediately
            ...(shouldReduceMotion && {
              transform: 'scale(0.7) translate(-35vw, -30vh)',
              opacity: 0.6,
            }),
          }}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'visible'}
          variants={headlineVariants}
        >
          <h1
            ref={nameRef}
            style={{
              fontSize: 'clamp(64px, 10vw, 120px)',
              fontWeight: 300,
              letterSpacing: '0.05em',
              marginBottom: '1rem',
            }}
          >
            KRINC
          </h1>
          <h2
            ref={subtitleRef}
            style={{
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 300,
              letterSpacing: '0.05em',
              opacity: 0.8,
            }}
          >
            PORTFOLIO
          </h2>
        </motion.div>

        {/* Metadata lines - positioned in bottom-right quadrant */}
        <div
          ref={metadataRef}
          className="hero-metadata"
          style={{
            position: 'absolute',
            bottom: '20vh',
            right: '10vw',
            textAlign: 'right',
            // If reduced motion, hide immediately (would fade out on scroll)
            ...(shouldReduceMotion && { opacity: 0 }),
          }}
        >
          {metadata.map((text, index) => (
            <div key={index} className="metadata-line" style={{ marginBottom: '1rem' }}>
              {/* Animated line */}
              <motion.div
                style={{
                  height: '1px',
                  backgroundColor: 'white',
                  marginBottom: '0.5rem',
                  transformOrigin: 'right center',
                }}
                initial={shouldReduceMotion ? undefined : 'hidden'}
                animate={shouldReduceMotion ? undefined : 'visible'}
                variants={metadataLineVariants}
                custom={index}
              />
              {/* Animated text */}
              <motion.p
                style={{
                  fontSize: '14px',
                  fontFamily: 'monospace',
                }}
                initial={shouldReduceMotion ? undefined : 'hidden'}
                animate={shouldReduceMotion ? undefined : 'visible'}
                variants={metadataTextVariants}
                custom={index}
              >
                {text}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          className="scroll-indicator"
          style={{
            position: 'absolute',
            bottom: '5vh',
            fontSize: '12px',
            fontFamily: 'monospace',
            // If reduced motion, hide immediately
            ...(shouldReduceMotion && { opacity: 0 }),
          }}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'pulse'}
          variants={scrollIndicatorVariants}
        >
          ↓ SCROLL TO EXPLORE
        </motion.div>
      </div>
    </section>
  )
}
