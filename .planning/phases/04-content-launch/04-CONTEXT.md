# Phase 4 Context: Content and Launch

**Phase:** 04 — Content and Launch
**Created:** 2026-03-22
**Status:** Ready for research/planning

---

## Phase Goal

The site is ready to share — real personal content is in place, performance passes a Lighthouse audit, accessibility is complete, and the aesthetic serves the professional signal rather than overwhelming it.

**Requirements in scope:** PERF-01, PERF-02

---

## Decisions

### Content ownership
All copy (bio, experience entries, project descriptions, contact links) is owned by Jack and will be filled in manually. The agent's job is to ensure the structure is ready to receive real data — correct placeholder shapes, no hardcoded dummy strings that would ship. Do not generate or suggest copy.

### Experience section
- 3 roles
- Structure per entry: company name, role title, date range, 3–5 achievement bullet points
- Existing `ExperienceSection.astro` has the right shape — verify 3 entries exist with correct semantic structure

### Projects section
- 3 cards
- Jack will add real project names, descriptions, tech tags, GitHub and live URLs manually
- Agent ensures `ProjectCard.astro` renders correctly at all breakpoints and that both link slots (GitHub + Live) are present and functional when populated

### Skills tab filtering
- 4 categories: ALL / FRONTEND / BACKEND / TOOLS — correct, no changes
- 12 skill slots — correct count
- **Gap:** Tab click currently does not filter visible slots — this needs to be implemented
- Implementation: clicking a tab should show only slots matching that category; ALL shows everything
- Use data attributes on skill slots for category membership; tab click handler updates visibility
- Must be Astro-compatible (no Preact island needed — plain `<script>` in `SkillsSection.astro`)

### PERF-01 verification
- Requirement: static sections ship zero runtime JavaScript; only ThemeToggle and DialogueSystem load client-side JS
- Verification: Playwright test asserting no unexpected `<script>` tags in the rendered HTML outside of the two known islands
- No bundle size CI enforcement needed

### PERF-02 verification
- Requirement: site is fully usable on 320px mobile viewport with no horizontal scroll or broken layouts
- Verification: Playwright test at 320px viewport width asserting `document.documentElement.scrollWidth <= 320`
- Check that JourneyNav sidebar, dialogue box fixed footer, and section content do not overlap or overflow
- No additional breakpoint targets beyond 320px minimum

### Deployment
- Out of scope for Phase 4
- DS-07 (GitHub → Vercel) was deferred and remains deferred

---

## Code Context

### Files the agent should read
- `src/components/sections/SkillsSection.astro` — tab filtering needs implementation here
- `src/components/sections/ExperienceSection.astro` — verify 3-entry structure
- `src/components/ui/ProjectCard.astro` — verify both link slots exist
- `src/styles/global.css` — any mobile layout rules that may need adjustment
- `tests/` — existing Playwright tests to understand patterns before adding new ones

### Known patterns
- Interactive client-side behavior in Astro static components uses a plain `<script>` block (not Preact island) — see `ThemeToggle.astro` and `JourneyNav.astro` for reference
- Playwright tests live in `tests/` with `@playwright/test`; dev server runs on port 4321
- `playwright.config.ts` controls baseURL and viewport defaults

### Mobile layout risks
- `JourneyNav` is a fixed sidebar — may need to collapse or reposition at 320px
- `DialogueSystem` dialogue box is fixed at bottom — competes with content at narrow widths
- `SkillsSection` tab bar with 4 buttons may overflow on narrow viewports

---

## Deferred (not Phase 4)
- OpenGraph / social preview cards (v2 ENH-05)
- Contact form backend (v2 ENH-04)
- Analytics
- Custom domain / Vercel connection (DS-07)
