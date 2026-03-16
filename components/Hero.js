'use client';

import { motion } from 'framer-motion';

export default function Hero({ data, glitchActive }) {
  return (
    <section className="hero-section min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#0f0f0f] to-[#0a0a0a]" />
      <div className="hero-bg-layer absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      <div className="float-element absolute top-1/4 left-1/4 w-24 md:w-32 h-24 md:h-32 border-2 border-orange-500/30 pointer-events-none" style={{ transform: 'rotate(45deg)' }} />
      <div className="float-element absolute bottom-1/3 right-1/4 w-16 md:w-24 h-16 md:h-24 border-2 border-purple-500/30 rounded-full pointer-events-none" />
      <div className="float-element absolute top-1/2 right-1/3 w-12 md:w-20 h-12 md:h-20 border-2 border-orange-400/30 pointer-events-none" />

      <div className="hero-content relative z-10 max-w-7xl px-4 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-mono text-orange-500 text-xs md:text-sm mb-4 md:mb-6 tracking-widest">[ PORTFOLIO ONLINE ]</motion.div>
        <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }} className="text-4xl md:text-7xl lg:text-9xl font-bold mb-6 md:mb-8" style={{ textShadow: glitchActive ? '3px 3px #f97316, -3px -3px #a855f7' : '0 0 40px rgba(249, 115, 22, 0.3)' }}>
          <span className="block">{data.name}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-purple-500 text-5xl md:text-8xl">
            {data.title}
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 font-mono px-4">
          {data.roles.join(' // ')}
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }} className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
          {[{ t: 'PROJECTS', h: '#missions' }, { t: 'SKILLS', h: '#arsenal' }, { t: 'CONTACT', h: '#uplink' }].map((btn, i) => (
            <a key={i} href={btn.h} className="interactive px-4 md:px-8 py-2 md:py-3 border border-orange-500/50 bg-orange-500/5 hover:bg-orange-500/20 transition-all cursor-pointer group font-mono text-xs md:text-base">
              <span className="text-orange-500 group-hover:text-white transition-colors">{btn.t}</span>
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-orange-500/50 rounded-full flex items-start justify-center p-2">
          <motion.div className="w-1 h-2 bg-orange-500 rounded-full" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
        </div>
      </motion.div>
    </section>
  );
}
