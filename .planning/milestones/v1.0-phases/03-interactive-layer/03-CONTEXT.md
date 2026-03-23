# Phase 3: Interactive Layer - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

The site feels alive — the dialogue box reacts to scroll, the theme toggle works flawlessly, scroll-triggered animations reveal content, and every interactive behavior respects reduced-motion preferences. No new sections or content; this phase adds behavior on top of the static structure from Phase 2.

Requirements: EXP-04, DLG-01, DLG-02, DLG-03, DLG-04, DLG-05, DLG-06

</domain>

<decisions>
## Implementation Decisions

### DialogueSystem — tech choice
- **D-01:** Built as a Preact island (`client:load`) — reactive state handles section tracking, typewriter progress, and avatar expression in one coherent component
- **D-02:** Contained box layout — not full-width. Centered, max-width constrained, sits fixed at bottom of viewport overlaying page content (not pushing content up)
- **D-03:** New section message interrupts immediately — when IntersectionObserver fires for a new section, typewriter resets and starts the new message from char 0, no waiting for current message to finish
- **D-04:** Layout and z-index are Claude's discretion — must coexist with JourneyNav sidebar (fixed left) and ThemeToggle (header)

### DialogueSystem — text & personality
- **D-05:** Second-person companion voice — guide speaks directly to the visitor ("You've arrived at...", "Let's see what adventures await")
- **D-06:** Warm and encouraging tone throughout — welcoming, never dry or deadpan
- **D-07:** Game UI mechanical flavor: blinking cursor `▌` at end of completed messages, speaker name tag above the text box
- **D-08:** All six section messages are Claude's discretion — calibrated to second-person, warm/encouraging, with game-system flavor

### DialogueSystem — avatar
- **D-09:** CSS pixel art character — small sprite built from divs/box-shadows. Positioned to the left of the text box (classic RPG speaker portrait layout)
- **D-10:** 3 expression states: neutral (default), excited, warm — mapped across 6 sections at Claude's discretion
- **D-11:** Speaker name tag reads **"GUIDE"** — fits the adventure theme, no IP risk
- **D-12:** Avatar character design (colors, pixel layout, exact appearance) is Claude's discretion — must use design token colors, not hardcoded values

### Experience timeline scroll animations (EXP-04)
- **D-13:** Animation: fade + slide-up — `opacity: 0 → 1`, `translateY: 20px → 0`
- **D-14:** Individual viewport entry — each timeline entry animates when it individually scrolls into view via IntersectionObserver, not triggered as a batch when the section enters
- **D-15:** Marker and content card animate together as a single unit — no staggered marker-first reveal
- **D-16:** Duration: 350ms ease-out — deliberate enough to feel like a quest reveal, not jarring
- **D-17:** Reduced-motion: entries appear immediately with no animation when `prefers-reduced-motion: reduce` is set

### Journey nav active state
- The JourneyNav currently hardcodes `defaultActive: true` on "hero". Phase 3 wires this to scroll via IntersectionObserver — active marker updates as user scrolls through sections. This is implied by DLG-03 (same observer can power both) and the Phase 3 goal.

### Claude's Discretion
- Exact dialogue messages for all six sections (warm, second-person, game-flavored)
- CSS pixel art avatar design (colors, pixel grid, expression variants)
- Expression-to-section mapping (3 states across 6 sections)
- DialogueSystem layout, sizing, and z-index relative to nav and header
- Preact component file structure (single component vs. split sub-components)

</decisions>

<specifics>
## Specific Ideas

- Dialogue box: classic RPG speech bubble at bottom — speaker portrait left, name tag above text, blinking `▌` cursor at end of completed message, `[A]` or similar button prompt
- Typewriter: character-by-character with IntersectionObserver firing section changes; new section immediately resets and starts new message
- Avatar: CSS pixel art using design token colors — 3 states (neutral/excited/warm) expressed through pixel changes (eyes, mouth, etc.)
- Experience entries: each `<li class="exp-entry">` gets `opacity:0; transform: translateY(20px)` initially, IntersectionObserver adds an `.is-visible` class that transitions to `opacity:1; transform: none` over 350ms ease-out

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements are fully captured in decisions above and in REQUIREMENTS.md.

### Requirements
- `.planning/REQUIREMENTS.md` §Dialogue System (DLG-01–06) — full dialogue system spec
- `.planning/REQUIREMENTS.md` §Experience (EXP-04) — scroll-triggered reveal requirement
- `.planning/REQUIREMENTS.md` §Out of Scope — confirms no GSAP/Framer Motion; CSS animations only; Preact or vanilla JS only

### Existing components to extend
- `src/components/nav/JourneyNav.astro` — currently static; needs IntersectionObserver script to update active marker on scroll
- `src/components/sections/ExperienceSection.astro` — timeline entries need scroll-reveal classes and IntersectionObserver wiring

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Panel.astro` — DialogueSystem box should use or mirror the Panel aesthetic (chunky border, hard drop-shadow, inner highlight) for visual consistency
- `ThemeToggle.astro` — already a `client:load` Preact island; DialogueSystem follows the same pattern
- `JourneyNav.astro` — fixed left sidebar, z-index 100; DialogueSystem must not conflict
- `ExperienceSection.astro` — `.exp-entry` / `.timeline-entry` classes on `<li>` elements; these are the targets for scroll-reveal

### Established Patterns
- CSS custom properties: `--color-world`, `--color-surface`, `--color-border`, `--color-text`, `--color-accent-primary`, `--color-accent-secondary`, `--color-shadow` — DialogueSystem and avatar must use these, not hardcoded values
- `data-theme="fire"` / `data-theme="leaf"` on `<html>` — all components inherit automatically; avatar pixel art should theme-aware
- FOUC script: `is:inline` blocking script already handles theme on load — no changes needed
- `prefers-reduced-motion`: already handled in `global.css` for scroll behavior; same pattern extends to new animations

### Integration Points
- `src/pages/index.astro` — DialogueSystem island added here as `<DialogueSystem client:load />`
- `src/layouts/Layout.astro` — DialogueSystem may be better placed here (persistent across all pages); either location works
- `JourneyNav.astro` — active state JS can be a `<script>` block within the component (Astro bundles as ESM), observing all 6 section IDs: `hero`, `about`, `experience`, `projects`, `skills`, `contact`
- `ExperienceSection.astro` — IntersectionObserver script for scroll-reveal added as `<script>` block in this component

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-interactive-layer*
*Context gathered: 2026-03-22*
