---
phase: 02-static-sections
plan: 01
subsystem: testing
tags: [playwright, astro-icon, iconify, css, smooth-scroll, tdd]

# Dependency graph
requires:
  - phase: 01-design-system
    provides: Panel component, global.css tokens, playwright.config.ts baseline

provides:
  - astro-icon integration registered in astro.config.mjs
  - "@iconify-json/devicon and @iconify-json/simple-icons installed"
  - 21 failing Playwright stubs covering all 21 automated Phase 2 requirements
  - smooth scroll in global.css with prefers-reduced-motion override

affects:
  - 02-static-sections (Plans 02-05 make the stubs green)
  - 03-interactive-islands (icon infrastructure available for Skills island)

# Tech tracking
tech-stack:
  added:
    - astro-icon@1.1.5 (Astro integration for SVG icon components)
    - "@iconify-json/devicon@1.2.60 (developer/language icon pack)"
    - "@iconify-json/simple-icons@1.2.73 (brand/service icon pack)"
  patterns:
    - Nyquist compliance: write intentionally-failing stubs before building features
    - Use test ID prefix (NAV-01, HERO-01, etc.) in test title string for --grep targeting

key-files:
  created:
    - tests/static-sections.spec.ts
  modified:
    - astro.config.mjs (icon() integration added)
    - package.json (3 new dependencies)
    - src/styles/global.css (smooth scroll added)

key-decisions:
  - "astro-icon auto-registered via npx astro add — no manual config needed"
  - "21 stubs intentionally red — sections don't exist yet; RED is correct state"
  - "scroll-behavior: smooth on html selector; prefers-reduced-motion override disables it"

patterns-established:
  - "Nyquist pattern: one failing stub per requirement ID before implementing sections"
  - "Test titles include requirement IDs (e.g., NAV-01) enabling --grep filtering during debug"

requirements-completed: [NAV-01, NAV-02, HERO-01, HERO-02, HERO-03, HERO-04, ABOUT-01, ABOUT-02, EXP-01, EXP-02, EXP-03, PROJ-01, PROJ-02, PROJ-04, SKILL-01, SKILL-02, SKILL-03, CONT-01, CONT-02, A11Y-01, A11Y-03]

# Metrics
duration: 12min
completed: 2026-03-14
---

# Phase 2 Plan 01: Static Sections Infrastructure Summary

**astro-icon + @iconify-json icon packs installed, 21 intentionally-failing Playwright stubs written for all Phase 2 requirements, smooth scroll added to global.css**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-03-14T00:37:00Z
- **Completed:** 2026-03-14T00:49:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Installed astro-icon@1.1.5 via `npx astro add astro-icon` — integration auto-registered in astro.config.mjs
- Installed @iconify-json/devicon and @iconify-json/simple-icons for Skills section icon rendering
- Created tests/static-sections.spec.ts with 21 failing stubs covering NAV-01/02, HERO-01-04, ABOUT-01/02, EXP-01-03, PROJ-01/02/04, SKILL-01-03, CONT-01/02, A11Y-01/03
- Added scroll-behavior: smooth to html in global.css with prefers-reduced-motion: reduce override
- npm run build exits 0 after integration install

## Task Commits

Each task was committed atomically:

1. **Task 1: Install astro-icon and icon packs** - `a1ee731` (chore)
2. **Task 2: Write failing Playwright stubs + add smooth scroll** - `d75f9ed` (test)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified
- `tests/static-sections.spec.ts` - 21 failing Playwright stubs, one per Phase 2 requirement ID
- `astro.config.mjs` - icon() integration registered in integrations array
- `package.json` - astro-icon, @iconify-json/devicon, @iconify-json/simple-icons added
- `src/styles/global.css` - scroll-behavior: smooth with prefers-reduced-motion override

## Decisions Made
- Used `npx astro add astro-icon --yes` to auto-configure integration (no manual astro.config.mjs edit needed)
- Test stubs fail on page.goto('/') because sections don't exist yet — this is correct RED state
- Smooth scroll placed before @theme block to ensure proper CSS cascade

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed SyntaxError: await inside non-async .catch() callback**
- **Found during:** Task 2 (running Playwright stubs for first time)
- **Issue:** Two tests used `await` inside a `.catch()` arrow function that was not declared async, causing a parse error
- **Fix:** Replaced `.catch()` pattern with a direct `await count()` + `expect(count).toBeGreaterThanOrEqual(2)` pattern
- **Files modified:** tests/static-sections.spec.ts
- **Verification:** Tests parsed successfully and all 21 stubs failed as expected
- **Committed in:** d75f9ed (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 syntax bug)
**Impact on plan:** Syntax fix was necessary for tests to parse. No scope creep. All 21 stubs remain intentionally red.

## Issues Encountered
- Playwright `.catch()` syntax for "at least N" count assertions doesn't support `await` in non-async arrow functions; replaced with simpler direct await pattern.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Icon infrastructure ready for Skills section (astro-icon + devicon + simple-icons)
- 21 failing stubs define the exact acceptance criteria for Plans 02-05
- Each plan in Phase 2 should target its requirement IDs via `--grep "NAV-01"` for fast feedback
- build remains green; no regressions from new integration

---
*Phase: 02-static-sections*
*Completed: 2026-03-14*
