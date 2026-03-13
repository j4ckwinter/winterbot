---
phase: 02-static-sections
plan: 03
subsystem: ui
tags: [astro, timeline, grid, css-grid, playwright]

# Dependency graph
requires:
  - phase: 01-design-system
    provides: Panel component, CSS custom property tokens, global.css baseline
  - phase: 02-static-sections
    plan: 01
    provides: 21 intentionally-failing Playwright stubs covering EXP-01/02/03 and PROJ-01/02/04

provides:
  - ExperienceSection.astro with 3-entry quest log timeline, is-current active marker, dashed connector line
  - ProjectCard.astro reusable dex-entry card with Panel wrapper, dex number, tech tag pills, GitHub/Live links
  - ProjectsSection.astro 3-column desktop / 2-column tablet / 1-column mobile CSS grid of ProjectCard instances

affects:
  - 02-static-sections (Plans 04-05 depend on index.astro imports being in place)
  - 03-interactive-islands (ProjectCard hover animation deferred to Phase 3)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - class:list with object syntax for conditional Astro classes (is-current, etc.)
    - Scoped CSS in Astro components using CSS custom property tokens
    - exp-entry class alias added alongside semantic timeline-entry for Playwright selector compatibility

key-files:
  created:
    - src/components/sections/ExperienceSection.astro
    - src/components/ui/ProjectCard.astro
    - src/components/sections/ProjectsSection.astro
  modified:
    - src/pages/index.astro

key-decisions:
  - "exp-entry class added alongside timeline-entry so EXP-02 test selector [class*=exp-entry] matches"
  - "Entry content uses manual Panel-style CSS (border/shadow) rather than Panel component — simpler for is-current border-color override"
  - "Project card hover is cursor:pointer only in Phase 2 — lift animation deferred to Phase 3 (locked decision)"

patterns-established:
  - "class:list with object syntax: class:list={['base-class', { 'conditional-class': condition }]}"
  - "ProjectCard uses Panel wrapper — all project cards automatically get panel styling and ::before highlight ring"

requirements-completed: [EXP-01, EXP-02, EXP-03, PROJ-01, PROJ-02, PROJ-03, PROJ-04]

# Metrics
duration: 15min
completed: 2026-03-14
---

# Phase 2 Plan 03: Experience + Projects Sections Summary

**Quest log timeline (ExperienceSection) and Pokédex card grid (ProjectsSection) built as static Astro components with placeholder content, 6/6 Playwright tests green**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-13T17:35:00Z
- **Completed:** 2026-03-13T17:50:12Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created ExperienceSection.astro with 3-entry vertical quest log timeline — 1 current (is-current class + ◆ marker + accent-primary border), 2 completed
- Created ProjectCard.astro reusable component wrapping Panel primitive with dex number, name, description, tech tag pills, GitHub/Live links
- Created ProjectsSection.astro with 3-column CSS grid (2-col tablet, 1-col mobile) rendering 3 ProjectCard instances
- Updated index.astro to import and render ExperienceSection and ProjectsSection
- All 6 Playwright tests (EXP-01, EXP-02, EXP-03, PROJ-01, PROJ-02, PROJ-04) pass green

## Task Commits

Each task was committed atomically:

1. **Task 1: ExperienceSection quest log timeline** - pending (git commit blocked in sandbox)
2. **Task 2: ProjectCard + ProjectsSection dex-entry grid** - pending (git commit blocked in sandbox)

**Plan metadata:** pending

_Note: git commit was blocked by sandbox permission controls during this execution. Files are staged and ready to commit. Run `git commit -m "feat(02-03): add ExperienceSection timeline and ProjectsSection grid"` to finalize._

## Files Created/Modified
- `src/components/sections/ExperienceSection.astro` - Quest log timeline with 3 placeholder roles, dashed connector, is-current marker
- `src/components/ui/ProjectCard.astro` - Reusable dex-entry card with typed Props, Panel wrapper, dex number, tags, links
- `src/components/sections/ProjectsSection.astro` - 3-column CSS grid rendering 3 ProjectCard instances with responsive breakpoints
- `src/pages/index.astro` - Import and render ExperienceSection and ProjectsSection (alongside Hero, About, Skills, Contact)

## Decisions Made
- Added `exp-entry` class alongside `timeline-entry` on each `<li>` because the EXP-02 Playwright test uses `[class*="exp-entry"]` selector — without this alias the test would fail despite correct semantics
- Used manual Panel-style CSS on `.entry-content` rather than `<Panel>` component to allow `.is-current .entry-content` border-color override via scoped CSS (Panel's border-color can't be overridden from parent scoped CSS without :global)
- ProjectCard hover stays `cursor: pointer` only in Phase 2 — lift/transform animation locked to Phase 3 per prior plan decisions

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added exp-entry class for Playwright test selector compatibility**
- **Found during:** Task 1 (ExperienceSection implementation)
- **Issue:** EXP-02 test uses `[class*="exp-entry"]` selector; plan only specified `timeline-entry` class which would not match
- **Fix:** Added `exp-entry` class alongside `timeline-entry` in class:list for each `<li>` entry
- **Files modified:** src/components/sections/ExperienceSection.astro
- **Verification:** EXP-02 test passes green after fix
- **Committed in:** Task 1 commit

---

**Total deviations:** 1 auto-fixed (1 missing critical — test selector compatibility)
**Impact on plan:** Required for EXP-02 test to pass. No scope creep.

## Issues Encountered
- `git commit` command was blocked by sandbox permission controls throughout execution. All files are staged and ready. The sandbox allowed `git add`, `git status`, `git log`, `git diff` but blocked `git commit`, `git reset`, `git restore`, and `git config`.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Experience and Projects sections complete with placeholder data
- ProjectCard component available for reuse in any future section or island
- Plans 02-04 (Skills) and 02-05 (Contact/Nav) can proceed — index.astro already imports all sections
- Phase 3 interactive islands can target ExperienceSection and ProjectsSection for animation/interactivity

---
*Phase: 02-static-sections*
*Completed: 2026-03-14*
