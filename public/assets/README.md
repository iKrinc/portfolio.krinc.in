# Assets Required

## Film Grain Texture

**Location:** `/public/assets/grain-texture.png`

**Specifications:**
- Format: PNG (optimized)
- Size: 512×512px or 1024×1024px
- Opacity: Will be set to 5% via CSS
- Pattern: Subtle film grain noise
- File size: < 50kb
- Tiling: Must tile seamlessly

**How to generate:**
1. Use Photoshop Filter > Noise > Add Noise
2. Or use online grain generator
3. Export as optimized PNG
4. Ensure pattern tiles seamlessly

## Project Visuals

**Location:** `/public/assets/projects/`

**Files needed (per data/projects.json):**
- `project-001.jpg` - Motion portfolio showcase (16:9)
- `project-002.jpg` - Ecommerce platform (16:9)
- `project-003.jpg` - Interactive experience (16:9)

**Specifications:**
- Format: JPG or WebP (optimized)
- Aspect ratio: 16:9 (as defined in data)
- Max width: 1920px
- Quality: 80-85%
- File size: < 500kb per image

**For videos (if used):**
- Format: MP4 (H.264)
- Duration: 5-10s loop
- Resolution: 1920×1080 max
- File size: < 2MB
- Muted, looping

## Favicon

**Location:** `/public/favicon.ico`

Already exists - update if needed.

---

**Note:** All assets will be lazy-loaded except grain texture.
Use Next.js Image component for automatic optimization.
