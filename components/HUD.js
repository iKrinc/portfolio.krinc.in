'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HUD({ scrollProgress, cursorPos, cursorHover, isDesktop }) {
  const shouldHide = !isDesktop && scrollProgress >= 98;
  const [particles, setParticles] = useState([]);

  // Generate particle positions client-side only to prevent hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  return (
    <>
      {/* Custom cursor - hide on mobile */}
      <div 
        className="hidden md:block cursor-follower fixed w-8 h-8 pointer-events-none z-[9999] mix-blend-difference" 
        style={{ 
          left: cursorPos.x - 16, 
          top: cursorPos.y - 16, 
          transform: `scale(${cursorHover ? 1.5 : 1})`, 
          transition: 'transform 0.2s ease' 
        }}
      >
        <div className="w-full h-full border-2 border-orange-500 rounded-full" style={{ boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)' }} />
      </div>

      {/* Glassmorphic HUD - Bottom Left, Horizontal */}
      <motion.div 
        animate={{ 
          opacity: shouldHide ? 0 : 1,
          y: shouldHide ? 20 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed bottom-4 left-4 z-[9998] pointer-events-none"
      >
        <div 
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-3 md:p-4 font-mono relative overflow-hidden" 
          style={{ 
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-3 md:gap-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-green-500/90 text-[10px] md:text-xs font-medium">ONLINE</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-[10px] md:text-xs tracking-wider">SCROLL</span>
              <div className="w-24 md:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400" 
                  style={{ width: `${scrollProgress}%` }} 
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
              <span className="text-orange-500 text-[10px] md:text-xs font-bold min-w-[32px] text-right" style={{ textShadow: '0 0 10px rgba(249,115,22,0.3)' }}>
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pixel art easter eggs - hide on mobile */}
      <div className="hidden md:block fixed top-20 left-10 w-8 h-8 pointer-events-none opacity-30 z-10" style={{ imageRendering: 'pixelated', background: 'repeating-conic-gradient(#f97316 0% 25%, transparent 0% 50%) 50% / 8px 8px' }} />
      <div className="hidden md:block fixed bottom-40 right-20 w-6 h-6 pointer-events-none opacity-20 z-10" style={{ imageRendering: 'pixelated', background: 'repeating-linear-gradient(45deg, #a855f7 0, #a855f7 2px, transparent 2px, transparent 4px)' }} />
      <div className="hidden md:block fixed top-1/2 right-10 w-10 h-10 pointer-events-none opacity-25 z-10 border-2 border-orange-500" style={{ imageRendering: 'pixelated' }} />

      {/* Particles - client-side only, no SSR to avoid hydration mismatch */}
      {particles.map((p) => (
        <div key={p.id} className="particle fixed w-1 h-1 bg-orange-500/30 rounded-full pointer-events-none" style={{ left: p.left, top: p.top }} />
      ))}
    </>
  );
}
