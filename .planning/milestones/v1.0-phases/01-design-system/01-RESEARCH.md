# Phase 1: Design System - Research

**Researched:** 2026-03-13
**Domain:** Astro 5 + Tailwind v4 + CSS custom property theming + WCAG color systems + Vercel deployment
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Full world-color shift between Fire and Leaf modes — the entire background environment changes, not just accents
- Colors should be muted/neutral, not overpowering:
  - Fire mode world background: deep ember/rust (~#8B3A2A)
  - Leaf mode world background: muted olive/sage (~#5A6B3A)
- Panel background shifts slightly per theme:
  - Fire mode: warm cream/parchment (~#F9EFE5)
  - Leaf mode: cool linen/papyrus tint (~#EFF5E8)
- UI text color and border color are FIXED in both themes: deep burgundy (~#66203D) — proven readable on parchment, consistent across modes
- Accent colors shift per theme to complement the world color
- Semantic aliases required — not just raw color values
- Token categories: `--color-world`, `--color-surface`, `--color-border`, `--color-text`, `--color-accent-primary`, `--color-accent-secondary`, `--color-shadow`
- All tokens defined as CSS custom properties; Tailwind v4 `@theme` block maps them to utility classes
- Theme switching via `data-theme="fire"` / `data-theme="leaf"` on `<html>`
- No-FOUC: inline blocking script in `<head>` reads `localStorage` and sets `data-theme` before first paint
- One universal Panel style for Phase 1 — no variants needed yet
- Panel spec: chunky 3–4px border, 6px hard drop-shadow offset (fixed, not theme-aware), inner highlight ring (thin white/semi-transparent line just inside the border)
- Border and shadow color: fixed deep burgundy — same in both themes
- Implemented as an Astro component `<Panel>` that wraps content — not a utility class pattern
- Inner highlight ring is a must-have detail (the signature GBA UI feel)
- Heading / decorative UI font: DotGothic16 from Google Fonts; minimum 18px; never used for body copy
- Type scale: H1 ~32px, H2 ~24px, H3 ~18px
- Body / monospace font: JetBrains Mono from Google Fonts
- Loading: Google Fonts link tag in Astro layout `<head>`
- Tailwind v4 — CSS-first, no config file
- All design tokens defined in a single `global.css` using `@theme` block + CSS custom properties
- Astro project initialized from minimal blank template
- Tailwind integration added via `npx astro add tailwind`
- Theme implementation: CSS custom properties redefined under `[data-theme="leaf"]` selector in `global.css`

### Claude's Discretion
- Exact WCAG-compliant color values for accent tokens within the muted rust/sage direction (verify 4.5:1 contrast)
- Specific shadow-offset value (within the 4–8px range)
- Any intermediate semantic tokens needed for WCAG compliance
- Compression or performance optimizations for Google Fonts loading

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DS-01 | Site renders with Fire mode and Leaf mode as two selectable themes | Token architecture + `data-theme` CSS selector pattern verified |
| DS-02 | Theme applies without flash-of-wrong-theme (inline blocking script reads localStorage before first paint) | FOUC prevention script pattern verified from Astro docs |
| DS-03 | All color tokens WCAG AA compliant (4.5:1 normal, 3:1 large) and do not match Nintendo FireRed/LeafGreen | Contrast ratios calculated for all pairs; accent recommendations provided and verified |
| DS-04 | DotGothic16 at minimum 18px for headings only — never body copy | Font confirmed available on Google Fonts; type scale defined |
| DS-05 | Body copy uses JetBrains Mono at readable scale | Font confirmed available on Google Fonts |
| DS-06 | Panel primitive: chunky 3-4px border, hard drop-shadow, inner highlight ring | `::before` pattern extracted from inspiration.html and verified |
| DS-07 | Site deploys to Vercel from git push with zero manual steps | Vercel zero-config Astro detection confirmed |
</phase_requirements>

---

## Summary

This phase bootstraps an Astro 5 + Tailwind v4 project from scratch and establishes every design primitive the rest of the site depends on. The key insight is that Tailwind v4 has moved entirely to a CSS-first approach: there is no `tailwind.config.js`, and the integration now uses a Vite plugin (`@tailwindcss/vite`) rather than the deprecated `@astrojs/tailwind` integration. This is a breaking change from v3 that the planner must account for.

The dual-theme system works by defining all tokens under `@theme` in `global.css` (default = Fire), then overriding them under `[data-theme="leaf"]` with plain CSS. Because Tailwind v4 emits `@theme` variables as `:root` CSS custom properties, both layers interoperate correctly. FOUC prevention requires a `<script is:inline>` tag placed in the Astro layout `<head>` that reads `localStorage` and sets `data-theme` before the first paint — this is a synchronous, blocking script.

Contrast ratios have been calculated for all planned color pairs. Primary text (`#66203D`) on both panel surfaces passes at 10:1+, and the world backgrounds pass with parchment-colored text (hero headlines). The one critical constraint is that the `--color-text` (`#66203D`) must NEVER be used directly on `--color-world` backgrounds — those combinations fail WCAG. Accent colors for Claude's discretion have been verified: fire accent-primary `#A03020` (6.3:1 on parchment) and leaf accent-primary `#3D5A24` (7.0:1 on linen) both pass AA.

**Primary recommendation:** Initialize with `npm create astro@latest -- --template minimal`, add Tailwind via `npx astro add tailwind` (which auto-installs `@tailwindcss/vite`), define all tokens in `src/styles/global.css`, and wire up the Panel component using the `::before` inner highlight pattern from `inspiration.html`.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x (latest) | Static site framework, component architecture, island hydration | Official Vercel support, zero-JS by default, Vite-native |
| Tailwind CSS | 4.x | Utility classes generated from CSS token definitions | CSS-first in v4, no config file, pairs perfectly with CSS custom props |
| @tailwindcss/vite | 4.x | Vite plugin that wires Tailwind into Astro's build | Required for v4; replaces deprecated @astrojs/tailwind |
| DotGothic16 | — | Pixel/retro heading font | Google Fonts, free, matches GBA aesthetic exactly |
| JetBrains Mono | — | Monospace body font | Google Fonts, free, developer-centric and highly readable |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Fontsource (optional) | — | Self-hosted font packages | Phase 4 performance pass only — defer now |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Google Fonts `<link>` | Fontsource npm package | Fontsource has better perf but adds complexity; Google Fonts is fine for Phase 1 |
| `@tailwindcss/vite` plugin | `@astrojs/tailwind` integration | `@astrojs/tailwind` is DEPRECATED for v4; do not use |

**Installation:**
```bash
# Step 1: create project
npm create astro@latest -- --template minimal

# Step 2: add Tailwind (auto-installs @tailwindcss/vite and configures astro.config.mjs)
npx astro add tailwind

# No tailwind.config.js is created or needed in v4
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── layouts/
│   └── Layout.astro      # <html data-theme>, font links, FOUC script, global.css import
├── components/
│   └── Panel.astro       # Panel primitive (border + shadow + ::before highlight)
│   └── ThemeToggle.astro # Client island for fire/leaf toggle
├── styles/
│   └── global.css        # @import "tailwindcss", @theme block, [data-theme="leaf"] overrides
└── pages/
    └── index.astro       # Entry page, imports Layout
```

### Pattern 1: Tailwind v4 CSS-first Token System

**What:** Define all design tokens inside a `@theme` block in `global.css`. Tailwind generates utility classes from these. Override values under `[data-theme="leaf"]` using plain CSS variable reassignment — no second `@theme` block needed.

**When to use:** Always — this is the only correct pattern for Tailwind v4. No `tailwind.config.js`.

```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme + https://tailwindcss.com/docs/installation/framework-guides/astro */

@import "tailwindcss";

/* Default theme = Fire */
@theme {
  /* Token namespace maps to Tailwind utilities: bg-world, text-text, border-border, etc. */
  --color-world:           #8B3A2A;
  --color-surface:         #F9EFE5;
  --color-border:          #66203D;
  --color-text:            #66203D;
  --color-accent-primary:  #A03020;
  --color-accent-secondary:#D4854A;
  --color-shadow:          rgba(102, 32, 61, 0.4);

  --font-pixel: 'DotGothic16', monospace;
  --font-body:  'JetBrains Mono', monospace;
}

/* Leaf theme overrides — only the values that change */
[data-theme="leaf"] {
  --color-world:           #5A6B3A;
  --color-surface:         #EFF5E8;
  --color-accent-primary:  #3D5A24;
  --color-accent-secondary:#8FA84A;
  /* --color-border, --color-text, --color-shadow remain fixed */
}
```

### Pattern 2: No-FOUC Inline Theme Script

**What:** A synchronous inline script in `<head>` that reads `localStorage` and sets `data-theme` on `<html>` before the browser paints anything.

**When to use:** Always in `Layout.astro`. The `is:inline` directive prevents Astro from bundling/deferring it.

```astro
<!-- src/layouts/Layout.astro -->
<!-- Source: https://lexingtonthemes.com/blog/multi-theme-toggle-with-astro-and-tailwind-css + Astro docs -->
<head>
  <!-- FOUC prevention: must be first script, runs synchronously -->
  <script is:inline>
    (function() {
      const saved = localStorage.getItem('theme');
      // Default to 'fire' if nothing stored
      const theme = (saved === 'fire' || saved === 'leaf') ? saved : 'fire';
      document.documentElement.setAttribute('data-theme', theme);
      if (!saved) localStorage.setItem('theme', 'fire');
    })();
  </script>
  <!-- font links, global.css import, etc. -->
</head>
```

### Pattern 3: Panel Astro Component

**What:** A reusable `.astro` component that applies the chunky border + hard drop-shadow + inner highlight ring. The inner highlight is a `::before` pseudo-element — this cannot be achieved with utility classes alone, which is why it is a component, not a utility class pattern.

**When to use:** Every content card, section wrapper, and UI box in the site.

```astro
---
// src/components/Panel.astro
// Source: Extracted from inspiration.html prototype
const { class: className = '' } = Astro.props;
---
<div class:list={['panel', className]}>
  <slot />
</div>

<style>
  .panel {
    background:    var(--color-surface);
    border:        4px solid var(--color-border);
    border-radius: 8px;
    padding:       2rem;
    box-shadow:    6px 6px 0px var(--color-shadow);
    position:      relative;
  }

  /* Inner highlight ring — the GBA signature detail */
  .panel::before {
    content:       '';
    position:      absolute;
    top: 2px; left: 2px; right: 2px; bottom: 2px;
    border:        2px solid rgba(255, 255, 255, 0.5);
    border-radius: 6px; /* calc(8px - 2px) */
    pointer-events: none;
  }
</style>
```

### Pattern 4: ThemeToggle Client Island

**What:** An Astro component with `client:load` hydration that reads/writes `data-theme` on `<html>` and persists to `localStorage`. This is the only component in Phase 1 that ships client JS.

**When to use:** In `Layout.astro` header area — always present.

```astro
---
// src/components/ThemeToggle.astro
---
<button id="theme-toggle" aria-label="Switch theme">
  <span id="theme-label">🔥</span>
</button>

<script>
  const btn = document.getElementById('theme-toggle');
  const label = document.getElementById('theme-label');

  function applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    label!.textContent = theme === 'fire' ? '🔥' : '🌿';
  }

  btn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') ?? 'fire';
    applyTheme(current === 'fire' ? 'leaf' : 'fire');
  });

  // Sync label on load
  const saved = localStorage.getItem('theme') ?? 'fire';
  label!.textContent = saved === 'fire' ? '🔥' : '🌿';
</script>
```

### Pattern 5: Vercel Zero-Config Deployment

**What:** Vercel auto-detects Astro projects on import. No `vercel.json` or adapter needed for a static build. Connect the GitHub repo to Vercel once; all subsequent pushes to `main` trigger production deployments.

**Setup steps (one-time):**
1. Push project to GitHub
2. Go to vercel.com → "Import Project" → select the repo
3. Vercel detects Astro, sets `npm run build` + `dist/` as output — accept defaults
4. Done — all future `git push origin main` deploys automatically

### Anti-Patterns to Avoid

- **Using `@astrojs/tailwind` integration with Tailwind v4:** This is deprecated. The correct integration is the `@tailwindcss/vite` plugin added to `astro.config.mjs`.
- **Defining a `tailwind.config.js`:** Not used in Tailwind v4 CSS-first mode. Will be ignored or conflict.
- **Using `--color-text` (#66203D) directly on `--color-world` backgrounds:** Contrast ratio is only 1.5–2:1. All text that appears directly on the world background (e.g., hero headlines) MUST use `--color-surface` (#F9EFE5) or white (#FFFFFF) instead.
- **Placing the FOUC script anywhere except the very first `<script>` in `<head>`:** Any later position risks a paint cycle completing before the attribute is set.
- **Defining a second `@theme` block for Leaf mode:** The `@theme` block is global/static. Theme switching uses plain CSS variable overrides under `[data-theme="leaf"]` — not a second `@theme`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading | Custom font-face declarations from CDN URLs | Google Fonts `<link>` tag | Handles preconnect, swap, subsetting automatically |
| FOUC prevention | Complex hydration detection logic | Inline `is:inline` script (3 lines) | Synchronous execution guarantee; more complex = more ways to race |
| CSS custom property → utility class mapping | Manual `@layer` declarations for every token | Tailwind v4 `@theme` block | Auto-generates bg-*, text-*, border-* utilities for every token |
| Vercel deployment config | `vercel.json` build configurations | Zero-config Astro detection | Vercel ships native Astro detection — manual config is just drift risk |

**Key insight:** The most dangerous custom solution in this phase is rolling your own CSS variable system without `@theme` — you'd get the variables but none of the utility classes, forcing manual `@layer` declarations for every token.

---

## WCAG Color Contrast Analysis

All contrast ratios calculated using the WCAG relative luminance formula (verified programmatically):

### Passing Combinations (MUST use these)

| Text | Background | Ratio | AA Normal | Usage |
|------|-----------|-------|-----------|-------|
| `#66203D` | `#F9EFE5` (fire surface) | 10.06:1 | PASS | All panel body text, fire mode |
| `#66203D` | `#EFF5E8` (leaf surface) | 10.28:1 | PASS | All panel body text, leaf mode |
| `#F9EFE5` | `#8B3A2A` (fire world) | 6.76:1 | PASS | Hero headlines on world bg, fire mode |
| `#F9EFE5` | `#5A6B3A` (leaf world) | 5.14:1 | PASS | Hero headlines on world bg, leaf mode |
| `#FFFFFF` | `#8B3A2A` (fire world) | 7.67:1 | PASS | White text elements on fire world |
| `#FFFFFF` | `#5A6B3A` (leaf world) | 5.84:1 | PASS | White text elements on leaf world |
| `#A03020` (fire accent) | `#F9EFE5` | 6.30:1 | PASS | Accent labels/highlights on fire panels |
| `#3D5A24` (leaf accent) | `#EFF5E8` | 7.03:1 | PASS | Accent labels/highlights on leaf panels |
| `#1A1A1A` | `#D4854A` (fire accent-secondary) | 6.01:1 | PASS | Button text on fire accent buttons |
| `#1A1A1A` | `#8FA84A` (leaf accent-secondary) | 6.52:1 | PASS | Button text on leaf accent buttons |

### Failing Combination (NEVER use)

| Text | Background | Ratio | Problem |
|------|-----------|-------|---------|
| `#66203D` | `#8B3A2A` (fire world) | 1.49:1 | FAIL — two similar dark tones |
| `#66203D` | `#5A6B3A` (leaf world) | 1.96:1 | FAIL — burgundy invisible on olive |

**Rule:** `--color-text` is only valid on `--color-surface`. Any text element appearing directly on `--color-world` must use `color: var(--color-surface)` or `color: #FFFFFF`.

### DS-03 Nintendo Palette Check

The Nintendo FireRed/LeafGreen game palettes use values like `#FF0000`, `#00A020`, `#3060C0`, `#F0A000`. None of the planned tokens match these exactly — the muted, WCAG-tested palette is original.

---

## Common Pitfalls

### Pitfall 1: Using deprecated @astrojs/tailwind with v4

**What goes wrong:** Running `npx astro add tailwind` in older Astro documentation examples installs the v3 integration path. The v4 setup uses a Vite plugin directly.
**Why it happens:** Search results and cached documentation mix v3 and v4 guidance.
**How to avoid:** After `npx astro add tailwind`, verify that `astro.config.mjs` contains `import tailwindcss from "@tailwindcss/vite"` and a `vite.plugins` array — NOT `import tailwind from "@astrojs/tailwind"` in the `integrations` array.
**Warning signs:** A `tailwind.config.js` file being generated; no `@tailwindcss/vite` in `node_modules`.

### Pitfall 2: @theme block not generating utility classes

**What goes wrong:** Variables defined in `:root {}` instead of `@theme {}` produce CSS variables but no utility classes (`bg-world` doesn't exist).
**Why it happens:** Developers familiar with v3 assume CSS variables and theme variables are equivalent.
**How to avoid:** All design tokens go in `@theme {}`. Dynamic theme overrides (Leaf mode) go in `[data-theme="leaf"] {}` using plain CSS variable assignments — NOT in a second `@theme` block.
**Warning signs:** `bg-world` class has no effect; computed styles show the CSS variable exists but utility class is not emitted.

### Pitfall 3: FOUC from deferred or async script

**What goes wrong:** Theme flickers to default Fire mode for ~100ms before user's saved Leaf preference loads.
**Why it happens:** Any non-inline script tag (including `<script type="module">`) defers execution until after the first paint.
**How to avoid:** The FOUC script MUST use `<script is:inline>` in Astro — this renders the script tag verbatim into HTML as a synchronous, blocking script. It MUST be the first script in `<head>`.
**Warning signs:** Visible flicker on page load when theme is Leaf; reproducible by throttling CPU in DevTools.

### Pitfall 4: Panel inner highlight clipped by overflow:hidden

**What goes wrong:** If a parent sets `overflow: hidden`, the `::before` pseudo-element's semi-transparent ring gets clipped.
**Why it happens:** The `::before` element is absolutely positioned at `2px` inset — any `overflow: hidden` on `.panel` or a direct ancestor clips it.
**How to avoid:** `.panel` must not set `overflow: hidden` itself. Child content that needs clipping should use a separate inner wrapper element.
**Warning signs:** Inner highlight ring appears cut off on one or more sides.

### Pitfall 5: DotGothic16 renders below 18px

**What goes wrong:** DotGothic16 at small sizes (< 18px) produces illegible anti-aliased blurriness because it is designed as a bitmap font.
**Why it happens:** Bitmap pixel fonts are designed for specific pixel multiples. Sub-pixel rendering at non-integer sizes destroys the pixel grid.
**How to avoid:** Enforce minimum 18px for DotGothic16 everywhere. Use CSS: `font-size: clamp(18px, ...)`. Never use it for body copy. Lint check: add a comment in the design spec.
**Warning signs:** Text looks blurry or smeared rather than crisp and pixelated.

---

## Code Examples

### global.css — complete Phase 1 structure

```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/installation/framework-guides/astro */

@import "tailwindcss";

/* ============================================================
   DESIGN TOKENS
   @theme generates both CSS variables AND Tailwind utility classes.
   Default theme = Fire.
   ============================================================ */
@theme {
  /* Color tokens */
  --color-world:            #8B3A2A;   /* world/page background */
  --color-surface:          #F9EFE5;   /* panel background */
  --color-border:           #66203D;   /* borders, shadow color */
  --color-text:             #66203D;   /* primary text (on surface only!) */
  --color-accent-primary:   #A03020;   /* accent text labels, fire */
  --color-accent-secondary: #D4854A;   /* button backgrounds, fire */
  --color-shadow:           rgba(102, 32, 61, 0.4);

  /* Typography tokens */
  --font-pixel: 'DotGothic16', monospace;
  --font-body:  'JetBrains Mono', monospace;
}

/* ============================================================
   LEAF THEME OVERRIDES
   Only reassign the values that differ.
   --color-border, --color-text, --color-shadow stay fixed.
   ============================================================ */
[data-theme="leaf"] {
  --color-world:            #5A6B3A;
  --color-surface:          #EFF5E8;
  --color-accent-primary:   #3D5A24;
  --color-accent-secondary: #8FA84A;
}

/* ============================================================
   BASE STYLES
   ============================================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-world);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.6;
  /* World background dot texture — from inspiration.html */
  background-image:
    radial-gradient(circle at 25px 25px, rgba(255,255,255,0.05) 2px, transparent 0),
    radial-gradient(circle at 75px 75px, rgba(255,255,255,0.05) 2px, transparent 0);
  background-size: 100px 100px;
}

h1, h2, h3 {
  font-family: var(--font-pixel);
  text-transform: uppercase;
  letter-spacing: 1px;
}

h1 { font-size: 2rem; }   /* ~32px */
h2 { font-size: 1.5rem; } /* ~24px */
h3 { font-size: 1.125rem; } /* ~18px */
```

### Layout.astro — FOUC script + font loading

```astro
---
// src/layouts/Layout.astro
// Source: https://docs.astro.build/en/tutorial/6-islands/2/
import '../styles/global.css';

interface Props {
  title: string;
}
const { title } = Astro.props;
---
<!doctype html>
<html lang="en" data-theme="fire">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>

    <!-- FOUC prevention: synchronous, runs before first paint -->
    <!-- Source: lexingtonthemes.com multi-theme pattern -->
    <script is:inline>
      (function() {
        const saved = localStorage.getItem('theme');
        const theme = (saved === 'fire' || saved === 'leaf') ? saved : 'fire';
        document.documentElement.setAttribute('data-theme', theme);
        if (!saved) localStorage.setItem('theme', 'fire');
      })();
    </script>

    <!-- Google Fonts: DotGothic16 + JetBrains Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DotGothic16&family=JetBrains+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### astro.config.mjs — Tailwind v4 Vite plugin

```javascript
// astro.config.mjs
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/tailwind` integration + `tailwind.config.js` | `@tailwindcss/vite` plugin + CSS `@theme` block | Tailwind v4 (2025) | No JS config file; design tokens live in CSS |
| `integrations: [tailwind()]` in astro.config | `vite: { plugins: [tailwindcss()] }` | Tailwind v4 (2025) | Different import and config location |
| `theme.extend.colors` object in tailwind.config.js | `@theme { --color-*: value; }` in CSS | Tailwind v4 (2025) | Colors defined in CSS, not JavaScript |
| `darkMode: 'class'` with `.dark` class | `[data-theme="..."]` attribute selectors | Project decision | Supports 2+ themes (not just dark/light) |

**Deprecated/outdated:**
- `@astrojs/tailwind` package: Deprecated for use with Tailwind v4. Do not install.
- `tailwind.config.js`: Not used or created in Tailwind v4 CSS-first mode.
- `npx astro add tailwind` (old path): Still works but generates v4-compatible config now. Verify output.

---

## Open Questions

1. **`npx astro add tailwind` generates correct v4 config automatically?**
   - What we know: Tailwind docs say `npx astro add tailwind` installs `@tailwindcss/vite`
   - What's unclear: Whether the CLI may install the deprecated `@astrojs/tailwind` if Astro is initialized with certain flags
   - Recommendation: After running the command, immediately verify `astro.config.mjs` contains the Vite plugin pattern, not the integrations pattern. Fix if needed before proceeding.

2. **Google Fonts loading adds measurable delay?**
   - What we know: `display=swap` prevents render blocking; `preconnect` reduces DNS time
   - What's unclear: Whether font loading causes layout shift (CLS) with DotGothic16 at heading sizes
   - Recommendation: Use `font-display: swap` (included in the Google Fonts URL) and set `font-family: monospace` as the fallback for headings. Claude's discretion: if CLS is visible in Phase 1, add `size-adjust` descriptor.

---

## Validation Architecture

> nyquist_validation is enabled in .planning/config.json

### Test Framework

This is a new Astro project with no existing test infrastructure. Phase 1 establishes the project from scratch — no test runner is installed yet.

| Property | Value |
|----------|-------|
| Framework | None installed yet — Wave 0 sets up Playwright for smoke tests |
| Config file | `playwright.config.ts` — Wave 0 |
| Quick run command | `npx playwright test --grep @smoke` |
| Full suite command | `npx playwright test` |

**Rationale for Playwright over Jest/Vitest:** This phase produces a visual Astro site, not a utility library. The meaningful assertions are: does the theme switch happen without flicker? Do both themes render correct colors? Does the Panel show the inner highlight? These are inherently visual/DOM assertions. Playwright smoke tests are the right fit; unit tests are not applicable to CSS token values.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DS-01 | Fire mode shows world bg `#8B3A2A`; Leaf mode shows `#5A6B3A` | smoke (Playwright) | `npx playwright test --grep @ds01` | ❌ Wave 0 |
| DS-02 | No color change visible between server HTML and client-hydrated page (FOUC = 0ms flicker) | smoke (Playwright) | `npx playwright test --grep @ds02` | ❌ Wave 0 |
| DS-03 | Contrast ratio passes 4.5:1 for text on surface — checked via computed styles | smoke (Playwright) | `npx playwright test --grep @ds03` | ❌ Wave 0 |
| DS-04 | h1/h2/h3 use DotGothic16 font; body uses JetBrains Mono | smoke (Playwright) | `npx playwright test --grep @ds04` | ❌ Wave 0 |
| DS-05 | Body paragraphs use JetBrains Mono at >= 16px | smoke (Playwright) | `npx playwright test --grep @ds05` | ❌ Wave 0 |
| DS-06 | Panel has 4px border, 6px shadow, visible ::before ring | smoke (Playwright) | `npx playwright test --grep @ds06` | ❌ Wave 0 |
| DS-07 | Vercel deployment URL returns 200 after git push | manual / CI | Vercel deployment check | manual only |

### Sampling Rate
- **Per task commit:** `npx playwright test --grep @smoke` (runs DS-01 through DS-06)
- **Per wave merge:** `npx playwright test` (full suite)
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/design-system.spec.ts` — covers DS-01 through DS-06 (Playwright smoke tests)
- [ ] `playwright.config.ts` — base URL `http://localhost:4321`, Chromium only for speed
- [ ] Framework install: `npm install -D @playwright/test && npx playwright install chromium`

---

## Sources

### Primary (HIGH confidence)
- [https://tailwindcss.com/docs/installation/framework-guides/astro](https://tailwindcss.com/docs/installation/framework-guides/astro) — Vite plugin setup, exact install commands
- [https://tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme) — `@theme` block syntax, CSS custom property interaction, `@theme inline`
- [https://docs.astro.build/en/tutorial/6-islands/2/](https://docs.astro.build/en/tutorial/6-islands/2/) — `is:inline` FOUC prevention pattern
- [https://fonts.google.com/specimen/DotGothic16](https://fonts.google.com/specimen/DotGothic16) — Font confirmed available
- [https://fonts.google.com/specimen/JetBrains+Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Font confirmed available
- [https://vercel.com/changelog/astro-projects-can-now-be-deployed-with-zero-configuration](https://vercel.com/changelog/astro-projects-can-now-be-deployed-with-zero-configuration) — Vercel zero-config Astro deploy
- Programmatic WCAG contrast calculations — computed directly from W3C luminance formula

### Secondary (MEDIUM confidence)
- [https://lexingtonthemes.com/blog/multi-theme-toggle-with-astro-and-tailwind-css](https://lexingtonthemes.com/blog/multi-theme-toggle-with-astro-and-tailwind-css) — Multi-theme `data-theme` pattern, FOUC inline script
- `inspiration.html` in project root — Panel `::before` pattern, shadow values, font stack

### Tertiary (LOW confidence)
- None — all key findings verified with primary sources

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified via official Tailwind and Astro docs
- Architecture: HIGH — patterns verified via official docs and working prototype
- Color/WCAG: HIGH — computed programmatically from W3C formula, not estimated
- Pitfalls: HIGH — Tailwind v3→v4 migration breaking change verified via official changelog
- Test architecture: MEDIUM — Playwright smoke approach is sound but Wave 0 spec is new

**Research date:** 2026-03-13
**Valid until:** 2026-06-13 (stable stack; Tailwind v4 and Astro 5 unlikely to have breaking changes in 3 months)
