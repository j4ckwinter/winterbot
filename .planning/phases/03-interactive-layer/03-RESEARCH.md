# Phase 3: Interactive Layer - Research

**Researched:** 2026-03-22
**Domain:** Preact islands, IntersectionObserver, CSS animations, typewriter effect, CSS pixel art
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**DialogueSystem — tech choice**
- D-01: Built as a Preact island (`client:load`) — reactive state handles section tracking, typewriter progress, and avatar expression in one coherent component
- D-02: Contained box layout — not full-width. Centered, max-width constrained, sits fixed at bottom of viewport overlaying page content (not pushing content up)
- D-03: New section message interrupts immediately — when IntersectionObserver fires for a new section, typewriter resets and starts the new message from char 0, no waiting for current message to finish
- D-04: Layout and z-index are Claude's discretion — must coexist with JourneyNav sidebar (fixed left, z-index 100) and ThemeToggle (header)

**DialogueSystem — text & personality**
- D-05: Second-person companion voice — guide speaks directly to the visitor
- D-06: Warm and encouraging tone throughout
- D-07: Game UI mechanical flavor: blinking cursor `▌` at end of completed messages, speaker name tag above the text box
- D-08: All six section messages are Claude's discretion — see UI-SPEC.md for approved messages

**DialogueSystem — avatar**
- D-09: CSS pixel art character — small sprite built from divs/box-shadows. Positioned to the left of the text box
- D-10: 3 expression states: neutral (default), excited, warm — mapped across 6 sections at Claude's discretion
- D-11: Speaker name tag reads "GUIDE"
- D-12: Avatar character design is Claude's discretion — must use design token colors, not hardcoded values

**Experience timeline scroll animations (EXP-04)**
- D-13: Animation: fade + slide-up — `opacity: 0 → 1`, `translateY: 20px → 0`
- D-14: Individual viewport entry — each timeline entry animates when it individually scrolls into view
- D-15: Marker and content card animate together as a single unit — no staggered reveal
- D-16: Duration: 350ms ease-out
- D-17: Reduced-motion: entries appear immediately with no animation

**Out of scope (REQUIREMENTS.md)**
- No GSAP / Framer Motion — CSS animations only
- No React/Vue/Svelte — Preact or vanilla JS only
- No WebGL / video backgrounds

**Journey nav active state**
- Wire JourneyNav to scroll via IntersectionObserver — active marker updates as user scrolls through sections. Same observer powers DialogueSystem section tracking (single source of truth).

### Claude's Discretion
- Exact dialogue messages for all six sections (approved in UI-SPEC.md)
- CSS pixel art avatar design (colors, pixel grid, expression variants)
- Expression-to-section mapping (3 states across 6 sections)
- DialogueSystem layout, sizing, and z-index relative to nav and header
- Preact component file structure (single component vs. split sub-components)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| EXP-04 | Timeline entries animate in on scroll (scroll-triggered reveal), respecting `prefers-reduced-motion` | IntersectionObserver + CSS class toggle pattern; `@media (prefers-reduced-motion: reduce)` override documented |
| DLG-01 | A fixed dialogue box is displayed at the bottom of the viewport throughout the site | Fixed positioning pattern, z-index layering researched |
| DLG-02 | Dialogue text uses a typewriter animation effect that types out the current message character by character | Preact `useState`/`useEffect` + `setInterval` pattern documented |
| DLG-03 | Dialogue text changes contextually as the user scrolls into each section (powered by IntersectionObserver) | Scrollspy pattern: single observer, multiple sections, callback updates Preact state via CustomEvent or direct ref |
| DLG-04 | A small guide avatar/character is displayed alongside the dialogue box and changes expression or state based on which section is active | CSS pixel art box-shadow technique; expression toggling via CSS class on wrapper |
| DLG-05 | User can click the dialogue box to instantly complete the current typewriter animation (skip mechanism) | Click handler sets `displayIndex` to `message.length` immediately, transitions to `complete` state |
| DLG-06 | Dialogue system respects `prefers-reduced-motion` — text appears instantly without animation when the preference is set | `window.matchMedia('(prefers-reduced-motion: reduce)')` check on mount; skip interval entirely |
</phase_requirements>

---

## Summary

Phase 3 adds all interactive behavior to the existing static structure. Three independent subsystems need wiring: (1) the DialogueSystem Preact island, (2) the ExperienceSection scroll-reveal, and (3) the JourneyNav active-state scroll tracking. All three are powered by IntersectionObserver — the most efficient approach, with no scroll event listeners.

The key architectural decision already locked: DialogueSystem is a Preact island (`client:load`). Preact is NOT yet installed — the package.json currently has only Astro, Tailwind, astro-icon, and Playwright. Wave 0 must install `@astrojs/preact` (v5.0.2) before any island code can run. The `npx astro add preact` command handles both the npm install and the `astro.config.mjs` update automatically.

The CSS pixel art avatar uses the established `box-shadow` sprite technique — a single `<div>` whose `box-shadow` property defines each pixel's position and color. All colors reference CSS custom properties (`--color-border`, `--color-accent-primary`, etc.) so they theme-switch automatically with the existing `data-theme` mechanism. No external assets, no IP risk. This is a well-established pattern with broad browser support.

**Primary recommendation:** Install Preact first (Wave 0), then build the three subsystems in parallel: DialogueSystem island, ExperienceSection observer script, JourneyNav observer script. The observer for JourneyNav and DialogueSystem can share a single `IntersectionObserver` instance to avoid duplicate DOM subscriptions.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@astrojs/preact` | 5.0.2 | Astro integration for Preact islands | Official Astro integration; enables `client:load` directive for Preact components |
| `preact` | 10.29.0 | Lightweight React-compatible UI library | Locked decision (D-01); already used for ThemeToggle pattern |
| IntersectionObserver (native) | Browser API | Scroll-position detection | No library needed; >97% browser support; far more performant than scroll events |
| CSS animations (native) | Browser API | Typewriter cursor blink, scroll-reveal transitions | Per REQUIREMENTS.md: no GSAP/Framer Motion |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `preact/hooks` | (bundled with preact) | `useState`, `useEffect`, `useRef` for typewriter state machine | Inside DialogueSystem.tsx for all reactive state |
| `window.matchMedia` (native) | Browser API | Read `prefers-reduced-motion` preference | On DialogueSystem mount; also used in CSS `@media` block |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Preact island | Plain Astro `<script>` tag | Script tag works for JourneyNav + scroll-reveal (no reactive state needed), but DialogueSystem has complex state (typewriter progress, section, expression) that benefits from Preact |
| Single shared IntersectionObserver | Two separate observers | Shared is more efficient; both JourneyNav and DialogueSystem need the same section-active signal |
| CSS class toggle for scroll-reveal | Web Animations API | CSS transition + class toggle is simpler, more declarative, and the decided approach (D-13) |

**Installation:**
```bash
npx astro add preact
```
This command: installs `@astrojs/preact` and `preact` npm packages, adds the integration to `astro.config.mjs`, and updates `tsconfig.json` with the correct `jsxImportSource`.

**Version verification (run before implementation):**
```bash
npm view @astrojs/preact version   # 5.0.2 verified 2026-03-22
npm view preact version            # 10.29.0 verified 2026-03-22
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── dialogue/
│   │   ├── DialogueSystem.tsx     # Preact island (client:load)
│   │   └── PixelAvatar.tsx        # Sub-component: CSS pixel art avatar
│   ├── nav/
│   │   └── JourneyNav.astro       # Existing — add <script> block for observer
│   └── sections/
│       └── ExperienceSection.astro # Existing — add <script> block + CSS classes
├── layouts/
│   └── Layout.astro               # Add <DialogueSystem client:load /> here
└── styles/
    └── global.css                 # Add .exp-entry scroll-reveal CSS
```

The `dialogue/` subfolder separates the Preact island from Astro components. `PixelAvatar.tsx` can be either a separate file or inlined inside `DialogueSystem.tsx` — either is fine since it's purely presentational.

### Pattern 1: Preact Island for Stateful Components

**What:** Astro ships zero JS for static components. Components that need client-side state use `client:load` (hydrate immediately on page load).

**When to use:** Any component with reactive state — DialogueSystem has typewriter progress, current section ID, and avatar expression state that all change at runtime.

**Example:**
```astro
<!-- Layout.astro -->
---
import DialogueSystem from '../components/dialogue/DialogueSystem.tsx';
---
<DialogueSystem client:load />
```

```tsx
// DialogueSystem.tsx
import { useState, useEffect, useRef } from 'preact/hooks';

export default function DialogueSystem() {
  const [sectionId, setSectionId] = useState('hero');
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  // ... typewriter logic
}
```

Source: Astro docs — https://docs.astro.build/en/guides/integrations-guide/preact/

### Pattern 2: Typewriter State Machine in Preact

**What:** `useState` tracks displayed character count. `useEffect` runs a `setInterval` that increments the index. Cleanup clears the interval when `sectionId` changes (new message interrupts immediately — D-03).

**When to use:** Any time text needs to reveal character by character with a skip mechanism.

**Example:**
```tsx
// Source: Preact hooks docs — https://preactjs.com/guide/v10/hooks/
const SPEED_MS = 40;

function DialogueSystem() {
  const [sectionId, setSectionId] = useState('hero');
  const [charIndex, setCharIndex] = useState(0);
  const reducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const messages: Record<string, string> = {
    hero: "Welcome, Trainer! Your adventure begins here...",
    // ... other sections
  };

  const currentMessage = messages[sectionId] ?? '';
  const isComplete = charIndex >= currentMessage.length;

  useEffect(() => {
    // Reset on section change (D-03: immediate interrupt)
    setCharIndex(reducedMotion.current ? currentMessage.length : 0);
  }, [sectionId]);

  useEffect(() => {
    if (isComplete || reducedMotion.current) return;
    const interval = setInterval(() => {
      setCharIndex((i) => {
        if (i >= currentMessage.length) {
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, SPEED_MS);
    return () => clearInterval(interval); // cleanup on re-render
  }, [sectionId, isComplete]);

  const skip = () => setCharIndex(currentMessage.length);

  return (
    <button class="dialogue-box" onClick={skip} aria-label="Skip dialogue">
      {/* render currentMessage.slice(0, charIndex) */}
    </button>
  );
}
```

### Pattern 3: Single IntersectionObserver for Section Tracking

**What:** One observer instance watches all 6 section elements. Whichever section is most visible (highest intersectionRatio among currently-intersecting entries) becomes active.

**When to use:** Scrollspy — powering both JourneyNav active state and DialogueSystem section tracking simultaneously.

**Example (in a plain Astro `<script>` block):**
```typescript
// JourneyNav.astro <script> block
const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

// Dispatch a CustomEvent that DialogueSystem (Preact) can listen to
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter(e => e.isIntersecting);
  if (!visible.length) return;
  const most = visible.reduce((a, b) =>
    a.intersectionRatio > b.intersectionRatio ? a : b
  );
  const activeId = most.target.id;

  // Update nav markers
  document.querySelectorAll('.nav-marker').forEach(el => {
    const isActive = el.getAttribute('href') === `#${activeId}`;
    el.classList.toggle('is-active', isActive);
    el.toggleAttribute('aria-current', isActive);
    el.querySelector('.diamond')!.textContent = isActive ? '◆' : '◇';
  });

  // Notify DialogueSystem (Preact island)
  window.dispatchEvent(new CustomEvent('sectionChange', { detail: { id: activeId } }));
}, { threshold: [0.25, 0.5, 0.75] });

sections.forEach(s => observer.observe(s!));
```

```tsx
// DialogueSystem.tsx — listen for the CustomEvent
useEffect(() => {
  const handler = (e: CustomEvent<{ id: string }>) => setSectionId(e.detail.id);
  window.addEventListener('sectionChange', handler as EventListener);
  return () => window.removeEventListener('sectionChange', handler as EventListener);
}, []);
```

**Key insight:** Astro `<script>` blocks in `.astro` files are bundled as ESM modules and run after the DOM is ready. Preact islands hydrate separately after the page loads. The `CustomEvent` on `window` bridges these two execution contexts cleanly.

### Pattern 4: CSS Class Toggle for Scroll Reveal (EXP-04)

**What:** Elements start hidden via CSS. IntersectionObserver adds `.is-visible` class when element enters viewport. Pure CSS handles the transition.

**When to use:** Any scroll-triggered reveal that doesn't need Preact state — ExperienceSection entries.

**CSS (in global.css or scoped in ExperienceSection.astro):**
```css
/* Source: UI-SPEC.md EXP-04 spec */
.exp-entry {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 350ms ease-out, transform 350ms ease-out;
}

.exp-entry.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .exp-entry {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Script (in ExperienceSection.astro `<script>` block):**
```typescript
const entries = document.querySelectorAll('.exp-entry');
const revealObserver = new IntersectionObserver(
  (obs) => {
    obs.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // fire once only
      }
    });
  },
  { threshold: 0.15 }
);
entries.forEach(el => revealObserver.observe(el));
```

### Pattern 5: CSS Box-Shadow Pixel Art Avatar

**What:** A single `<div>` (1×1px base element) whose `box-shadow` property places colored "pixels" at x/y offsets. The parent scales to desired render size. Expression variants swap CSS classes that redefine the box-shadow value.

**When to use:** D-09 — avatar must be CSS-only, no external assets, no IP risk.

**Example skeleton (16×16 pixel grid at 2px scale = 32×32px rendered):**
```tsx
// Each pixel: box-shadow: Xpx Ypx 0 0 var(--color-token)
// Pixel coordinates are in 2px units (2x scale)

const PIXEL = 2; // px per "pixel" at 2x scale

function PixelAvatar({ expression }: { expression: 'neutral' | 'excited' | 'warm' }) {
  return (
    <div class={`avatar-sprite expr-${expression}`} aria-hidden="true">
      <div class="pixel-canvas" />
    </div>
  );
}
```

```css
/* Colors use ONLY design tokens — auto-switches with data-theme */
.pixel-canvas {
  width: 2px;
  height: 2px;
  /* Neutral expression — box-shadow defines every colored pixel */
  box-shadow:
    /* body outline row 1 (example) */
    4px 2px 0 0 var(--color-border),
    6px 2px 0 0 var(--color-border),
    /* ... */
    /* eyes: straight — */
    4px 8px 0 0 var(--color-accent-primary),
    6px 8px 0 0 var(--color-accent-primary);
}

.expr-excited .pixel-canvas {
  box-shadow:
    /* eyes: arcs ^ */
    /* ... different pixel layout ... */;
}

.expr-warm .pixel-canvas {
  box-shadow:
    /* eyes: soft curves ~ */
    /* ... */;
}
```

**CRITICAL:** The `<div>` base element must be exactly 1px×1px (or 2px×2px for 2x scale). Box-shadow does not increase the element's layout size — all pixels are drawn outside the element bounds. The parent `.avatar-sprite` must have explicit `width: 32px; height: 32px; overflow: visible` to reserve layout space. `overflow: hidden` on any ancestor will clip the shadows.

### Anti-Patterns to Avoid

- **Scroll event listeners for section detection:** `window.addEventListener('scroll', ...)` is expensive and causes jank. IntersectionObserver is the correct API — runs off main thread.
- **Multiple IntersectionObserver instances for the same sections:** Creates redundant DOM observations. One observer, multiple `observe()` calls.
- **`setInterval` without cleanup in `useEffect`:** Memory leak. Always `return () => clearInterval(id)` from the effect.
- **Hardcoded hex values in pixel avatar:** Colors must use `var(--color-*)` tokens or the avatar breaks on theme switch.
- **`overflow: hidden` on Panel:** `Panel.astro` already documents this — DO NOT add overflow:hidden to the dialogue box wrapper. The `::before` inner highlight ring uses `position: absolute` and will be clipped.
- **Astro component for DialogueSystem:** Astro components have no client-side reactivity. DialogueSystem has complex runtime state — it MUST be a `.tsx` Preact component with `client:load`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Preact integration | Custom Vite plugin config | `npx astro add preact` | Handles tsconfig jsxImportSource, astro.config.mjs, and package install atomically |
| Scroll detection | `window.addEventListener('scroll')` | `IntersectionObserver` | Scroll events fire synchronously on main thread; IO runs async off main thread |
| Reduced motion check | Custom localStorage flag | `window.matchMedia('(prefers-reduced-motion: reduce)')` | OS-level system preference; the correct API |
| Typewriter skip | Complex animation pause/resume | Set `charIndex` to `message.length` | One state assignment collapses the entire animation |

**Key insight:** IntersectionObserver is the correct primitive for everything scroll-related in this phase. There is no case where a scroll event listener is better.

---

## Common Pitfalls

### Pitfall 1: Preact Island Hydration Race with Astro Script
**What goes wrong:** The `<script>` block in JourneyNav.astro fires immediately when Astro bundles and runs it. The DialogueSystem Preact island may not yet be mounted when the first `sectionChange` CustomEvent fires (hero section is visible on load).
**Why it happens:** Astro `<script>` blocks run as ESM modules after DOMContentLoaded. Preact `client:load` islands hydrate asynchronously after the page paints. The very first event may be missed.
**How to avoid:** In DialogueSystem, initialize `sectionId` to `'hero'` (the default active section) so the component renders correctly even if it misses the first event. The observer fires the hero event on load — even if missed, the initial state is correct.
**Warning signs:** Dialogue box showing no message or wrong message on initial page load.

### Pitfall 2: IntersectionObserver Threshold Too High for Long Sections
**What goes wrong:** A section taller than the viewport (e.g., Experience with 3 entries) never reaches 50% intersection because it's always larger than the viewport. The active state never fires.
**Why it happens:** `threshold: 0.5` means 50% of the *element* must be visible — impossible for elements taller than viewport.
**How to avoid:** Use multiple thresholds `[0.25, 0.5, 0.75]` and pick the entry with the highest `intersectionRatio` among currently-intersecting entries. Alternatively, use `rootMargin` to shrink the effective viewport (e.g., `-30% 0px -30% 0px` ignores top and bottom 30%).
**Warning signs:** Nav never highlights "QUEST LOG" section even when user is clearly reading it.

### Pitfall 3: CSS Scroll-Reveal Initial State Not Applied Before JS
**What goes wrong:** Timeline entries flash visible for a frame before JS applies `opacity:0`, causing a brief flash of unstyled content (FOUC-equivalent for animations).
**Why it happens:** CSS in a `<style>` block in Astro components is scoped and injected — but if the IntersectionObserver script runs after first paint, entries are briefly visible.
**How to avoid:** Put the initial `.exp-entry { opacity: 0; transform: translateY(20px); }` in `global.css` or ensure it's in the component's `<style>` block (Astro injects component styles before JS). The `@media (prefers-reduced-motion: reduce)` override also goes in the same CSS block to ensure entries are immediately visible for reduced-motion users regardless of JS state.
**Warning signs:** Brief flash of all timeline entries visible at once before animating.

### Pitfall 4: `unobserve` After Scroll-Reveal Fires
**What goes wrong:** Without `unobserve`, the IntersectionObserver callback fires repeatedly as the user scrolls in/out. The class is added, removed (if `entry.isIntersecting` is false), and entries re-animate on scroll back up.
**Why it happens:** IntersectionObserver tracks both enter and exit by default.
**How to avoid:** Call `revealObserver.unobserve(entry.target)` immediately after adding `.is-visible`. Entries reveal once and stay visible — matches D-14 intent (individual viewport entry, not repeating).
**Warning signs:** Timeline entries fade out when user scrolls back up past them.

### Pitfall 5: Box-Shadow Pixel Art Clipped by Ancestor overflow:hidden
**What goes wrong:** Avatar pixels that extend outside the base `<div>` element are invisible.
**Why it happens:** `box-shadow` paints outside the element — any ancestor with `overflow: hidden` clips it.
**How to avoid:** Ensure the `.dialogue-box` container and any intermediate wrappers do NOT set `overflow: hidden`. Panel.astro already documents this with a comment — mirror the same comment in DialogueSystem.
**Warning signs:** Avatar appears partially or completely invisible; may only show pixels within the base element bounds.

### Pitfall 6: prefers-reduced-motion Not Checked Server-Side
**What goes wrong:** DialogueSystem renders on server (Astro SSR/SSG), `window` is not available. Calling `window.matchMedia` at module top level throws.
**Why it happens:** Preact island `.tsx` files are both server-rendered (for HTML) and client-hydrated.
**How to avoid:** Always guard with `typeof window !== 'undefined'` check, or read the preference inside `useEffect` (runs client-only). Use `useRef` to cache the preference value so it's available during render.

---

## Code Examples

### DialogueSystem — Complete State Machine (Condensed)
```tsx
// Source: Preact hooks docs https://preactjs.com/guide/v10/hooks/
import { useState, useEffect, useRef } from 'preact/hooks';

const MESSAGES: Record<string, { text: string; expr: 'neutral' | 'excited' | 'warm' }> = {
  hero:       { text: "Welcome, Trainer! Your adventure begins here. Take a moment to get acquainted with your guide.", expr: 'excited' },
  about:      { text: "Ah, the Origin story. Every great journey starts somewhere — this is where ours began.", expr: 'warm' },
  experience: { text: "The Quest Log! Each entry marks a challenge faced and conquered. These victories shaped the Trainer you see today.", expr: 'excited' },
  projects:   { text: "The Pokédex... I mean, the Project Dex. Each entry is a creation, catalogued and ready for inspection.", expr: 'neutral' },
  skills:     { text: "The Inventory. Every tool, language, and framework collected on the road. A well-stocked bag.", expr: 'neutral' },
  contact:    { text: "A Rest Area at last! Save your progress and reach out — the Trainer is always happy to hear from fellow adventurers.", expr: 'warm' },
};

export default function DialogueSystem() {
  const [sectionId, setSectionId] = useState<string>('hero');
  const [charIndex, setCharIndex] = useState<number>(0);

  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const { text, expr } = MESSAGES[sectionId] ?? MESSAGES.hero;
  const isComplete = charIndex >= text.length;
  const displayed = text.slice(0, charIndex);

  // Listen for section changes from JourneyNav observer
  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: string }>).detail;
      setSectionId(id);
    };
    window.addEventListener('sectionChange', handler);
    return () => window.removeEventListener('sectionChange', handler);
  }, []);

  // Reset charIndex when section changes (D-03: immediate interrupt)
  useEffect(() => {
    setCharIndex(reducedMotion.current ? text.length : 0);
  }, [sectionId]);

  // Typewriter interval
  useEffect(() => {
    if (isComplete) return;
    const id = setInterval(() => setCharIndex(i => i + 1), 40);
    return () => clearInterval(id);
  }, [sectionId, isComplete]);

  const skip = () => setCharIndex(text.length);

  return (
    <div class="dialogue-system">
      <PixelAvatar expression={expr} />
      <button class="dialogue-box" onClick={skip} aria-label="Skip dialogue (click to reveal full message)">
        <span class="speaker-name" aria-label="GUIDE says:">GUIDE</span>
        <p role="status" aria-live="polite" class="dialogue-text">
          {displayed}{isComplete ? '▌' : ''}
        </p>
        {isComplete && <span class="prompt-indicator" aria-hidden="true">[A]</span>}
      </button>
    </div>
  );
}
```

### JourneyNav Observer Script (Astro `<script>` block)
```typescript
// Runs as ESM module after DOMContentLoaded (Astro bundles automatically)
const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

const navObserver = new IntersectionObserver((entries) => {
  // Track all currently-intersecting sections; pick most visible
  const intersecting = entries.filter(e => e.isIntersecting);
  if (!intersecting.length) return;
  const most = intersecting.reduce((a, b) =>
    a.intersectionRatio > b.intersectionRatio ? a : b
  );
  const activeId = most.target.id;

  // Update nav markers
  document.querySelectorAll('.nav-marker').forEach(el => {
    const isActive = (el as HTMLAnchorElement).getAttribute('href') === `#${activeId}`;
    el.classList.toggle('is-active', isActive);
    if (isActive) {
      el.setAttribute('aria-current', 'location');
    } else {
      el.removeAttribute('aria-current');
    }
    const diamond = el.querySelector('.diamond');
    if (diamond) diamond.textContent = isActive ? '◆' : '◇';
  });

  // Notify DialogueSystem Preact island
  window.dispatchEvent(new CustomEvent('sectionChange', { detail: { id: activeId } }));
}, { threshold: [0, 0.25, 0.5, 0.75, 1.0] });

sections.forEach(s => navObserver.observe(s));
```

### Experience Scroll Reveal (Astro `<script>` block)
```typescript
const expEntries = document.querySelectorAll('.exp-entry');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // reveal once, never re-hide
    }
  });
}, { threshold: 0.15 });

expEntries.forEach(el => revealObserver.observe(el));
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `window.scroll` events for scrollspy | `IntersectionObserver` | ~2018 (broad support) | Off-main-thread, no jank |
| `@astrojs/preact` manual config | `npx astro add preact` auto-install | Astro 2+ | One command handles everything |
| React for Astro islands | Preact for Astro islands | Astro 1+ | ~3KB vs 45KB runtime; identical API |
| CSS animation libraries (GSAP) | Native CSS transitions + `@keyframes` | Irrelevant for simple reveals | Per REQUIREMENTS.md — no GSAP |

**Deprecated/outdated:**
- `client:visible` instead of `client:load`: For DialogueSystem, `client:load` is correct — dialogue must be ready immediately, not wait for the island to scroll into view.

---

## Open Questions

1. **IntersectionObserver callback order vs. Preact hydration timing**
   - What we know: Astro `<script>` blocks (ESM modules) run after DOMContentLoaded. Preact `client:load` islands hydrate after page renders.
   - What's unclear: Exact execution order in Astro 6 — does `client:load` hydration complete before or after `<script>` blocks run?
   - Recommendation: Initialize DialogueSystem state to `'hero'` (default). If the first CustomEvent is missed, the correct message already shows. No special coordination needed.

2. **Should DialogueSystem use `client:load` or `client:idle`?**
   - What we know: `client:load` hydrates immediately. `client:idle` waits for browser idle time.
   - What's unclear: For portfolio users landing on hero section, the dialogue should appear immediately.
   - Recommendation: Use `client:load` (locked in D-01). Dialogue box is a core interactive feature, not a low-priority enhancement.

3. **Pixel avatar complexity vs. budget**
   - What we know: A full 16×16 pixel character needs up to 256 box-shadow entries per expression variant.
   - What's unclear: Whether 3 variants × ~50-100 visible pixels = 150-300 CSS rules is acceptable.
   - Recommendation: Build a simplified 8×10 pixel face/head only (not full body). Faces are expressive with ~30-60 pixels per variant. Full body adds no functional value for a 32×32 rendered size.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright `@playwright/test` v1.58.2 |
| Config file | `playwright.config.ts` (root) |
| Quick run command | `npx playwright test --project=chromium tests/interactive-layer.spec.ts` |
| Full suite command | `npx playwright test --project=chromium` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DLG-01 | Fixed dialogue box visible at bottom of viewport | smoke | `npx playwright test tests/interactive-layer.spec.ts -g "DLG-01"` | ❌ Wave 0 |
| DLG-02 | Typewriter effect renders partial text during animation | integration | `npx playwright test tests/interactive-layer.spec.ts -g "DLG-02"` | ❌ Wave 0 |
| DLG-03 | Dialogue text changes when different sections scroll into view | integration | `npx playwright test tests/interactive-layer.spec.ts -g "DLG-03"` | ❌ Wave 0 |
| DLG-04 | Avatar element visible alongside dialogue box | smoke | `npx playwright test tests/interactive-layer.spec.ts -g "DLG-04"` | ❌ Wave 0 |
| DLG-05 | Click skip — full message appears immediately | integration | `npx playwright test tests/interactive-layer.spec.ts -g "DLG-05"` | ❌ Wave 0 |
| DLG-06 | Reduced-motion: full text present immediately (no interval) | integration | `npx playwright test tests/interactive-layer.spec.ts -g "DLG-06"` | ❌ Wave 0 |
| EXP-04 | Timeline entries have .is-visible class after scroll | integration | `npx playwright test tests/interactive-layer.spec.ts -g "EXP-04"` | ❌ Wave 0 |

**Testing notes:**
- DLG-02 and DLG-06 require Playwright `page.emulateMedia({ reducedMotion: 'reduce' })` for the reduced-motion variant.
- DLG-03 requires `page.evaluate(() => window.scrollTo(0, offset))` to simulate scrolling to each section, then checking text content.
- DLG-05 can be tested by clicking the dialogue box mid-typewriter and asserting the full message is present.
- EXP-04 requires scrolling to `#experience` section and asserting `.exp-entry.is-visible` count >= 1.

### Sampling Rate
- **Per task commit:** `npx playwright test --project=chromium tests/interactive-layer.spec.ts`
- **Per wave merge:** `npx playwright test --project=chromium`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/interactive-layer.spec.ts` — covers DLG-01 through DLG-06 and EXP-04
- [ ] Preact integration install: `npx astro add preact` — required before any island code

*(Existing test infrastructure: `tests/design-system.spec.ts` and `tests/static-sections.spec.ts` both green and unaffected by Phase 3 changes.)*

---

## Sources

### Primary (HIGH confidence)
- Astro Preact integration docs (https://docs.astro.build/en/guides/integrations-guide/preact/) — install command, astro.config setup, tsconfig jsxImportSource
- MDN IntersectionObserver API (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) — threshold, rootMargin, observe/unobserve
- Preact hooks docs (https://preactjs.com/guide/v10/hooks/) — useState, useEffect, useRef patterns
- `npm view @astrojs/preact version` → 5.0.2 (verified 2026-03-22)
- `npm view preact version` → 10.29.0 (verified 2026-03-22)
- Existing codebase: JourneyNav.astro, ExperienceSection.astro, Panel.astro, ThemeToggle.astro, Layout.astro, package.json, astro.config.mjs (all read directly)

### Secondary (MEDIUM confidence)
- CSS box-shadow pixel art technique — multiple consistent sources (CSS-Tricks, DEV Community, CodeWorkshop) all describe identical `box-shadow` pixel placement approach
- Scrollspy IntersectionObserver pattern — MDN primary + multiple implementation examples confirming the single-observer-multiple-observe() pattern

### Tertiary (LOW confidence)
- None — all claims are supported by HIGH or MEDIUM sources

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified via npm registry 2026-03-22
- Architecture: HIGH — patterns from official Astro/Preact/MDN docs; code examples derived from existing project patterns
- Pitfalls: HIGH — 4 of 6 pitfalls derived from reading actual project code (Panel overflow comment, ThemeToggle pattern, ExperienceSection class names)
- Test map: HIGH — Playwright config and existing test patterns read directly from repo

**Research date:** 2026-03-22
**Valid until:** 2026-04-22 (stable APIs — Astro, Preact, IntersectionObserver all mature)
