# Milestones

## v1.0 MVP (Shipped: 2026-03-23)

**Phases completed:** 4 phases, 14 plans, 26 tasks

**Key accomplishments:**

- Astro 5 + Tailwind v4 project scaffolded with @tailwindcss/vite Vite plugin and 7 Playwright smoke tests defining the DS-01 through DS-06 acceptance contract
- Dual-theme CSS token system via Tailwind v4 @theme block, FOUC-prevention Layout.astro, and Panel component — all 7 DS smoke tests green
- Panel.astro reusable card wrapper with GBA-signature 4px border + 6px hard drop-shadow + ::before inner highlight ring, and ThemeToggle client island for Fire/Leaf switching with localStorage persistence
- Git repository initialized with all 6 Playwright smoke tests passing; GitHub push and Vercel connection deferred by user decision
- astro-icon + @iconify-json icon packs installed, 21 intentionally-failing Playwright stubs written for all Phase 2 requirements, smooth scroll added to global.css
- Fixed left sidebar JourneyNav with 6 diamond markers, HeroSection trainer card (portrait/stats/level-bar), and AboutSection — plus all remaining section stubs created ahead of schedule by linter
- Quest log timeline (ExperienceSection) and Pokédex card grid (ProjectsSection) built as static Astro components with placeholder content, 6/6 Playwright tests green
- ARIA tablist inventory grid with 12 icon+tooltip skill slots and a "Rest Area / Save Point" contact section with warm Panel styling
- All six GBA-themed section components assembled into index.astro, 21/21 Playwright tests green, and vertical section rhythm standardized to uniform padding-block: 4rem across all sections
- CSS hover lift animation on ProjectCard (translateY + box-shadow) closes PROJ-03; dead Panel import removed from ExperienceSection
- Preact integration configured, 7 failing Playwright stubs written (Nyquist), and EXP-04 scroll-reveal (350ms fade+slide-up via IntersectionObserver) implemented on experience timeline entries
- RPG-style fixed dialogue box with CSS pixel art avatar, typewriter animation (40ms/char), section-aware messages via IntersectionObserver/scrollIntoView intercept, click-to-skip, and reduced-motion support — all 7 Playwright tests green
- Click-driven skill category filtering with ARIA state management and mobile flex-wrap fix wired into SkillsSection.astro
- Playwright test suite covering PERF-01, PERF-02, and skill tab filtering — all 5 tests green across 40-test full suite

---
