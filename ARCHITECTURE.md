# 🏗️ Architecture Documentation

## Overview

This portfolio is built with a **component-driven, data-first architecture** using Next.js 15 App Router, TypeScript, and Framer Motion.

## Core Principles

### 1. **Data Separation**
- All content lives in `/data/portfolio-data.ts`
- Components are pure presentational - they only read from data
- Update content = edit one file, UI updates automatically

### 2. **Animation-First Design**
- Each section has unique motion personality
- No generic fade-ins - every animation tells a story
- Scroll-driven, performant, and accessible

### 3. **Component Architecture**
```
app/
  ├── layout.tsx        → Root layout, fonts, metadata
  ├── page.tsx          → Main page orchestrator
  └── globals.css       → Global styles & utilities

sections/               → Self-contained page sections
  ├── BootSequence.tsx  → Terminal boot animation
  ├── Hero.tsx          → Main hero with game start vibes
  ├── PlayerStats.tsx   → About section as RPG stats
  ├── SkillTree.tsx     → Interactive skill visualization
  ├── QuestLog.tsx      → Experience timeline
  ├── Missions.tsx      → Projects with modal details
  ├── Achievements.tsx  → Badge collection
  ├── TechArsenal.tsx   → Tech stack as equipment
  └── EndGamePortal.tsx → Contact with portal effect

components/            → Reusable UI components
  ├── Navigation.tsx    → Game HUD-style navigation
  ├── ScrollProgress.tsx → Scroll indicator
  ├── CursorEffect.tsx  → Custom cursor
  └── ScanlineOverlay.tsx → Retro scanline effect

data/                  → Single source of truth
  └── portfolio-data.ts → ALL content here

animations/            → Animation library
  └── variants.ts      → Framer Motion variants

hooks/                 → Custom React hooks
  ├── useScrollAnimation.ts
  └── useReducedMotion.ts

utils/                 → Shared utilities
  └── constants.ts
```

## Data Flow

```
portfolio-data.ts
      ↓
   [Section Components]
      ↓
   [Animation Variants]
      ↓
   [Rendered UI]
```

### Example: Adding a New Project

1. Open `data/portfolio-data.ts`
2. Add to `missions` array:
```typescript
{
  id: "mission-7",
  projectName: "New Project",
  // ... rest of fields
}
```
3. Save → UI updates automatically!

## Animation System

### Variant Library (`animations/variants.ts`)
Reusable motion definitions for consistent animations:

- `fadeInUp`, `fadeIn`, `scaleIn` - Common transitions
- `terminalLine`, `glitchText` - Hero animations
- `hudPanel`, `statBar` - Player stats
- `skillNode`, `skillConnection` - Skill tree
- `questCard`, `timelineDot` - Quest log
- `missionCard` - Projects
- `badgeUnlock`, `badgeGlow` - Achievements
- `weaponSlot`, `glitchEffect` - Tech arsenal
- `portalRing`, `portalContent` - Contact portal

### Custom Hooks
- `useScrollAnimation` - Detect viewport intersection
- `useScrollProgress` - Track scroll progress (0-1)
- `useScrollDirection` - Detect scroll up/down
- `useReducedMotion` - Respect accessibility preferences

## Styling Strategy

### Tailwind Utilities
- Custom theme extending Tailwind config
- Utility classes for rapid development
- Responsive breakpoints (sm, md, lg, xl)

### Global Styles (`globals.css`)
- CSS custom properties for colors
- Reusable component classes (`.glass`, `.neon-border`)
- Animation utilities
- Reduced motion support

### Color System
```css
--color-primary:   #00D9FF  (Cyan)
--color-secondary: #9D4EDD  (Purple)
--color-accent:    #FFD60A  (Yellow)
--color-success:   #06FFA5  (Neon Green)
--color-danger:    #FF006E  (Hot Pink)
--color-warning:   #FB5607  (Orange)

--bg-primary:   #0A0E27  (Very Dark Blue)
--bg-secondary: #151934  (Dark Blue)
--bg-tertiary:  #1E2749  (Medium Dark Blue)
```

## Performance Optimizations

1. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based splitting (App Router automatic)

2. **Animation Performance**
   - GPU-accelerated transforms
   - `will-change` hints where needed
   - Reduced motion support

3. **Image Optimization**
   - Next.js Image component ready
   - Lazy loading by default

4. **SEO & Metadata**
   - Dynamic metadata in `layout.tsx`
   - OpenGraph tags
   - Sitemap & robots.txt

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML, ARIA labels
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Color Contrast**: WCAG AA compliant
- **Focus States**: Clear focus indicators

## Deployment

### Vercel (Recommended)
1. Connect GitHub repo
2. Auto-deploy on push
3. Preview URLs for PRs

### Build Commands
```bash
npm run build  # Production build
npm start      # Start production server
npm run dev    # Development mode
```

### Environment
- Node.js 18+
- No environment variables needed for basic deployment

## Future Enhancements

### Potential Additions
- [ ] Dark/Light theme toggle
- [ ] Blog integration (MDX)
- [ ] Project detail pages (dynamic routes)
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Contact form with backend
- [ ] i18n (internationalization)
- [ ] 3D elements (Three.js / React Three Fiber)

### Performance Monitoring
- Lighthouse CI in pipeline
- Core Web Vitals tracking
- Error monitoring (Sentry)

## Maintenance

### Regular Updates
1. Update dependencies monthly
2. Test on major Next.js releases
3. Review and update content quarterly
4. Monitor Core Web Vitals

### Content Updates
Simply edit `data/portfolio-data.ts` - no code changes needed!

## Troubleshooting

### Build Errors
- Check TypeScript errors: `npm run build`
- Ensure all imports are correct
- Verify data structure matches types

### Animation Issues
- Check `prefers-reduced-motion` setting
- Verify Framer Motion version compatibility
- Test on different browsers

### Styling Issues
- Clear `.next` cache: `rm -rf .next`
- Rebuild Tailwind: `npm run dev`
- Check for conflicting CSS

---

**Built with 💙 by Srinivas Krishna S K**
