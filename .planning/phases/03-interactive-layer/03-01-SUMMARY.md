---
phase: 03-interactive-layer
plan: 01
subsystem: ui
tags: [preact, astro, playwright, intersection-observer, scroll-reveal, animation, tdd]

# Dependency graph
requires:
  - phase: 02-static-sections
    provides: ExperienceSection.astro with .exp-entry class on timeline list items
provides:
  - Preact integration installed and configured in astro.config.mjs
  - 7 Playwright test stubs for Phase 3 requirements (DLG-01 through DLG-06, EXP-04)
  - EXP-04 scroll-reveal animation on experience timeline entries (350ms fade+slide-up)
  - Global CSS scroll-reveal classes (.exp-entry, .exp-entry.is-visible) preventing FOUC
affects:
  - 03-interactive-layer plan 02 (DialogueSystem Preact island — builds on Preact integration)

# Tech tracking
tech-stack:
  added:
    - "@astrojs/preact ^5.0.2 — Preact integration for Astro"
    - "preact ^10.29.0 — lightweight React alternative for interactive islands"
  patterns:
    - "Global CSS for scroll-reveal initial state (prevents FOUC vs scoped Astro styles)"
    - "IntersectionObserver with unobserve-after-reveal pattern (no re-animation on scroll back)"
    - "Nyquist testing: write failing Playwright stubs before DialogueSystem implementation"

key-files:
  created:
    - "tests/interactive-layer.spec.ts — 7 Playwright test stubs for Phase 3 requirements"
  modified:
    - "astro.config.mjs — added preact() integration"
    - "package.json — added @astrojs/preact and preact dependencies"
    - "tsconfig.json — added jsxImportSource: preact"
    - "src/styles/global.css — added .exp-entry scroll-reveal CSS with reduced-motion override"
    - "src/components/sections/ExperienceSection.astro — added IntersectionObserver script block"

key-decisions:
  - "Global CSS for .exp-entry initial opacity:0 state — scoped Astro styles inject after JS causing FOUC if placed there"
  - "unobserve(entry.target) after reveal — prevents re-animation on scroll back (one-shot reveal)"
  - "threshold: 0.15 — entry must be 15% visible before triggering reveal"
  - "DLG tests intentionally fail (Nyquist compliance) — DialogueSystem implemented in Plan 02"

patterns-established:
  - "FOUC prevention: opacity-based initial state for animated elements belongs in global.css not component scoped styles"
  - "IntersectionObserver + classList.add pattern for scroll-triggered animations"
  - "Playwright test stubs written before implementation (Nyquist rule)"

requirements-completed: [EXP-04]

# Metrics
duration: 6min
completed: 2026-03-22
---

# Phase 3 Plan 01: Interactive Layer Foundation Summary

**Preact integration configured, 7 failing Playwright stubs written (Nyquist), and EXP-04 scroll-reveal (350ms fade+slide-up via IntersectionObserver) implemented on experience timeline entries**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-22T08:10:20Z
- **Completed:** 2026-03-22T08:16:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Preact integration installed (`@astrojs/preact`, `preact`) and configured in `astro.config.mjs` with `jsxImportSource: preact` in `tsconfig.json`
- 7 Playwright test stubs created in `tests/interactive-layer.spec.ts` — DLG-01 through DLG-06 intentionally RED (Nyquist), EXP-04 passes GREEN
- EXP-04 scroll-reveal: experience timeline entries fade + slide-up (350ms ease-out) when scrolled into view, with `prefers-reduced-motion` override showing entries immediately
- No regressions — existing 28 design-system + static-sections tests still pass

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Preact integration and write failing Playwright test stubs** - `f9a93f2` (feat)
2. **Task 2: Implement EXP-04 scroll-reveal animation on experience timeline entries** - `97713e5` (feat)

**Plan metadata:** (docs commit — created below)

## Files Created/Modified
- `tests/interactive-layer.spec.ts` — 7 Playwright test stubs for Phase 3 (DLG-01..06 + EXP-04)
- `astro.config.mjs` — added `import preact from '@astrojs/preact'` and `preact()` in integrations
- `package.json` — added `@astrojs/preact ^5.0.2` and `preact ^10.29.0` to dependencies
- `tsconfig.json` — added `"jsxImportSource": "preact"` in compilerOptions
- `src/styles/global.css` — appended `.exp-entry` / `.exp-entry.is-visible` / `@media (prefers-reduced-motion)` rules
- `src/components/sections/ExperienceSection.astro` — added `<script>` block with IntersectionObserver

## Decisions Made
- **Global CSS for .exp-entry initial state:** Scoped Astro component styles are injected after JS bundle runs, which would cause entries to flash visible before JS hides them (FOUC). Global CSS runs before first paint, preventing this.
- **unobserve after reveal:** Prevents re-triggering the animation if the user scrolls back past an entry — one-shot reveal only.
- **threshold: 0.15:** Matches UI-SPEC.md — entry starts revealing when 15% visible rather than at the first pixel, giving a more natural trigger point.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Preact integration ready — Plan 02 can create `DialogueSystem.tsx` as a Preact island with `client:load`
- 6 DLG tests exist and fail — implementation in Plan 02 will make them green
- EXP-04 is complete and verified green

## Self-Check: PASSED

- tests/interactive-layer.spec.ts — FOUND
- astro.config.mjs — FOUND
- src/styles/global.css — FOUND
- src/components/sections/ExperienceSection.astro — FOUND
- Commit f9a93f2 — VERIFIED
- Commit 97713e5 — VERIFIED

---
*Phase: 03-interactive-layer*
*Completed: 2026-03-22*
