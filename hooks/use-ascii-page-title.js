'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for ASCII animated page titles
 * Only runs on desktop/laptop devices
 */
export function useASCIIPageTitle({
  isLoading = false,
  loadProgress = 0,
  currentSection = 'hero'
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const animationFrame = useRef(null);
  const frameCount = useRef(0);

  // Detect desktop vs mobile/tablet
  useEffect(() => {
    const checkDevice = () => {
      // Check both viewport width and touch capability
      const width = window.innerWidth;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // Desktop: width >= 1024px AND not touch device
      setIsDesktop(width >= 1024 && !hasTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // ASCII Loading Animation
  useEffect(() => {
    if (!isDesktop || !isLoading) return;

    const loadingFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const blockFrames = ['▰', '▱'];
    let frameIndex = 0;
    let lastUpdate = 0;
    const frameDelay = 80;

    const animate = (timestamp) => {
      if (timestamp - lastUpdate >= frameDelay) {
        const progress = Math.min(Math.floor(loadProgress), 100);
        const barLength = 12;
        const filled = Math.floor((progress / 100) * barLength);

        // Animated loading bar with different fill patterns
        let bar = '';
        for (let i = 0; i < barLength; i++) {
          if (i < filled) {
            bar += '█';
          } else if (i === filled) {
            // Animate the filling edge
            bar += blockFrames[Math.floor(frameIndex / 2) % blockFrames.length];
          } else {
            bar += '░';
          }
        }

        const spinner = loadingFrames[frameIndex % loadingFrames.length];

        // Add percentage with padding
        const percentStr = String(progress).padStart(3, ' ');

        document.title = `${spinner} [${bar}] ${percentStr}%`;

        frameIndex++;
        lastUpdate = timestamp;
      }
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isDesktop, isLoading, loadProgress]);

  // Section-based animations after loading
  useEffect(() => {
    if (!isDesktop || isLoading) return;

    // Meaningful ASCII animations for each section
    const animations = {
      // Hero: Developer typing code with blinking cursor
      hero: [
        '> |       ',
        '> _|      ',
        '> c|      ',
        '> co|     ',
        '> cod|    ',
        '> code|   ',
        '> code(|  ',
        '> code()|',
        '> code() |',
        '> code() {',
        '> code() {',
        '> code() {',
        '> code()',
        '> code(',
        '> code',
        '> cod',
        '> co',
        '> c',
        '> _',
        '> |',
        '>  ',
        '> |'
      ],
      // About: User profile card with avatar
      about: [
        '┌───────┐',
        '│ ●   ● │',
        '│   ▵   │',
        '│  ───  │',
        '└───────┘',
        '┌───────┐',
        '│ ◉   ◉ │',
        '│   ▵   │',
        '│  ───  │',
        '└───────┘',
        '┌───────┐',
        '│ ●   ● │',
        '│   ▿   │',
        '│  \_/  │',
        '└───────┘',
        '┌───────┐',
        '│ ◉   ◉ │',
        '│   ▿   │',
        '│  \_/  │',
        '└───────┘',
        '┌───────┐',
        '│ -   - │',
        '│   ▿   │',
        '│  \_/  │',
        '└───────┘'
      ],
      // Skills: Building/compiling code
      skills: [
        '[      ]',
        '[■     ]',
        '[■■    ]',
        '[■■■   ]',
        '[■■■■  ]',
        '[■■■■■ ]',
        '[■■■■■■]',
        '[■■■■■■]',
        '<BUILD>',
        '{BUILT}',
        '< /> ✓ ',
        '</> ✓  ',
        '<code>',
        '{ API }',
        '[ OK ] ',
        '✓ DONE',
        '[■■■■■■]',
        '[■■■■■ ]',
        '[■■■■  ]',
        '[■■■   ]',
        '[■■    ]',
        '[■     ]'
      ],
      // Projects: Rocket launching to space
      projects: [
        '    ∧    ',
        '   /█\\   ',
        '  /███\\  ',
        '  |███|  ',
        '   ███   ',
        '   ▓▓▓   ',
        '   ∼∼∼   ',
        '    ∧    ',
        '   /█\\   ',
        '  /███\\  ',
        '   ███   ',
        '  ≈≈≈≈≈  ',
        '    ∧    ',
        '   /█\\   ',
        '  /███\\  ',
        ' ∼∼∼∼∼∼∼ ',
        '    ∧    ',
        '   /█\\   ',
        '    ∧    ',
        '    ★    ',
        '    ·    ',
        '         '
      ],
      // Contact: Signal/message transmission
      contact: [
        '◉         ',
        '·◉        ',
        '··◉       ',
        '···◉      ',
        '····◉     ',
        '·····◉    ',
        '······◉   ',
        '·······◉  ',
        '········◉ ',
        '·········◉',
        '         ◉',
        '[SENT] ✓ ',
        '╔══════╗ ',
        '║ MSG  ║→',
        '╚══════╝ ',
        '   →→→  ◉',
        '((  ●  ))',
        '(( ))) ))',
        '((     ))',
        '  (●)    ',
        '  )))    ',
        '         '
      ]
    };

    // Glitch characters for random effect
    const glitchChars = ['█', '▓', '▒', '░', '▀', '▄', '▌', '▐', '■', '□'];

    let frame = 0;
    let lastUpdate = 0;
    const frameDelay = 100; // milliseconds between frames

    const animate = (timestamp) => {
      if (timestamp - lastUpdate >= frameDelay) {
        const currentAnim = animations[currentSection] || animations.hero;
        const animIndex = frame % currentAnim.length;

        let title = currentAnim[animIndex];

        // Add occasional glitch effect (every ~5 seconds)
        if (frame % 50 === 0 && Math.random() > 0.7) {
          const glitchCount = Math.floor(Math.random() * 3) + 1;
          const glitch = Array(glitchCount)
            .fill(0)
            .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
            .join('');
          title = glitch + ' ' + title + ' ' + glitch;
        }

        document.title = title;
        frame++;
        lastUpdate = timestamp;
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      // Reset to default title
      document.title = 'OPERATOR | Motion-First Portfolio';
    };
  }, [isDesktop, isLoading, currentSection]);

  return { isDesktop };
}
