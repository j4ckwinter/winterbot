# Phase 2: Static Sections - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Build all six content sections (Hero, About, Experience, Projects, Skills, Contact) as static Astro components with placeholder data, plus a fixed journey-metaphor navigation sidebar. No JavaScript interactions in this phase — scroll-driven behavior, typewriter, and animated reveals land in Phase 3. A visitor should be able to scroll the complete site and understand its full structure.

</domain>

<decisions>
## Implementation Decisions

### Journey navigation
- Fixed left sidebar — a narrow vertical strip on the left edge
- Diamond markers (◆ filled = active, ◇ outline = inactive) at each section
- Dashed vertical line connecting all markers
- Section labels always visible alongside the diamond (not hover-only)
- No fill/progress animation in Phase 2 — active marker is highlighted via CSS only (JS scroll tracking added in Phase 3)
- Collapses to icon-only or hidden on mobile (exact mobile behavior: Claude's discretion)

### Hero trainer card
- Layout: portrait left (square ~120×120px placeholder), stats right — classic trainer card format
- Stats: Name (plain text), Class (plain text), Level (pixel progress bar + number), Region (plain text)
- Level displayed as a filled pixel-bar visual + number — not plain text
- Outside the card: headline + tagline + two CTA buttons (View Projects, Contact) to the right of or below the card
- Portrait placeholder: styled box (Claude's discretion — avatar initials, silhouette, or simple bordered square)

### Experience quest log (from REQUIREMENTS.md — no discussion needed)
- Vertical timeline with distinct entry markers per role
- Each entry: company name, role title, date range, 3–5 achievement bullet points
- Completed entries visually distinct from current/active entry
- No scroll animations in Phase 2 (those land in Phase 3 as EXP-04)

### Project dex-entry cards
- 3-column grid on desktop, 2 on tablet, 1 on mobile
- Dex number (#001 style): top-right corner, styled in accent-secondary color, smaller than title
- Card contents: project name, dex number, horizontal rule, short description, tech tag pills, GitHub + Live links
- Tech tags: pill badge style with accent-secondary background
- Hover state in Phase 2 is static (no lift animation) — animations added in Phase 3

### Skills inventory
- Category tabs above the grid: All / Frontend / Backend / Tools (or similar)
- Tab filtering: Phase 2 is static — tabs are rendered but JS filter deferred to Phase 3. All slots visible by default, or "All" tab selected.
- Slot contents: icon (SVG via astro-icon or similar) + label below
- Slot size: uniform squares, Panel inset-shadow styling
- Hover: CSS tooltip above slot showing proficiency note (e.g., "Expert • 5+ years")

### About section
- Character origin/backstory framing — Claude's discretion on copy structure
- Uses Panel primitive and design system tokens

### Contact section
- Labeled "Rest Area / Save Point" — exact wording required
- Includes email, GitHub, LinkedIn links
- Warm, inviting styling distinct from other sections — Claude's discretion

### Claude's Discretion
- Portrait placeholder visual treatment
- Mobile nav collapse behavior
- Exact number of placeholder projects and skills
- About section copy structure
- Contact section panel styling and visual warmth differentiation
- Exact tab categories for skills

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Panel.astro` — Wraps all section cards and content panels. Props: `class?`. Uses CSS scoped `.panel` with `::before` inner highlight ring.
- `ThemeToggle.astro` — Already in `Layout.astro` header as a `client:load` island
- `Layout.astro` — Root layout with FOUC script, font links, ThemeToggle in `<header>`, and `<slot />` for page content. The `<header>` is currently minimal — nav sidebar will need to be integrated here or as a fixed element alongside `<slot />`

### Established Patterns
- Token system: `--color-world`, `--color-surface`, `--color-border`, `--color-text`, `--color-accent-primary`, `--color-accent-secondary`, `--color-shadow` — all sections use these
- Text on world background: must use `color: var(--color-surface)` (white/cream), NOT `--color-text` (see WCAG rule in global.css)
- Text on surface/panel background: use `color: var(--color-text)` (deep burgundy)
- DotGothic16 for all headings/labels with game-UI feel; JetBrains Mono for all body copy
- `data-theme="fire"` / `data-theme="leaf"` on `<html>` — all components inherit automatically

### Integration Points
- `src/pages/index.astro` — Currently minimal (Phase 1 demo). Phase 2 builds out all six sections here as Astro component imports
- Nav sidebar: fixed-position element, likely outside the main content flow. Can be added to `Layout.astro` or as a layout component wrapping `<slot />`
- `astro-icon` or similar icon solution needed for skills inventory slots — research in Phase 2 plan

</code_context>

<specifics>
## Specific Ideas

- Journey nav markers: ◆ filled = active section, ◇ outline = inactive. Dashed connecting line. Labels always shown.
- Level stat on trainer card: pixel-bar visual like `[█████████▌  ] 12` — bar shows seniority level, number alongside
- Project card structure: `PROJECT NAME` (title) + `#001` (top-right muted), horizontal rule, description, pill tags, links
- Skills hover tooltip: small popup, format `Expert • 5+ years`

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-static-sections*
*Context gathered: 2026-03-14*
