'use client';

import { motion } from 'framer-motion';

export default function Projects({ missions, isDesktop }) {
  if (isDesktop) {
    return (
      <div id="missions" className="projects-section-desktop relative h-screen">
        <div className="projects-track flex items-center h-full" style={{ width: `${missions.length * 50}vw` }}>
          {missions.map((project, i) => (
            <div key={i} className="min-w-screen h-screen flex items-center justify-center px-4 md:px-16">
              <motion.div whileHover={{ scale: 1.02 }} className="interactive max-w-4xl border-2 border-orange-500/30 bg-black/80 backdrop-blur-xl p-6 md:p-12 hover:border-orange-500 transition-all group relative" style={{ boxShadow: '0 0 30px rgba(249, 115, 22, 0.2)' }}>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #f97316 2px, #f97316 4px)' }} />
                <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                  <div className="text-5xl md:text-8xl font-bold text-orange-500/20 font-mono">{project.num}</div>
                  <div className="px-3 md:px-4 py-1 md:py-2 bg-orange-500/20 border border-orange-500/50 font-mono text-xs md:text-sm text-orange-500 text-center">
                    {project.stats.m}
                    <div className="text-[10px] md:text-xs text-orange-500/70">{project.stats.l}</div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 group-hover:text-orange-500 transition-colors font-mono relative z-10">{project.title}</h3>
                <p className="text-sm md:text-lg text-gray-400 leading-relaxed mb-6 md:mb-8 font-mono relative z-10">{project.desc}</p>
                <div className="flex gap-2 md:gap-3 flex-wrap relative z-10">
                  {project.tech.map((t, j) => <span key={j} className="px-3 md:px-4 py-1 md:py-2 border border-orange-500/50 text-orange-500 text-xs md:text-sm font-mono bg-orange-500/5">{t}</span>)}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="missions" className="projects-section-mobile min-h-screen relative py-12 px-4" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1420)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 font-mono"
        >
          MISSION LOG
        </motion.h2>
        <div className="space-y-6">
          {missions.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-30px" }}
              className="border-2 border-orange-500/30 bg-black/80 backdrop-blur-sm p-6 relative"
              style={{ boxShadow: '0 0 20px rgba(249, 115, 22, 0.15)' }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl font-bold text-orange-500/30 font-mono">{project.num}</div>
                <div className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 font-mono text-xs text-orange-500 text-center">
                  {project.stats.m}
                  <div className="text-[10px] text-orange-500/70">{project.stats.l}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white font-mono">{project.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 font-mono">{project.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tech.map((t, j) => (
                  <span key={j} className="px-3 py-1 border border-orange-500/50 text-orange-500 text-xs font-mono bg-orange-500/5">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
