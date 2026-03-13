# Technology Stack

**Project:** WinterBot Portfolio
**Researched:** 2026-03-13

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | ^5.x | Static site generator, component framework | Zero-JS by default, content-layer, island architecture perfectly suited for a primarily-static portfolio with selective interactivity (typewriter, theme toggle). Ships zero runtime unless you opt in. |
| Node.js | >=20.x | Build toolchain | Required by Astro 5; LTS as of 2025. |

**Confidence:** MEDIUM — Astro 5 was released December 2024. "5.x" is directionally correct for 2026; exact patch version should be verified with `npm view astro version` before project init.

**Note on Astro 5 key features relevant to this project:**
- Content Collections with the new Content Layer API — useful for projects data (dex entries), work experience (quest log), and skills (inventory). Strongly prefer this over manual markdown imports.
- View Transitions API built-in — enables smooth page-to-page animations without a JS framework.
- Static output (`output: 'static'`) is the default and the right choice here.

---

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | ^4.0 | Utility CSS, design tokens, theme system | v4 released January 22, 2025. CSS-first config via `@theme {}` is ideal for the dual Fire/Leaf theme — all tokens become native CSS custom properties automatically, enabling runtime toggling with zero extra tooling. |
| @tailwindcss/postcss | ^4.0 | PostCSS plugin for Astro integration | The v4 PostCSS plugin replaces the old Vite plugin as the integration path with Astro. |

**Confidence:** HIGH — Tailwind v4.0 release confirmed via official blog. CSS-first `@theme {}` config verified as the v4 canonical approach.

**Tailwind v4 critical notes for this project:**
- No `tailwind.config.js` — configure everything in `src/styles/global.css` via `@theme {}`.
- Design tokens (colors, fonts, spacing) automatically become CSS custom properties, which makes the Fire/Leaf theme toggle straightforward: swap a `data-theme` attribute on `<html>` and redefine the tokens.
- Container queries are built-in (no plugin); useful for the responsive dex cards and inventory grid.
- `@starting-style` variant enables enter/exit transitions without JavaScript — good for dialogue box appear animations.

---

### Typography

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| DotGothic16 | Google Fonts (no npm) | Primary display/heading font | Authentic pixel-grid aesthetic with broad Japanese + Latin character support. Free, no licensing friction. Renders crisply at larger sizes with `image-rendering: pixelated` neighbor. Best for headings, UI labels, trainer card elements. |
| Press Start 2P | Google Fonts (no npm) | Accent/decoration font | Maximum retro-arcade impact. Use sparingly — only for hero elements, section headers where "game UI" framing is strongest. All-caps, bitmap feel. Too dense for body text. |
| JetBrains Mono or IBM Plex Mono | Google Fonts (no npm) | Body/code font | Monospace is the right body typeface for a terminal/game-UI aesthetic. JetBrains Mono has ligatures and is highly legible. IBM Plex Mono is slightly more conservative if preferred. |

**Confidence:** MEDIUM — These fonts exist on Google Fonts as of training knowledge (August 2025). Verify availability at fonts.google.com before committing to a specific font. DotGothic16 and Press Start 2P have been stable on Google Fonts for several years.

**Font loading strategy:**
Use `<link rel="preconnect">` + `display=swap` via Google Fonts CDN in the Astro layout head. Do NOT self-host unless bundle size is a concern — Google Fonts CDN is cached by browsers globally and avoids an extra build step.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Press+Start+2P&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

---

### Theme / Color System

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| CSS custom properties (native) | N/A | Runtime Fire/Leaf theme toggle | No library needed. Tailwind v4 `@theme {}` tokens become CSS variables. Toggling `data-theme="fire"` vs `data-theme="leaf"` on `<html>` and using CSS `[data-theme="fire"] { --color-primary: ... }` blocks is zero-dependency, zero-runtime-cost, and immediately serializable to `localStorage`. |
| Minimal vanilla JS (~30 lines) | N/A | Theme persistence | Read `localStorage` on load, apply `data-theme` attribute, expose a toggle function. No library needed. This is an Astro island: `<script>` tag in the layout, not a component. Avoids flash-of-wrong-theme. |

**Confidence:** HIGH — This is the canonical modern approach for CSS theming; no external library needed.

**What NOT to use:** next-themes, use-color-scheme, or any React-dependent theme library. This is a static Astro site without React — those libraries add overhead with no benefit.

---

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| CSS animations + Tailwind utilities | N/A | Transitions, hover states, entrance animations | The project constraint is "CSS-based only, no heavy canvas/WebGL." CSS keyframes + Tailwind's `transition-*`, `animate-*` utilities cover 90% of needs: panel hover, dialogue box slide-in, button press effects. |
| Intersection Observer API (vanilla) | N/A | Scroll-triggered reveal animations | ~20 lines of vanilla JS as an Astro `<script>`. Triggers CSS animation classes when elements enter viewport. No library needed for the quest log timeline reveals and section transitions. |

**What NOT to use:**
- **Framer Motion**: React-only, requires a React island for every animated component. Excessive for CSS-capable animations on a static site.
- **GSAP**: Powerful but overkill for this project's animation scope. The free tier has a license clause prohibiting use in paid products; the premium plugins require a paid license. Avoid.
- **AOS (Animate on Scroll)**: Legacy library, minimal maintenance, replaced by native Intersection Observer in 2024+ workflows.
- **Motion One**: Lighter than GSAP, worth knowing, but still JS overhead when CSS handles the project's animation needs.

**Confidence:** HIGH — The constraint is stated in PROJECT.md ("CSS-based only"). CSS + vanilla Intersection Observer is the correct call.

**Exception:** If the typewriter effect on the dialogue box needs careful timing control, a tiny purpose-built utility (`typed.js` or a 15-line vanilla implementation) is acceptable. Prefer the vanilla implementation to avoid a dependency.

---

### Icons

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro Icon + Iconify | `astro-icon ^1.x` | Icon system | `astro-icon` resolves Iconify icon sets at build time — zero runtime icon JS. Use `@iconify-json/game-icons` for game/pixel-themed icons (swords, potions, shields, maps) and `@iconify-json/ph` (Phosphor Icons) for UI icons (nav, social links). Both sets have retro-compatible designs. |

**Confidence:** MEDIUM — `astro-icon` is the dominant Astro icon solution; verify current version compatibility with Astro 5.

**Icon set recommendations:**
- `@iconify-json/game-icons` — 4,000+ game-themed SVG icons, perfect for inventory items, quest markers, skill icons
- `@iconify-json/ph` — Phosphor Icons, clean and readable for UI chrome
- Do NOT use FontAwesome — licensing and bundle size make it the wrong choice for a lean static site

---

### Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | N/A (platform) | Static hosting | Free tier, zero config for Astro static output, automatic preview deployments per branch, instant global CDN. |
| @astrojs/vercel | ^8.x | Astro Vercel adapter | Required when using `output: 'server'` or `output: 'hybrid'`. For pure static output, the adapter is NOT required — Vercel auto-detects Astro projects and handles the build. |

**Confidence:** MEDIUM — Vercel + Astro static is well-established. Adapter version should be confirmed for Astro 5.

**Vercel deployment config (static output, no adapter needed):**
```json
// vercel.json (optional — Vercel auto-detects Astro)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

**astro.config.mjs for static deployment:**
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://your-domain.vercel.app',
});
```

No `@astrojs/vercel` adapter is needed for a fully static site — the adapter is only required for SSR/edge functions, which this project explicitly excludes.

---

### Content Management

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro Content Collections | Built-in (Astro 5) | Projects (dex entries), experience (quest log), skills (inventory) | Type-safe, co-located with source, zero external CMS. The Content Layer API in Astro 5 supports local files (JSON, YAML, Markdown) with Zod schema validation. Ideal for placeholder content that gets swapped with real data later. |
| Zod | ^3.x (peer dep of Astro) | Schema validation for collections | Bundled with Astro — no separate install. Defines the shape of dex entries, quest log items, skills. |

**Confidence:** HIGH — Content Collections are the canonical Astro approach, built-in since Astro 2, enhanced in Astro 5.

---

## Full Dependency List

### Production

```bash
# Core (Astro auto-installs peers)
npm create astro@latest

# Tailwind CSS v4 for Astro
npm install tailwindcss @tailwindcss/postcss

# Icons
npm install astro-icon
npm install @iconify-json/game-icons @iconify-json/ph

# Google Fonts: loaded via CDN link tag — no npm install
```

### Dev Dependencies

```bash
# None beyond what Astro scaffolds (TypeScript, Prettier)
# Astro's create script handles the rest
```

### Deliberately Excluded

| Package | Reason |
|---------|--------|
| React / Vue / Svelte | No component framework needed — Astro components handle all UI |
| Framer Motion | React-only, overkill for CSS-capable animations |
| GSAP | License friction, overkill for scope |
| next-themes | React-dependent theme library |
| @astrojs/vercel | Only needed for SSR; this site is fully static |
| FontAwesome | License complexity, bundle size |
| AOS | Superseded by native Intersection Observer |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Astro | Next.js | Next.js is React-first and SSR-oriented; Astro's zero-JS default is the right fit for a static portfolio |
| Framework | Astro | SvelteKit | Also a valid option, but Astro has better static optimization and the Vercel integration is more established |
| CSS | Tailwind v4 | Tailwind v3 | v4 released Jan 2025; v3 enters maintenance mode; CSS-first config is better for the theme system |
| CSS | Tailwind v4 | Vanilla CSS + CSS vars | Valid, but Tailwind's utility layer speeds up layout work dramatically; design tokens in `@theme {}` give the best of both worlds |
| Animations | CSS + Intersection Observer | GSAP | GSAP is overkill; license clause on free tier; CSS achieves everything this project needs |
| Animations | CSS + Intersection Observer | Framer Motion | React-only, incompatible without adding React as a dependency |
| Icons | astro-icon + Iconify | Heroicons | Heroicons has no game-themed icons; Iconify covers both game and UI icon sets |
| Fonts | Google Fonts CDN | Self-hosted (fontsource) | CDN is simpler for v1; browser caching makes it fast; self-host only if privacy regulations require it |
| Theme toggle | CSS custom properties + data-attr | CSS class-based dark mode | `data-theme` attribute approach is more flexible than Tailwind's `dark:` class, which is binary |

---

## Sources

| Source | Confidence | Notes |
|--------|------------|-------|
| tailwindcss.com/blog/tailwindcss-v4 (fetched 2026-03-13) | HIGH | Official Tailwind v4 release post; release date, CSS-first config, PostCSS setup confirmed |
| PROJECT.md constraints | HIGH | Constraints are source of truth for tech decisions (Astro, Tailwind, Vercel, CSS-only animations) |
| Astro docs (training knowledge, Aug 2025) | MEDIUM | Astro 5 release, Content Collections, static output — knowledge current through release; patch version unverified |
| Google Fonts (training knowledge) | MEDIUM | DotGothic16, Press Start 2P availability; verify at fonts.google.com before use |
| astro-icon package (training knowledge) | MEDIUM | Current version for Astro 5 compatibility should be verified with `npm view astro-icon version` |
| Iconify game-icons set (training knowledge) | MEDIUM | Available as of training; verify with `npm view @iconify-json/game-icons version` |
