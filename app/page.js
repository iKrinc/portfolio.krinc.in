'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { portfolioData } from '@/lib/data';

// Components
import LoadingScreen from '@/components/LoadingScreen';
import HUD from '@/components/HUD';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Portfolio() {
  const [bootComplete, setBootComplete] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const mainRef = useRef(null);

  // Detect screen size for responsive behavior
  useIsomorphicLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Cursor movement with GSAP quickTo for better performance
  const xTo = useRef();
  const yTo = useRef();

  useEffect(() => {
    if (!bootComplete || !isDesktop) return;

    xTo.current = gsap.quickTo('.cursor-follower', 'left', { duration: 0.2, ease: 'power3' });
    yTo.current = gsap.quickTo('.cursor-follower', 'top', { duration: 0.2, ease: 'power3' });

    const moveCursor = (e) => {
      if (xTo.current && yTo.current) {
        xTo.current(e.clientX - 16);
        yTo.current(e.clientY - 16);
      }
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [bootComplete, isDesktop]);

  // Scroll progress
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

  // Loading simulation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev < 100) return prev + Math.random() * 5;
        return 100;
      });
    }, 100);

    const bootTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setLoadProgress(100);
      setTimeout(() => setBootComplete(true), 500);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(bootTimer);
    };
  }, []);

  // GSAP Animations
  useIsomorphicLayoutEffect(() => {
    if (!bootComplete) return;

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 8000);

    const ctx = gsap.context(() => {
      if (!isDesktop) return;

      // Hero parallax
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
      
      gsap.to('.float-element', { 
        y: 'random(-30, 30)', 
        x: 'random(-20, 20)', 
        rotation: 'random(-15, 15)', 
        duration: 'random(4, 8)', 
        repeat: -1, 
        yoyo: true, 
        ease: 'sine.inOut', 
        stagger: 0.2 
      });

      gsap.to('.particle', { 
        y: 'random(-200, 200)', 
        x: 'random(-100, 100)', 
        opacity: 'random(0.1, 0.5)', 
        duration: 'random(3, 7)', 
        repeat: -1, 
        yoyo: true, 
        ease: 'sine.inOut', 
        stagger: { each: 0.05, from: 'random' } 
      });
      
      // About cards
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
      
      // Projects horizontal scroll
      const projectsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.projects-section-desktop',
          start: 'top top',
          end: () => `+=${window.innerWidth * 2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Crucial for responsive crashes
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.2, max: 0.5 },
            ease: 'power1.inOut'
          }
        }
      });
      projectsTimeline.to('.projects-track', { xPercent: -66.66, ease: 'none' });
      
      // Contact
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
    }, mainRef);

    // Interactive hover handling
    const elements = document.querySelectorAll('.interactive');
    const handleMouseEnter = () => setCursorHover(true);
    const handleMouseLeave = () => setCursorHover(false);

    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      ctx.revert();
      clearInterval(glitchInterval);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [bootComplete, isDesktop]);

  if (!bootComplete) {
    return <LoadingScreen loadProgress={loadProgress} />;
  }

  return (
    <div ref={mainRef} className="bg-[#0a0a0a] text-white relative">
      {glitchActive && (
        <div 
          className="fixed inset-0 pointer-events-none z-[9999]" 
          style={{ 
            background: 'linear-gradient(rgba(255,0,0,0.1) 50%, rgba(0,255,0,0.1) 50%)', 
            mixBlendMode: 'difference' 
          }} 
        />
      )}
      
      <div className="fixed inset-0 pointer-events-none z-[9997] opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
      
      <HUD 
        scrollProgress={scrollProgress} 
        cursorPos={cursorPos} 
        cursorHover={cursorHover} 
        isDesktop={isDesktop}
      />

      <Hero data={portfolioData.operator} glitchActive={glitchActive} />
      
      <About 
        data={portfolioData.operator} 
        stats={portfolioData.stats} 
        capabilities={portfolioData.capabilities} 
        isDesktop={isDesktop}
      />
      
      <Skills 
        arsenal={portfolioData.arsenal} 
        tools={portfolioData.tools} 
        isDesktop={isDesktop}
      />
      
      <Projects 
        missions={portfolioData.missions} 
        isDesktop={isDesktop}
      />
      
      <Contact data={portfolioData.contact} />
      
      <Footer />
    </div>
  );
}