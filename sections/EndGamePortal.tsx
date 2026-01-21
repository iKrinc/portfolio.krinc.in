'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { endGamePortal, playerInfo } from '@/data/portfolio-data'
import { portalRing, portalContent, floatAnimation } from '@/animations/variants'
import { SECTION_IDS } from '@/utils/constants'

export default function EndGamePortal() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      id={SECTION_IDS.CONTACT}
      ref={sectionRef}
      className="section-container relative min-h-screen flex items-center justify-center overflow-hidden bg-background-secondary/50"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-background opacity-10" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Portal rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 rounded-full"
            style={{
              borderColor: `rgba(0, 217, 255, ${0.2 - i * 0.03})`,
            }}
            variants={portalRing}
            custom={i}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={portalContent}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Title */}
        <motion.div
          className="mb-8"
          variants={floatAnimation}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="font-heading text-responsive-xl text-gradient-primary mb-4">
            {endGamePortal.title}
          </h2>
          <p className="text-responsive-lg text-secondary font-heading">
            {endGamePortal.subtitle}
          </p>
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-text-secondary text-responsive-base max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {endGamePortal.message}
        </motion.p>

        {/* Availability status */}
        <motion.div
          className="inline-flex items-center space-x-3 glass px-6 py-3 rounded-full mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-success"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <span className="font-mono text-sm text-success">
            {endGamePortal.availability.status} for{' '}
            {endGamePortal.availability.types.join(', ')}
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.a
            href={`mailto:${playerInfo.links.email}`}
            className="btn-primary group relative overflow-hidden min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">📧</span>
              {endGamePortal.cta.primary}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-accent"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href={playerInfo.links.resume}
            download
            className="btn-secondary min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center">
              <span className="mr-2">📄</span>
              {endGamePortal.cta.secondary}
            </span>
          </motion.a>
        </motion.div>

        {/* Social portals */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {endGamePortal.socialPortals.map((portal, index) => (
            <SocialPortal key={index} portal={portal} index={index} />
          ))}
        </motion.div>

        {/* Footer text */}
        <motion.div
          className="mt-16 pt-8 border-t border-primary/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-text-tertiary font-mono text-sm">
            Designed & Built by {playerInfo.name}
          </p>
          <p className="text-text-tertiary font-mono text-xs mt-2">
            Powered by Next.js, Framer Motion & Tailwind CSS
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function SocialPortal({ portal, index }: { portal: any; index: number }) {
  return (
    <motion.a
      href={portal.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      {/* Icon */}
      <motion.div
        className="text-4xl mb-3"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        {portal.icon}
      </motion.div>

      {/* Name */}
      <h3 className="font-heading text-lg text-primary mb-2 group-hover:text-secondary transition-colors">
        {portal.name}
      </h3>

      {/* Handle */}
      <p className="text-sm text-text-tertiary font-mono break-all">
        {portal.handle}
      </p>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-primary blur-xl opacity-0 group-hover:opacity-20 transition-opacity -z-10"
      />
    </motion.a>
  )
}
