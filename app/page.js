'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  const [bootComplete, setBootComplete] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev < 35) return prev + Math.random() * 5;
        if (prev < 40) return prev + 0.5;
        if (prev < 45) return prev;
        if (prev < 75) return prev + Math.random() * 8;
        if (prev < 85) return prev + Math.random() * 3;
        if (prev < 100) return prev + Math.random() * 5;
        return 100;
      });
    }, 100);

    const bootTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setLoadProgress(100);
      setTimeout(() => setBootComplete(true), 500);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(bootTimer);
    };
  }, []);

  useEffect(() => {
    if (!bootComplete) return;

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 8000);

    // Only run complex GSAP animations on desktop
    if (!isDesktop) {
      return () => clearInterval(glitchInterval);
    }

    const ctx = gsap.context(() => {
      // Hero parallax - FIXED: Smoother transition
      gsap.to('.hero-bg-layer', { 
        yPercent: 30, 
        ease: 'none', 
        scrollTrigger: { 
          trigger: '.hero-section', 
          start: 'top top', 
          end: 'bottom top', 
          scrub: 1.5 
        } 
      });

      gsap.to('.hero-content', { 
        yPercent: -15, 
        opacity: 0.5, 
        ease: 'power2.out', 
        scrollTrigger: { 
          trigger: '.hero-section', 
          start: 'top top', 
          end: 'bottom top', 
          scrub: 1.5 
        } 
      });
      
      gsap.to('.float-element', { y: 'random(-30, 30)', x: 'random(-20, 20)', rotation: 'random(-15, 15)', duration: 'random(4, 8)', repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.2 });
      gsap.to('.particle', { y: 'random(-200, 200)', x: 'random(-100, 100)', opacity: 'random(0.1, 0.5)', duration: 'random(3, 7)', repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.05, from: 'random' } });
      
      // About cards - SLOWER animations
      gsap.from('.about-card', { 
        y: 100, 
        opacity: 0, 
        duration: 1.2,
        stagger: 0.3, 
        scrollTrigger: { 
          trigger: '.about-section', 
          start: 'top 70%', 
          end: 'top 30%', 
          scrub: 2
        } 
      });
      
      // Projects horizontal scroll - DESKTOP ONLY
      const projectsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.projects-section-desktop',
          start: 'top top',
          end: () => `+=${window.innerWidth * 2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.2, max: 0.5 },
            ease: 'power1.inOut'
          }
        }
      });
      projectsTimeline.to('.projects-track', { xPercent: -66.66, ease: 'none' });
      
      // Contact - SLOWER zoom
      gsap.from('.contact-content', { 
        scale: 0.85, 
        opacity: 0,
        duration: 1.5,
        scrollTrigger: { 
          trigger: '.contact-section', 
          start: 'top 70%', 
          end: 'top 30%', 
          scrub: 2
        } 
      });
    });

    const handleHovers = () => {
      document.querySelectorAll('.interactive').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorHover(true));
        el.addEventListener('mouseleave', () => setCursorHover(false));
      });
    };
    handleHovers();

    return () => {
      ctx.revert();
      clearInterval(glitchInterval);
    };
  }, [bootComplete, isDesktop]);

  const getTerminalBar = (percent) => {
    const total = 20;
    const filled = Math.round((percent / 100) * total);
    return '[' + '█'.repeat(filled) + '░'.repeat(total - filled) + ']';
  };

  if (!bootComplete) {
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
            <div className="text-gray-600">Initializing combat systems...</div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-gray-500"><span className="text-green-500">✓</span> Loading weapon systems</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="text-gray-500"><span className="text-green-500">✓</span> Compiling GSAP engine</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="text-gray-500"><span className="text-green-500">✓</span> Establishing uplink</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="text-gray-500"><span className="text-green-500">✓</span> Initializing mission log</motion.div>
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

  return (
    <div className="bg-[#0a0a0a] text-white relative">
      {glitchActive && <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ background: 'linear-gradient(rgba(255,0,0,0.1) 50%, rgba(0,255,0,0.1) 50%)', mixBlendMode: 'difference' }} />}
      <div className="fixed inset-0 pointer-events-none z-[9997] opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
      
      {/* Custom cursor - hide on mobile */}
      <div className="hidden md:block cursor-follower fixed w-8 h-8 pointer-events-none z-[9999] mix-blend-difference" style={{ left: cursorPos.x - 16, top: cursorPos.y - 16, transform: `scale(${cursorHover ? 1.5 : 1})`, transition: 'transform 0.2s ease' }}>
        <div className="w-full h-full border-2 border-orange-500 rounded-full" style={{ boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)' }} />
      </div>

      {/* Glassmorphic HUD - Bottom Left, Horizontal */}
      <div className="fixed bottom-4 left-4 z-[9998] pointer-events-none">
        <div className="bg-black/20 backdrop-blur-xl border border-orange-500/30 rounded-lg p-3 md:p-4 font-mono" style={{ boxShadow: '0 8px 32px rgba(249, 115, 22, 0.15)' }}>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 text-[10px] md:text-xs">ONLINE</span>
            </div>
            <div className="w-px h-4 bg-orange-500/30" />
            <div className="flex items-center gap-2">
              <span className="text-orange-500/70 text-[10px] md:text-xs">SCROLL</span>
              <div className="w-24 md:w-32 h-1 bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-orange-600 to-orange-400" style={{ width: `${scrollProgress}%` }} />
              </div>
              <span className="text-orange-500 text-[10px] md:text-xs font-bold min-w-[32px] text-right">{Math.round(scrollProgress)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pixel art easter eggs - hide on mobile */}
      <div className="hidden md:block fixed top-20 left-10 w-8 h-8 pointer-events-none opacity-30 z-10" style={{ imageRendering: 'pixelated', background: 'repeating-conic-gradient(#f97316 0% 25%, transparent 0% 50%) 50% / 8px 8px' }} />
      <div className="hidden md:block fixed bottom-40 right-20 w-6 h-6 pointer-events-none opacity-20 z-10" style={{ imageRendering: 'pixelated', background: 'repeating-linear-gradient(45deg, #a855f7 0, #a855f7 2px, transparent 2px, transparent 4px)' }} />
      <div className="hidden md:block fixed top-1/2 right-10 w-10 h-10 pointer-events-none opacity-25 z-10 border-2 border-orange-500" style={{ imageRendering: 'pixelated' }} />

      {Array.from({ length: 30 }).map((_, i) => <div key={i} className="particle fixed w-1 h-1 bg-orange-500/30 rounded-full pointer-events-none" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />)}

      {/* Hero */}
      <section className="hero-section min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#0f0f0f] to-[#0a0a0a]" />
        <div className="hero-bg-layer absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        <div className="float-element absolute top-1/4 left-1/4 w-24 md:w-32 h-24 md:h-32 border-2 border-orange-500/30 pointer-events-none" style={{ transform: 'rotate(45deg)' }} />
        <div className="float-element absolute bottom-1/3 right-1/4 w-16 md:w-24 h-16 md:h-24 border-2 border-purple-500/30 rounded-full pointer-events-none" />
        <div className="float-element absolute top-1/2 right-1/3 w-12 md:w-20 h-12 md:h-20 border-2 border-orange-400/30 pointer-events-none" />
        <div className="hero-content relative z-10 max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-mono text-orange-500 text-xs md:text-sm mb-4 md:mb-6 tracking-widest">[ COMBAT SYSTEMS ONLINE ]</motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }} className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 md:mb-8" style={{ textShadow: glitchActive ? '3px 3px #f97316, -3px -3px #a855f7' : '0 0 40px rgba(249, 115, 22, 0.3)' }}>
            <span className="block">YOUR NAME</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-purple-500">OPERATOR</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 font-mono px-4">FRONTEND ENGINEER // MOTION SPECIALIST // UI ARCHITECT</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }} className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
            {[{ t: 'MISSION LOG', h: '#missions' }, { t: 'TECH ARSENAL', h: '#arsenal' }, { t: 'UPLINK', h: '#uplink' }].map((btn, i) => (
              <a key={i} href={btn.h} className="interactive px-4 md:px-8 py-2 md:py-3 border border-orange-500/50 bg-orange-500/5 hover:bg-orange-500/20 transition-all cursor-pointer group font-mono text-xs md:text-base"><span className="text-orange-500 group-hover:text-white transition-colors">{btn.t}</span></a>
            ))}
          </motion.div>
        </div>
        <motion.div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-orange-500/50 rounded-full flex items-start justify-center p-2"><motion.div className="w-1 h-2 bg-orange-500 rounded-full" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} /></div>
        </motion.div>
      </section>

      {/* About - RETRO PIXEL - RESPONSIVE */}
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
              <p className="text-gray-300 leading-relaxed mb-3 md:mb-4 font-mono text-xs md:text-sm">CLASSIFICATION: Frontend Specialist<br/>CLEARANCE LEVEL: Expert<br/>COMBAT RATING: 9.5/10</p>
              <p className="text-gray-400 leading-relaxed font-mono text-xs md:text-sm">Specialized in high-performance UI systems, motion-driven interfaces, and interactive experiences. Deployed on 50+ successful missions.</p>
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
                {['Motion Engineering', 'UI Architecture', 'GSAP Mastery', 'WebGL Integration', 'Performance Tuning', 'Responsive Design'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 md:gap-3 text-gray-300 font-mono text-xs md:text-sm"><span className="text-orange-500">[X]</span>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[{ num: '50+', label: 'MISSIONS' }, { num: '5+', label: 'YEARS' }, { num: '30+', label: 'ALLIES' }, { num: '95+', label: 'RATING' }].map((stat, i) => (
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

      {/* Skills - TECH ARSENAL WITH CONTENT - FIXED VISIBILITY */}
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
          
          {/* Main Weapon Systems - FIXED: Removed GSAP animation that was hiding cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[
              { category: 'WEAPON SYSTEMS', skills: ['GSAP ScrollTrigger', 'Framer Motion', 'Three.js Renderer', 'WebGL Shaders', 'Canvas 2D API', 'Lottie Player'], level: 98, color: 'orange' },
              { category: 'CORE FRAMEWORK', skills: ['React 18 Hooks', 'Next.js 14 App Router', 'TypeScript 5.x', 'Node.js Runtime', 'Tailwind CSS v4', 'Vite Bundler'], level: 95, color: 'purple' },
              { category: 'SUPPORT TOOLS', skills: ['Git Version Control', 'Figma Design', 'Webpack Config', 'Storybook Docs', 'Testing Library', 'VS Code IDE'], level: 92, color: 'cyan' }
            ].map((cat, i) => (
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

          {/* Additional Arsenal Tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {[
              'React Query',
              'Redux Toolkit',
              'Zustand Store',
              'React Router',
              'Axios HTTP',
              'Socket.io',
              'D3.js Charts',
              'Recharts',
              'Styled Components',
              'CSS Modules',
              'PostCSS',
              'Sass/SCSS',
              'Jest Testing',
              'Vitest',
              'Playwright E2E',
              'Cypress',
              'ESLint',
              'Prettier',
              'Husky Hooks',
              'GitHub Actions'
            ].map((tool, i) => (
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

      {/* Projects - MISSION LOG - RESPONSIVE: Desktop horizontal, Mobile vertical */}
      {isDesktop ? (
        // DESKTOP: Horizontal scroll experience
        <div id="missions" className="projects-section-desktop relative h-screen">
          <div className="projects-track flex items-center h-full" style={{ width: '300vw' }}>
            {[
              { num: '01', title: 'E-COMMERCE OPERATION', desc: 'Deployed high-performance storefront with 3D asset viewers and scroll-driven reveals. Mission resulted in 40% engagement increase and flawless execution.', tech: ['Next.js', 'Three.js', 'GSAP', 'Stripe'], stats: { m: '40%', l: 'SUCCESS' } },
              { num: '02', title: 'REAL-TIME SURVEILLANCE', desc: 'Constructed live data visualization dashboard with animated intel displays. System handles 10K+ concurrent operatives with sub-100ms response.', tech: ['React', 'D3.js', 'Canvas', 'WebSocket'], stats: { m: '10K', l: 'ACTIVE' } },
              { num: '03', title: 'INTERACTIVE INTEL', desc: 'Engineered narrative-driven experience with parallax systems and WebGL effects. Mission awarded recognition from global command.', tech: ['Next.js', 'WebGL', 'GSAP', 'Framer'], stats: { m: 'AWARD', l: 'WINNER' } }
            ].map((project, i) => (
              <div key={i} className="min-w-screen h-screen flex items-center justify-center px-4 md:px-16">
                <motion.div whileHover={{ scale: 1.02 }} className="interactive max-w-4xl border-2 border-orange-500/30 bg-black/80 backdrop-blur-xl p-6 md:p-12 hover:border-orange-500 transition-all group relative" style={{ boxShadow: '0 0 30px rgba(249, 115, 22, 0.2)' }}>
                  <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #f97316 2px, #f97316 4px)' }} />
                  <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                    <div className="text-5xl md:text-8xl font-bold text-orange-500/20 font-mono">{project.num}</div>
                    <div className="px-3 md:px-4 py-1 md:py-2 bg-orange-500/20 border border-orange-500/50 font-mono text-xs md:text-sm text-orange-500">{project.stats.m}<div className="text-[10px] md:text-xs text-orange-500/70">{project.stats.l}</div></div>
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
      ) : (
        // MOBILE/TABLET: Vertical scroll with basic animations
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
              {[
                { num: '01', title: 'E-COMMERCE OPERATION', desc: 'Deployed high-performance storefront with 3D asset viewers and scroll-driven reveals. Mission resulted in 40% engagement increase.', tech: ['Next.js', 'Three.js', 'GSAP', 'Stripe'], stats: { m: '40%', l: 'SUCCESS' } },
                { num: '02', title: 'REAL-TIME SURVEILLANCE', desc: 'Constructed live data visualization dashboard with animated intel displays. System handles 10K+ concurrent operatives.', tech: ['React', 'D3.js', 'Canvas', 'WebSocket'], stats: { m: '10K', l: 'ACTIVE' } },
                { num: '03', title: 'INTERACTIVE INTEL', desc: 'Engineered narrative-driven experience with parallax systems and WebGL effects. Mission awarded recognition.', tech: ['Next.js', 'WebGL', 'GSAP', 'Framer'], stats: { m: 'AWARD', l: 'WINNER' } }
              ].map((project, i) => (
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
      )}

      {/* Contact - UPLINK */}
      <section id="uplink" className="contact-section min-h-screen relative flex items-center justify-center px-4 md:px-8" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1420, #0a0a0a)' }}>
        <div className="contact-content relative z-10 text-center max-w-4xl">
          <h2 className="text-5xl md:text-8xl font-bold mb-6 md:mb-8 font-mono">ESTABLISH <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">UPLINK</span></h2>
          <p className="text-lg md:text-2xl text-gray-400 mb-8 md:mb-12 font-mono px-4">Ready for deployment on your next operation</p>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[{ label: 'COMMS', value: 'hello@operator.sys', link: 'mailto:hello@operator.sys' }, { label: 'NETWORK', value: 'github.com/operator', link: '#' }, { label: 'ALLIANCE', value: 'linkedin.com/operator', link: '#' }].map((contact, i) => (
              <motion.a key={i} href={contact.link} whileHover={{ scale: 1.05, borderColor: '#f97316' }} className="interactive block p-6 md:p-8 border-2 border-orange-500/30 bg-black/40 transition-all group"><div className="text-xs md:text-sm text-gray-500 mb-2 font-mono uppercase">{contact.label}</div><div className="text-sm md:text-lg text-orange-500 font-mono break-all">{contact.value}</div></motion.a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-900 py-6 md:py-8 px-4 md:px-8 bg-[#0a0a0a]"><div className="max-w-7xl mx-auto text-center"><div className="font-mono text-gray-600 text-[10px] md:text-xs">OPERATOR SYSTEMS v2.0 // POWERED BY GSAP + NEXT.JS</div></div></footer>
    </div>
  );
}