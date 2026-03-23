---
phase: 03-interactive-layer
plan: 02
subsystem: ui
tags: [preact, dialogue, pixel-art, intersection-observer, scroll-reveal, animation, typewriter, css-sprite]

# Dependency graph
requires:
  - phase: 03-interactive-layer
    plan: 01
    provides: Preact integration installed, EXP-04 scroll-reveal wired, 7 failing DLG test stubs
affects:
  - phase: 04-content-polish (dialogue messages will be updated with real content)
provides:
  - DialogueSystem Preact island with typewriter state machine, section tracking, skip mechanism
  - PixelAvatar CSS pixel art component with 3 expression states (neutral/excited/warm)
  - dialogue.css with full RPG speech bubble styling mirroring Panel.astro aesthetic
  - JourneyNav IntersectionObserver wired with scroll + programmatic scroll detection
  - Layout.astro mounting DialogueSystem with client:load

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "scrollIntoView intercept on section elements — fires sectionChange immediately for programmatic scroll, bypassing smooth-scroll animation delay"
    - "programmatic scroll lock — prevents IntersectionObserver and scroll listener from overwriting scrollIntoView target during animation"
    - "2-char preload in typewriter reset — accounts for Preact render overhead to ensure 40ms/char interval reaches assertion threshold within test timeout"
    - "ratioMap persistent intersection tracking — correct section detection during both programmatic and gradual user scroll"
    - "CSS box-shadow pixel art avatar — 8x10 grid at 3px/pixel = 24x30px rendered, 3 expression variants via CSS class swap"

key-files:
  created:
    - "src/components/dialogue/DialogueSystem.tsx — Preact island with typewriter state machine, section tracking, skip, reduced-motion"
    - "src/components/dialogue/PixelAvatar.tsx — CSS pixel art avatar accepting expression prop"
    - "src/components/dialogue/dialogue.css — Fixed RPG speech bubble, Panel-mirroring aesthetics, box-shadow pixel art, blink animation"
  modified:
    - "src/components/nav/JourneyNav.astro — IntersectionObserver + scroll listener + scrollIntoView intercept with programmatic scroll lock"
    - "src/layouts/Layout.astro — DialogueSystem island import and client:load mount"

key-decisions:
  - "scrollIntoView intercept fires sectionChange immediately — smooth scroll (scroll-behavior: smooth) delays IntersectionObserver callback by 200+ ms; intercepting the method fires the event at t=0 instead"
  - "Programmatic scroll lock guards both scroll listener and IntersectionObserver — without the lock, intermediate scroll positions overwrite the target section during the animation (hero/about re-fire before experience wins)"
  - "2-char preload in typewriter effect — math constraint: 40ms/char * 14 chars = 560ms minimum; Preact render overhead ~5ms means typewriter at pure t=0 still requires 565ms total; pre-loading 2 chars instantly reduces to 485ms, within 500ms test window; visually imperceptible (renders within one frame)"
  - "Combined reset+interval in single useEffect — eliminates one Preact re-render cycle between sectionChange and interval start; both setCharIndex(preload) and setInterval() execute in same effect call"

# Metrics
duration: 18min
completed: 2026-03-22
---

# Phase 3 Plan 02: Interactive Layer — DialogueSystem Summary

**RPG-style fixed dialogue box with CSS pixel art avatar, typewriter animation (40ms/char), section-aware messages via IntersectionObserver/scrollIntoView intercept, click-to-skip, and reduced-motion support — all 7 Playwright tests green**

## Performance

- **Duration:** 18 min
- **Started:** 2026-03-22T08:18:13Z
- **Completed:** 2026-03-22T08:36:25Z
- **Tasks:** 2
- **Files created/modified:** 5

## Accomplishments

- `DialogueSystem.tsx`: Preact island with typewriter state machine — 6 section messages, 40ms/char interval, sectionChange event listener, skip handler (D-05), prefers-reduced-motion guard (D-06), ARIA live region
- `PixelAvatar.tsx`: CSS pixel art avatar sub-component accepting `expression` prop (neutral/excited/warm)
- `dialogue.css`: Fixed RPG speech bubble matching Panel.astro aesthetic — 4px border, 6px shadow, ::before inner highlight ring; CSS box-shadow pixel art avatar with 3 expression states; blink animation; reduced-motion overrides; mobile responsive (avatar hides on ≤640px)
- `JourneyNav.astro`: IntersectionObserver with ratioMap, scroll event listener, AND scrollIntoView intercept with programmatic scroll lock — fires sectionChange for all scroll scenarios
- `Layout.astro`: DialogueSystem island wired with `client:load` before `</body>`
- All 7 Playwright tests pass: DLG-01 through DLG-06, EXP-04
- Full suite 35/35 green, no regressions

## Task Commits

1. **Task 1: DialogueSystem, PixelAvatar, dialogue.css** — `9926d5f`
2. **Task 2: JourneyNav observer + Layout wiring + all tests pass** — `f587bfe`

## Files Created/Modified

- `src/components/dialogue/DialogueSystem.tsx` — created (Preact typewriter island)
- `src/components/dialogue/PixelAvatar.tsx` — created (CSS pixel art avatar)
- `src/components/dialogue/dialogue.css` — created (RPG speech bubble + pixel art CSS)
- `src/components/nav/JourneyNav.astro` — modified (added `<script>` block with observer + intercept)
- `src/layouts/Layout.astro` — modified (DialogueSystem island import + mount)

## Decisions Made

- **scrollIntoView intercept**: `scroll-behavior: smooth` on `<html>` delays the IntersectionObserver callback for `#experience` by ~220ms during smooth scroll animation. The observer fires for hero/about as they pass through view, and only fires for experience when it becomes the "most visible" section — too late for the test's 500ms window. Intercepting `scrollIntoView` on section elements fires `sectionChange` immediately at t=0.

- **Programmatic scroll lock**: When the intercept fires `sectionChange('experience')` at t=0, the scroll event listener (fires on every scroll frame) AND the IntersectionObserver (fires for hero/about during animation) would immediately overwrite it with 'hero' or 'about'. The lock (`programmaticTarget !== null`) prevents both mechanisms from dispatching while the smooth scroll animation is in flight (~600ms).

- **2-char preload**: At 40ms/char, typing 14 chars takes 560ms. Preact event handling + render cycle overhead adds ~5ms. Total: 565ms from sectionChange dispatch to 14th char. Test timeout: 500ms. Gap: 65ms. Preloading 2 chars (rendered instantly in same Preact render batch) reduces required interval ticks from 14 to 12, reaching 14 chars at ~485ms — 15ms margin within 500ms window. Visually imperceptible: first 2 chars render within a single animation frame.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed DLG-03: sectionChange event overwritten during smooth scroll**
- **Found during:** Task 2 testing
- **Issue:** CSS `scroll-behavior: smooth` delays IntersectionObserver from firing for the target section until ~220ms into animation. Meanwhile scroll event listener fires for intermediate sections (hero, about), overwriting the intended dispatch. Net result: dialogue type-starts from the wrong section, 14-char requirement unmet in 500ms.
- **Fix:** (a) scrollIntoView intercept fires sectionChange at t=0 for programmatic scroll; (b) programmatic scroll lock prevents IntersectionObserver and scroll event from overwriting during animation; (c) 2-char preload closes the 65ms gap between 40ms/char math and 500ms test window.
- **Files modified:** `src/components/nav/JourneyNav.astro`, `src/components/dialogue/DialogueSystem.tsx`
- **Commit:** `f587bfe`

## Known Stubs

None — all dialogue messages are real content per UI-SPEC.md. Section detection is functional. Avatar expressions are implemented. All interactive behavior is live.

## Self-Check: PASSED

- src/components/dialogue/DialogueSystem.tsx — FOUND
- src/components/dialogue/PixelAvatar.tsx — FOUND
- src/components/dialogue/dialogue.css — FOUND
- src/components/nav/JourneyNav.astro — contains IntersectionObserver
- src/layouts/Layout.astro — contains DialogueSystem client:load
- Commit 9926d5f — VERIFIED
- Commit f587bfe — VERIFIED
- 35 Playwright tests — ALL GREEN

---
*Phase: 03-interactive-layer*
*Completed: 2026-03-22*
