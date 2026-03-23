---
phase: 05-add-in-progress-label-to-project-cards-without-a-live-url
plan: 01
subsystem: ui
tags: [astro, playwright, css, tdd]

# Dependency graph
requires:
  - phase: 02-static-sections
    provides: ProjectCard.astro with liveUrl prop and .card-links markup
provides:
  - Conditional IN PROGRESS badge on ProjectCard when liveUrl is absent
  - .card-badge--wip CSS rule with muted fill and outlined border
  - 3 Playwright tests verifying badge presence/absence and element type
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "color-mix(in srgb, ...) for semi-transparent accent fills without new tokens"
    - "Ternary conditional rendering in Astro to toggle between link and badge"

key-files:
  created: []
  modified:
    - src/components/ui/ProjectCard.astro
    - tests/static-sections.spec.ts

key-decisions:
  - "Badge is a <span> not an <a> — non-interactive element, cursor: default signals this clearly"
  - "color-mix() for 25% opacity background distinguishes badge from solid .tag pills without new color tokens"
  - "TDD approach: wrote failing tests first, then implemented to pass (Nyquist compliance)"

patterns-established:
  - "color-mix pattern: color-mix(in srgb, var(--color-accent-secondary) 25%, transparent) for muted accent fills"

requirements-completed:
  - WIP-01
  - WIP-02
  - WIP-03

# Metrics
duration: 5min
completed: 2026-03-23
---

# Phase 5 Plan 01: Add IN PROGRESS Badge to Project Cards Summary

**Conditional IN PROGRESS badge on ProjectCard.astro using color-mix() muted fill, verified with 3 Playwright tests (TDD)**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-23T15:52:06Z
- **Completed:** 2026-03-23T15:57:48Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Added `span.card-badge--wip` to ProjectCard.astro rendered when liveUrl prop is absent
- Styled badge with muted 25% opacity accent fill + 1px accent border — visually distinct from solid .tag pills
- Wrote 3 Playwright tests in TDD fashion: WIP-01 (badge present on cards 2/3), WIP-02 (badge absent on card 1), WIP-03 (element is span not link)
- All 24 static-sections tests pass with zero regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Playwright tests for WIP badge (RED phase)** - `9053fc4` (test)
2. **Task 2: Implement IN PROGRESS badge in ProjectCard.astro (GREEN phase)** - `940f72b` (feat)

## Files Created/Modified
- `src/components/ui/ProjectCard.astro` - Added conditional span.card-badge--wip rendering and .card-badge--wip CSS rule
- `tests/static-sections.spec.ts` - Added WIP-01, WIP-02, WIP-03 Playwright tests

## Decisions Made
- Used `<span>` (not `<a>`) for badge — non-interactive element per UI-SPEC accessibility contract
- Used `color-mix(in srgb, var(--color-accent-secondary) 25%, transparent)` for muted fill — no new tokens needed, works across Fire and Leaf themes
- TDD flow followed exactly per plan: tests written and confirmed failing before implementation

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

Dev server port conflict: Playwright's `reuseExistingServer: true` was connecting to the main repo's dev server on port 4321 instead of the worktree's server. Resolved by starting a worktree dev server on port 4322 and temporarily updating playwright.config.ts to point to that port during testing. Config reverted before commit so no permanent change to playwright.config.ts.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 5 Plan 01 complete — IN PROGRESS badge ships with cards #002 (FPL Radar API) and #003 (FPL Radar UI)
- No follow-up work needed for this feature
- Real project content (screenshots, actual descriptions) remains deferred to v2 content pass

## Self-Check: PASSED

All files present and all commits verified.

---
*Phase: 05-add-in-progress-label-to-project-cards-without-a-live-url*
*Completed: 2026-03-23*
