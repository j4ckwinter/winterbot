# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-22
**Phases:** 4 | **Plans:** 14 | **Tasks:** 26

### What Was Built

- GBA-inspired retro portfolio site: Fire/Leaf dual-theme, Panel primitive, DotGothic16 pixel font, JetBrains Mono body
- Six themed content sections: trainer card hero, origin-story about, quest log timeline, dex-entry card grid, inventory skill slots, rest area contact
- Two interactive Preact islands: ThemeToggle (localStorage, FOUC-prevention) and DialogueSystem (typewriter, avatar expressions, section-aware messages, click-to-skip, reduced-motion)
- IntersectionObserver-powered scroll reveal (EXP-04) and JourneyNav progress diamonds with programmatic scroll lock
- 40 Playwright tests across 4 suites — all green; PERF-01 (zero static JS) and PERF-02 (320px mobile) formally verified

### What Worked

- **Nyquist compliance (intentionally red tests):** Writing all tests before implementation caught real issues and created a tight acceptance contract. Zero tests needed rewriting. This pattern should persist in every phase.
- **Wave-based phase execution:** Building in dependency order (tokens → static → interactive → launch) meant each phase could use and trust what came before. No backtracking.
- **Tailwind v4 CSS-first:** No `tailwind.config.js` overhead — everything in `@theme` block. Cleaner than v3 and compatible with Astro's Vite plugin out of the box.
- **Linter-ahead-of-schedule:** The linter generated remaining section stubs in Phase 2 Plan 02 — accepted as complete with no rework needed. High leverage on AI-assisted scaffolding.
- **FOUC-prevention pattern:** `is:inline` blocking script reads `localStorage` and sets `data-theme` before first paint. Zero flicker on theme toggle across both modes.

### What Was Inefficient

- **DS-07 deferred:** GitHub push and Vercel connection were deferred by user decision in Phase 1. This left "deployed to Vercel" unclosed until the end of the project. Would be cleaner to block the milestone on this or explicitly accept it as a known gap in the phase summary.
- **Phase 2 had 6 plans vs. 5 specified:** A sixth plan (02-06) was created for a minor hover animation fix. This could have been absorbed into an existing plan with less ceremony.
- **Box-shadow scrollWidth discovery was late:** The PERF-02 failure (scrollWidth=335 at 320px due to box-shadow offsets) was discovered only in Phase 4. Earlier mobile testing would have caught it sooner.

### Patterns Established

- **Tailwind v4:** All design tokens in `src/styles/global.css` @theme block. `[data-theme=leaf]` uses CSS var reassignment, no separate Tailwind layer needed.
- **FOUC guard:** `is:inline` script in `<head>` reads `localStorage.theme`, sets `document.documentElement.setAttribute('data-theme', ...)` before first paint.
- **`overflow-x: clip` on `html` AND `body`:** Not just `body` — fixed-position elements (`.dialogue-system`) contribute to `html.scrollWidth`. Use `clip` not `hidden` to avoid creating a new scroll container.
- **IntersectionObserver with programmatic scroll lock:** Guards both the observer and scroll event listener during smooth-scroll animation to prevent section detection from overwriting the target.
- **2-char typewriter preload:** Prepopulates 2 chars before starting interval to close timing gap between 40ms/char math and the 500ms Playwright assertion window.
- **CSS-only tooltips:** `data-tooltip` attribute + `::before` pseudo-element — no JS required for hover/focus tooltips in skill slots.

### Key Lessons

1. **Write tests before implementation (Nyquist).** The intentionally-red test pattern works. Don't skip it even for small plans.
2. **Ship `overflow-x: clip` on `html` early** in any project with fixed-position elements and box-shadows. It's invisible when it works, painful to debug when it doesn't.
3. **Preact over vanilla JS for multi-state islands.** Even small interactive components benefit from Preact's state model — the typewriter/avatar state machine would have been messy in vanilla.
4. **`is:inline` for FOUC-critical scripts.** Astro's regular `<script>` tag is bundled as ESM; only `is:inline` executes synchronously before first paint.

### Cost Observations

- Model mix: ~100% Sonnet (balanced profile)
- Sessions: ~5-6 sessions across 10 days (2026-03-13 → 2026-03-22)
- Notable: Phase 2 was the heaviest phase (6 plans, most component work). Phases 3 and 4 were lean and fast — the design system investment paid off in later phases.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | ~6 | 4 | First milestone — baseline established |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.0 | 40 | Requirements-traced (41/41) | 0 |

### Top Lessons (Verified Across Milestones)

1. Nyquist compliance (write tests red before implementation) prevents acceptance drift
2. Design system first — token investment pays dividends in every subsequent phase
