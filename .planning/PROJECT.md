# WinterBot Portfolio

## What This Is

A personal portfolio website for a senior frontend engineer, built with a retro adventure-game aesthetic inspired by the GBA-era Pokémon FireRed/LeafGreen games — without directly using any Nintendo/Pokémon IP. The site uses original design language that captures the emotional vibe of adventure, discovery, trainer identity, and world exploration, while remaining premium, polished, and professional.

Built with Astro + Tailwind CSS, deployed statically to Vercel.

## Core Value

A memorable, interactive portfolio that makes visitors feel like they're embarking on an adventure — not just reading a résumé.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Retro-modern design system with pixel-inspired UI, chunky bordered panels, and hard drop-shadows
- [ ] Dual color theme toggle: Fire mode (warm reds/oranges) and Leaf mode (greens/earth tones)
- [ ] Hero section with trainer card / profile card element (name, class, level, region stats)
- [ ] About Me section with character/identity framing
- [ ] Experience section as a vertical quest log timeline (improved over inspiration)
- [ ] Projects section with collectible-style "dex entry" cards (improved over inspiration)
- [ ] Skills section with inventory-style grid (improved over inspiration)
- [ ] Contact section styled as a "Rest Area / Save Point" (keep this wording)
- [ ] Fixed dialogue box at bottom of screen with typewriter effect, reacts to scroll section (improved over inspiration)
- [ ] Small avatar/character guide that reacts to user interaction
- [ ] Journey metaphor navigation — path/progress visual, standard scroll underneath
- [ ] Playful but elegant animations (no heavy effects — CSS transitions, subtle keyframes)
- [ ] Fully responsive (mobile-first)
- [ ] Accessible (semantic HTML, ARIA, keyboard nav, sufficient contrast)
- [ ] Performant (Astro static output, minimal JS islands, optimized assets)
- [ ] Placeholder content throughout (real content swapped in later)

### Out of Scope

- Actual Pokémon IP, sprites, or trademarked assets — capture the vibe only
- Literal overworld map navigation — journey metaphor only
- Heavy WebGL or canvas effects — keep animations CSS-based and elegant
- Backend / server-side features — fully static
- Real professional content in v1 — placeholder data used throughout
- Mobile app or PWA features

## Context

The `inspiration.html` file in the project root is a single-file HTML prototype that establishes the visual direction. Key concepts to carry forward (but significantly improve):
- **Dialogue box**: Fixed bottom speech bubble with typewriter effect — improve the design, animation quality, and avatar integration
- **Quest log timeline**: Vertical timeline with markers for experience — improve visual richness and animation
- **Inventory grid**: Skills displayed as item slots — improve interactivity and visual hierarchy
- **"Rest Area" contact**: Keep this wording/concept for the contact section

The design language borrows from GBA-era game UIs: `DotGothic16` or similar pixel font for headings, monospace for body, chunky borders, hard drop-shadows, warm parchment backgrounds for UI panels against rich world-color backgrounds.

## Constraints

- **Tech Stack**: Astro + Tailwind CSS — Astro for static output, Tailwind for design tokens and utility styling
- **Hosting**: Vercel free tier — static output only, no serverless functions needed
- **Assets**: No copyrighted Pokémon IP — all visual elements must be original
- **Animations**: CSS-based only — no heavy canvas/WebGL; performant and elegant
- **Content**: Placeholder in v1 — structured to be easily swapped with real data

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro + Tailwind over vanilla HTML | Component reuse, maintainability, Vercel-native, Tailwind design tokens for theme system | — Pending |
| Journey metaphor nav (not literal map) | Literal map adds complexity without improving UX; metaphor gives the vibe with better accessibility | — Pending |
| Dual theme via CSS custom properties + Tailwind | Color toggle is a first-class feature — dark/light-style toggle between Fire and Leaf modes | — Pending |
| Placeholder content for v1 | Design system validated first, real content populated after | — Pending |

---
*Last updated: 2026-03-13 after initialization*
