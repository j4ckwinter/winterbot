# Requirements: WinterBot Portfolio

**Defined:** 2026-03-13
**Core Value:** A memorable, interactive portfolio that makes visitors feel like they're embarking on an adventure — not just reading a résumé.

## v1 Requirements

### Design System

- [ ] **DS-01**: Site renders with Fire mode (warm red/orange palette) and Leaf mode (green/earth palette) as the two selectable themes
- [ ] **DS-02**: Theme applies without flash-of-wrong-theme on page load (blocking inline script reads `localStorage` and sets `data-theme` before first paint)
- [ ] **DS-03**: All color tokens are WCAG AA compliant (4.5:1 for normal text, 3:1 for large text) and do not directly match Nintendo FireRed/LeafGreen palette values
- [ ] **DS-04**: Pixel font (DotGothic16 or equivalent) is used for headings and decorative elements only — minimum 18px — never for body copy
- [ ] **DS-05**: Body copy uses a monospace font (JetBrains Mono or equivalent) at readable scale
- [ ] **DS-06**: A Panel primitive component (chunky 3-4px border, hard drop-shadow offset, inner highlight ring) is used consistently for all UI cards and sections
- [ ] **DS-07**: Site deploys to Vercel from git push with zero manual steps

### Navigation

- [ ] **NAV-01**: A persistent navigation element provides anchor links to all six sections (Hero, About, Experience, Projects, Skills, Contact)
- [ ] **NAV-02**: Navigation uses a journey metaphor — a visual path/progress indicator that shows the user's current position through the sections as they scroll

### Hero

- [ ] **HERO-01**: Hero section displays a trainer card / identity card with: name, title/class, years of experience (framed as level), and location/region
- [ ] **HERO-02**: Trainer card includes a profile portrait area (photo or styled avatar placeholder)
- [ ] **HERO-03**: Hero section includes a headline and short intro text outside the card
- [ ] **HERO-04**: Hero section includes primary CTA links (view projects, contact)

### About

- [ ] **ABOUT-01**: About section presents the user's background framed as a character origin/backstory in the adventure aesthetic
- [ ] **ABOUT-02**: About section uses the established Panel primitive and design system tokens

### Experience

- [ ] **EXP-01**: Experience section renders as a vertical quest log timeline with distinct entry markers per role
- [ ] **EXP-02**: Each timeline entry shows: company name, role title, date range, and 3–5 achievement bullet points
- [ ] **EXP-03**: Completed quest markers are visually distinct from current/active entries
- [ ] **EXP-04**: Timeline entries animate in on scroll (scroll-triggered reveal), respecting `prefers-reduced-motion`

### Projects

- [ ] **PROJ-01**: Projects section renders as a grid of collectible dex-entry style cards
- [ ] **PROJ-02**: Each project card shows: dex entry number (`#001` style), project name, tech tags, description, and links to live site and GitHub
- [ ] **PROJ-03**: Project cards have a hover interaction (lift/shadow animation)
- [ ] **PROJ-04**: Project cards use the established design system tokens and Panel aesthetic

### Skills

- [ ] **SKILL-01**: Skills section renders as an inventory slot grid where each slot represents a technology or skill
- [ ] **SKILL-02**: Skills are grouped into categories with a tab or toggle to filter by category
- [ ] **SKILL-03**: Each skill slot shows an icon and label; hovering reveals a tooltip or expanded state
- [ ] **SKILL-04**: Inventory grid uses the established Panel primitive with inset shadow styling

### Contact

- [ ] **CONT-01**: Contact section is styled as a "Rest Area / Save Point" with that exact wording
- [ ] **CONT-02**: Contact section includes links to email, GitHub, and LinkedIn
- [ ] **CONT-03**: Contact section uses warm, inviting styling distinct from other section panels

### Dialogue System

- [ ] **DLG-01**: A fixed dialogue box is displayed at the bottom of the viewport throughout the site
- [ ] **DLG-02**: Dialogue text uses a typewriter animation effect that types out the current message character by character
- [ ] **DLG-03**: Dialogue text changes contextually as the user scrolls into each section (powered by IntersectionObserver)
- [ ] **DLG-04**: A small guide avatar/character is displayed alongside the dialogue box and changes expression or state based on which section is active
- [ ] **DLG-05**: User can click the dialogue box to instantly complete the current typewriter animation (skip mechanism)
- [ ] **DLG-06**: Dialogue system respects `prefers-reduced-motion` — text appears instantly without animation when the preference is set

### Accessibility & Performance

- [ ] **A11Y-01**: All sections use semantic HTML landmarks (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`)
- [ ] **A11Y-02**: All interactive elements are keyboard navigable with visible focus indicators
- [ ] **A11Y-03**: Images and decorative elements have appropriate alt text or are marked as presentational
- [ ] **PERF-01**: Site ships zero runtime JavaScript for static sections — only the ThemeToggle and DialogueSystem components load client-side JS
- [ ] **PERF-02**: Site is fully responsive and usable on mobile viewports (320px minimum)

## v2 Requirements

### Content

- Real personal content (actual bio, job history, project screenshots, real skills list) — deferred to after design system is validated with placeholder data

### Enhancements

- **ENH-01**: Sound toggle (ambient retro audio effects) — optional atmospheric addition
- **ENH-02**: Cursor custom styling (pixel crosshair or sprite) — subtle detail
- **ENH-03**: Easter egg interactions (hidden interactions for curious visitors)
- **ENH-04**: Contact form (using Formspree or similar) — static-compatible
- **ENH-05**: OpenGraph / social preview cards with the retro aesthetic

## Out of Scope

| Feature | Reason |
|---------|--------|
| Literal overworld map navigation | Adds significant complexity without UX benefit; journey metaphor achieves the vibe |
| Any Pokémon / Nintendo IP assets | Legal risk — original design language only |
| React / Vue / Svelte framework | Astro islands with vanilla JS or Preact only — no full framework overhead |
| GSAP / Framer Motion | CSS animations cover the scope; no heavy animation library needed |
| Server-side features / API routes | Fully static; no serverless functions in v1 |
| Backend / database | Static site; no data persistence |
| PWA / service worker | Out of scope for portfolio use case |
| Video background / WebGL effects | Performance non-starter; CSS only |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | Phase 1 | Pending |
| DS-02 | Phase 1 | Pending |
| DS-03 | Phase 1 | Pending |
| DS-04 | Phase 1 | Pending |
| DS-05 | Phase 1 | Pending |
| DS-06 | Phase 1 | Pending |
| DS-07 | Phase 1 | Pending |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| HERO-04 | Phase 2 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| ABOUT-02 | Phase 2 | Pending |
| EXP-01 | Phase 2 | Pending |
| EXP-02 | Phase 2 | Pending |
| EXP-03 | Phase 2 | Pending |
| PROJ-01 | Phase 2 | Pending |
| PROJ-02 | Phase 2 | Pending |
| PROJ-03 | Phase 2 | Pending |
| PROJ-04 | Phase 2 | Pending |
| SKILL-01 | Phase 2 | Pending |
| SKILL-02 | Phase 2 | Pending |
| SKILL-03 | Phase 2 | Pending |
| SKILL-04 | Phase 2 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| A11Y-01 | Phase 2 | Pending |
| A11Y-02 | Phase 2 | Pending |
| A11Y-03 | Phase 2 | Pending |
| EXP-04 | Phase 3 | Pending |
| DLG-01 | Phase 3 | Pending |
| DLG-02 | Phase 3 | Pending |
| DLG-03 | Phase 3 | Pending |
| DLG-04 | Phase 3 | Pending |
| DLG-05 | Phase 3 | Pending |
| DLG-06 | Phase 3 | Pending |
| PERF-01 | Phase 4 | Pending |
| PERF-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 41 total
- Mapped to phases: 41
- Unmapped: 0

---
*Requirements defined: 2026-03-13*
*Last updated: 2026-03-13 after roadmap creation*
