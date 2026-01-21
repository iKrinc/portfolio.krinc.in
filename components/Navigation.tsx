'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playerInfo } from '@/data/portfolio-data'
import { SECTION_IDS } from '@/utils/constants'

const navItems = [
  { label: 'HOME', id: SECTION_IDS.HERO },
  { label: 'STATS', id: SECTION_IDS.PLAYER_STATS },
  { label: 'SKILLS', id: SECTION_IDS.SKILL_TREE },
  { label: 'QUESTS', id: SECTION_IDS.QUEST_LOG },
  { label: 'MISSIONS', id: SECTION_IDS.MISSIONS },
  { label: 'TECH', id: SECTION_IDS.TECH_ARSENAL },
  { label: 'CONTACT', id: SECTION_IDS.CONTACT },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(SECTION_IDS.HERO)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Determine active section
      const sections = Object.values(SECTION_IDS)
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-background-primary/80 backdrop-blur-lg border-b border-primary/20' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 3.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Name */}
            <motion.div
              className="font-heading text-xl text-primary cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection(SECTION_IDS.HERO)}
            >
              <span className="hidden sm:inline">{playerInfo.alias}</span>
              <span className="sm:hidden">SK</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 font-mono text-sm transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeNav"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-primary block"
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 9 : 0 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-primary block"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-primary block"
                  animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -9 : 0 }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-background-secondary/95 backdrop-blur-lg border-t border-primary/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 font-mono rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary/20 text-primary'
                        : 'text-text-secondary hover:bg-primary/10 hover:text-primary'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
