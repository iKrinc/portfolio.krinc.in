# Signal Architecture — Motion System Documentation

## 1. Project Goal & Philosophy

### What This Site Is

This is a **motion-first portfolio** that uses scroll and interaction as narrative devices. It is not a collection of work samples with descriptions—it is an **experience** that demonstrates technical craft through its own construction.

The site communicates:
- **Precision**: Every animation is intentional, timed, and mathematically structured
- **Restraint**: Motion serves information hierarchy, not decoration
- **Craft**: The site itself is evidence of design and development skill
- **Seriousness**: This is professional work for professional clients, not a playground

### Why It Is NOT a Traditional Portfolio

Traditional portfolios use:
- Card grids
- Hover gimmicks
- Modal overlays
- Auto-playing hero videos
- "View Project" buttons that all look the same

This portfolio uses:
- Scroll as a spatial input device
- Depth and scale to indicate focus
- Horizontal panning as a metaphor for system inspection
- Protocol selection as a metaphor for intentional communication

### The "Dev × Game × System" Metaphor

Every section is named and designed as if it were a system interface:
- **Loader**: Kernel initialization sequence
- **Hero**: Spatial reveal chamber
- **Profile**: Runtime inspection (horizontal zones)
- **Projects**: Mission archive (depth stack)
- **Contact**: Connection protocol (selection, not form)

This metaphor enforces **structural thinking** over **visual decoration**.

### Why Restraint Matters More Than Flash

The motion system is deliberately constrained:
- No bounce or elastic easing
- No random parallax effects
- No auto-playing elements (except controlled video on focus)
- No gratuitous particle systems or shaders

If a motion feels "cool" or "fun," it is **wrong**. The correct feeling is **engineered, calm, confident**.

---

## 2. Core Design Principles

### Calm, Confident, Cinematic (Not Playful)

- **Calm**: Subtle scale changes (0.95→1.0, not 0.5→1.2), gentle easing, no overshoot
- **Confident**: Motion happens once, not in loops; animations complete decisively
- **Cinematic**: Scroll feels like a camera dolly, not a mouse wheel
- **NOT Playful**: No bounce, no wiggle, no cute interactions

### Motion as Information, Not Decoration

Every animation must answer: **"What does this tell the user?"**

Examples:
- Stagger reveals → "This content has structure"
- Depth stack scale → "This item is focused, others are not"
- Horizontal scroll → "You are moving through distinct zones"
- Escape key → "You can always go back"

If an animation does not communicate structure or state, **remove it**.

### User-Controlled Pacing (Scroll-Driven)

The user controls the narrative pace by scrolling. This is not an auto-playing video.

- Loader runs once (skippable via localStorage flag)
- Hero scroll reveals content at user's speed
- Profile zones advance only as user scrolls
- Projects depth stack responds to scroll position
- Contact is interaction-driven (no scroll choreography)

### Accessibility and Reduced Motion as First-Class Citizens

Reduced motion is **not an afterthought**. Every section has a reduced motion path:
- Loader: Instant skip
- Hero: Shows final "scrolled" state immediately
- Profile: Vertical list, no horizontal scroll
- Projects: Vertical list, no depth stack
- Contact: No animations, instant expansion

Keyboard navigation is fully supported with visible focus indicators.

---

## 3. Global Motion Rules

### Easing Curves

**Primary Easing (Framer Motion):**
```javascript
ease: [0.16, 1, 0.3, 1]  // ease-out-expo
```

**When to Use:**
- All entry animations (fade, drift, scale)
- All interaction responses (button hover, protocol expand)
- All Framer Motion variants

**GSAP Scroll Easing:**
```javascript
ease: 'none'
```

**When to Use:**
- All ScrollTrigger animations with `scrub`
- Ensures linear interpolation tied to scroll position

**Forbidden Easings:**
- `ease: 'bounce'`
- `ease: 'elastic'`
- Custom cubic-beziers that overshoot (e.g., `[0.68, -0.55, 0.27, 1.55]`)

### Duration Tiers

| Duration | Use Case | Examples |
|----------|----------|----------|
| 0.2s | Hover states, arrow shifts | Protocol button hover, social link arrow |
| 0.4-0.5s | Fast interactions | Contact protocol expand, close button |
| 0.6s | Standard reveals | Profile zones, project card internals |
| 0.8s | Prominent entries | Hero headline, large headings |

**Rule**: Longer durations for larger or more important elements.

### Stagger Timing Rules

| Stagger | Use Case | Examples |
|---------|----------|----------|
| 0.08s | Forms, tight sequences | DirectMessageForm fields, SocialChannels links |
| 0.1s | General content | ProfileAnchor items, ProtocolSelector buttons |
| 0.15s | Metadata, columns | Hero metadata lines, ProfileDomains blocks |
| 0.2s | Large text blocks | ProfilePrinciples statements |

**Rule**: Tighter staggers for functional UI (forms), looser for reading content.

### Forbidden Animations

**Never Use:**
- Bounce or elastic easing
- Infinite loops (except Loader initialization and Hero scroll indicator pulse)
- Random or chaotic motion
- Animations that trigger on hover without user intent
- Auto-playing elements (except video on focus)
- "Attention-seeking" effects (shake, glow pulse, wiggle)

**If It Feels Like:**
- A game menu → Remove it
- A marketing landing page → Simplify it
- A tech demo → Tone it down

### When GSAP Is Allowed

**GSAP is for scroll-driven, page-level transforms:**
- ScrollTrigger with pinning
- Scroll progress tracking
- Cross-section orchestration
- Timeline sequencing (Loader only)

**Examples:**
- Loader 4-beat timeline
- Hero scroll-driven transforms
- Profile horizontal scroll
- Projects depth stack scroll

**DO NOT use GSAP for:**
- Click interactions (use Framer Motion)
- Hover states (use Framer Motion)
- Component-level state changes (use Framer Motion)

### When Framer Motion Is Allowed

**Framer Motion is for interaction-driven, component-level states:**
- Entry animations (`whileInView`)
- State transitions (`initial`, `animate`, `exit`)
- Hover interactions (`whileHover`)
- Conditional rendering (`AnimatePresence`)

**Examples:**
- Profile zone reveals (whileInView)
- Project card internals (animate on focus state)
- Contact protocol expand/collapse
- Button hover states

**DO NOT use Framer Motion for:**
- Scroll-driven page transforms (use GSAP)
- Timeline sequencing across multiple elements (use GSAP)

---

## 4. Section-by-Section Breakdown

### 4.1 Loader — Kernel Initialization

#### Goal of the Loader

Simulate a system boot sequence. The loader:
- Sets the tone (engineered, not playful)
- Communicates "this is not a typical portfolio"
- Runs **once per session** (localStorage flag: `hasSeenLoader`)

#### 4-Beat Structure Explained

```
Beat 1 (0.0-0.8s): SIGNAL ACQUISITION
  - Horizontal line extends (scaleX 0→1)
  - Purpose: "System wake"

Beat 2 (0.8-1.8s): SYSTEM WAKE
  - Line splits vertically
  - "INITIALIZING" text appears
  - Lines pulse outward
  - Purpose: "Environment preparing"

Beat 3 (1.8-2.8s): ENVIRONMENT BUILD
  - Name "KRINC" fades in
  - Lines fade out
  - Purpose: "Identity established"

Beat 4 (2.8-3.5s): HANDOFF
  - Everything fades to Hero
  - Purpose: "Transition to main experience"
```

**Total Duration:** 3.5 seconds

#### Timeline Durations and Why

- **0.8s per beat**: Long enough to perceive, short enough to not feel sluggish
- **3.5s total**: Industry standard for splash screens (2-5s acceptable range)
- **No skip button**: Returns after first view (localStorage flag handles this)

#### Reduced Motion Behavior

If `prefers-reduced-motion: reduce`:
- Loader skips entirely
- User goes directly to Hero
- No GSAP timeline runs

#### Rules for Modifying (or Not Modifying) the Loader

**✅ ACCEPTABLE:**
- Adjusting beat durations within 0.5-1.0s range
- Changing text content (INITIALIZING → LOADING RUNTIME)
- Adjusting easing curves (within no-overshoot rules)

**❌ FORBIDDEN:**
- Adding more than 4 beats
- Extending total duration beyond 5 seconds
- Adding bounce/elastic easing
- Forcing loader on every page load (must respect localStorage)
- Removing reduced motion skip

---

### 4.2 Hero — Spatial Reveal Chamber

#### Narrative Purpose

The Hero is a **spatial reveal**, not a static title card. As the user scrolls, the headline:
- Shrinks (scale 1.0 → 0.7)
- Repositions (center → top-left)
- Fades (opacity 1.0 → 0.6)

This communicates: **"You are entering the space, the title is receding."**

#### Scroll Math (200vh, Pinning)

```javascript
height: '200vh'  // Container height

ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top top',
  end: 'bottom top',
  pin: contentRef.current,  // Pins for 200vh
  scrub: 1.2,
})
```

**Why 200vh:**
- Gives user enough scroll distance to feel intentional
- Not so long that it feels tedious
- Matches the "heavy camera" feel established by scrub: 1.2

**Scroll Range:**
- 0vh scrolled: Headline at center, scale 1.0, opacity 1.0
- 200vh scrolled: Headline at top-left, scale 0.7, opacity 0.6

#### Scale and Position Transforms Explained

```javascript
gsap.to(headlineRef.current, {
  scale: 0.7,        // Shrinks to 70% size
  y: '-30vh',        // Moves 30vh upward
  x: '-35vw',        // Moves 35vw leftward
  opacity: 0.6,      // Fades to 60%
  ease: 'none',      // Linear with scrub
})
```

**Why These Values:**
- **scale: 0.7** → Noticeable but not dramatic
- **y: -30vh, x: -35vw** → Positions in top-left quadrant without cropping
- **opacity: 0.6** → Visible but subordinate to incoming content

#### Parallax Logic

Name and subtitle move at different speeds:
```javascript
gsap.to(nameRef.current, { y: '-10vh' })    // Faster
gsap.to(subtitleRef.current, { y: '-5vh' }) // Slower
```

**Purpose:** Creates depth separation (name appears "closer" than subtitle).

Metadata fades out early:
```javascript
gsap.to(metadataRef.current, {
  opacity: 0,
  y: '10vh',  // Drifts down as it fades
  scrollTrigger: { end: '50% top' },  // Gone halfway through
})
```

#### Why Scrub Is Used

```javascript
scrub: 1.2
```

**Without scrub:** Scroll position directly maps to animation progress (1:1)
**With scrub: 1.2:** Animation lags behind scroll by 1.2 seconds

**Effect:** Creates "heavy camera" feel, like moving a dolly on rails instead of snapping a photo.

**Consistency:** All scroll-driven sections use `scrub: 1.2` for unified feel.

#### Reduced Motion Fallback

```javascript
...(shouldReduceMotion && {
  transform: 'scale(0.7) translate(-35vw, -30vh)',
  opacity: 0.6,
})
```

Shows the **final "scrolled" state immediately**. No scroll choreography, just static content.

---

### 4.3 Profile — Horizontal Runtime Inspection

#### Why Horizontal Scroll Is Used

Horizontal scroll is **rare** on the web. This rarity signals: **"This is different."**

Metaphor: Scanning a system log or inspecting a runtime environment left-to-right.

#### 300vh → 4 Zones Mapping

```javascript
height: '300vh'           // Container height
width: '400vw'            // Content width (4 zones × 100vw)
translateX: '0 → -300vw'  // Scroll drives horizontal movement
```

**Why 300vh:**
- 75vh per zone (300vh ÷ 4 zones)
- Enough scroll distance per zone to feel distinct
- Not so long that zones feel disconnected

**Container Width:**
- 4 zones × 100vw = 400vw
- Final zone aligns when translateX reaches -300vw

#### translateX Math Explained

```javascript
gsap.to(contentRef.current, {
  x: '-300vw',  // Moves content 300vw to the left
  ease: 'none',
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: 1.2,
  },
})
```

**Scroll Progress → translateX Mapping:**
- 0% scrolled (0vh): translateX = 0vw (Zone 1 visible)
- 25% scrolled (75vh): translateX = -75vw (transitioning)
- 50% scrolled (150vh): translateX = -150vw (Zone 2 visible)
- 75% scrolled (225vh): translateX = -225vw (transitioning)
- 100% scrolled (300vh): translateX = -300vw (Zone 4 visible)

**GSAP Automatically Interpolates:** You only specify the end value (-300vw), GSAP calculates the rest.

#### Zone Index Calculation

```javascript
const progress = self.progress  // 0 to 1
const rawIndex = Math.floor(progress * 4)  // 0, 1, 2, 3
const newZone = Math.min(Math.max(rawIndex, 0), 3) + 1  // 1, 2, 3, 4
```

**Why Only Update on Change:**
```javascript
if (newZone !== currentZone) {
  setCurrentZone(newZone)  // Prevents continuous re-renders
}
```

**Performance:** ScrollTrigger `onUpdate` fires many times per second. Only calling setState when the zone actually changes prevents React re-render thrashing.

#### Framer Motion Zone Reveals

Each zone uses `whileInView` to reveal content when it enters the viewport:

```javascript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={containerVariants}
>
```

**viewport.once: true** → Animation plays once, doesn't replay on scroll back
**viewport.amount: 0.3** → Triggers when 30% of element is visible

#### Progress Indicator Rules

```
[0X/04] ZONE_NAME
```

- Updates only when zone index changes (not continuously)
- Format: Two-digit index with leading zero
- Hidden in reduced motion mode

#### Reduced Motion Vertical Layout

```javascript
flexDirection: shouldReduceMotion ? 'column' : 'row'
gap: shouldReduceMotion ? '4rem' : 0
height: shouldReduceMotion ? 'auto' : '100vh'
```

Zones stack vertically like a traditional page. No horizontal scroll, no animations.

---

### 4.4 Projects — Mission Archive Depth Stack

#### Why Depth Stack Instead of Grid

Traditional portfolios use:
- 3-column grids
- "View More" buttons
- Modal overlays

This portfolio uses a **depth stack** where:
- One project is focused at a time
- Previous/next projects recede in space (scale, opacity, blur)
- Scroll advances through projects linearly

**Purpose:** Forces sequential viewing, creates spatial hierarchy.

#### 150vh Per Project Logic

```javascript
height: `${projectsData.projects.length * 150}vh`
```

**Example:** 3 projects = 450vh total

**Why 150vh:**
- Long enough to feel intentional (not accidental scroll)
- Short enough to not feel tedious
- Matches "heavy camera" scrub: 1.2 established in Hero

#### Focus State Definitions

```typescript
type ProjectFocusState = 'queued' | 'focused' | 'completed'

const getFocusState = (index: number): ProjectFocusState => {
  if (index === focusedIndex) return 'focused'
  if (index < focusedIndex) return 'completed'
  return 'queued'
}
```

**Queued (Upcoming):**
```javascript
transform: 'translateY(40vh) scale(0.85)',
opacity: 0.35,
zIndex: 5,
```
- Positioned below focused project
- Scaled down (85%)
- Translucent (35% opacity)
- **NO BLUR** (clear preview of what's next)

**Focused (Current):**
```javascript
transform: 'translateY(0) scale(1.0)',
opacity: 1,
zIndex: 10,
willChange: 'transform, opacity',
```
- Centered on screen
- Full size (100%)
- Full opacity
- Highest z-index
- **will-change hint for GPU acceleration**

**Completed (Passed):**
```javascript
transform: 'translateY(-40vh) scale(0.85)',
opacity: 0.2,
filter: 'blur(4px)',
zIndex: 1,
```
- Positioned above focused project
- Scaled down (85%)
- Nearly invisible (20% opacity)
- **BLUR APPLIED** (dismissed, not relevant)

#### Why Blur Applies ONLY to Completed Projects

**Queued projects:** User hasn't seen them yet → Clear preview
**Completed projects:** User already saw them → Dismissed visually

This creates **asymmetric treatment** that reinforces forward motion.

#### Virtualization Strategy (Prev / Current / Next)

```javascript
const visibleIndices = [
  focusedIndex - 1,  // Previous
  focusedIndex,      // Current
  focusedIndex + 1,  // Next
].filter((i) => i >= 0 && i < projects.length)
```

**Only 3 projects rendered at any time.**

**Why:**
- Reduces DOM nodes (8+ projects would create 8+ cards)
- Reduces memory (images/videos only loaded for visible cards)
- Reduces paint cost (browser only repaints 3 cards)

**Critical for:** Portfolios with 8+ projects.

#### Video Autoplay Rules

```javascript
useEffect(() => {
  if (!videoRef.current) return

  if (isFocused) {
    videoRef.current.play()  // Play on focus
  } else {
    videoRef.current.pause() // Pause when not focused
  }
}, [isFocused])
```

**Videos ONLY play when project is focused.**

**Attributes:**
- `muted` → Allows autoplay (browser policy)
- `loop` → Continuous playback
- `playsInline` → Prevents fullscreen on mobile

#### Reduced Motion Behavior

```javascript
flexDirection: shouldReduceMotion ? 'column' : 'row'
gap: shouldReduceMotion ? '4rem' : 0
```

- All projects rendered (no virtualization)
- Vertical list layout
- No depth stack, no animations
- Simple fade-in per project (if any animation)

---

### 4.5 Contact — Connection Protocol

#### Why Protocol Selection (Not a Form)

Traditional contact sections:
- Single form with all fields visible
- "Send Message" button
- Generic layout

This contact section uses **protocol selection**:
- User chooses communication method first
- Only selected protocol expands
- Escape key always works

**Purpose:** Reinforces "system interface" metaphor, gives user control.

#### Expand / Collapse Logic

```javascript
const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null)

{!selectedProtocol ? (
  <ProtocolSelector onSelect={setSelectedProtocol} />
) : (
  <DirectMessageForm onClose={() => setSelectedProtocol(null)} />
)}
```

**State Management:**
- `null` → Selector visible
- `'directMessage'` → DirectMessageForm visible
- `'socialChannels'` → SocialChannels visible

**Only one protocol open at a time.** Selecting a new protocol replaces current view.

**Close Actions:**
- Click close button (×)
- Press Escape key
- Submit form successfully (auto-closes after 3s)

#### Why Framer Motion Only (No GSAP)

**GSAP is for scroll-driven, page-level transforms.**
**Contact is click-driven, component-level transitions.**

Framer Motion provides:
- `AnimatePresence` for mount/unmount
- Declarative `initial`/`animate`/`exit` props
- Better integration with React state changes

**If we used GSAP:**
- Would need manual show/hide timelines
- Harder to sync with React state
- No AnimatePresence equivalent

#### Escape Key Behavior

```javascript
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedProtocol) {
      setSelectedProtocol(null)
    }
  }

  window.addEventListener('keydown', handleEscape)
  return () => window.removeEventListener('keydown', handleEscape)
}, [selectedProtocol])
```

**Escape ALWAYS returns to protocol selector.**

Listener only active when protocol is open (conditional check).

#### Reduced Motion Behavior

```javascript
initial={shouldReduceMotion ? undefined : 'hidden'}
animate={shouldReduceMotion ? undefined : 'visible'}
whileHover={shouldReduceMotion ? undefined : hoverVariant}
```

- No expand animation (instant reveal)
- No stagger (all fields visible immediately)
- No hover states (static)

---

## 5. Accessibility Guarantees

### Reduced Motion Rules Per Section

**Loader:**
- Skips entirely
- User goes directly to Hero

**Hero:**
- Shows final "scrolled" state immediately
- No scroll choreography
- Headline positioned at top-left, scale 0.7, opacity 0.6

**Profile:**
- Zones stack vertically
- No horizontal scroll
- height: auto (natural flow)

**Projects:**
- All projects rendered in vertical list
- No depth stack
- No virtualization (accessibility over performance)
- Simple fade-in only

**Contact:**
- No expand animation
- No stagger
- No hover states

**Global CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**All CSS animations/transitions disabled globally.**

### Keyboard Navigation Expectations

**All interactive elements must be keyboard accessible:**
- Buttons
- Links
- Form inputs
- Protocol selector

**Tab order must be logical:**
1. Skip to main content (if header existed)
2. Section navigation (if nav existed)
3. Interactive elements in DOM order

**Focus must be visible** (see next section).

### Focus-Visible Styling Rules

```css
*:focus-visible {
  outline: 2px solid var(--color-accent-start);
  outline-offset: 3px;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-accent-start);
  outline-offset: 3px;
}

input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--color-accent-start);
  outline-offset: 2px;
}
```

**WCAG 2.4.7 Compliance:** Focus indicator must be visible.

**Color Choice:** `#ff4d00` (Signal Architecture accent) provides high contrast against `#0d0d12` (base).

**Offset:** 3px for buttons/links (prevents overlap), 2px for inputs (tighter grouping).

### What Must Never Be Removed

**❌ DO NOT REMOVE:**
- `prefers-reduced-motion` media query
- Reduced motion conditional rendering
- Focus-visible styles
- Escape key handler
- Keyboard event listeners
- `viewport.once` on Framer Motion (prevents seizure-inducing re-triggers)

**❌ DO NOT ADD:**
- Auto-playing content (except video on focus)
- Infinite loops without pause mechanism
- Animations triggered by scroll alone (must have reduced motion path)

---

## 6. Performance Guarantees

### Virtualization Rules

**Projects Section:**
```javascript
const visibleIndices = [
  focusedIndex - 1,
  focusedIndex,
  focusedIndex + 1,
].filter((i) => i >= 0 && i < projects.length)
```

**Only 3 projects rendered at any time.**

**When to Apply Virtualization:**
- 5+ projects: Recommended
- 8+ projects: Critical

**Exception:** Reduced motion mode renders all projects (accessibility over performance).

### will-change Usage Rules

**Only apply will-change to elements actively animating.**

**Correct:**
```javascript
case 'focused':
  return {
    ...baseStyles,
    willChange: 'transform, opacity',
  }
```

**Incorrect:**
```javascript
// DO NOT apply will-change to all projects
willChange: 'transform, opacity',  // Always on
```

**Why:** `will-change` hints GPU to reserve memory. If applied to too many elements, memory usage increases, performance degrades.

**Rule:** Only on focused project, removed from queued/completed.

### ScrollTrigger Usage Constraints

**All ScrollTrigger instances must:**
1. Be created inside `gsap.context()`
2. Have cleanup via `ctx.revert()`
3. Use `scrub: 1.2` consistently (unless intentionally different)
4. Skip creation if `shouldReduceMotion`

**Template:**
```javascript
useLayoutEffect(() => {
  if (shouldReduceMotion) return

  const ctx = gsap.context(() => {
    ScrollTrigger.create({ /* config */ })
  }, containerRef)

  return () => {
    ctx.revert()  // Cleanup
  }
}, [shouldReduceMotion])
```

**Why useLayoutEffect (not useEffect):**
- Runs before paint
- Prevents FOUC (Flash of Unstyled Content)
- GSAP animations apply before user sees anything

### Cleanup Expectations

**All event listeners must have cleanup:**

**Correct:**
```javascript
useEffect(() => {
  window.addEventListener('keydown', handleEscape)
  return () => {
    window.removeEventListener('keydown', handleEscape)
  }
}, [selectedProtocol])
```

**Incorrect:**
```javascript
useEffect(() => {
  window.addEventListener('keydown', handleEscape)
  // No cleanup → Memory leak
}, [])
```

**GSAP Contexts:**
- Always use `gsap.context(() => { ... }, ref)`
- Always call `ctx.revert()` in cleanup

**State Updates:**
- Only update when value actually changes (prevents re-render thrashing)

---

## 7. How to Evaluate Changes

### Questions to Ask Before Adding Animation

1. **Does this animation communicate structure or state?**
   - YES → Proceed
   - NO → Remove it

2. **Can a user with `prefers-reduced-motion` understand the content without it?**
   - YES → Proceed
   - NO → Add reduced motion path

3. **Does this animation use bounce, elastic, or overshoot easing?**
   - NO → Proceed
   - YES → Change to ease-out-expo

4. **Is this animation scroll-driven or interaction-driven?**
   - Scroll → Use GSAP
   - Interaction → Use Framer Motion

5. **Does this animation loop infinitely?**
   - NO → Proceed
   - YES → Add pause mechanism or remove

6. **Will this animation cause re-renders on every frame?**
   - NO → Proceed
   - YES → Optimize with conditional state updates

### How to Detect "Style Drift"

**Style drift** is when changes gradually move the design away from its original intent.

**Warning Signs:**
- Bounce or elastic easing appears
- Animations feel "playful" or "fun"
- Motion decorates instead of informs
- Scroll feels "snappy" instead of "heavy"
- Focus states are removed
- Reduced motion paths are skipped

**Remedy:**
- Revert to original easing curves
- Remove decorative animations
- Restore reduced motion support
- Test with keyboard-only navigation

### What Changes Are Acceptable

**✅ ACCEPTABLE:**
- Adjusting duration within ±0.2s
- Adjusting stagger within ±0.05s
- Changing content (text, images, data)
- Adding new projects (depth stack scales)
- Adding new protocols (Contact selector scales)
- Refining easing (within no-overshoot rules)
- Performance optimizations (virtualization, memoization)

### What Changes Are Forbidden

**❌ FORBIDDEN:**
- Adding bounce/elastic easing
- Removing reduced motion support
- Removing focus-visible styles
- Adding auto-playing elements
- Changing scroll feel (scrub: 1.2)
- Adding infinite loops without pause
- Removing keyboard navigation
- Changing section metaphors (e.g., making Projects a grid)

---

## 8. Non-Negotiables (Hard Rules)

### Rules That Must NEVER Be Broken

1. **All scroll-driven sections must use `scrub: 1.2`**
   - Establishes "heavy camera" feel
   - Consistency across Hero, Profile, Projects

2. **All Framer Motion animations must use `ease: [0.16, 1, 0.3, 1]`**
   - No bounce, no elastic, no overshoot

3. **All sections must have reduced motion support**
   - Loader: Skip
   - Hero: Final state
   - Profile: Vertical layout
   - Projects: Vertical list
   - Contact: No animations

4. **Focus-visible styles must never be removed**
   - WCAG 2.4.7 compliance
   - Keyboard navigation accessibility

5. **Virtualization must be used for 8+ projects**
   - Performance guarantee
   - Exception: Reduced motion (accessibility > performance)

6. **will-change must only apply to actively animating elements**
   - Only on focused project
   - Removed from queued/completed

7. **All GSAP contexts must have cleanup**
   - `ctx.revert()` in useLayoutEffect return

8. **All event listeners must have cleanup**
   - `removeEventListener` in useEffect return

9. **Escape key must close Contact protocols**
   - User control guarantee

10. **Loader must respect localStorage flag**
    - Only runs once per session

### Examples of Bad Changes

**❌ BAD:**
```javascript
// Adding bounce easing
ease: 'bounce'

// Removing reduced motion check
ScrollTrigger.create({ ... })  // Always runs

// Applying will-change to all projects
willChange: 'transform, opacity',  // No conditional

// Removing focus styles
*:focus-visible {
  outline: none;  // WCAG violation
}

// Changing scrub inconsistently
scrub: 0.5  // Hero
scrub: 2.0  // Profile
```

**❌ BAD:**
```javascript
// Adding infinite auto-playing animation
animate={{
  rotate: [0, 360],
  transition: { duration: 2, repeat: Infinity }
}}

// Removing Escape key handler
// useEffect(() => { ... }, [selectedProtocol])  // Deleted

// No cleanup
useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  // No return
}, [])
```

### Examples of Acceptable Refinements

**✅ GOOD:**
```javascript
// Adjusting duration slightly
duration: 0.7  // Was 0.6, still within 0.4-0.8s range

// Improving performance
const memoizedValue = useMemo(() => expensiveCalc(), [deps])

// Adding new project
// Depth stack automatically scales

// Refining easing within rules
ease: [0.16, 1, 0.3, 1]  // Still ease-out-expo

// Adding accessibility improvements
aria-label="Close protocol selector"
```

**✅ GOOD:**
```javascript
// Optimizing state updates
if (newIndex !== currentIndex) {
  setIndex(newIndex)  // Only on change
}

// Adding content
<motion.p variants={itemVariants}>
  New metadata line
</motion.p>

// Improving reduced motion path
{shouldReduceMotion ? (
  <StaticContent />
) : (
  <AnimatedContent />
)}
```

---

## 9. Final Note

### How This Document Should Be Used

This document is a **system specification**, not a suggestion list.

**Before Making Changes:**
1. Read the relevant section
2. Check the non-negotiables
3. Evaluate using Section 7 questions
4. Test with reduced motion enabled
5. Test with keyboard-only navigation

**When Onboarding:**
1. Read Sections 1-3 (philosophy and rules)
2. Skim Section 4 (implementation details)
3. Memorize Section 8 (non-negotiables)

**When Debugging:**
1. Check Section 6 (performance)
2. Check Section 5 (accessibility)
3. Verify cleanup (event listeners, GSAP contexts)

### Reminder: This Is a System, Not a Demo

This portfolio is not:
- A tech demo
- A playground for trying new animation libraries
- A place to experiment with "cool effects"

This portfolio is:
- A **system** with defined rules
- A **demonstration** of restraint and craft
- A **communication** of technical skill through its own construction

**Every animation must justify its existence.**

If an animation does not communicate structure or state, it does not belong here.

**The goal is not to impress with motion.**
**The goal is to impress with precision.**

---

**END OF DOCUMENTATION**

*This document was written as the single source of truth for the Signal Architecture motion system. Treat it as such.*
