# WinterBot Portfolio

## What This Is

A personal portfolio website for a senior frontend engineer, built with a retro adventure-game aesthetic inspired by the GBA-era Pokémon FireRed/LeafGreen games — without directly using any Nintendo/Pokémon IP. The site uses original design language that captures the emotional vibe of adventure, discovery, trainer identity, and world exploration, while remaining premium, polished, and professional.

Shipped v1.0: Fully interactive Astro + Tailwind CSS portfolio, deployed statically to Vercel, with 40 passing Playwright tests.

## Core Value

A memorable, interactive portfolio that makes visitors feel like they're embarking on an adventure — not just reading a résumé.

## Requirements

### Validated

- ✓ Retro-modern design system with pixel-inspired UI, chunky bordered panels, and hard drop-shadows — v1.0
- ✓ Dual color theme toggle: Fire mode (warm reds/oranges) and Leaf mode (greens/earth tones) — v1.0
- ✓ Hero section with trainer card / profile card element (name, class, level, region stats) — v1.0
- ✓ About Me section with character/identity framing — v1.0
- ✓ Experience section as a vertical quest log timeline with scroll-reveal animations — v1.0
- ✓ Projects section with collectible-style "dex entry" cards with hover lift — v1.0
- ✓ Skills section with inventory-style grid and click/keyboard tab filtering — v1.0
- ✓ Contact section styled as a "Rest Area / Save Point" — v1.0
- ✓ Fixed dialogue box with typewriter effect, section-aware messages, click-to-skip, reduced-motion support — v1.0
- ✓ CSS pixel art avatar guide that changes expression per section — v1.0
- ✓ Journey metaphor navigation with IntersectionObserver progress diamonds — v1.0
- ✓ CSS-based animations (no heavy libraries) with prefers-reduced-motion respect — v1.0
- ✓ Performant: static sections ship zero runtime JS (PERF-01), fully responsive at 320px (PERF-02) — v1.0
- ✓ 40 Playwright tests across 4 test suites covering all requirements — v1.0

### Active

- [ ] Real personal content (actual bio, job history, project screenshots, skills) — v2 content pass
- [ ] Fully responsive on tablets and larger breakpoints (beyond 320px minimum)
- [ ] Accessible audit (semantic HTML, ARIA, keyboard nav, contrast) beyond what's in v1

### Out of Scope

- Actual Pokémon IP, sprites, or trademarked assets — capture the vibe only
- Literal overworld map navigation — journey metaphor only
- Heavy WebGL or canvas effects — keep animations CSS-based and elegant
- Backend / server-side features — fully static
- Mobile app or PWA features
- GSAP / Framer Motion — CSS animations are sufficient

## Context

**Shipped v1.0 (2026-03-22):** ~21,000 lines added across 84 files. Astro 5 + Tailwind v4 + Preact, 40 Playwright tests all green. Key patterns established: Tailwind v4 CSS-first @theme tokens, `overflow-x: clip` on html+body for box-shadow clipping, IntersectionObserver with programmatic scroll lock, 2-char typewriter preload to close timing gap.

Placeholder content throughout — real data deferred to v2. GitHub push and Vercel deploy are configured but production URL is not yet shared.

## Constraints

- **Tech Stack**: Astro + Tailwind CSS — Astro for static output, Tailwind for design tokens and utility styling
- **Hosting**: Vercel free tier — static output only, no serverless functions needed
- **Assets**: No copyrighted Pokémon IP — all visual elements must be original
- **Animations**: CSS-based only — no heavy canvas/WebGL; performant and elegant
- **Content**: Placeholder in v1 — structured to be easily swapped with real data

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro + Tailwind over vanilla HTML | Component reuse, maintainability, Vercel-native, Tailwind design tokens for theme system | ✓ Good — Astro islands model worked perfectly for ThemeToggle + DialogueSystem |
| Journey metaphor nav (not literal map) | Literal map adds complexity without improving UX; metaphor gives the vibe with better accessibility | ✓ Good — IntersectionObserver diamonds shipped clean |
| Dual theme via CSS custom properties + Tailwind | Color toggle is a first-class feature — dark/light-style toggle between Fire and Leaf modes | ✓ Good — @theme block + [data-theme=leaf] CSS var reassignment worked without a build step |
| Placeholder content for v1 | Design system validated first, real content populated after | ✓ Good — validation proved the components before committing real content |
| Tailwind v4 CSS-first (no config file) | v4 is CSS-first — all tokens in @theme block; no tailwind.config.js needed | ✓ Good — cleaner than v3 approach |
| Preact for DialogueSystem island | Lightweight alternative to React for interactive islands; Astro supports it natively | ✓ Good — Preact overhead negligible, state management straightforward |
| `overflow-x: clip` on html AND body | box-shadow offsets on panels contributed to scrollWidth at 320px; `clip` prevents scroll context creation unlike `hidden` | ✓ Good — fixed PERF-02 without visual impact |
| Nyquist compliance (intentionally red tests) | Tests written before implementation as acceptance contract | ✓ Good — caught real issues; zero tests needed rewriting |

---
*Last updated: 2026-03-23 after v1.0 milestone*
