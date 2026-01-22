'use client';

import { motion } from 'framer-motion';

export default function Skills({ arsenal, tools, isDesktop }) {
  return (
    <section id="arsenal" className="skills-section min-h-screen relative py-12 md:py-20 px-4 md:px-8" style={{ background: 'linear-gradient(to bottom, #1a1420, #0a0a0a)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-bold mb-8 md:mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 font-mono"
        >
          TECH ARSENAL
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {arsenal.map((cat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={isDesktop ? { scale: 1.03, rotate: 1 } : {}}
              className={`border-2 ${cat.color === 'orange' ? 'border-orange-500/50 hover:border-orange-500' : cat.color === 'purple' ? 'border-purple-500/50 hover:border-purple-500' : 'border-cyan-500/50 hover:border-cyan-500'} bg-black/70 backdrop-blur-sm p-6 md:p-8 transition-all relative overflow-hidden`}
              style={{ boxShadow: `0 0 30px ${cat.color === 'orange' ? 'rgba(249, 115, 22, 0.2)' : cat.color === 'purple' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(34, 211, 238, 0.2)'}` }}
            >
              <div className={`absolute top-0 right-0 px-3 py-1 ${cat.color === 'orange' ? 'bg-orange-500/20 text-orange-500' : cat.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'} font-mono text-[10px] md:text-xs`}>
                PWR {cat.level}%
              </div>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 font-mono ${cat.color === 'orange' ? 'text-orange-500' : cat.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'}`}>
                {cat.category}
              </h3>
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {cat.skills.map((skill, j) => (
                  <motion.div 
                    key={j} 
                    whileHover={isDesktop ? { x: 8 } : {}}
                    className={`text-xs md:text-sm text-gray-400 font-mono flex items-center gap-2 ${cat.color === 'orange' ? 'hover:text-orange-400' : cat.color === 'purple' ? 'hover:text-purple-400' : 'hover:text-cyan-400'} transition-colors`}
                  >
                    <span className={cat.color === 'orange' ? 'text-orange-500' : cat.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'}>&gt;</span>
                    {skill}
                  </motion.div>
                ))}
              </div>
              <div className="h-2 bg-gray-800/70 rounded-full relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: `${cat.level}%` }} 
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className={`h-full ${cat.color === 'orange' ? 'bg-gradient-to-r from-orange-600 to-orange-400' : cat.color === 'purple' ? 'bg-gradient-to-r from-purple-600 to-purple-400' : 'bg-gradient-to-r from-cyan-600 to-cyan-400'}`} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {tools.map((tool, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={isDesktop ? { scale: 1.05 } : {}}
              className="interactive px-3 md:px-4 py-2 md:py-3 border border-orange-500/50 bg-black/60 hover:border-orange-500 hover:bg-orange-500/10 transition-all text-center"
            >
              <span className="text-xs md:text-sm font-mono text-orange-500">{tool}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
