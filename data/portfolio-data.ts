/**
 * ═══════════════════════════════════════════════════════════════
 * 🎮 PORTFOLIO DATA REPOSITORY
 * ═══════════════════════════════════════════════════════════════
 *
 * SINGLE SOURCE OF TRUTH for ALL portfolio content.
 *
 * 📝 HOW TO UPDATE:
 * - Edit values directly in this file
 * - UI components read from this data automatically
 * - NO content is hardcoded in components
 *
 * 🔧 STRUCTURE:
 * - playerInfo: Personal information & links
 * - playerStats: About me content & character attributes
 * - skillTree: Technical skills organized by category
 * - questLog: Work experience & achievements
 * - missions: Projects portfolio
 * - achievements: Badges & milestones
 * - techArsenal: Grouped technologies
 * - endGamePortal: Contact information
 *
 * 💡 TO ADD NEW CONTENT:
 * - Add new entries to relevant arrays
 * - Follow existing structure/format
 * - Skills: Add to appropriate category in skillTree
 * - Projects: Add new object to missions array
 * - Experience: Add to questLog array
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// 🎯 PLAYER INFORMATION
// ═══════════════════════════════════════════════════════════════
export const playerInfo = {
  name: "Srinivas Krishna S K",
  alias: "KrishnaKrinc",
  title: "Frontend Developer",
  level: 25, // Your age or experience level
  class: "Full Stack Mage", // Your developer archetype
  tagline: "Crafting digital experiences, one pixel at a time",

  // Social Links
  links: {
    email: "srinivaskrishnask2002@gmail.com",
    linkedin: "https://www.linkedin.com/in/srinivas-krishna-s-k",
    github: "https://github.com/KrishnaKrinc",
    resume: "/assets/Resume/Srinivas_Krishna_SK_Resume.pdf", // Update path as needed
  },

  // Profile image
  avatar: "/assets/Profile/Srinivas_Krishna_Photo.jpg", // Update path as needed

  // Status
  status: "🟢 Available for Quests",
  location: "🌍 Remote / Hybrid",
};

// ═══════════════════════════════════════════════════════════════
// 📊 PLAYER STATS (About Me)
// ═══════════════════════════════════════════════════════════════
export const playerStats = {
  // Core Attributes (RPG-style stats)
  attributes: [
    { name: "Code Quality", value: 95, max: 100, icon: "⚔️" },
    { name: "Problem Solving", value: 92, max: 100, icon: "🧩" },
    { name: "Teamwork", value: 98, max: 100, icon: "🤝" },
    { name: "Creativity", value: 88, max: 100, icon: "🎨" },
    { name: "Speed", value: 90, max: 100, icon: "⚡" },
    { name: "Adaptability", value: 94, max: 100, icon: "🔄" },
  ],

  // Experience Points
  experience: {
    current: 2500,
    nextLevel: 3000,
    yearsActive: "2+",
  },

  // Bio sections (narrative content)
  bio: [
    {
      title: "Origin Story",
      content: "I'm a frontend developer with 2+ years of experience shipping responsive, accessible web and mobile apps. My core stack is React, React Native, Redux, and Next.js. I thrive under pressure—solving critical bugs and unblocking teams on tight timelines—while keeping code clean, modular, and testable.",
    },
    {
      title: "Combat Style",
      content: "I code in \"vibe\" mode: staying in flow, pairing effectively, and turning ideas into working UI quickly. I use AI-assisted tools such as Gemini CLI, Cursor, and Windsurf to scaffold, review, and accelerate tasks, which reduces repetitive work and lowers the chance of simple bugs.",
    },
    {
      title: "Future Quest",
      content: "I'm also exploring Unity and Unreal Engine to grow into game dev and AR/VR domains — my long-term goal is to be a versatile \"knowledge wizard\" across frontend, games, and immersive tech.",
    },
  ],

  // Quick stats for display
  quickStats: [
    { label: "Projects Completed", value: "15+", icon: "🎯" },
    { label: "Technologies Mastered", value: "20+", icon: "🛠️" },
    { label: "Team Size Led", value: "12", icon: "👥" },
    { label: "Coffee Consumed", value: "∞", icon: "☕" },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 🌳 SKILL TREE
// ═══════════════════════════════════════════════════════════════
export const skillTree = {
  // Each category represents a skill branch
  categories: [
    {
      id: "frontend",
      name: "Frontend Mastery",
      icon: "⚛️",
      color: "#61DAFB", // React blue
      description: "Core UI development & modern frameworks",
      skills: [
        { name: "React", level: 95, experience: "Expert" },
        { name: "Next.js", level: 90, experience: "Advanced", note: "SSR/ISR, routing, performance" },
        { name: "Redux Toolkit", level: 88, experience: "Advanced", note: "RTK Query" },
        { name: "React Native", level: 85, experience: "Advanced" },
        { name: "JavaScript", level: 92, experience: "Expert", note: "ES6+" },
        { name: "TypeScript", level: 75, experience: "Intermediate", note: "Working knowledge" },
        { name: "HTML5", level: 95, experience: "Expert", note: "Semantic markup" },
        { name: "CSS3/SASS", level: 90, experience: "Expert" },
      ],
    },
    {
      id: "testing",
      name: "Quality Assurance",
      icon: "🧪",
      color: "#99C24D", // Jest green
      description: "Testing & accessibility practices",
      skills: [
        { name: "Jest", level: 85, experience: "Advanced" },
        { name: "React Testing Library", level: 82, experience: "Advanced" },
        { name: "Cypress", level: 78, experience: "Intermediate", note: "E2E" },
        { name: "Storybook", level: 88, experience: "Advanced", note: "Component docs & visual checks" },
        { name: "Accessibility", level: 80, experience: "Advanced", note: "WCAG, ARIA, keyboard flows" },
        { name: "Performance", level: 85, experience: "Advanced", note: "Lighthouse, Core Web Vitals" },
      ],
    },
    {
      id: "workflow",
      name: "Workflow Acceleration",
      icon: "🚀",
      color: "#FF6B6B", // Red/orange
      description: "Modern dev tools & AI assistance",
      skills: [
        { name: "Vibe Coding", level: 95, experience: "Master", note: "Flow state, rapid prototyping" },
        { name: "AI Tools", level: 90, experience: "Advanced", note: "Gemini CLI, Cursor, Windsurf" },
        { name: "Git & CI/CD", level: 88, experience: "Advanced" },
        { name: "ESLint/Prettier", level: 92, experience: "Expert" },
        { name: "Agile", level: 85, experience: "Advanced", note: "Sprints, retros, estimation" },
      ],
    },
    {
      id: "design",
      name: "Design & UX",
      icon: "🎨",
      color: "#9D4EDD", // Purple
      description: "Visual design & user experience",
      skills: [
        { name: "Component Architecture", level: 90, experience: "Advanced", note: "Design tokens" },
        { name: "Responsive Design", level: 92, experience: "Expert" },
        { name: "Usability Patterns", level: 85, experience: "Advanced", note: "Error/empty states" },
        { name: "Cross-browser QA", level: 88, experience: "Advanced" },
      ],
    },
    {
      id: "gamedev",
      name: "Game Development",
      icon: "🎮",
      color: "#00D9FF", // Cyan
      description: "Expanding into games & immersive tech",
      skills: [
        { name: "Unity", level: 40, experience: "Learning" },
        { name: "Unreal Engine", level: 30, experience: "Exploring" },
      ],
    },
    {
      id: "soft",
      name: "Soft Skills",
      icon: "🧠",
      color: "#FFD60A", // Yellow
      description: "Leadership & collaboration",
      skills: [
        { name: "Problem Solving", level: 95, experience: "Expert", note: "Under pressure" },
        { name: "Communication", level: 90, experience: "Advanced", note: "Cross-functional teams" },
        { name: "Leadership", level: 88, experience: "Advanced", note: "Led 12-member team" },
        { name: "Adaptability", level: 92, experience: "Expert", note: "Fast learning" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 📜 QUEST LOG (Experience)
// ═══════════════════════════════════════════════════════════════
export const questLog = [
  {
    id: "quest-1",
    title: "Lead Developer",
    company: "Tech Startup",
    duration: "2023 - Present",
    type: "Epic Quest",
    status: "In Progress",
    icon: "⚔️",
    description: "Leading frontend architecture and mentoring team of developers",
    achievements: [
      "Led team of 12 developers",
      "Architected component library used across 5 products",
      "Improved performance by 60% (LCP reduction)",
      "Implemented CI/CD pipeline reducing deployment time by 75%",
    ],
    techUsed: ["React", "Next.js", "TypeScript", "Storybook"],
  },
  {
    id: "quest-2",
    title: "Frontend Developer",
    company: "E-commerce Company",
    duration: "2022 - 2023",
    type: "Main Quest",
    status: "Completed",
    icon: "🛡️",
    description: "Built and optimized high-traffic e-commerce platform",
    achievements: [
      "Revamped checkout flow increasing conversion by 25%",
      "Implemented SSR/ISR with Next.js improving SEO rankings",
      "Reduced bundle size by 40% through code splitting",
      "Built accessible component library (WCAG 2.1 AA)",
    ],
    techUsed: ["React", "Redux", "Next.js", "Jest", "Cypress"],
  },
  {
    id: "quest-3",
    title: "Junior Developer",
    company: "Digital Agency",
    duration: "2021 - 2022",
    type: "Side Quest",
    status: "Completed",
    icon: "🗡️",
    description: "Contributed to multiple client projects and learned the ropes",
    achievements: [
      "Delivered 8+ client projects on time",
      "Mastered React and modern JavaScript",
      "Collaborated with designers and backend teams",
      "Implemented responsive designs for mobile/tablet/desktop",
    ],
    techUsed: ["React", "JavaScript", "SASS", "Git"],
  },
];

// ═══════════════════════════════════════════════════════════════
// 🎯 MISSIONS (Projects)
// ═══════════════════════════════════════════════════════════════
export const missions = [
  {
    id: "mission-1",
    projectName: "Book Discovery App",
    subtitle: "React Native",
    difficulty: "⭐⭐⭐",
    type: "Speed Run",
    status: "Completed",
    completionTime: "48 hours",
    thumbnail: "📚",

    tldr: "A fast MVP mobile app to search and discover books using the Google Books API — built end-to-end in 48 hours to validate an idea and deliver a clean, extensible UI.",

    problemContext: "Many casual readers struggle to quickly discover books that match their taste. The goal was to build a discovery-first mobile experience with fast search, clear metadata, and easy external links for reading/buying.",

    myRole: "Solo developer — I handled product scoping, UI design, API integration, performance tuning, error handling, and shipped the first working APK within ~48 hours as an MVP.",

    approachAndArchitecture: "• UI: React Native using FlatList for long lists (virtualized rendering). • Data: Google Books API (client-side fetch with debouncing and pagination). • State & navigation: lightweight Redux / Context for saved items, React Navigation for stack flows. • Offline resilience: cached last search results using AsyncStorage; graceful offline UI states. • Delivery: Android APK + iOS build-ready repository; CI pipeline stub for automated build (GitHub Actions placeholder).",

    keyFeatures: [
      "Fast incremental search with input debounce and cancels",
      "Book detail pages (title, authors, publisher, description, related links)",
      "Save / favorites and local persistence",
      "Infinite scroll / pagination with optimized list rendering",
      "Clear empty / error states for unreliable network",
    ],

    qualityAndTesting: "Unit and component tests (Jest + React Native Testing Library suggested) • Snapshot tests for key screens • Manual accessibility checks (large-font mode, tap targets)",

    workflowAcceleration: "Used Gemini CLI templates to scaffold components, Cursor for quick code reviews and lint suggestions, Windsurf snippets to speed up repetitive wiring — reduced time-to-MVP and early bugs.",

    whatToCallOut: "Show code for API pagination & debounce, screenshots of list performance, and a short Lighthouse-like snapshot for mobile (or timing logs). Explain trade-offs (client-side caching vs server caching).",

    technologies: ["React Native", "Google Books API", "JavaScript", "React Navigation"],

    tags: ["Mobile", "MVP", "API Integration"],
  },
  {
    id: "mission-2",
    projectName: "E-commerce Frontend Revamp",
    subtitle: "Next.js + React",
    difficulty: "⭐⭐⭐⭐⭐",
    type: "Boss Battle",
    status: "Completed",
    completionTime: "3 months",
    thumbnail: "🛒",

    tldr: "Modernized a legacy storefront into a fast, SEO-friendly Next.js SPA (SSR/ISR) with a reusable component library and measurable performance improvements — focused on conversion-critical pages.",

    problemContext: "The client storefront had slow load times, large bundles, and inconsistent UI components across pages. Business asked for improved conversion rate, faster page loads, and maintainable UI.",

    myRole: "Frontend owner / lead contributor: designed component architecture, migrated key pages to Next.js SSR/ISR, implemented state management, and led the performance & accessibility pass.",

    approachAndArchitecture: "• Framework: Next.js for hybrid SSR/ISR where SEO matters (category and product pages). • State: Redux Toolkit for cart & user flows; RTK Query for caching product API calls. • Assets: next/image or image CDN + responsive images; code-splitting and dynamic imports for non-critical modules. • Component strategy: Storybook-driven development; shared UI tokens and headless components for accessible patterns. • Tooling: bundle analysis (webpack-bundle-analyzer), Lighthouse audits, lighthouse-ci in pipeline.",

    keyFeatures: [
      "Product listing and product detail pages with server-side rendering",
      "Fast cart & checkout flow with optimistic updates and error recovery",
      "Search with suggestions and server-side faceting",
      "Storybook component library and visual regression checks",
      "Accessibility fixes for forms, labels, keyboard order, and ARIA",
    ],

    challengesAndSolutions: "• Large third-party vendor scripts: moved essential scripts to defer, lazy-loaded analytics, and replaced heavy widgets with lighter alternatives. • Bundle size: split code by route and isolated heavy vendor modules for on-demand loading. • UX regressions: used Storybook and visual regression tests to catch CSS regressions before release.",

    testingAndQuality: "Unit tests: Jest + React Testing Library for components • E2E: Cypress for checkout and critical journey tests • Visual tests: Storybook + Chromatic / Percy for key components",

    ciCdAndDeploy: "GitHub Actions for CI: run lint, tests, storybook build, and lighthouse-ci; deploy to Vercel with preview URLs for each PR.",

    whatToCallOut: "Include a link to the bundle report, Storybook, and a before/after performance report. In the summary state the exact LCP/CLS/INP changes (if you measured them) — hiring managers look for these metrics.",

    technologies: ["React", "Next.js", "Redux Toolkit", "RTK Query", "Storybook", "Jest", "React Testing Library"],

    tags: ["E-commerce", "SSR", "Performance", "Storybook"],
  },
  {
    id: "mission-3",
    projectName: "Multi-Tenant Admin Analytics Dashboard",
    subtitle: "React + Redux",
    difficulty: "⭐⭐⭐⭐",
    type: "Raid",
    status: "Completed",
    completionTime: "2 months",
    thumbnail: "📊",

    tldr: "A role-based, multi-tenant analytics console with modular widgets and exportable views to help operations teams make faster decisions.",

    problemContext: "Operations and BI needed a unified dashboard to track usage, revenue, and health across multiple tenants with saved views and export functionality.",

    myRole: "Frontend architect & primary implementer of the widget system and the reusable table/chart primitives. Coordinated with backend for pagination and aggregation endpoints.",

    approachAndArchitecture: "• Component-driven: modular widget architecture allowing card-level refresh and independent loading. • Data fetching: server pagination + RTK Query with caching & invalidation; optimistic updates for admin actions. • Large dataset handling: virtualization (react-window / react-virtualized) for tables; server-side filters. • Charts: Recharts for quick charts; pluggable adapters for D3 if complex visualizations required.",

    keyFeatures: [
      "Role-based access control and tenant scoping",
      "Saved views and export-to-CSV/PDF features",
      "Widget-level refresh & caching policies",
      "Drill-downs with server pagination and filters",
    ],

    testingAndQuality: "Integration tests for exports and saved views • Contract tests (mock API schemas) to reduce backend mismatch bugs",

    deploymentAndOps: "Hosted on Vercel / AWS with authentication routed to a secure auth provider (Auth0 / custom JWT)",

    whatToCallOut: "Highlight how you reduced client CPU by virtualizing tables and improved perceived performance by making widgets lazy-load and cache independently (include metrics or logs if you have them).",

    technologies: ["React", "Redux Toolkit", "React Router", "Recharts/D3", "Axios/RTK Query", "Jest", "RTL"],

    tags: ["Dashboard", "Analytics", "Multi-tenant"],
  },
  {
    id: "mission-4",
    projectName: "Design System & Component Library",
    subtitle: "React + Storybook",
    difficulty: "⭐⭐⭐⭐",
    type: "Guild Quest",
    status: "Completed",
    completionTime: "6 weeks",
    thumbnail: "🎨",

    tldr: "A lightweight, accessible design system that reduced UI regressions and cut new feature time by providing documented, reusable components in Storybook.",

    problemContext: "Multiple teams shipping inconsistent UI patterns caused rework and visual regressions. The goal: create a single source of truth for components and tokens.",

    myRole: "Lead developer: created tokens, built headless accessible components, documented usage in Storybook, and set up visual regression gates for PRs.",

    approachAndArchitecture: "• Tokens: color, spacing, typography variables; published as an npm package consumed by apps. • Components: headless primitives + presentational wrappers to keep logic accessible and themeable. • Docs: Storybook with usage examples, knobs for props, and autogenerated props tables. • Release: semantic versioning and changelogs for the component package.",

    keyFeatures: [
      "Accessible primitives (modals, menu, combobox, table)",
      "Theming via tokens and CSS variables",
      "Storybook-driven examples and \"copy-paste\" snippets for engineers",
      "Visual regression CI step (Chromatic/Percy)",
    ],

    whyItMatters: "Storybook is widely used as a UI workshop and component directory for teams; shipping this shows mature front-end engineering practices.",

    whatToCallOut: "Link to Storybook and a small demo showing \"breaking change prevention\" (visual regression screenshots).",

    technologies: ["React", "Storybook", "TypeScript", "ESLint", "Prettier", "Husky"],

    tags: ["Design System", "Storybook", "Accessibility"],
  },
  {
    id: "mission-5",
    projectName: "Service Booking Mobile App",
    subtitle: "React Native",
    difficulty: "⭐⭐⭐⭐",
    type: "Campaign",
    status: "Completed",
    completionTime: "2 months",
    thumbnail: "📱",

    tldr: "A cross-platform booking app focused on reliability and conversion: deep links, offline-friendly browsing, and robust auth + booking flows.",

    problemContext: "Booking apps need high completion rates even on spotty networks and mid-range devices; UX must be simple and robust.",

    myRole: "Frontend developer: built booking flow, integrated deep links & push notifications, handled offline cache & sync strategies, and improved reliability for mid-range devices.",

    approachAndArchitecture: "• Navigation & UX: React Navigation with guarded routes and resumable booking flows. • Data: local caching of service lists (AsyncStorage / local DB) and queued booking sync when online. • Reliability: retry strategies for network failures, optimistic UI, clear error recovery. • Observability: integrated crash reporting and performance traces (Sentry / similar).",

    keyFeatures: [
      "Deep link support for promotional links",
      "Offline browsing and sync for bookings",
      "Push notifications for confirmations and reminders",
      "Secure auth flows (OAuth/JWT)",
    ],

    whatToCallOut: "Explain how you reduced failed-booking rates with optimistic updates + retry, and include logs / crash-rate screenshots if available.",

    technologies: ["React Native", "Redux Toolkit", "React Query/RTK Query", "React Navigation"],

    tags: ["Mobile", "Booking", "Offline-first"],
  },
  {
    id: "mission-6",
    projectName: "Performance & Accessibility Hardening Sprint",
    subtitle: "Next.js + React",
    difficulty: "⭐⭐⭐⭐",
    type: "Cleanup Quest",
    status: "Completed",
    completionTime: "2 weeks",
    thumbnail: "⚡",

    tldr: "A focused sprint to raise Core Web Vitals scores and close accessibility gaps across several client apps — audit → fix → verify workflow.",

    problemContext: "Multiple apps had mediocre Core Web Vitals and a range of accessibility issues impacting SEO, conversions, and legal risk.",

    myRole: "Sprint lead: ran audits, prioritized fixes, implemented improvements, and put monitoring in CI to prevent regressions.",

    approachAndArchitecture: "1. Audit: Lighthouse + Web Vitals reports and manual a11y checks (screen reader & keyboard). 2. Prioritize: cluster fixes by impact → low-effort-high-impact (images, unused JS, lazy loads). 3. Fixes: image optimization/CDN, critical CSS, route-level code-splitting, defer third-party scripts, aria & semantic HTML fixes. 4. Verify: lighthouse-ci in pipeline and regression alerts.",

    whyThisIsImportant: "Core Web Vitals are a standard measure for loading, interactivity and visual stability and directly affect UX and SEO; accessibility reduces legal & user-experience risk — both are expected signals in mature frontend portfolios.",

    whatToCallOut: "If you can, provide before/after LCP/CLS/INP numbers and the exact steps taken — recruiters look for concrete impact and reproducible steps.",

    technologies: ["Next.js", "React", "Lighthouse", "Chrome DevTools", "Cypress", "Jest", "RTL"],

    tags: ["Performance", "Accessibility", "Optimization"],
  },
];

// ═══════════════════════════════════════════════════════════════
// 🏆 ACHIEVEMENTS (Badges & Milestones)
// ═══════════════════════════════════════════════════════════════
export const achievements = [
  {
    id: "ach-1",
    title: "Team Leader",
    description: "Led a team of 12 developers",
    icon: "👑",
    rarity: "Legendary",
    unlocked: true,
    dateUnlocked: "2023",
  },
  {
    id: "ach-2",
    title: "Speed Runner",
    description: "Shipped MVP in 48 hours",
    icon: "⚡",
    rarity: "Epic",
    unlocked: true,
    dateUnlocked: "2023",
  },
  {
    id: "ach-3",
    title: "Performance Wizard",
    description: "Improved LCP by 60%",
    icon: "🚀",
    rarity: "Epic",
    unlocked: true,
    dateUnlocked: "2023",
  },
  {
    id: "ach-4",
    title: "Accessibility Champion",
    description: "Achieved WCAG 2.1 AA compliance",
    icon: "♿",
    rarity: "Rare",
    unlocked: true,
    dateUnlocked: "2022",
  },
  {
    id: "ach-5",
    title: "Component Architect",
    description: "Built design system used across 5 products",
    icon: "🏗️",
    rarity: "Epic",
    unlocked: true,
    dateUnlocked: "2023",
  },
  {
    id: "ach-6",
    title: "AI Augmented",
    description: "Master of AI-assisted development",
    icon: "🤖",
    rarity: "Rare",
    unlocked: true,
    dateUnlocked: "2023",
  },
  {
    id: "ach-7",
    title: "Vibe Coder",
    description: "Master of flow state development",
    icon: "🎵",
    rarity: "Rare",
    unlocked: true,
    dateUnlocked: "2022",
  },
  {
    id: "ach-8",
    title: "Bug Slayer",
    description: "Solved 100+ critical production bugs",
    icon: "🐛",
    rarity: "Common",
    unlocked: true,
    dateUnlocked: "2022",
  },
  {
    id: "ach-9",
    title: "Test Master",
    description: "Achieved 90%+ test coverage",
    icon: "🧪",
    rarity: "Rare",
    unlocked: true,
    dateUnlocked: "2023",
  },
  {
    id: "ach-10",
    title: "Future Seeker",
    description: "Exploring Unity & Unreal Engine",
    icon: "🎮",
    rarity: "Uncommon",
    unlocked: true,
    dateUnlocked: "2024",
  },
];

// ═══════════════════════════════════════════════════════════════
// 🛠️ TECH ARSENAL (Equipment/Inventory)
// ═══════════════════════════════════════════════════════════════
export const techArsenal = {
  weapons: {
    // Primary weapons (main technologies)
    primary: [
      { name: "React", icon: "⚛️", power: 95 },
      { name: "Next.js", icon: "▲", power: 90 },
      { name: "TypeScript", icon: "🔷", power: 75 },
      { name: "React Native", icon: "📱", power: 85 },
    ],
    // Secondary weapons (supporting tools)
    secondary: [
      { name: "Redux Toolkit", icon: "🔄", power: 88 },
      { name: "Framer Motion", icon: "✨", power: 85 },
      { name: "Tailwind CSS", icon: "🎨", power: 90 },
      { name: "SASS/LESS", icon: "🎭", power: 90 },
    ],
  },

  armor: {
    // Testing & Quality tools
    testing: [
      { name: "Jest", icon: "🃏", defense: 85 },
      { name: "React Testing Library", icon: "🧪", defense: 82 },
      { name: "Cypress", icon: "🌲", defense: 78 },
      { name: "Storybook", icon: "📚", defense: 88 },
    ],
  },

  accessories: {
    // Dev tools & productivity
    productivity: [
      { name: "Gemini CLI", icon: "🤖", bonus: "+Speed" },
      { name: "Cursor", icon: "💡", bonus: "+Accuracy" },
      { name: "Windsurf", icon: "🏄", bonus: "+Flow" },
      { name: "Git", icon: "🌿", bonus: "+Collaboration" },
    ],
  },

  consumables: {
    // Daily drivers
    daily: [
      { name: "Coffee", icon: "☕", effect: "+100 Energy" },
      { name: "Music", icon: "🎵", effect: "+50 Focus" },
      { name: "Documentation", icon: "📖", effect: "+30 Knowledge" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// 🌀 END GAME PORTAL (Contact)
// ═══════════════════════════════════════════════════════════════
export const endGamePortal = {
  title: "Ready to Start Your Quest?",
  subtitle: "Let's build something legendary together",

  message: "I'm currently looking for new opportunities. Whether you have a challenging project, want to discuss tech, or just want to say hi, my portal is always open. Let's create something amazing!",

  availability: {
    status: "Available",
    types: ["Full-time", "Contract", "Freelance"],
    remote: true,
  },

  preferredContact: "email",

  cta: {
    primary: "Initiate Contact",
    secondary: "Download Resume",
  },

  socialPortals: [
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://www.linkedin.com/in/srinivas-krishna-s-k",
      handle: "@srinivas-krishna-s-k",
    },
    {
      name: "GitHub",
      icon: "🐙",
      url: "https://github.com/KrishnaKrinc",
      handle: "@KrishnaKrinc",
    },
    {
      name: "Email",
      icon: "📧",
      url: "mailto:srinivaskrishnask2002@gmail.com",
      handle: "srinivaskrishnask2002@gmail.com",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 🎯 METADATA (For SEO & OG tags)
// ═══════════════════════════════════════════════════════════════
export const siteMetadata = {
  title: "Srinivas Krishna S K | Frontend Developer & Digital Architect",
  description: "Frontend developer specializing in React, Next.js, and React Native. Building fast, accessible, and beautiful web experiences.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "React Native",
    "Web Developer",
    "UI/UX",
    "JavaScript",
    "TypeScript",
    "Portfolio",
  ],
  author: "Srinivas Krishna S K",
  siteUrl: "https://portfolio.krinc.in", // Update with your actual domain
  image: "/og-image.jpg", // Add an OG image
  twitterHandle: "@yourtwitterhandle", // Add if you have Twitter
};

// ═══════════════════════════════════════════════════════════════
// 🎨 THEME CONFIGURATION
// ═══════════════════════════════════════════════════════════════
export const themeConfig = {
  // Color palette (cyber/neon/dark theme)
  colors: {
    primary: "#00D9FF", // Cyan
    secondary: "#9D4EDD", // Purple
    accent: "#FFD60A", // Yellow
    success: "#06FFA5", // Neon green
    danger: "#FF006E", // Hot pink
    warning: "#FB5607", // Orange

    background: {
      primary: "#0A0E27", // Very dark blue
      secondary: "#151934", // Dark blue
      tertiary: "#1E2749", // Medium dark blue
    },

    text: {
      primary: "#F8F9FA", // Almost white
      secondary: "#ADB5BD", // Light gray
      tertiary: "#6C757D", // Medium gray
    },
  },

  // Animation preferences
  animations: {
    reducedMotion: false, // Will be overridden by user preference
    defaultDuration: 0.6,
    defaultEasing: "easeInOut",
  },
};

export default {
  playerInfo,
  playerStats,
  skillTree,
  questLog,
  missions,
  achievements,
  techArsenal,
  endGamePortal,
  siteMetadata,
  themeConfig,
};
