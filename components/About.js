'use client';

import { motion } from 'framer-motion';

export default function About({ data, stats, capabilities, isDesktop }) {
  return (
    <section className="about-section min-h-screen relative py-12 md:py-20 px-4 md:px-8" style={{ background: '#1a1420', imageRendering: 'pixelated' }}>
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-conic-gradient(#f97316 0% 25%, transparent 0% 50%) 0 0/4px 4px', opacity: 0.03 }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-bold mb-8 md:mb-12 text-center font-mono" 
          style={{ textShadow: '4px 4px 0 #f97316', color: '#fff' }}
        >
          OPERATOR PROFILE
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, x: isDesktop ? -50 : 0, y: isDesktop ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-card border-2 md:border-4 border-orange-500 bg-black/80 p-6 md:p-8" 
            style={{ boxShadow: '6px 6px 0 rgba(249, 115, 22, 0.5)' }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-mono text-orange-500">[ STATUS REPORT ]</h3>
            <p className="text-gray-300 leading-relaxed mb-3 md:mb-4 font-mono text-xs md:text-sm">
              CLASSIFICATION: {data.classification}<br/>
              CLEARANCE LEVEL: {data.clearance}<br/>
              COMBAT RATING: {data.combatRating}
            </p>
            <p className="text-gray-400 leading-relaxed font-mono text-xs md:text-sm">{data.description}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: isDesktop ? 50 : 0, y: isDesktop ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="about-card border-2 md:border-4 border-purple-500 bg-black/80 p-6 md:p-8" 
            style={{ boxShadow: '6px 6px 0 rgba(168, 85, 247, 0.5)' }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-mono text-purple-400">[ CAPABILITIES ]</h3>
            <ul className="space-y-2 md:space-y-3">
              {capabilities.map((item, i) => (
                <li key={i} className="flex items-center gap-2 md:gap-3 text-gray-300 font-mono text-xs md:text-sm">
                  <span className="text-orange-500">[X]</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={isDesktop ? { scale: 1.05 } : {}}
              className="about-card interactive border-2 border-gray-700 bg-black/60 p-4 md:p-6 text-center hover:border-orange-500 transition-all" 
              style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
            >
              <div className="text-3xl md:text-5xl font-bold text-orange-500 mb-1 md:mb-2 font-mono">{stat.num}</div>
              <div className="text-[10px] md:text-xs text-gray-500 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
