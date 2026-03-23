# Phase 2: Static Sections - Research

**Researched:** 2026-03-14
**Domain:** Astro component architecture, CSS layout, accessibility, icon libraries
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Journey navigation**
- Fixed left sidebar — a narrow vertical strip on the left edge
- Diamond markers (◆ filled = active, ◇ outline = inactive) at each section
- Dashed vertical line connecting all markers
- Section labels always visible alongside the diamond (not hover-only)
- No fill/progress animation in Phase 2 — active marker is highlighted via CSS only (JS scroll tracking added in Phase 3)
- Collapses to icon-only or hidden on mobile (exact mobile behavior: Claude's discretion)

**Hero trainer card**
- Layout: portrait left (square ~120×120px placeholder), stats right — classic trainer card format
- Stats: Name (plain text), Class (plain text), Level (pixel progress bar + number), Region (plain text)
- Level displayed as a filled pixel-bar visual + number — not plain text
- Outside the card: headline + tagline + two CTA buttons (View Projects, Contact) to the right of or below the card
- Portrait placeholder: styled box (Claude's discretion — avatar initials, silhouette, or simple bordered square)

**Experience quest log (from REQUIREMENTS.md — no discussion needed)**
- Vertical timeline with distinct entry markers per role
- Each entry: company name, role title, date range, 3–5 achievement bullet points
- Completed entries visually distinct from current/active entry
- No scroll animations in Phase 2 (those land in Phase 3 as EXP-04)

**Project dex-entry cards**
- 3-column grid on desktop, 2 on tablet, 1 on mobile
- Dex number (#001 style): top-right corner, styled in accent-secondary color, smaller than title
- Card contents: project name, dex number, horizontal rule, short description, tech tag pills, GitHub + Live links
- Tech tags: pill badge style with accent-secondary background
- Hover state in Phase 2 is static (no lift animation) — animations added in Phase 3

**Skills inventory**
- Category tabs above the grid: All / Frontend / Backend / Tools (or similar)
- Tab filtering: Phase 2 is static — tabs are rendered but JS filter deferred to Phase 3. All slots visible by default, or "All" tab selected.
- Slot contents: icon (SVG via astro-icon or similar) + label below
- Slot size: uniform squares, Panel inset-shadow styling
- Hover: CSS tooltip above slot showing proficiency note (e.g., "Expert • 5+ years")

**About section**
- Character origin/backstory framing — Claude's discretion on copy structure
- Uses Panel primitive and design system tokens

**Contact section**
- Labeled "Rest Area / Save Point" — exact wording required
- Includes email, GitHub, LinkedIn links
- Warm, inviting styling distinct from other sections — Claude's discretion

### Claude's Discretion
- Portrait placeholder visual treatment
- Mobile nav collapse behavior
- Exact number of placeholder projects and skills
- About section copy structure
- Contact section panel styling and visual warmth differentiation
- Exact tab categories for skills

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Persistent navigation with anchor links to all six sections | Fixed `<nav>` in Layout.astro sidebar; CSS `position: fixed` with `top: 0; left: 0; height: 100vh` |
| NAV-02 | Journey metaphor visual path/progress indicator | Diamond markers + dashed connector line; active state via CSS class; Phase 2 = static default (first section active) |
| HERO-01 | Trainer card: name, title/class, level (years of exp), region | Astro component `HeroSection.astro`; pixel-bar built with CSS `background: repeating-linear-gradient` or filled `<span>` blocks |
| HERO-02 | Profile portrait area (photo or avatar placeholder) | Styled `<div>` square with initials or silhouette SVG; no `<img>` needed for placeholder |
| HERO-03 | Headline + short intro text outside the card | Plain HTML in section alongside the card |
| HERO-04 | Primary CTA links (view projects, contact) | `<a href="#projects">` and `<a href="#contact">` anchor links, styled as Panel-bordered buttons |
| ABOUT-01 | Background as character origin/backstory | `AboutSection.astro` with Panel wrapper; copy framed as adventure narrative |
| ABOUT-02 | Uses Panel primitive and design system tokens | Import `Panel.astro`; use `--color-*` vars directly |
| EXP-01 | Vertical quest log timeline with distinct markers | CSS vertical line via `::before` on parent; each entry = positioned `<li>` with marker dot |
| EXP-02 | Entry: company, role, date range, 3–5 achievements | Structured data array in component frontmatter; `<ul>` of achievements |
| EXP-03 | Completed markers visually distinct from current/active | CSS class `is-active` on current entry; distinct border-color or fill using accent-primary vs muted |
| PROJ-01 | Grid of collectible dex-entry cards | CSS Grid `grid-template-columns: repeat(3, 1fr)` desktop → 2 tablet → 1 mobile |
| PROJ-02 | Card: dex number, project name, tech tags, description, links | `ProjectCard.astro` component receiving typed props |
| PROJ-03 | Card hover interaction (lift/shadow) | Phase 2: static/no animation — CSS `:hover` cursor change only; lift animation deferred Phase 3 |
| PROJ-04 | Design system tokens and Panel aesthetic | Each card wrapped in `Panel.astro`; all colors via CSS vars |
| SKILL-01 | Inventory slot grid per technology | CSS Grid uniform squares; `SkillsSection.astro` |
| SKILL-02 | Category tabs/toggle to filter | Static HTML `<ul role="tablist">` with tab buttons rendered; JS filter deferred Phase 3 |
| SKILL-03 | Each slot: icon + label; hover reveals tooltip | `astro-icon` + `@iconify-json/devicon`; CSS-only tooltip via `::after` + `[data-tooltip]` |
| SKILL-04 | Panel primitive with inset shadow | Panel inset variant: `box-shadow: inset 3px 3px 0px var(--color-shadow)` scoped style |
| CONT-01 | Section labeled "Rest Area / Save Point" — exact wording | Hard-coded in `ContactSection.astro` heading |
| CONT-02 | Links to email, GitHub, LinkedIn | `<a href="mailto:...">`, `<a href="https://github.com/...">`, `<a href="https://linkedin.com/...">` |
| CONT-03 | Warm, inviting styling distinct from other section panels | Lighter border, wider padding, warm accent tones — scoped CSS or extra class on Panel |
| A11Y-01 | Semantic HTML landmarks | `<main>`, `<section aria-labelledby>`, `<nav aria-label="Site sections">`, `<header>`, `<footer>` |
| A11Y-02 | Keyboard navigable, visible focus indicators | CSS `:focus-visible` outline on all `<a>` and `<button>` |
| A11Y-03 | Images/decorative elements alt text or presentational | Portrait placeholder: `aria-hidden="true"` or `alt=""`; icon spans: `aria-hidden="true"` with visible label |
</phase_requirements>

---

## Summary

Phase 2 is an Astro component-assembly phase — no new frameworks, no new runtime JS. The entire page is built from static Astro `.astro` files that produce zero client-side JavaScript. The only new external dependency worth adding is `astro-icon` (v1.1.5) with `@iconify-json/devicon` for the Skills section icon slots.

The primary architectural decision is where the journey-nav sidebar lives: it should be added to `Layout.astro` as a `<nav>` inside the `<body>`, before `<slot />`, using `position: fixed` so it overlays the scrolling content. The main content area must then have a left margin equal to the sidebar width (e.g., `margin-left: 3rem`) on desktop, collapsing to zero on mobile.

All six sections are built as independent Astro components imported into `src/pages/index.astro`, replacing the current placeholder content. No section needs a client-side island — the ThemeToggle island already present in Layout.astro is the only JS on the page.

**Primary recommendation:** Compose all sections as zero-JS Astro components; add astro-icon + devicon for Skills icons; place nav sidebar in Layout.astro using position:fixed with CSS-only active state for Phase 2.

---

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^6.0.4 | Static site framework | Already installed; all components are `.astro` files |
| tailwindcss | ^4.2.1 | Utility classes + design tokens | Already installed via @tailwindcss/vite |
| @tailwindcss/vite | ^4.2.1 | Tailwind v4 Vite plugin | Already installed |

### New Dependencies
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro-icon | ^1.1.5 | `<Icon>` component for SVG icons | Astro's most-used icon integration; wraps Iconify ecosystem |
| @iconify-json/devicon | ^1.2.60 | Tech stack icons (React, TypeScript, etc.) | Comprehensive dev-tool SVG set; used by most portfolios |
| @iconify-json/simple-icons | ^1.2.73 | Brand icons (GitHub, LinkedIn) | Fallback for brand marks not in devicon |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| astro-icon + iconify-json | Inline SVG files in /public | Inline SVGs require manual asset management; astro-icon handles optimization and tree-shaking automatically |
| astro-icon + iconify-json | @unpic/astro | @unpic is image-focused, not icon-focused |
| CSS `:hover` tooltip | JavaScript tooltip library | No JS allowed in Phase 2; CSS-only is sufficient for the simple "Expert • 5+ years" use case |

**Installation:**
```bash
npx astro add astro-icon
npm install @iconify-json/devicon @iconify-json/simple-icons
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── Panel.astro              # EXISTING — wraps all section cards
│   ├── ThemeToggle.astro        # EXISTING — client:load island
│   ├── nav/
│   │   └── JourneyNav.astro     # NEW — fixed sidebar nav
│   ├── sections/
│   │   ├── HeroSection.astro    # NEW
│   │   ├── AboutSection.astro   # NEW
│   │   ├── ExperienceSection.astro # NEW
│   │   ├── ProjectsSection.astro   # NEW
│   │   ├── SkillsSection.astro     # NEW
│   │   └── ContactSection.astro    # NEW
│   └── ui/
│       └── ProjectCard.astro    # NEW — reusable card used inside ProjectsSection
├── layouts/
│   └── Layout.astro             # EXISTING — needs sidebar + margin-left update
├── pages/
│   └── index.astro              # EXISTING — import all sections here
└── styles/
    └── global.css               # EXISTING — may add scroll-behavior:smooth
```

### Pattern 1: Section Component Structure

**What:** Each section is a self-contained `.astro` file with its data defined in the component frontmatter as a typed array or object.
**When to use:** Always — keeps data collocated with markup in Phase 2 before real CMS data.

```astro
---
// src/components/sections/ExperienceSection.astro
const entries = [
  {
    company: 'Acme Corp',
    role: 'Senior Engineer',
    dateRange: '2022 – Present',
    achievements: ['Built X', 'Reduced Y by Z%', '...'],
    isCurrent: true,
  },
];
---
<section id="experience" aria-labelledby="experience-heading">
  <h2 id="experience-heading">Quest Log</h2>
  <ol class="timeline">
    {entries.map((entry) => (
      <li class:list={['timeline-entry', { 'is-current': entry.isCurrent }]}>
        <span class="marker" aria-hidden="true">◆</span>
        <div class="entry-content">
          <h3>{entry.role}</h3>
          <p class="company">{entry.company}</p>
          <p class="date-range">{entry.dateRange}</p>
          <ul>
            {entry.achievements.map((a) => <li>{a}</li>)}
          </ul>
        </div>
      </li>
    ))}
  </ol>
</section>
```

### Pattern 2: Journey Nav Sidebar (Fixed, CSS-only active state)

**What:** A `<nav>` inserted into Layout.astro before `<slot />`, using `position: fixed` and a CSS class to mark the first section active by default.
**When to use:** This is the only nav pattern for Phase 2 — scroll-driven active updates are Phase 3.

```astro
---
// src/components/nav/JourneyNav.astro
const sections = [
  { id: 'hero',       label: 'START',      defaultActive: true },
  { id: 'about',      label: 'ORIGIN',     defaultActive: false },
  { id: 'experience', label: 'QUEST LOG',  defaultActive: false },
  { id: 'projects',   label: 'DEX',        defaultActive: false },
  { id: 'skills',     label: 'INVENTORY',  defaultActive: false },
  { id: 'contact',    label: 'SAVE POINT', defaultActive: false },
];
---
<nav class="journey-nav" aria-label="Site sections">
  <ul>
    {sections.map((s) => (
      <li>
        <a
          href={`#${s.id}`}
          class:list={['nav-marker', { 'is-active': s.defaultActive }]}
          aria-current={s.defaultActive ? 'location' : undefined}
        >
          <span class="diamond" aria-hidden="true">{s.defaultActive ? '◆' : '◇'}</span>
          <span class="label">{s.label}</span>
        </a>
      </li>
    ))}
  </ul>
</nav>
```

Key CSS for the dashed connector line:
```css
.journey-nav ul {
  list-style: none;
  position: relative;
}
.journey-nav ul::before {
  content: '';
  position: absolute;
  left: 0.5rem; /* center of the diamond */
  top: 1.5rem;
  bottom: 1.5rem;
  border-left: 2px dashed var(--color-border);
}
```

Integration into Layout.astro:
```astro
<body>
  <JourneyNav />           {/* fixed-position, outside content flow */}
  <header>
    <ThemeToggle client:load />
  </header>
  <main style="margin-left: 3rem;">   {/* or via CSS class */}
    <slot />
  </main>
</body>
```

### Pattern 3: Pixel Level Bar

**What:** A CSS-only progress bar for the "Level" stat on the trainer card.
**When to use:** Hero section only.

```astro
---
const level = 12;
const maxLevel = 20;
const pct = Math.round((level / maxLevel) * 100);
---
<div class="level-stat">
  <div class="pixel-bar" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={maxLevel}>
    <div class="pixel-fill" style={`width: ${pct}%`}></div>
  </div>
  <span class="level-number">LVL {level}</span>
</div>
```

```css
.pixel-bar {
  width: 120px;
  height: 12px;
  border: 2px solid var(--color-border);
  background: var(--color-world);
  image-rendering: pixelated;
}
.pixel-fill {
  height: 100%;
  background: var(--color-accent-primary);
}
```

### Pattern 4: CSS-only Skill Tooltip

**What:** Tooltip above each skill slot using `data-tooltip` attribute and `::before`/`::after` pseudo-elements.
**When to use:** Skills inventory slots only.

```astro
<div class="skill-slot" data-tooltip="Expert • 5+ years" tabindex="0" aria-label="TypeScript — Expert, 5+ years">
  <Icon name="devicon:typescript" aria-hidden="true" />
  <span class="skill-label">TypeScript</span>
</div>
```

```css
.skill-slot {
  position: relative;
}
.skill-slot::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-border);
  color: var(--color-surface);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}
.skill-slot:hover::before,
.skill-slot:focus-visible::before {
  opacity: 1;
}
```

Note: `tabindex="0"` + `:focus-visible` ensures keyboard users also see the tooltip (A11Y-02).

### Pattern 5: Project Card Grid

**What:** CSS Grid with responsive column counts; dex number positioned top-right using `position: absolute` inside `position: relative` card.
**When to use:** Projects section grid only.

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .projects-grid { grid-template-columns: 1fr; }
}
```

### Anti-Patterns to Avoid

- **Using `position: fixed` on the nav WITHOUT scroll-padding-top on `<html>`:** Anchor links will scroll the target heading behind the fixed nav. Fix: add `scroll-padding-top: 0` on html (sidebar is left-side, not top, but still worth noting for the ThemeToggle header).
- **Using `--color-text` on `--color-world` backgrounds:** The WCAG rule in global.css is explicit — text on the dark world background MUST use `color: var(--color-surface)`. Section headings that sit on the world background (outside Panel) must follow this.
- **Hiding nav items with `display: none` on mobile:** Screen readers will skip them entirely. Use `visibility: hidden` + `opacity: 0` or `aria-hidden` appropriately if the nav collapses.
- **Putting the Panel overflow to hidden:** The existing Panel.astro has a comment warning against this — it clips the `::before` inner highlight ring.
- **Inline styles for layout that should be responsive:** Use scoped `<style>` blocks in each component, not style attributes, so media queries work correctly.
- **Using `<button>` for tab filter UI without ARIA roles:** The skills category tabs must use `role="tab"`, `role="tablist"`, `role="tabpanel"` even when the JS filtering is deferred. The HTML structure should be semantically correct in Phase 2.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG icon management | Custom SVG sprite system | `astro-icon` + iconify-json packs | Icon optimization, tree-shaking, consistent sizing API |
| CSS tooltip positioning | Custom JS tooltip library | CSS `::before` with `position: absolute` | Zero JS; sufficient for single-line tooltip text |
| Responsive grid | Flexbox hack with calc widths | CSS Grid `repeat(3, 1fr)` with media queries | Native, well-supported, simpler |

**Key insight:** This phase is intentionally a CSS/HTML composition exercise. Any solution requiring runtime JavaScript belongs in Phase 3.

---

## Common Pitfalls

### Pitfall 1: Fixed sidebar obscuring content on mobile

**What goes wrong:** The fixed-position nav sidebar renders over the main content on small viewports, making text unreadable.
**Why it happens:** `position: fixed` removes the element from document flow — main content doesn't know to make room.
**How to avoid:** On mobile (≤640px), set nav to `display: none` or render it as a top strip with `position: static` via media query. The main content `margin-left` must also reset to 0 at the same breakpoint.
**Warning signs:** Content clipping in browser DevTools mobile simulation.

### Pitfall 2: WCAG color rule violation on section headings

**What goes wrong:** A section heading or label uses `var(--color-text)` while sitting on the world-colored (`--color-world`) background outside a Panel.
**Why it happens:** It's easy to reach for the "text color" token without checking the background context.
**How to avoid:** The rule in `global.css` is definitive — on world background, use `color: var(--color-surface)`. Only inside a Panel (surface background) does `--color-text` apply.
**Warning signs:** Playwright test can check computed color on elements outside `.panel`.

### Pitfall 3: `astro-icon` peer dependency mismatch with Astro 6

**What goes wrong:** `astro-icon@1.1.5` may emit warnings or fail integration setup with Astro 6.0.x (peer dep is listed as `astro >= 2`).
**Why it happens:** The package was last published ~1 year ago; Astro 6 was released after that.
**How to avoid:** Run `npx astro add astro-icon` — the Astro integration installer handles peer dep resolution. If it fails, use inline SVG files in `src/assets/icons/` as fallback (no optimization loss for the small set needed).
**Warning signs:** Build errors mentioning `astro-icon` API mismatch; check npm install output for peer dep warnings.

### Pitfall 4: Skills tab markup is semantically incomplete

**What goes wrong:** Skills category tabs are rendered as styled `<div>` or `<button>` elements without ARIA roles, so screen readers can't identify them as tabs.
**Why it happens:** JS filter is deferred, so it feels like the tabs aren't "real" yet.
**How to avoid:** Even in Phase 2, use `role="tablist"` on the container, `role="tab"` on each button, and `aria-selected="true"` on the active one. The `role="tabpanel"` wrapping the grid should have `aria-labelledby` pointing to the active tab. This is correct HTML that Phase 3 JS will simply wire up.
**Warning signs:** axe accessibility scan flags missing ARIA roles on tab-like elements.

### Pitfall 5: Section `id` attributes missing or mismatched with nav hrefs

**What goes wrong:** `<a href="#projects">` in the nav doesn't scroll to the section because the section has `id="projects-section"`.
**Why it happens:** Naming drift between the nav component and individual section components.
**How to avoid:** Define section IDs as a shared constant or document them explicitly. Recommended IDs: `hero`, `about`, `experience`, `projects`, `skills`, `contact`.
**Warning signs:** Clicking nav links does nothing or jumps to top of page.

---

## Code Examples

### astro-icon Usage
```astro
---
// Source: https://www.astroicon.dev/getting-started/
import { Icon } from 'astro-icon/components';
---
<Icon name="devicon:typescript" width="32" height="32" aria-hidden="true" />
```

### Astro Section with Semantic Landmark (A11Y-01)
```astro
<section id="about" aria-labelledby="about-heading">
  <h2 id="about-heading">Origin Story</h2>
  <!-- content -->
</section>
```

### Smooth Scroll on HTML Element
```css
/* In global.css — adds CSS scroll-behavior for anchor link navigation */
html {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

### Focus-Visible on Interactive Elements (A11Y-02)
```css
a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--color-accent-primary);
  outline-offset: 3px;
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind config.js tokens | `@theme` block in CSS | Tailwind v4 (2025) | Already in use in this project — no config.js needed |
| Individual SVG imports | astro-icon + iconify | astro-icon v1.0+ | Consistent API, tree-shakeable |
| Manual `scroll-behavior` polyfill | Native CSS `scroll-behavior: smooth` | All modern browsers | No polyfill needed |

**Deprecated/outdated:**
- `astro-icon` v0.x API (used `<Icon pack="..." name="..." />`): v1.x uses `<Icon name="pack:iconname" />` — the new API is what's current.

---

## Open Questions

1. **astro-icon Astro 6 compatibility**
   - What we know: astro-icon@1.1.5 was last published ~1 year ago; peer dep lists `astro >= 2`
   - What's unclear: Whether Astro 6's integration API changes cause runtime issues
   - Recommendation: Attempt `npx astro add astro-icon` during Wave 0. If it breaks, fall back to inline SVG files in `src/assets/icons/` — the skill count is small enough to manage manually.

2. **Mobile nav exact collapse behavior**
   - What we know: Marked as Claude's discretion
   - What's unclear: Whether to hide entirely or show as a top strip
   - Recommendation: Hide on mobile (≤640px) with `display: none`; rely on section headings and the scrolling structure for mobile orientation. A persistent top bar for mobile nav is a Phase 3 enhancement.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright 1.58.2 |
| Config file | `playwright.config.ts` |
| Quick run command | `npx playwright test --project=chromium tests/static-sections.spec.ts` |
| Full suite command | `npx playwright test --project=chromium` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Nav contains 6 anchor links to correct section IDs | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "NAV-01"` | ❌ Wave 0 |
| NAV-02 | Nav renders diamond markers and connecting line | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "NAV-02"` | ❌ Wave 0 |
| HERO-01 | Trainer card visible with name, class, level, region | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "HERO-01"` | ❌ Wave 0 |
| HERO-02 | Portrait placeholder area visible | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "HERO-02"` | ❌ Wave 0 |
| HERO-03 | Headline and intro text present outside card | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "HERO-03"` | ❌ Wave 0 |
| HERO-04 | Two CTA links present (View Projects, Contact) | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "HERO-04"` | ❌ Wave 0 |
| ABOUT-01 | About section exists with content | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "ABOUT-01"` | ❌ Wave 0 |
| ABOUT-02 | About section contains .panel element | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "ABOUT-02"` | ❌ Wave 0 |
| EXP-01 | Timeline list renders with at least 1 entry | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "EXP-01"` | ❌ Wave 0 |
| EXP-02 | Entry has company, role, date, achievements | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "EXP-02"` | ❌ Wave 0 |
| EXP-03 | Current/active entry has distinct CSS class | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "EXP-03"` | ❌ Wave 0 |
| PROJ-01 | Projects grid renders at least 2 cards | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "PROJ-01"` | ❌ Wave 0 |
| PROJ-02 | Card has dex number, name, description, links | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "PROJ-02"` | ❌ Wave 0 |
| PROJ-04 | Project cards use .panel class | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "PROJ-04"` | ❌ Wave 0 |
| SKILL-01 | Skills grid renders at least 4 slots | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "SKILL-01"` | ❌ Wave 0 |
| SKILL-02 | Tab buttons render with tablist role | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "SKILL-02"` | ❌ Wave 0 |
| SKILL-03 | Skill slot has icon and visible label text | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "SKILL-03"` | ❌ Wave 0 |
| CONT-01 | Contact section heading contains "Rest Area / Save Point" | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "CONT-01"` | ❌ Wave 0 |
| CONT-02 | Email, GitHub, LinkedIn links present | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "CONT-02"` | ❌ Wave 0 |
| A11Y-01 | Page has main, nav, section landmarks | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "A11Y-01"` | ❌ Wave 0 |
| A11Y-02 | Focus indicators visible on interactive elements | manual | Manual keyboard tab test | — |
| A11Y-03 | Decorative icons have aria-hidden | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "A11Y-03"` | ❌ Wave 0 |
| PROJ-03 | Hover state (static cursor) | manual | Visual inspection | — |
| SKILL-04 | Skill slots have inset shadow Panel style | manual | Visual inspection | — |
| CONT-03 | Contact styling visually distinct | manual | Visual inspection | — |

### Sampling Rate
- **Per task commit:** `npx playwright test --project=chromium tests/static-sections.spec.ts`
- **Per wave merge:** `npx playwright test --project=chromium`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/static-sections.spec.ts` — covers NAV-01, NAV-02, HERO-01 through HERO-04, ABOUT-01/02, EXP-01 through EXP-03, PROJ-01/02/04, SKILL-01 through SKILL-03, CONT-01/02, A11Y-01, A11Y-03
- [ ] Install astro-icon if proceeding with icon package: `npx astro add astro-icon && npm install @iconify-json/devicon`

---

## Sources

### Primary (HIGH confidence)
- Existing codebase — `src/components/Panel.astro`, `src/layouts/Layout.astro`, `src/styles/global.css` — read directly
- `package.json` — confirmed Astro 6.0.4, Tailwind 4.2.1, Playwright 1.58.2
- `.planning/phases/02-static-sections/02-CONTEXT.md` — locked user decisions
- `npm view astro-icon` — confirmed v1.1.5, MIT, iconify deps
- `npm view @iconify-json/devicon` — confirmed v1.2.60
- `npm view @iconify-json/simple-icons` — confirmed v1.2.73

### Secondary (MEDIUM confidence)
- [astro-icon official docs](https://www.astroicon.dev/getting-started/) — integration setup and Icon component API
- [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior) — `scroll-behavior: smooth` browser support and prefers-reduced-motion interaction
- [Astro Islands docs](https://docs.astro.build/en/concepts/islands/) — confirmed zero-JS default for .astro components

### Tertiary (LOW confidence — for awareness only)
- WebSearch: CSS tooltip accessibility limitations on touch devices — noted as tradeoff but acceptable for skills inventory use case

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package versions confirmed via npm registry directly
- Architecture: HIGH — directly derived from existing codebase patterns and locked CONTEXT.md decisions
- Pitfalls: MEDIUM — derived from code analysis + established CSS/Astro knowledge; astro-icon/Astro 6 compat is LOW and flagged
- Validation architecture: HIGH — Playwright config confirmed in codebase; test file gaps are accurate

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (30 days — Astro and Tailwind v4 are moderately stable; astro-icon is slow-moving)
