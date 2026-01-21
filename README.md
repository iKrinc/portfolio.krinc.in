# 🎮 Portfolio: Developer Edition

> An immersive, gamified portfolio experience built with Next.js 15, Framer Motion, and creative storytelling.

## 🚀 Features

- **Gamified UX**: Every section is themed like an RPG game level
- **Advanced Animations**: Unique Framer Motion animations for each section
- **Data-Driven**: Single source of truth for all content
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Performance Focused**: 60fps animations, optimized rendering
- **Accessible**: WCAG compliant, keyboard navigation, reduced motion support
- **SEO Optimized**: Meta tags, OpenGraph, sitemap, robots.txt

## 📂 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts & metadata
│   ├── page.tsx           # Main page component
│   ├── globals.css        # Global styles & utilities
│   ├── robots.ts          # SEO robots configuration
│   └── sitemap.ts         # Sitemap generation
├── sections/              # Page sections (game levels)
│   ├── BootSequence.tsx   # Terminal boot animation
│   ├── Hero.tsx           # Game start screen
│   ├── PlayerStats.tsx    # About me as RPG stats
│   ├── SkillTree.tsx      # Interactive skill tree
│   ├── QuestLog.tsx       # Experience timeline
│   ├── Missions.tsx       # Projects archive
│   ├── Achievements.tsx   # Badge collection
│   ├── TechArsenal.tsx    # Tech stack as equipment
│   └── EndGamePortal.tsx  # Contact with portal effect
├── components/            # Reusable UI components
│   ├── Navigation.tsx     # Game HUD-style nav
│   ├── ScrollProgress.tsx # Scroll indicator
│   ├── CursorEffect.tsx   # Custom cursor
│   └── ScanlineOverlay.tsx # Retro scanline effect
├── data/                  # Content repository
│   └── portfolio-data.ts  # **SINGLE SOURCE OF TRUTH**
├── animations/            # Animation library
│   └── variants.ts        # Framer Motion variants
├── hooks/                 # Custom React hooks
│   ├── useScrollAnimation.ts
│   └── useReducedMotion.ts
├── utils/                 # Utilities & constants
│   └── constants.ts
└── styles/                # Additional styles (if needed)
```

## 🎨 Design Philosophy

### The Theme: "Developer: The RPG"
Every section represents a game level with its own visual identity and animation style:

1. **Boot Sequence** - Terminal loading screen
2. **Hero** - Character select / game start
3. **Player Stats** - RPG attribute panel with HUD elements
4. **Skill Tree** - Interactive unlock system
5. **Quest Log** - Experience as completed quests
6. **Missions** - Projects as boss battles
7. **Achievements** - Badge vault with rarity tiers
8. **Tech Arsenal** - Equipment loadout
9. **End Portal** - Contact as final level exit

### Animation Principles
- **No basic fade-ins**: Every section has unique motion personality
- **Scroll-driven**: Animations triggered by viewport intersection
- **Performance first**: 60fps target, reduced motion support
- **Storytelling**: Animations enhance the narrative

## 📝 How to Update Content

### Single Data Source
**All content lives in `/data/portfolio-data.ts`**

To update your portfolio:

1. Open `/data/portfolio-data.ts`
2. Edit the relevant section:
   - `playerInfo` - Personal info, links, status
   - `playerStats` - About me, attributes, quick stats
   - `skillTree` - Technical skills by category
   - `questLog` - Work experience
   - `missions` - Projects portfolio
   - `achievements` - Badges & milestones
   - `techArsenal` - Grouped technologies
   - `endGamePortal` - Contact info
3. Save the file
4. UI updates automatically!

**Never edit content in component files** - components only read from data.

### Adding New Projects
```typescript
// In data/portfolio-data.ts
missions.push({
  id: "mission-7",
  projectName: "Your New Project",
  subtitle: "Tech Stack",
  difficulty: "⭐⭐⭐",
  type: "Main Quest",
  status: "Completed",
  // ... rest of fields
})
```

### Adding New Skills
```typescript
// In data/portfolio-data.ts
skillTree.categories[0].skills.push({
  name: "New Framework",
  level: 85,
  experience: "Advanced",
  note: "Optional note"
})
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Inter, Orbitron, Rajdhani)
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view.

## 🎯 Performance

- Optimized animations (60fps target)
- Dynamic imports for code splitting
- Image optimization ready
- Reduced motion support
- Semantic HTML for SEO

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader friendly
- Reduced motion preference support
- High contrast ratios

## 📱 Responsive Design

Breakpoints:
- Mobile: 640px
- Tablet: 768px
- Laptop: 1024px
- Desktop: 1280px
- Wide: 1536px

## 🎨 Color Palette

```css
Primary (Cyan):     #00D9FF
Secondary (Purple): #9D4EDD
Accent (Yellow):    #FFD60A
Success (Green):    #06FFA5
Danger (Pink):      #FF006E
Warning (Orange):   #FB5607

Backgrounds:
- Primary:   #0A0E27
- Secondary: #151934
- Tertiary:  #1E2749
```

## 📦 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
Build command: `npm run build`
Output directory: `.next`
Node version: 18+

## 🔒 Environment Variables

No environment variables required for basic deployment.

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

Designed & Built by **Srinivas Krishna S K**
- Portfolio: [portfolio.krinc.in](https://portfolio.krinc.in)
- GitHub: [@KrishnaKrinc](https://github.com/KrishnaKrinc)
- LinkedIn: [srinivas-krishna-s-k](https://www.linkedin.com/in/srinivas-krishna-s-k)

---

**Made with ❤️ using Next.js, Framer Motion & lots of coffee ☕**
