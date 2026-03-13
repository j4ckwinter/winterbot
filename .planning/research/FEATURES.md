# Feature Landscape

**Domain:** Retro-modern, game-inspired personal portfolio website (GBA adventure aesthetic)
**Project:** WinterBot — WinterBot Portfolio
**Researched:** 2026-03-13
**Confidence:** MEDIUM — Derived from inspiration prototype analysis, project requirements, and domain expertise on portfolio/game-UI patterns. Web search unavailable; confidence based on depth of prototype review and established portfolio conventions.

---

## Table Stakes

Features that visitors expect. Missing one makes the site feel incomplete or unprofessional — regardless of the game theme.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero / identity section | First thing a visitor needs: who are you, what do you do | Low | Trainer Card + headline already in prototype; needs polish |
| Project showcase | Primary conversion goal — visitors want to see work | Medium | Dex-card grid in prototype; needs image/screenshot support |
| Experience / timeline | Establishes credibility and career arc | Medium | Quest Log in prototype; needs scroll-reveal and richer visual hierarchy |
| Skills / tech display | Visitors scan for tech fit quickly | Low-Med | Inventory grid in prototype; needs categorization and legibility |
| Contact / reach-out | A portfolio with no contact path is dead end | Low | Save Point / Rest Area in prototype; keep this concept |
| Navigation | Visitors must be able to orient and jump to sections | Low-Med | Missing from prototype entirely; journey metaphor nav required |
| Mobile responsive layout | >50% of portfolio traffic is mobile | Medium | Prototype has basic media query; needs full mobile-first pass |
| Readable body text | Game aesthetic must not sacrifice legibility | Low | Prototype uses IBM Plex Mono — correct choice; line-height and size need care |
| Accessible markup | Screen readers, keyboard nav, contrast | Medium | Prototype has none — semantic HTML, ARIA landmarks, focus management needed |
| Fast load / performance | Visitors bounce fast; static output required | Low | Astro handles this; image optimization and font loading strategy needed |
| Themed UI system (consistent tokens) | Inconsistent styling breaks the game-world illusion | Medium | Prototype has CSS custom properties — needs to become Tailwind config |
| Social / contact links | GitHub, LinkedIn at minimum | Low | Save Point buttons in prototype — already present |

---

## Differentiators

Features that make the site memorable. Not expected — but when done well, these are what people share and remember.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Dual color theme toggle (Fire / Leaf) | Instantly memorable interaction; signals craft and attention | Medium | Not in prototype; requires CSS custom property swap + Tailwind theme config |
| Dialogue box with typewriter + scroll awareness | The "guide character" dimension — makes it feel alive | Medium | In prototype at basic level; needs avatar integration, richer message set, smoother animation |
| Avatar / guide character reacting to scroll | Adds personality beyond just text | Medium | Prototype has CSS pixel-art avatar but no interactivity or guide role |
| Trainer Card as identity artifact | Reframes "about me" as collectible game object — immediately sets the tone | Low-Med | In prototype; needs portrait placeholder (real photo or illustrated avatar), XP bar or progress element |
| Quest Log with scroll-triggered reveal animations | Each career entry feels like a discovered chapter | Medium | Prototype has the structure but no animation; CSS keyframe entrance per item |
| Dex entry "number" / collectible framing on project cards | Projects feel like discoveries, not list items | Low | Prototype missing entry numbers; add `#001` style numbering |
| Journey metaphor navigation (path / progress indicator) | Communicates world-building without a literal map | Medium | Entirely missing from prototype; fixed sidebar or top progress bar showing journey position |
| Sticky styled scrollbar | Reinforces game-world consistency in a subtle way | Low | Already in prototype — keep and refine |
| Themed cursor | Crosshair cursor already set; small but memorable detail | Low | In prototype; ensure it doesn't hurt UX |
| Inventory skill grid with category tabs | Skills feel organized like an actual inventory menu | Medium | Prototype has flat grid; adding Weapons/Armor/Key Items style categories adds depth |
| Section-specific background world colors | Each section has its own "biome" feel | Low-Med | Prototype uses a single bg-ocean; varying per section (grass, path, forest) adds journey feel |
| Animated entrance per section (scroll-driven) | Rewards exploration — content arrives, not just appears | Medium | Nothing in prototype; Intersection Observer + CSS keyframe approach |
| Custom pixel font headings (DotGothic16) | Pixel aesthetic is only authentic if the typography commits | Low | Already in prototype — critical to maintain |
| Hard drop shadows on all panels | The GBA UI is defined by these | Low | In prototype — must be design system token, never ad-hoc |
| Inner border highlight on panels | Double-border effect replicates GBA dialog box | Low | In prototype (`panel::before`) — keep as design system pattern |

---

## Anti-Features

Things to deliberately NOT build. Common mistakes that hurt the vibe, add complexity without payoff, or undermine professionalism.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Actual Pokemon / Nintendo IP | Legal liability; site can be taken down | Use original design language that captures the vibe — no sprites, no Pokémon names, no trademarked terms |
| Literal overworld map navigation | High complexity, poor accessibility, mobile nightmare | Journey metaphor — visual path indicator or section progress, standard scroll underneath |
| Heavy canvas / WebGL effects | Kills performance on mobile and mid-range devices; over-engineering | CSS keyframes and transitions only; `will-change: transform` for animated elements |
| Sound / audio that autoplays | Universally hated; signals lack of professional judgment | If sound is added later, make it 100% opt-in with visible toggle |
| Particle effects or screenshake | Feels gimmicky, breaks the "premium polished" requirement | Subtle CSS entrance animations and hover feedback only |
| Overly complex state / client-side routing | Astro is a static site — don't fight the architecture | Use Astro's file-based static output; JS islands only where interactivity is genuinely needed |
| Skill bars / percentage meters | Subjective and unconvincing ("I'm 87% at React") | Inventory slot grid with categories — presence in inventory implies competence |
| Oversized first-load bundle | Kills Lighthouse score and first impression | Astro island architecture; dialogue/theme toggle JS is the only necessary runtime |
| Form-based contact in v1 | Requires backend or third-party service; complexity for no gain in v1 | Email link + social links in Save Point; form can be Phase 2 |
| Resume PDF download as primary CTA | Buries the portfolio experience | Link exists but is not the hero action; the site IS the resume |
| Dark/light semantic naming for Fire/Leaf themes | Conflating color theme with accessibility preference causes problems | Fire/Leaf are brand themes, not dark/light. Keep `prefers-color-scheme` independent from brand toggle |
| Inline styles for theme values | Breaks the design token system and makes refactoring painful | All theme values through Tailwind config and CSS custom properties only |
| Dialogue box blocking content on mobile | Fixed bottom element eats viewport on small screens | Make dialogue collapsible/dismissible on mobile; reduce to minimal height or slide-up sheet |
| Over-animating everything | "Scrolling soup" — every element bouncing makes nothing feel special | Animate section entrances and key interactive elements only; be selective |
| Real personal content in v1 | Blocks shipping while waiting for copy | Structured placeholder data throughout; swap in Phase 2 |

---

## Feature Dependencies

```
Theme toggle (Fire/Leaf)
  → Requires: CSS custom property system in Tailwind config
  → Required by: Every themed component

Dialogue box
  → Requires: Section IDs + Intersection Observer
  → Enhanced by: Avatar guide character

Avatar guide character
  → Requires: Dialogue box architecture
  → Requires: Asset (CSS-generated pixel art or illustrated SVG)

Journey metaphor navigation
  → Requires: Section IDs + scroll position tracking
  → Requires: Clear section order established in HTML

Scroll-triggered section animations
  → Requires: Intersection Observer utility
  → Required by: Quest Log reveal, Dex card reveal, Inventory slot reveal

Project Dex cards
  → Requires: Image/screenshot assets or themed placeholder

Inventory skill grid (categorized)
  → Requires: Category data structure in skill data model

Trainer Card
  → Requires: Portrait asset (photo, illustrated avatar, or styled placeholder)
```

---

## MVP Recommendation

The MVP is the full single-page layout with all sections present, the dialogue box working, and the Fire/Leaf toggle functional. Everything else (animations, interactivity depth, real content) layers on top.

**Prioritize for Phase 1:**
1. Design system: Tailwind tokens, Fire/Leaf theme toggle, panel/button component primitives
2. Static layout: all sections scaffolded, placeholder content, proper semantic HTML
3. Dialogue box: typewriter effect, scroll section awareness, avatar placeholder
4. Trainer Card hero section with stats
5. Quest Log timeline with placeholder experience entries
6. Dex-card project grid with placeholder screenshots
7. Inventory skills grid (flat, single category is fine for MVP)
8. Rest Area / Save Point contact section
9. Mobile-responsive layout pass
10. Basic accessibility: semantic HTML, ARIA landmarks, focus indicators

**Defer to Phase 2+:**
- Real personal content (copy, screenshots, real photo)
- Scroll-triggered entrance animations
- Journey metaphor navigation (journey progress indicator)
- Inventory category tabs
- Section-specific biome backgrounds
- Any sound/audio toggle

---

## Sources

- Project context: `/Users/jack.winter/dev/sandbox/winterbot/.planning/PROJECT.md` — HIGH confidence
- Prototype analysis: `/Users/jack.winter/dev/sandbox/winterbot/inspiration.html` — HIGH confidence (direct code inspection)
- Portfolio domain conventions: Established industry patterns — MEDIUM confidence (training data, no external verification available)
- GBA-era UI patterns: DotGothic16, chunky borders, hard shadows, panel double-border — HIGH confidence (well-documented design pattern)
- Anti-feature rationale: Web performance conventions, accessibility best practices — MEDIUM confidence
