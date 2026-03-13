# Phase 1: Design System - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the Astro + Tailwind v4 project from scratch, define the Fire/Leaf dual-theme token system, typography rules, the Panel primitive component, and the Vercel deploy pipeline. Everything Phase 2 builds on must exist here.

</domain>

<decisions>
## Implementation Decisions

### Theme palette character
- Full world-color shift between Fire and Leaf modes — the entire background environment changes, not just accents
- Colors should be muted/neutral, not overpowering:
  - Fire mode world background: deep ember/rust (~#8B3A2A)
  - Leaf mode world background: muted olive/sage (~#5A6B3A)
- Panel background shifts slightly per theme:
  - Fire mode: warm cream/parchment (~#F9EFE5)
  - Leaf mode: cool linen/papyrus tint (~#EFF5E8)
- UI text color and border color are FIXED in both themes: deep burgundy (~#66203D) — proven readable on parchment, consistent across modes
- Accent colors shift per theme to complement the world color

### Token architecture
- Semantic aliases required — not just raw color values
- Token categories: `--color-world`, `--color-surface`, `--color-border`, `--color-text`, `--color-accent-primary`, `--color-accent-secondary`, `--color-shadow`
- All tokens defined as CSS custom properties; Tailwind v4 `@theme` block maps them to utility classes
- Theme switching via `data-theme="fire"` / `data-theme="leaf"` on `<html>`
- No-FOUC: inline blocking script in `<head>` reads `localStorage` and sets `data-theme` before first paint

### Panel primitive
- One universal Panel style for Phase 1 — no variants needed yet
- Spec: chunky 3–4px border, 6px hard drop-shadow offset (fixed, not theme-aware), inner highlight ring (thin white/semi-transparent line just inside the border)
- Border and shadow color: fixed deep burgundy — same in both themes
- Implemented as an Astro component `<Panel>` that wraps content — not a utility class pattern
- Inner highlight ring is a must-have detail (the signature GBA UI feel)

### Font selection
- Heading / decorative UI font: **DotGothic16** from Google Fonts
  - Used for: section headings, dialogue box text, trainer card stats, game-UI labels (any element with a "game" feel)
  - Minimum size: 18px — never used for body copy
  - Type scale defined in Phase 1: H1 ~32px, H2 ~24px, H3 ~18px
- Body / monospace font: **JetBrains Mono** from Google Fonts
  - Used for: all body copy, paragraphs, descriptions
- Loading: Google Fonts link tag in Astro layout `<head>` — simpler for Phase 1, can self-host later in Phase 4 if needed

### Tailwind / project setup
- **Tailwind v4** — CSS-first, no config file (`tailwind.config.js` not needed)
- All design tokens defined in a single `global.css` using `@theme` block + CSS custom properties for theme switching
- Astro project initialized from minimal blank template (`npm create astro@latest -- --template minimal`)
- Tailwind integration added via `npx astro add tailwind`
- Theme implementation: CSS custom properties redefined under `[data-theme="leaf"]` selector in `global.css`

### Claude's Discretion
- Exact WCAG-compliant color values for accent tokens within the muted rust/sage direction (verify 4.5:1 contrast)
- Specific shadow-offset value (within the 4–8px range)
- Any intermediate semantic tokens needed for WCAG compliance
- Compression or performance optimizations for Google Fonts loading

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `inspiration.html` — Single-file HTML prototype. Key values to carry forward:
  - Color references: `--ui-bg: #F9EFE5`, `--ui-text: #66203D`, `--ui-border: #66203D`, `--shadow-offset: 6px`, `--border-width: 4px`, `--radius: 8px`
  - Panel `.panel::before` inner highlight pattern (white rgba border inset 2px)
  - Font stack: DotGothic16 + IBM Plex Mono (switching body font to JetBrains Mono)
  - Background subtle dot pattern (radial-gradient texture on world background)

### Established Patterns
- None yet — this is Phase 1. Patterns established here become the standard for all future phases.

### Integration Points
- Astro layout component (`src/layouts/Layout.astro`) will hold the `<html data-theme>` attribute, font `<link>` tags, inline FOUC-prevention script, and global CSS import
- `src/styles/global.css` is the single source of truth for all tokens — all future components import or inherit from this

</code_context>

<specifics>
## Specific Ideas

- The world background should use the same subtle dot/radial-gradient texture from the prototype (keeps the "world map" feel without being heavy)
- Panel inner highlight: `::before` pseudo-element with `border: 2px solid rgba(255,255,255,0.5)`, inset 2px — this is the exact prototype pattern to preserve
- The Fire/Leaf theme toggle is a first-class feature — the ThemeToggle component will be a client-side Astro island

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-design-system*
*Context gathered: 2026-03-13*
