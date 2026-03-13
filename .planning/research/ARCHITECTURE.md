# Architecture Patterns

**Project:** WinterBot Portfolio (retro-modern GBA-inspired portfolio site)
**Domain:** Static personal portfolio site
**Researched:** 2026-03-13
**Confidence:** HIGH (Astro + Tailwind patterns well-established; grounded in inspiration.html prototype analysis)

---

## Recommended Architecture

A single-page scroll site rendered as fully static HTML by Astro. All content sections are static Astro components. The two interactive subsystems — theme toggle and dialogue/guide — are isolated Astro Islands (client-side JS hydrated on demand). CSS custom properties provide the theme layer; Tailwind reads those properties via a semantic token mapping.

```
┌─────────────────────────────────────────────────────────┐
│                   Layout Shell (Astro)                   │
│  BaseLayout.astro — HTML skeleton, font links, meta      │
│  ThemeProvider.astro — sets data-theme on <html>         │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  ThemeToggle.tsx (Island: client:load)            │   │
│  │  Reads/writes data-theme attr + localStorage      │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ─── Page Sections (all static Astro, zero JS) ───       │
│  HeroSection.astro     → TrainerCard.astro               │
│  AboutSection.astro                                      │
│  ExperienceSection.astro → QuestItem.astro (×N)          │
│  ProjectsSection.astro   → DexCard.astro (×N)            │
│  SkillsSection.astro     → InventorySlot.astro (×N)      │
│  ContactSection.astro  (Rest Area / Save Point)          │
│                                                          │
│  ─── Fixed Overlay ───                                   │
│  DialogueSystem.tsx (Island: client:load)                │
│  ├── DialogueBox — speech bubble, typewriter text        │
│  ├── GuideAvatar — bouncing pixel character              │
│  └── ScrollWatcher — IntersectionObserver, dialogue map  │
└─────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

| Component | Type | Responsibility | Communicates With |
|-----------|------|----------------|-------------------|
| `BaseLayout.astro` | Static layout | HTML shell, `<head>`, font imports, `<body>` wrapper | All page sections (slot children) |
| `ThemeProvider.astro` | Static layout | Sets initial `data-theme` attr from localStorage SSR hint; no JS needed for initial paint | `ThemeToggle.tsx` island reads/updates same attr |
| `ThemeToggle.tsx` | Island (client:load) | Renders toggle button; reads `data-theme` from `<html>`; writes `data-theme` + `localStorage` on click | `<html>` element via DOM attr; triggers CSS var cascade |
| `HeroSection.astro` | Static section | Trainer card layout, hero title, CTA buttons | `TrainerCard.astro`, `data/profile.ts` |
| `TrainerCard.astro` | Static component | Renders name/class/level/region stats | `data/profile.ts` |
| `AboutSection.astro` | Static section | Character identity text block | `data/profile.ts` |
| `ExperienceSection.astro` | Static section | Quest log timeline wrapper | `QuestItem.astro` ×N, `data/experience.ts` |
| `QuestItem.astro` | Static component | Single quest log entry with marker, header, bullet list | Receives props from parent |
| `ProjectsSection.astro` | Static section | Dex grid wrapper | `DexCard.astro` ×N, `data/projects.ts` |
| `DexCard.astro` | Static component | Single project card with image, tags, title, description | Receives props from parent |
| `SkillsSection.astro` | Static section | Inventory grid wrapper | `InventorySlot.astro` ×N, `data/skills.ts` |
| `InventorySlot.astro` | Static component | Single skill slot with icon and label | Receives props from parent |
| `ContactSection.astro` | Static section | Rest Area / Save Point with CTA links | `data/profile.ts` |
| `DialogueSystem.tsx` | Island (client:load) | Fixed overlay; IntersectionObserver watches sections; types dialogue on section change; renders avatar | DOM section IDs via `data-section` attrs; `data/dialogue.ts` for message map |
| `JourneyNav.astro` | Static component | Path/progress visual nav bar; anchor links to sections | Section IDs |

---

## Data Flow

### Theme System

```
User clicks ThemeToggle
        │
        ▼
ThemeToggle.tsx writes data-theme="fire"|"leaf" to <html>
        │
        ▼
CSS custom properties cascade:
  [data-theme="fire"] { --color-world: ...; --color-accent: ...; }
  [data-theme="leaf"] { --color-world: ...; --color-accent: ...; }
        │
        ▼
Tailwind classes referencing semantic tokens
(e.g. bg-world, text-accent) repaint automatically
        │
ThemeToggle.tsx also writes to localStorage("theme")
        │
        ▼
On next page load: BaseLayout.astro inline script reads
localStorage before first paint → sets data-theme immediately
(prevents flash of wrong theme)
```

**Key constraint:** Theme toggle must be `client:load` (not `client:visible`) to avoid flash. The inline script in `<head>` handles the pre-hydration case.

### Dialogue System

```
Page loads → DialogueSystem.tsx hydrates (client:load)
        │
        ▼
ScrollWatcher registers IntersectionObserver on all
elements with [data-section] attribute
        │
        ▼
User scrolls → section enters viewport (threshold: 0.3)
        │
        ▼
ScrollWatcher fires → looks up message in dialogue map
  { hero: "...", experience: "...", projects: "...", ... }
        │
        ▼
DialogueBox receives new message string
        │
        ▼
Typewriter function: clears text, re-renders char by char
via setTimeout loop (30ms interval)
        │
        ▼
GuideAvatar bounces/reacts to new message (CSS animation
trigger or state flag)
```

**Key constraint:** IntersectionObserver runs only in the DialogueSystem island — no global scroll listeners on the static shell. Sections are purely static; they communicate their identity via `id` / `data-section` HTML attributes (no JS coupling needed).

### Content Data Flow

```
data/profile.ts     ──► HeroSection, AboutSection, ContactSection
data/experience.ts  ──► ExperienceSection → QuestItem ×N
data/projects.ts    ──► ProjectsSection → DexCard ×N
data/skills.ts      ──► SkillsSection → InventorySlot ×N
data/dialogue.ts    ──► DialogueSystem island (imported at build time,
                         bundled into island JS)
```

All `data/*.ts` files are TypeScript modules exporting typed arrays/objects. No Astro content collections needed — the content is structured data (not Markdown prose), and the portfolio is a single page. This keeps the stack simple and swap-friendly: edit a `.ts` file to update content.

---

## Theme System Architecture

### CSS Custom Properties Layer

Define all color tokens as CSS custom properties, scoped to `data-theme`:

```css
/* src/styles/themes.css */

:root,
[data-theme="fire"] {
  --color-world-bg:   #1E5E99;   /* ocean/world background */
  --color-accent-primary: #D44A3A;
  --color-accent-secondary: #E8C64B;
  --color-ui-bg:      #F9EFE5;
  --color-ui-text:    #66203D;
  --color-ui-border:  #66203D;
  --color-shadow:     rgba(102, 32, 61, 0.4);
}

[data-theme="leaf"] {
  --color-world-bg:   #2C5F2E;   /* forest world */
  --color-accent-primary: #5A8A3C;
  --color-accent-secondary: #D4A843;
  --color-ui-bg:      #EFF5E8;
  --color-ui-text:    #1F3B1F;
  --color-ui-border:  #2C5F2E;
  --color-shadow:     rgba(44, 95, 46, 0.4);
}
```

### Tailwind Semantic Token Mapping

Extend Tailwind config to reference the CSS variables so utility classes respond to theme:

```js
// tailwind.config.mjs
theme: {
  extend: {
    colors: {
      'world':         'var(--color-world-bg)',
      'ui-bg':         'var(--color-ui-bg)',
      'ui-text':       'var(--color-ui-text)',
      'ui-border':     'var(--color-ui-border)',
      'accent':        'var(--color-accent-primary)',
      'accent-2':      'var(--color-accent-secondary)',
    }
  }
}
```

Components use `bg-world`, `text-ui-text`, `border-ui-border` — no theme logic in component markup.

### Flash of Wrong Theme Prevention

```html
<!-- BaseLayout.astro <head>, before any CSS link -->
<script is:inline>
  const t = localStorage.getItem('theme') || 'fire';
  document.documentElement.setAttribute('data-theme', t);
</script>
```

This runs synchronously before paint. `ThemeToggle.tsx` reads the same attribute on mount to initialize its UI state.

---

## Dialogue / Guide System Architecture

### Structure

The `DialogueSystem.tsx` island is a single React (or Preact) component that owns all dialogue state. It renders:

1. **DialogueBox** — fixed bottom speech bubble, displays `currentText`, renders typewriter cursor
2. **GuideAvatar** — small pixel character adjacent to the bubble; CSS animation class toggled on new message
3. **ScrollWatcher** — invisible; registers IntersectionObserver, dispatches section change events internally

### Section Registration

Static Astro sections carry `id` attributes matching the dialogue map keys. The observer queries `[data-section]` or uses known IDs. No coupling between static components and the island beyond agreed-upon HTML IDs.

```
section#hero         → "Welcome. Your adventure begins here."
section#about        → "Getting to know the trainer..."
section#experience   → "Checking the quest log..."
section#projects     → "Artifacts discovered on the journey."
section#skills       → "Inventory: fully stocked."
section#contact      → "Save point reached. Ready to connect?"
```

### Typewriter Implementation

- Single `setTimeout` recursive loop (not `setInterval`) — avoids overlap when section changes quickly
- Cancel via `clearTimeout` ref before starting new sequence
- 30ms per character feels authentic to GBA dialogue speed
- Blinking cursor `▌` implemented in CSS (`animation: blink 1s step-end infinite`)

---

## Astro Islands Strategy

| Component | Hydration Directive | Rationale |
|-----------|--------------------|-----------|
| `ThemeToggle.tsx` | `client:load` | Must be interactive immediately; prevents flash |
| `DialogueSystem.tsx` | `client:load` | Needs IntersectionObserver active from page load to catch hero section |
| All content sections | Static (no island) | Pure HTML; no interactivity needed |
| `JourneyNav.astro` | Static | Anchor links only; no JS needed |
| `DexCard.astro` | Static | Hover effects via CSS only |
| `InventorySlot.astro` | Static | Hover effects via CSS only |

**Rule:** Default to static. Only islands for ThemeToggle and DialogueSystem. This keeps JS payload minimal (two small islands vs a full SPA).

---

## Content Collections vs Hardcoded Data

**Decision: TypeScript data modules (`src/data/*.ts`), not Astro content collections.**

Rationale:
- Content collections are optimized for Markdown/MDX prose (blog posts, docs). Portfolio sections are structured data — arrays of typed objects.
- A `.ts` data file with a typed interface is simpler to edit, type-check, and swap placeholder → real content.
- No need for frontmatter parsing overhead.
- Collections require a `src/content/` directory and `defineCollection` schema — justified overhead only when content is prose with rich formatting.

Exception: if project case study pages are added in a future phase (full MDX writeups with rich content), migrate `data/projects.ts` entries to a `projects` content collection at that point.

---

## File Structure

```
src/
├── layouts/
│   └── BaseLayout.astro          # HTML shell, theme init script, font imports
│
├── components/
│   ├── theme/
│   │   └── ThemeToggle.tsx        # Island: fire/leaf toggle button
│   ├── dialogue/
│   │   └── DialogueSystem.tsx     # Island: scroll watcher + speech bubble + avatar
│   ├── sections/
│   │   ├── HeroSection.astro
│   │   ├── AboutSection.astro
│   │   ├── ExperienceSection.astro
│   │   ├── ProjectsSection.astro
│   │   ├── SkillsSection.astro
│   │   └── ContactSection.astro
│   └── ui/
│       ├── TrainerCard.astro      # Reusable within Hero
│       ├── QuestItem.astro        # Reusable within Experience
│       ├── DexCard.astro          # Reusable within Projects
│       ├── InventorySlot.astro    # Reusable within Skills
│       ├── Panel.astro            # Shared panel wrapper (border + shadow)
│       └── JourneyNav.astro       # Progress/path navigation
│
├── data/
│   ├── profile.ts                 # Name, class, level, region, contact links
│   ├── experience.ts              # Array of job entries for quest log
│   ├── projects.ts                # Array of project entries for dex
│   ├── skills.ts                  # Array of skill entries for inventory
│   └── dialogue.ts                # Section ID → dialogue string map
│
├── styles/
│   ├── themes.css                 # CSS custom property definitions (fire/leaf)
│   ├── base.css                   # Reset, scrollbar, body background
│   └── animations.css             # Keyframes: bounce, blink, typewriter cursor
│
└── pages/
    └── index.astro                # Assembles all sections; passes data as props
```

---

## Patterns to Follow

### Pattern 1: Props-down, no shared state between static components

Static Astro components receive all data as props from `index.astro`. No global store, no context. Only the two islands manage state internally.

### Pattern 2: CSS custom properties for theming, Tailwind for layout

Use CSS vars for all color/shadow/border tokens (theme-reactive). Use Tailwind utilities for spacing, layout, typography scale. Never hardcode color hex values in component markup.

### Pattern 3: `data-section` attribute as the islands-to-static bridge

The only coupling between the `DialogueSystem` island and static sections is an agreed HTML attribute (`id` or `data-section`). No imports, no event emitters across the island boundary.

### Pattern 4: Inline `is:inline` script for theme initialization only

Keep the inline script in `<head>` minimal — one job only: read localStorage and set `data-theme`. All other JS lives inside islands.

### Pattern 5: Panel component absorbs repetitive border/shadow boilerplate

The `Panel.astro` component wraps children with the standard parchment background, chunky border, and hard drop-shadow. Prevents drift across sections.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Making content sections into islands

**What:** Wrapping `ExperienceSection` or `ProjectsSection` in `client:load` to enable animations.
**Why bad:** Sends unnecessary JS to browser; Astro exists to avoid this. CSS `@keyframes` and `IntersectionObserver`-triggered class additions (from the existing DialogueSystem island) are sufficient.
**Instead:** Use CSS animations with `animation-play-state: paused` + a class toggle, or pure CSS scroll-driven animations (CSS `@scroll-timeline` if targeting modern browsers).

### Anti-Pattern 2: One monolithic island for everything interactive

**What:** Bundling theme toggle + dialogue + any future interactivity into a single `App.tsx` island.
**Why bad:** Defeats Astro's partial hydration advantage; couples unrelated concerns.
**Instead:** One island per concern. ThemeToggle and DialogueSystem stay separate.

### Anti-Pattern 3: Storing content in component files

**What:** Hardcoding job entries, project data, or skill lists directly inside `.astro` section files.
**Why bad:** Makes placeholder → real content swaps require touching component files instead of data files.
**Instead:** All variable content lives in `src/data/*.ts`. Components are purely presentational.

### Anti-Pattern 4: Using `client:visible` for ThemeToggle

**What:** Hydrating the toggle only when scrolled into view.
**Why bad:** If the toggle is in a fixed header, it's always visible anyway. More critically, using `client:idle` or `client:visible` causes a window of time where the wrong theme is rendered.
**Instead:** `client:load` for both islands that need to be active from page load.

---

## Suggested Build Order

Dependencies drive order. Lower-level primitives must exist before consumers can be built.

```
Phase 1 — Foundation (nothing else can start without this)
  1. BaseLayout.astro        — HTML shell, font imports
  2. themes.css              — CSS custom properties (fire + leaf)
  3. tailwind.config.mjs     — semantic token mapping
  4. base.css + animations.css
  5. ThemeToggle.tsx island  — validates theme system works end-to-end
  6. Panel.astro             — shared panel primitive used by all sections

Phase 2 — Static Sections (can be built in parallel after Phase 1)
  7. Data files (profile, experience, projects, skills, dialogue)
  8. HeroSection + TrainerCard
  9. ExperienceSection + QuestItem
  10. ProjectsSection + DexCard
  11. SkillsSection + InventorySlot
  12. AboutSection
  13. ContactSection (Rest Area)
  14. index.astro — assembles all sections

Phase 3 — Interactive Layer (requires Phase 2 section IDs to exist)
  15. DialogueSystem.tsx island — scroll watcher + typewriter + avatar
  16. JourneyNav.astro — path/progress visual nav

Phase 4 — Polish
  17. Responsive breakpoints across all sections
  18. Accessibility pass (ARIA, keyboard nav, focus states)
  19. Animation tuning (entrance animations, hover states)
  20. Performance audit (image optimization, font preloading)
```

---

## Scalability Considerations

| Concern | Current scope | If adding more sections | If adding project detail pages |
|---------|--------------|------------------------|-------------------------------|
| Content management | `src/data/*.ts` | Add more entries to arrays | Migrate to Astro content collections + MDX |
| Theme tokens | CSS vars in one file | Add more vars as needed | No change |
| Interactive islands | 2 islands | Add islands only for new interactive features | New pages get their own island scope |
| Build time | Near-instant (static, minimal islands) | Linear — Astro static builds scale well | Add `getStaticPaths` for project detail pages |
| Deployment | Vercel static | No change | Still static; Vercel handles SSG file count well |

---

## Sources

- Inspiration prototype analysis (`/inspiration.html`) — HIGH confidence; direct source
- Astro Islands documentation (training data, August 2025) — HIGH confidence for `client:*` directives
- Astro content collections documentation (training data) — HIGH confidence
- Tailwind CSS custom property integration patterns (training data) — HIGH confidence
- GBA-era UI prototype patterns (inspiration.html + PROJECT.md) — HIGH confidence; direct source

**Confidence gaps:** Flash-of-wrong-theme pattern via `is:inline` script is a well-established technique in the Astro ecosystem as of training cutoff. No external verification possible in this session. Mark as HIGH confidence from training but worth a quick docs check during implementation.
