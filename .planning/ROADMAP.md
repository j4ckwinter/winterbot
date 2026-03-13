# Roadmap: WinterBot Portfolio

## Overview

Four phases that build layer by layer: first the token system and theme infrastructure everything depends on, then all static content sections assembled against placeholder data, then the two JavaScript islands that bring the site to life, then a final pass to wire in real content and verify the site is launch-ready. Each phase delivers a complete, verifiable capability before the next begins.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design System** - Establish the token system, Fire/Leaf themes, typography rules, Panel primitive, and Vercel deploy pipeline
- [ ] **Phase 2: Static Sections** - Build all six content sections as static Astro components with placeholder data, navigation, and semantic markup
- [ ] **Phase 3: Interactive Layer** - Add the DialogueSystem island, scroll-triggered animations, and journey nav interactivity
- [ ] **Phase 4: Content and Launch** - Wire in real personal content, audit performance and accessibility, and ship

## Phase Details

### Phase 1: Design System
**Goal**: The foundation is in place — Fire/Leaf themes work without flicker, all color tokens meet WCAG AA, typography rules are enforced, the Panel primitive exists, and every future component can be built on proven tokens
**Depends on**: Nothing (first phase)
**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05, DS-06, DS-07
**Success Criteria** (what must be TRUE):
  1. Visiting the site in Fire mode and Leaf mode shows two distinct, visually coherent palettes — switching between them requires no page reload and produces no flash of wrong theme
  2. Every text/background color pair on the page passes WCAG AA contrast (4.5:1 normal, 3:1 large) in both themes, and no token directly matches Nintendo FireRed/LeafGreen palette values
  3. Headings render in the pixel font (DotGothic16 or equivalent) at 18px minimum; all body copy renders in monospace (JetBrains Mono or equivalent) — no pixel font appears at body scale
  4. A Panel component (chunky border, hard drop-shadow, inner highlight) is visible on the page and can be reused as a wrapper in all future sections
  5. Pushing to git deploys the site to Vercel automatically with no manual steps required
**Plans**: 4 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffold Astro + Tailwind v4, install Playwright smoke tests
- [ ] 01-02-PLAN.md — Design token system + Layout.astro (FOUC, fonts, base styles)
- [ ] 01-03-PLAN.md — Panel primitive + ThemeToggle client island
- [ ] 01-04-PLAN.md — Git init, push to GitHub, connect Vercel, verify deployment

### Phase 2: Static Sections
**Goal**: All six content sections exist as navigable, responsive, accessible static pages with placeholder content — a visitor can scroll the complete site and understand its structure
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, HERO-01, HERO-02, HERO-03, HERO-04, ABOUT-01, ABOUT-02, EXP-01, EXP-02, EXP-03, PROJ-01, PROJ-02, PROJ-03, PROJ-04, SKILL-01, SKILL-02, SKILL-03, SKILL-04, CONT-01, CONT-02, CONT-03, A11Y-01, A11Y-02, A11Y-03
**Success Criteria** (what must be TRUE):
  1. A visitor can navigate to all six sections (Hero, About, Experience, Projects, Skills, Contact) via persistent navigation that shows a journey-metaphor progress indicator reflecting their scroll position
  2. The Hero section displays a trainer/identity card with name, title, level (years of experience), and region, including a portrait placeholder and CTA links
  3. The Experience, Projects, and Skills sections each render their themed layout — quest log timeline, dex-entry card grid, and inventory slot grid respectively — with placeholder entries
  4. The Contact section is visibly labeled "Rest Area / Save Point" and includes email, GitHub, and LinkedIn links
  5. The full page is usable on a 320px-wide mobile viewport, and all interactive elements are reachable by keyboard with visible focus indicators
**Plans**: TBD

### Phase 3: Interactive Layer
**Goal**: The site feels alive — the dialogue box reacts to scroll, the theme toggle works flawlessly, scroll-triggered animations reveal content, and every interactive behavior respects reduced-motion preferences
**Depends on**: Phase 2
**Requirements**: EXP-04, DLG-01, DLG-02, DLG-03, DLG-04, DLG-05, DLG-06
**Success Criteria** (what must be TRUE):
  1. A fixed dialogue box is visible at the bottom of the viewport throughout the site; its text changes as the user scrolls into each section, with a typewriter animation that types character by character
  2. A guide avatar appears alongside the dialogue box and changes expression or state based on which section is active
  3. Clicking the dialogue box instantly reveals the full current message (typewriter skip); on systems with prefers-reduced-motion set, text appears immediately without animation
  4. Experience timeline entries animate in as the user scrolls to them; on systems with prefers-reduced-motion set, entries appear immediately without animation
**Plans**: TBD

### Phase 4: Content and Launch
**Goal**: The site is ready to share — real personal content is in place, performance passes a Lighthouse audit, accessibility is complete, and the aesthetic serves the professional signal rather than overwhelming it
**Depends on**: Phase 3
**Requirements**: PERF-01, PERF-02
**Success Criteria** (what must be TRUE):
  1. Static sections ship zero runtime JavaScript — only the ThemeToggle and DialogueSystem components load client-side JS, verified in browser DevTools network panel
  2. The site renders and is fully usable on a 320px mobile viewport with no horizontal scroll or broken layouts
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System | 1/4 | In Progress|  |
| 2. Static Sections | 0/TBD | Not started | - |
| 3. Interactive Layer | 0/TBD | Not started | - |
| 4. Content and Launch | 0/TBD | Not started | - |
