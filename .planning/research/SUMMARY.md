# Project Research Summary

**Project:** WinterBot Portfolio
**Domain:** Retro-modern GBA-inspired personal portfolio site
**Researched:** 2026-03-13
**Confidence:** MEDIUM-HIGH

## Executive Summary

WinterBot is a single-page personal portfolio built with a GBA FireRed/LeafGreen aesthetic — trainer card hero, quest log experience timeline, project dex, inventory skills grid, and a persistent dialogue guide character. Experts build this kind of site as a fully static Astro output with only two JavaScript islands: a theme toggle and a dialogue/scroll system. Everything else — all content sections, navigation, panel primitives — is zero-JS static HTML styled with Tailwind v4 and CSS custom properties. This approach delivers excellent Core Web Vitals, near-instant Vercel deploys, and a clean separation between content data and presentation.

The recommended approach is a 4-phase build aligned to the dependency graph uncovered in architecture research: (1) design system foundation first — CSS tokens, Fire/Leaf themes, font rules, panel primitives; (2) all static content sections built against placeholder data; (3) interactive layer — dialogue system and journey nav; (4) polish — real content wiring, responsive audit, accessibility, performance. The critical insight is that Phase 1 is load-bearing for everything else: the theme system, font scale rules, contrast tokens, and IP-divergence color palette must be established before any component is built, or the cost of fixing them compounds across every component.

The primary risks are: FOUC (flash of wrong theme) if the theme init script is deferred rather than blocking; pixel font readability failures at body scale; contrast failures from the warm parchment/earthy palette; the aesthetic overwhelming the professional content signal; and Nintendo IP creep. All are preventable by baking the right constraints into Phase 1. The secondary risks are mobile breakage from the chunky-UI aesthetic and typewriter usability degradation for repeat visitors — both require mobile-first discipline and reduced-motion awareness from the start of each phase, not as a final pass.

---

## Key Findings

### Recommended Stack

The stack is deliberately minimal. Astro 5 (static output) handles the site with zero runtime JS by default — only the two interactive islands ship JavaScript. Tailwind v4 with its CSS-first `@theme {}` config is the right choice because design tokens automatically become CSS custom properties, making the Fire/Leaf theme toggle a pure CSS swap with no extra tooling. There is no component framework (no React/Vue/Svelte) — Astro components handle all UI, and the two islands (ThemeToggle, DialogueSystem) can use Preact or vanilla JS rather than full React to minimize bundle size.

See `.planning/research/STACK.md` for full rationale and dependency list.

**Core technologies:**
- **Astro 5** (static output): Zero-JS portfolio shell with island architecture — eliminates unnecessary JS by default
- **Tailwind CSS v4**: CSS-first `@theme {}` config; design tokens become CSS vars automatically; enables Fire/Leaf theme swap without extra tooling
- **CSS custom properties (native)**: Runtime theme layer; no library needed; `data-theme` attribute swap on `<html>` cascades all tokens
- **Astro Content Collections / `src/data/*.ts`**: TypeScript data modules for structured portfolio content — simpler than MDX content collections for arrays of typed objects
- **Vercel (static)**: Zero-config static hosting; no adapter needed for pure static output
- **Astro Icon + Iconify**: Build-time icon resolution; zero runtime icon JS; `@iconify-json/game-icons` for themed icons
- **Google Fonts CDN**: DotGothic16 (headings), Press Start 2P (accent), JetBrains Mono (body/code) — verify availability before committing

**Deliberately excluded:** React, Framer Motion, GSAP, next-themes, FontAwesome, AOS — all add overhead with no benefit on a static Astro site.

### Expected Features

See `.planning/research/FEATURES.md` for full feature table with complexity ratings and dependency graph.

**Must have (table stakes):**
- Hero / Trainer Card identity section — first thing every visitor needs
- Project showcase (Dex cards) — primary conversion goal
- Experience timeline (Quest Log) — establishes credibility
- Skills display (Inventory grid) — tech-fit scan target
- Contact / Save Point section — a dead-end portfolio ships nothing
- Navigation — entirely missing from prototype; journey metaphor nav required
- Mobile responsive layout — 50%+ of portfolio traffic is mobile
- Accessible markup — semantic HTML, ARIA landmarks, focus management (absent from prototype)
- Themed UI system with consistent tokens — broken tokens break the game-world illusion

**Should have (differentiators):**
- Fire/Leaf dual theme toggle — the most memorable single interaction
- Dialogue box with typewriter + scroll section awareness — makes the site feel alive
- Avatar guide character reacting to scroll
- Quest Log scroll-triggered reveal animations
- Journey metaphor navigation (path/progress indicator)
- Inventory skill grid with category tabs
- Section-specific biome backgrounds
- Dex entry numbering (`#001` style) on project cards

**Defer to v2+:**
- Real personal content (copy, screenshots, photo) — placeholder ships Phase 1
- Scroll-triggered entrance animations — Phase 2
- Journey nav (interactive) — Phase 2
- Inventory category tabs — Phase 2
- Any sound/audio toggle

### Architecture Approach

The architecture is a single-page scroll site with a static Astro shell and exactly two client-side islands. Static sections pass data downward from `index.astro` via props — no global store, no cross-component state. The only coupling between the `DialogueSystem` island and static sections is an agreed `id`/`data-section` HTML attribute. Content lives in `src/data/*.ts` TypeScript modules (not in component files), making placeholder-to-real-content swaps a data edit, not a component edit.

See `.planning/research/ARCHITECTURE.md` for full component boundary table, data flow diagrams, and file structure.

**Major components:**
1. **BaseLayout.astro** — HTML shell, blocking theme init script in `<head>`, font imports
2. **ThemeToggle.tsx** (Island: `client:load`) — reads/writes `data-theme` on `<html>` and persists to `localStorage`
3. **DialogueSystem.tsx** (Island: `client:load`) — IntersectionObserver scroll watcher, typewriter dialogue box, guide avatar
4. **Section components** (all static): HeroSection, AboutSection, ExperienceSection, ProjectsSection, SkillsSection, ContactSection
5. **UI primitives** (all static): TrainerCard, QuestItem, DexCard, InventorySlot, Panel (shared border/shadow wrapper), JourneyNav
6. **`src/data/*.ts`** — profile, experience, projects, skills, dialogue — all content lives here

### Critical Pitfalls

See `.planning/research/PITFALLS.md` for full prevention strategies and detection methods.

1. **Flash of wrong theme (FOUC)** — Prevent with a blocking `is:inline` script in `<head>` that reads `localStorage` and sets `data-theme` before first paint. Must be established in Phase 1 before any themed component exists.

2. **Pixel font readability failure** — Constrain DotGothic16/Press Start 2P to headings and decorative elements only (18px floor). Use JetBrains Mono for all body copy. Test on 1x (non-retina) display. Phase 1 design system decision.

3. **Contrast failures on warm palette** — The parchment/earthy GBA palette tends toward low contrast. Verify every color token pair meets WCAG AA before building any component. Phase 1 non-negotiable.

4. **Nintendo/Pokémon IP creep** — Establish explicit divergence rules at Phase 1: no direct game palette matches, banned terminology list (no "Pokédex," "HP," type names), banned asset list. Much harder to fix after components are built.

5. **Mobile layout breakage from chunky UI** — Build mobile-first; dial back border weights and shadow offsets for mobile viewports; dialogue box must be collapsible on mobile. Per-component discipline, not a final pass.

6. **Gimmick overwhelming content** — Aesthetic must not outweigh the professional signal. Apply a "content-first" audit at Phase 3 when real content goes in. Every interactive element must serve information delivery.

7. **Typewriter blocking repeat visitors** — Provide a skip interaction (click to complete). On repeat visits, detect via `localStorage` and start with text revealed. Respect `prefers-reduced-motion` from day one.

---

## Implications for Roadmap

Based on the dependency graph in ARCHITECTURE.md and pitfall phase mapping in PITFALLS.md, a 4-phase structure is strongly recommended. The ordering is dependency-driven, not arbitrary.

### Phase 1: Design System Foundation

**Rationale:** Everything else depends on the token system, theme infrastructure, and font rules. Building a component before the design system is finalized means rework across every component when tokens change. All Phase 1 critical pitfalls (FOUC, font readability, contrast, IP color divergence, font CLS) must be resolved here — they compound if deferred.

**Delivers:** Working Astro project with Tailwind v4 integrated; Fire/Leaf theme toggle functional and FOUC-free; established color token palette (verified for WCAG AA and IP divergence); typography scale with pixel font constraints documented; Panel primitive component; `src/data/*.ts` data file structure scaffolded; Vercel deploy pipeline live.

**Addresses:** Themed UI system (table stakes), theme toggle (differentiator)

**Avoids:** FOUC (Pitfall 2), pixel font readability (Pitfall 1), contrast failures (Pitfall 3), IP creep (Pitfall 5), font CLS (Pitfall 8), hard shadow clipping (Pitfall 13)

### Phase 2: Static Content Sections

**Rationale:** With the design system established, all content sections can be scaffolded in parallel. They are static Astro components with placeholder data — no interactivity needed. The architecture pattern (props-down from `index.astro`, data in `src/data/*.ts`) keeps each component independent. This phase validates that the design system tokens work at component scale and that the mobile layout holds for each section.

**Delivers:** All six page sections rendered with realistic placeholder content; mobile-responsive layout per section; semantic HTML and ARIA landmarks in place; full page assembled in `index.astro`; accessible navigation (JourneyNav static shell).

**Addresses:** Hero/Trainer Card, project showcase, experience timeline, skills grid, contact section, navigation, mobile layout, accessible markup (all table stakes)

**Avoids:** Placeholder content obscuring IA problems (Pitfall 12 — use realistic-length placeholders); mobile breakage from chunky UI (Pitfall 6 — mobile-first per component)

### Phase 3: Interactive Layer

**Rationale:** The two JavaScript islands (ThemeToggle, DialogueSystem) require Phase 2 section IDs and `data-section` attributes to exist before IntersectionObserver registration is meaningful. DialogueSystem is the most complex component in the project — isolating it to its own phase reduces risk. Journey nav interactivity (if added beyond static anchor links) also belongs here.

**Delivers:** Fully functional Fire/Leaf theme toggle; typewriter dialogue box with scroll-section awareness; guide avatar with CSS-driven reactions; scroll-triggered section entrance animations via IntersectionObserver; `prefers-reduced-motion` respected throughout; typewriter skip mechanism.

**Addresses:** Dialogue box + typewriter (differentiator), avatar guide (differentiator), scroll animations (differentiator), journey nav (differentiator)

**Avoids:** Typewriter blocking repeat visitors (Pitfall 7 — skip mechanism built in from day one); avatar scope creep (Pitfall 9 — cap at 5-6 states); Astro island overuse (Pitfall 10 — island budget established in Phase 1, maintained here); `prefers-reduced-motion` not respected (Pitfall 14)

### Phase 4: Content, Polish, and Launch Readiness

**Rationale:** Real content goes in last, after the structure is proven. This phase also covers the accessibility audit, performance audit, and the "gimmick vs. content" balance check that can only be made with real content in place. Deferring real content to Phase 4 eliminates the blocker of "waiting for copy" in earlier phases.

**Delivers:** Real personal content (bio, project screenshots, actual experience entries, real skills list); full accessibility audit (keyboard nav, ARIA, focus indicators); Lighthouse performance pass (CLS, font optimization, image optimization); "content-first" balance audit; launch.

**Addresses:** Real content wiring, performance, accessibility completeness, content hierarchy validation

**Avoids:** Gimmick overwhelming content (Pitfall 4 — content-first audit here); placeholder obscuring IA issues (Pitfall 12 — real content reveals fit problems)

### Phase Ordering Rationale

- Design system before components: token changes at Phase 1 cost 1 hour; token changes after Phase 2 cost a day across all components
- Static sections before interactive layer: DialogueSystem needs section `id` attributes and `data-section` registration points to exist before the IntersectionObserver can be configured correctly
- Content last: placeholder data allows parallel progress in Phases 1-3 without blocking on copy; real content reveals IA fit problems only solvable after structure is proven
- Mobile-first is a per-phase discipline, not a Phase 4 pass — each phase builds responsively, not responsiveness-retrofitted

### Research Flags

Phases likely needing deeper `/gsd:research-phase` investigation during planning:

- **Phase 3 (Interactive Layer):** DialogueSystem architecture has implementation choices (Preact vs vanilla JS island, typewriter cancel/restart logic, IntersectionObserver threshold tuning) that benefit from a focused implementation research pass before writing code.
- **Phase 4 (Content Polish):** Font self-hosting vs CDN decision for DotGothic16 depends on measured CLS in Phase 2 — defer this decision to Phase 4 when real render data is available.

Phases with standard patterns (skip research-phase):

- **Phase 1 (Design System):** Tailwind v4 CSS-first config + CSS custom property theming + Astro static setup are extremely well-documented. Straightforward implementation.
- **Phase 2 (Static Sections):** Static Astro component composition with typed data files is canonical, low-risk pattern. No unknowns.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Tailwind v4 confirmed HIGH via official blog. Astro 5 MEDIUM — directionally correct, patch version needs `npm view astro version` verification before init. Font availability MEDIUM — verify at fonts.google.com. `astro-icon` Astro 5 compat MEDIUM — check `npm view astro-icon version`. |
| Features | MEDIUM | Derived from prototype analysis (HIGH confidence) + portfolio domain conventions (MEDIUM). No external source verification this session. Feature priority recommendations are well-grounded in established portfolio UX patterns. |
| Architecture | HIGH | Island architecture, static-first, CSS-theming patterns are well-established Astro conventions. Grounded in direct `inspiration.html` prototype analysis. Flash-of-wrong-theme `is:inline` technique is HIGH confidence from Astro docs knowledge as of training. |
| Pitfalls | MEDIUM-HIGH | WCAG contrast, Core Web Vitals CLS, CSS clipping behavior, `prefers-reduced-motion` interaction with IntersectionObserver — HIGH confidence from spec knowledge. Nintendo IP enforcement posture MEDIUM from public record. Font loading on non-retina displays MEDIUM from community patterns. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Astro 5 exact version + `astro-icon` compatibility**: Run `npm view astro version` and `npm view astro-icon version` at project init. Resolve before Phase 1 begins.
- **Google Fonts availability**: Verify DotGothic16, Press Start 2P, JetBrains Mono at fonts.google.com before Phase 1 font scale decision.
- **Tailwind v4 + Astro integration path**: Official Astro docs may have a dedicated Tailwind v4 integration guide by now — check during Phase 1 setup to confirm the `@tailwindcss/postcss` approach is still canonical.
- **Font CLS severity**: Can only be measured with a real build. Run Lighthouse CLS check in Phase 2 and decide at that point whether to self-host DotGothic16.
- **DialogueSystem JS framework choice**: Research should resolve Preact vs vanilla JS for the island before Phase 3 starts — Preact adds ~3KB over vanilla but simplifies reactive state for the typewriter + avatar interaction.

---

## Sources

### Primary (HIGH confidence)
- `inspiration.html` prototype (direct code inspection) — GBA aesthetic patterns, existing CSS architecture, current component structure
- `.planning/PROJECT.md` — Project constraints, stack decisions, aesthetic goals (source of truth)
- `tailwindcss.com/blog/tailwindcss-v4` (fetched 2026-03-13) — Tailwind v4 release confirmed; CSS-first `@theme {}` config verified
- WCAG 2.1 specification — contrast requirements (4.5:1 AA normal text, 3:1 large text)
- Astro Islands documentation (training knowledge, Aug 2025) — `client:*` directives, `is:inline` script behavior
- CSS specification — `filter: drop-shadow` vs `box-shadow` clipping behavior; `@starting-style`; CSS custom properties cascade

### Secondary (MEDIUM confidence)
- Astro 5 Content Layer API (training knowledge) — Content Collections enhancements; recommend verification
- `astro-icon` v1.x Astro 5 compatibility (training knowledge) — verify with npm before install
- Google Fonts availability for DotGothic16, Press Start 2P (training knowledge) — stable for several years; verify before committing
- Nintendo IP enforcement posture (public record through Aug 2025) — well-documented aggressive enforcement
- Portfolio domain conventions (training data) — feature prioritization, UX patterns, recruiter behavior

### Tertiary (LOW confidence — needs validation)
- Font self-hosting vs CDN CLS tradeoff for pixel fonts — CLS severity is empirical; measure during Phase 2 build before deciding

---
*Research completed: 2026-03-13*
*Ready for roadmap: yes*
