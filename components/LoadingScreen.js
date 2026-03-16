'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen({ loadProgress }) {
  const getTerminalBar = (percent) => {
    const total = 20;
    const filled = Math.round((percent / 100) * total);
    return '[' + '█'.repeat(filled) + '░'.repeat(total - filled) + ']';
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-start justify-start p-4 md:p-8 overflow-hidden font-mono">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)' }} />
      <div className="w-full max-w-4xl text-xs md:text-sm relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
          <span className="text-green-500" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}>user@portfolio</span>
          <span className="text-gray-500">:</span>
          <span className="text-blue-400" style={{ textShadow: '0 0 10px rgba(96, 165, 250, 0.3)' }}>~</span>
          <span className="text-gray-500">$</span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="ml-2 text-white">npm run deploy</motion.span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-2 h-4 bg-green-500 ml-1" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="space-y-1 mb-6">
          <div className="text-gray-600">Initializing portfolio...</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-gray-500"><span className="text-green-500">✓</span> Loading GSAP + Framer Motion</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="text-gray-500"><span className="text-green-500">✓</span> Compiling project data</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="text-gray-500"><span className="text-green-500">✓</span> Registering scroll triggers</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="text-gray-500"><span className="text-green-500">✓</span> Ready to render</motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="mb-4">
          <div className="text-gray-600 mb-2">Deployment: <span className="text-orange-500">{Math.round(loadProgress)}%</span></div>
          <div className="text-orange-500 text-sm md:text-base" style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.5)', letterSpacing: '0.05em' }}>{getTerminalBar(loadProgress)} {Math.round(loadProgress)}%</div>
        </motion.div>
        {loadProgress >= 99 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400" style={{ textShadow: '0 0 20px rgba(74, 222, 128, 0.6)' }}><span className="text-xl">▶</span> SYSTEM ONLINE</motion.div>
        )}
      </div>
    </div>
  );
}
