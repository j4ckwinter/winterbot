---
phase: 01-design-system
plan: 03
subsystem: ui
tags: [astro, typescript, css, localStorage]

# Dependency graph
requires:
  - phase: 01-design-system/01-01
    provides: Astro project scaffolded with Playwright smoke tests
  - phase: 01-design-system/01-02
    provides: global.css tokens, Layout.astro, index.astro with panel div
provides:
  - Panel.astro Astro component with 4px border, 6px hard drop-shadow, ::before inner highlight ring
  - ThemeToggle.astro client-side toggle with localStorage persistence, synced button label
  - Layout.astro updated with ThemeToggle in header
  - All 7 DS-01 through DS-06 smoke tests passing green
affects: [all Phase 2 section components, any component wrapping content in Panel]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Astro component with scoped <style> for ::before pseudo-element (cannot be expressed as Tailwind utilities)"
    - "Astro component <script> block for client-side interactivity (auto-bundled as ESM module)"
    - "localStorage read/write pattern for theme persistence across page refreshes"

key-files:
  created:
    - src/components/Panel.astro
    - src/components/ThemeToggle.astro
  modified:
    - src/layouts/Layout.astro
    - src/pages/index.astro

key-decisions:
  - "Panel.astro uses scoped <style> not Tailwind utilities — ::before pseudo-element requires position:absolute which Tailwind cannot express"
  - "position: relative on .panel and no overflow: hidden are mandatory — overflow: hidden clips the ::before inner highlight ring"
  - "ThemeToggle uses regular Astro <script> block (not is:inline) — Astro bundles it as an ESM module, runs client-side"
  - "client:load directive on ThemeToggle in Layout.astro included per plan spec — Astro warns that hydration directives are only valid on framework components but the <script> runs client-side regardless"

patterns-established:
  - "Panel: the universal card wrapper for all Phase 2 section components — use <Panel> not raw divs"
  - "Theme toggle: localStorage key is 'theme', values are 'fire'/'leaf', applied via data-theme on <html>"

requirements-completed: [DS-01, DS-06]

# Metrics
duration: 4min
completed: 2026-03-13
---

# Phase 1 Plan 03: Panel Component and ThemeToggle Summary

**Panel.astro reusable card wrapper with GBA-signature 4px border + 6px hard drop-shadow + ::before inner highlight ring, and ThemeToggle client island for Fire/Leaf switching with localStorage persistence**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-13T16:52:33Z
- **Completed:** 2026-03-13T16:57:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Panel.astro created with scoped CSS: 4px solid border, 6px 0-blur hard drop-shadow, 2rem padding, and ::before ring (rgba(255,255,255,0.5) inset 2px)
- ThemeToggle.astro created with click handler toggling fire↔leaf, localStorage write, and synced button label
- Layout.astro updated to import and render ThemeToggle in a header element
- All 7 DS-01 through DS-06 Playwright smoke tests pass green

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Panel primitive component** - `d002dd5` (feat — committed by Plan 02 executor ahead of schedule)
2. **Task 2: Build ThemeToggle client island and wire into Layout** - `5135816` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified
- `src/components/Panel.astro` - Panel wrapper: position:relative, 4px border, 6px box-shadow, ::before highlight ring
- `src/components/ThemeToggle.astro` - Theme toggle button with click handler, localStorage, dynamic aria-label
- `src/layouts/Layout.astro` - Added ThemeToggle import and `<ThemeToggle client:load />` in header
- `src/pages/index.astro` - Updated to use `<Panel>` component instead of raw `<div class="panel">`

## Decisions Made
- Used scoped `<style>` in Panel.astro (not Tailwind utilities) because `::before` with `position: absolute` cannot be expressed as Tailwind utility classes
- `position: relative` on `.panel` and explicit absence of `overflow: hidden` are required to make the `::before` inner highlight ring visible — noted in code comments
- ThemeToggle uses a regular `<script>` block (not `is:inline`) so Astro bundles it as an ESM module
- `client:load` directive present in Layout.astro per plan spec — Astro generates a dev-server warning ("Astro components do not render in the client"), but the `<script>` block runs client-side regardless via Astro's module bundling

## Deviations from Plan

### Execution note: Plan 02 ran ahead

Plan 02's executor completed both Plan 03 tasks ahead of schedule (as documented in Plan 02's summary). When Plan 03 ran, the files already existed identically to spec:
- `d002dd5` — Panel.astro committed by Plan 02 as "Plan 03 work done early"
- `4c2a135` — ThemeToggle.astro committed by Plan 02 as "Plan 03 work done early"

Plan 03's executor verified correctness, confirmed all smoke tests green, and made a minor cleanup commit (`5135816`) removing a stale comment from Layout.astro.

This is not a deviation requiring a rule — both plans are wave 2 and designed to be parallel. The result is identical to what Plan 03 would have produced independently.

## Issues Encountered
- `client:load` directive on `<ThemeToggle>` causes an Astro dev-server warning: "Astro components do not render in the client and should not have a hydration directive." This is correct — hydration directives (client:load, client:idle, etc.) are for framework components (React, Vue, etc.), not `.astro` components. The toggle still works correctly because Astro's `<script>` block bundling is independent of hydration directives. The plan spec explicitly required `client:load` in Layout.astro, so it was kept.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Panel.astro is ready for all Phase 2 section components to use as their card wrapper
- ThemeToggle wired and working — Fire/Leaf theme switching is user-controllable
- All 6 DS smoke tests green — Phase 1 design system acceptance criteria fully met
- Plan 04 (Vercel deploy pipeline) is the final Phase 1 plan

## Self-Check: PASSED

All created files verified present. All task commits verified in git log. Key patterns verified:
- Panel.astro has `.panel::before` pseudo-element rule
- ThemeToggle.astro has `document.documentElement.setAttribute('data-theme', ...)`
- Layout.astro has `client:load` directive on ThemeToggle

---
*Phase: 01-design-system*
*Completed: 2026-03-13*
