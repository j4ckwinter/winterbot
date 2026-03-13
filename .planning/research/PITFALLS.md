# Domain Pitfalls

**Domain:** Retro-modern, game-inspired portfolio website (GBA aesthetic, Astro + Tailwind)
**Researched:** 2026-03-13
**Confidence:** MEDIUM — grounded in well-established frontend failure patterns; external verification unavailable this session

---

## Critical Pitfalls

Mistakes that cause rewrites, kill the professional impression, or make the site unusable.

---

### Pitfall 1: Pixel Fonts Destroy Readability at Body Scale

**What goes wrong:** Developers fall in love with `DotGothic16` or similar pixel fonts and apply them to body copy, paragraph text, or small labels. At 14-16px on modern high-DPI screens, pixel fonts render with aliasing artifacts that make extended reading painful. The font looks great in headings at 24px+, but becomes illegible in anything longer than a line or two at smaller sizes.

**Why it happens:** The font looks correct in the designer's large-scale mockup. The degradation only appears at rendered scale in the browser, especially on non-retina displays.

**Consequences:** Body copy becomes unreadable. Accessibility contrast tools may pass while actual readability fails. Recruiters/clients bounce before reading the content. Screen readers are unaffected but sighted users suffer.

**Prevention:**
- Constrain pixel fonts to headings, UI chrome labels, and decorative elements only
- Use a clean monospace (e.g., `JetBrains Mono`, `IBM Plex Mono`) or a readable sans-serif for all body/paragraph text
- Test at 1x (non-retina) zoom as well as 2x — pixel fonts on non-retina look significantly worse
- Set a font size floor: pixel fonts below 18px should be avoided

**Detection:** Render the full page on a 1080p non-retina display. If you squint to read anything, the font is too small or wrong typeface for that use.

**Phase:** Design system (Phase 1 — establish font scale rules before any component work)

---

### Pitfall 2: Theme Toggle Causes Flash of Incorrect Theme (FOIT/FOUC)

**What goes wrong:** The dual Fire/Leaf theme toggle is implemented entirely in client-side JS or a React island. On page load, the browser renders the HTML before JS executes, flashing the default theme (usually 100-300ms) before the user's saved preference is applied. On a retro site with dramatically different color palettes, this flash is jarring and looks broken.

**Why it happens:** Astro's default hydration is deferred. Any `localStorage`-based theme preference read happens after paint. CSS custom properties set by JS inherit this delay.

**Consequences:** Every repeat visitor sees a color flash on every page load. The site feels unpolished. On slow connections, the flash can last over a second.

**Prevention:**
- Inject a blocking `<script>` in `<head>` (before any CSS loads) that reads `localStorage` and sets the theme attribute synchronously: `document.documentElement.setAttribute('data-theme', savedTheme)`
- Never use a JS framework island for the initial theme application — the island hydrates too late
- In Astro, use `is:inline` on the script tag to prevent it from being deferred or bundled
- Define the default theme via CSS `[data-theme="fire"]` on `:root` so no-JS visitors get a coherent experience

**Detection:** Open DevTools, throttle to "Slow 3G", hard-reload. Any color shift after initial paint = FOUC present.

**Phase:** Design system (Phase 1 — the theme infrastructure must be flash-free before building any themed components)

---

### Pitfall 3: Retro Aesthetic Fails Contrast Requirements

**What goes wrong:** The GBA color palette — warm parchment backgrounds, muted greens, earthy reds — tends toward low-contrast combinations. The aesthetic pull is toward "faded" and "aged" tones. These often fail WCAG AA (4.5:1 for normal text, 3:1 for large text). Pixel fonts compound this because their strokes are thinner and more fragmented than normal fonts, requiring even higher contrast to be perceivable.

**Why it happens:** The designer is optimizing for vibe, not contrast ratio. Warm parchment (#f5e8c0) against a mid-tone orange (#d97706) is visually appealing but can fail AA for body text.

**Consequences:** The site fails accessibility audits. More practically: the content is hard to read in bright ambient light (outdoor laptop use). Users with low vision may not be able to read at all.

**Prevention:**
- Build a color token system from the start where each token has a verified contrast partner
- Test every text/background pair with a contrast checker before finalizing the design token
- Prefer high-contrast text (near-black on parchment, near-white on dark) and reserve low-contrast for purely decorative elements with no readable text
- For pixel fonts specifically, aim for 7:1 contrast minimum on body-scale usage due to the thinner effective stroke

**Detection:** Run Lighthouse accessibility audit. Use browser devtools' color contrast checker on every text element. Look for any amber warnings.

**Phase:** Design system (Phase 1 — bake accessibility into tokens, not retrofitted later)

---

### Pitfall 4: The Gimmick Overwhelms the Content

**What goes wrong:** The retro aesthetic becomes the product. Visitors spend their time clicking the dialogue box, toggling the theme, and admiring the pixel borders — and leave without absorbing the actual portfolio content. The site is impressive in a demo but fails as a professional tool because the experience design puts entertainment above information delivery.

**Why it happens:** It's more fun to polish the vibe than to think about content hierarchy. The typewriter effect, the avatar, the scroll-triggered dialogue box — these are engaging to build and delay the uncomfortable question: "Does my work actually speak for itself?"

**Consequences:** Recruiters and hiring managers, who spend 2-3 minutes on a portfolio, extract less information. The site reads as a fun project rather than a professional presentation. The gimmick ages poorly and may feel juvenile on a second visit.

**Prevention:**
- Apply a "content-first" audit pass: cover all UI chrome and ask if the remaining content communicates Jack's value clearly and quickly
- Every interactive element must serve information delivery — the dialogue box should surface relevant context, not just flavor text
- Set a rule: the visual weight of the aesthetic must not exceed the visual weight of the actual work/experience content
- Design the "skimmable version" — someone tabbing through in 90 seconds should still get the full picture

**Detection:** Show the site to someone unfamiliar. Ask them to summarize what Jack does and what he's built. If they struggle, the gimmick is winning over the content.

**Phase:** All phases, but especially content wiring (Phase 3 — when real content goes in, reassess information hierarchy)

---

### Pitfall 5: Nintendo/Pokémon IP Creep

**What goes wrong:** The design starts IP-clean, then gradually absorbs protected elements: color schemes that match exactly, UI widget shapes that are clearly derivative of specific game screens, terminology like "Pokédex," "Trainer," "HP," or sound effects lifted from the games. Individual elements may seem harmless, but the aggregate tips into infringement territory.

**Why it happens:** The inspiration is so specific (FireRed/LeafGreen) that the natural design choices converge on the source material. When something "feels right" aesthetically, it often does so because it closely resembles the original.

**Consequences:** Nintendo's IP enforcement is aggressive and well-documented. A DMCA takedown removes the site from the internet. Worse: a portfolio that draws attention for the wrong reasons is professionally damaging.

**Prevention:**
- Establish explicit divergence rules at design system time: the color palette must not match the actual game palette — use adjacent tones that evoke without copying
- Banned terminology list: no direct Pokémon terms (Pokédex, HP as "hit points", type names, move names). Generic adventure RPG language is fine: "Quest Log", "Inventory", "Level", "Region", "Skill Tree"
- Banned asset list: no sprites or sprite derivatives, no exact GBA UI border patterns, no sound effects from the games
- Have someone familiar with FireRed/LeafGreen review the final design specifically for unconscious copying

**Detection:** Compare final designs directly against actual FireRed/LeafGreen screenshots. If someone could use a screenshot as a direct reference and mistake your UI for the game, revise.

**Phase:** Design system (Phase 1 — set the divergence rules before building; much harder to fix later)

---

### Pitfall 6: Mobile Responsiveness Breaks Chunky UI

**What goes wrong:** The chunky-border, hard-drop-shadow, pixel-corner aesthetic is designed for desktop. On mobile viewports (375px-430px), the thick borders eat into content width, the drop shadows get clipped or overflow, and the fixed dialogue box at the bottom consumes 20-25% of screen height — leaving little room for content. The skills inventory grid (designed as a grid) collapses into a single column that loses the inventory metaphor entirely.

**Why it happens:** The aesthetic vocabulary is borrowed from GBA hardware (240x160 resolution, fixed screen) but applied to fluid web layouts without adapting the design language for mobile constraints.

**Consequences:** On mobile (which represents 50%+ of portfolio traffic from shared links on social/messaging apps), the site looks broken or unusable. The very chunky aesthetic that makes it distinctive on desktop makes it cramped on mobile.

**Prevention:**
- Mobile-first build discipline: start with 375px viewport, then enhance upward
- Reduce border weights and drop-shadow offsets for mobile (e.g., 4px border → 2px border at mobile)
- The fixed dialogue box should be collapsed/dismissible on mobile, not a permanent 20vh fixture
- The inventory grid needs a mobile-adapted layout that preserves the metaphor even at 2-column or single-row
- Test on a real iOS Safari device — Safari's handling of `position: fixed` within scroll containers has historically misbehaved

**Detection:** Open Chrome DevTools mobile view at 375px width. If any content is clipped, overflowing, or the dialogue box obscures more than 15% of viewport, revise.

**Phase:** Each component phase — mobile responsiveness must be built-in per component, not a final polish pass

---

### Pitfall 7: Typewriter / Scroll-Triggered Animation Hurts Usability

**What goes wrong:** The typewriter dialogue box has a charming effect the first time. On repeat visits, it becomes an obstacle — content the user already knows is being spelled out letter by letter, and they cannot read ahead. Similarly, scroll-triggered reveals that withhold content until the user reaches a precise scroll position punish users who tab-navigate or use keyboard shortcuts, and can cause content to never appear if the scroll trigger fires at the wrong time.

**Why it happens:** Animation is optimized for first-time delight, not repeat usability. The typewriter speed that feels perfect on first visit (40ms/char) feels agonizingly slow on the third visit.

**Consequences:** Repeat visitors are actively frustrated. Keyboard-only users may encounter sections that never reveal their content. Users with `prefers-reduced-motion` enabled get no affordance.

**Prevention:**
- Typewriter effect: provide a "skip" interaction (click/tap to complete instantly). On repeat visits (detectable via `localStorage`), start with text already revealed
- Scroll-triggered reveals: use `IntersectionObserver` with a generous threshold (element 20% in view, not 80%) to prevent content from being stranded
- All scroll-triggered animations must be present (non-animated, fully visible) when `prefers-reduced-motion: reduce` is set
- Keyboard navigation must not depend on scroll position to reveal content — all content must be reachable via Tab without triggering scroll animations first

**Detection:** Navigate the entire page using only Tab and arrow keys, no mouse. Every piece of content should be reachable. Then enable "Emulate CSS media feature prefers-reduced-motion" in DevTools — all content should be visible and static.

**Phase:** Interactive components (Phase 2 — build motion correctly from the start, not retrofitted)

---

### Pitfall 8: Font Loading Causes Layout Shift (CLS) and FOUT

**What goes wrong:** `DotGothic16` is a Google Font loaded via `<link>` in `<head>`. Until it loads, the browser renders fallback system fonts (typically a proportional sans-serif). Pixel font character widths differ dramatically from sans-serif fallbacks, causing significant layout shift when the font swaps in — headings reflow, panel widths change, the entire layout jumps. The `font-display: swap` behavior that prevents invisible text makes the shift visible.

**Why it happens:** Pixel fonts have no system-font equivalent. The metric override technique (adjusting `ascent-override`, `descent-override`, `advance-override` on a fallback font) is effective for common fonts like Inter but requires manual calibration for obscure pixel fonts.

**Consequences:** High Cumulative Layout Shift (CLS) score, which hurts Core Web Vitals. Visible jarring jump on first load. Users who have the font cached don't see this — so it's systematically invisible to the developer.

**Prevention:**
- Self-host `DotGothic16` (or chosen pixel font) via `@font-face` in the CSS bundle rather than loading from Google Fonts CDN — eliminates the additional DNS lookup and allows proper preloading
- Add `<link rel="preload" as="font" crossorigin>` for the pixel font in `<head>`
- Use `font-display: optional` for the pixel font if layout shift is severe — this shows the fallback if the font isn't cached, without a swap jump. Acceptable because the fallback is still readable
- Reserve the pixel font strictly for headings/decorative text — if it's not used for body copy, the layout shift impact is limited to a smaller number of elements

**Detection:** Run Lighthouse with CPU throttling enabled, check CLS score. Use the Layout Shift regions overlay in Chrome DevTools to see which elements shift.

**Phase:** Design system (Phase 1 — font loading strategy must be decided before any component builds on it)

---

## Moderate Pitfalls

---

### Pitfall 9: Over-Engineering the Avatar/Guide Component

**What goes wrong:** The small avatar that reacts to user interaction expands in scope. What begins as "avatar points to the current section" becomes a full state machine with dozens of expressions, hover states, scroll states, and click reactions — built as a complex React island with significant JS weight.

**Prevention:**
- Define the avatar's interaction surface explicitly before building: list every state it can be in, and cap it at 5-6 states
- Build it as a pure CSS animation system with class-swapping rather than a stateful JS component
- The avatar should have zero JS bundle weight if there are no scroll/interaction events being tracked — use CSS `:hover` and data attribute toggling from minimal vanilla JS

**Phase:** Interactive components (Phase 2)

---

### Pitfall 10: Astro Island Overuse Undermines Static Performance

**What goes wrong:** Adding React client islands for every interactive element — the theme toggle, the dialogue box, the avatar — accumulates hydration overhead that erodes Astro's static-site performance advantage. Each island ships its own React runtime if not carefully configured.

**Prevention:**
- Use `client:load` only when absolutely necessary; prefer `client:idle` or `client:visible`
- The theme toggle (reads/writes localStorage) should be vanilla JS in an `is:inline` script, not a React island
- The typewriter dialogue box can be implemented as a Web Component or vanilla JS class without React
- Keep React islands for genuinely stateful components (contact form if added later)
- Audit the bundle: `astro build && astro preview` with network tab open — any island should explain its JS cost

**Phase:** All component phases; establish the island budget in Phase 1

---

### Pitfall 11: Journey Metaphor Navigation Confuses Rather Than Delights

**What goes wrong:** The "path/progress" navigation metaphor — showing a visual trail of the page sections as waypoints — looks compelling in mockups but confuses users who don't immediately recognize it as navigation. Users don't know they can click the waypoints. The metaphor competes with the standard scroll experience. On mobile, it becomes invisible or unusably small.

**Prevention:**
- The journey nav must be discoverable within 3 seconds without instruction — if it isn't, it's decorative, not functional
- Provide a visual affordance on hover/focus that clearly communicates "this is clickable navigation"
- On mobile, either remove it in favor of a standard mobile nav, or transform it into a progress indicator only (non-interactive)
- Test with someone who hasn't seen the site before: can they navigate to the Skills section without scrolling?

**Phase:** Navigation (Phase 2)

---

## Minor Pitfalls

---

### Pitfall 12: Placeholder Content Obscures Real Information Architecture Problems

**What goes wrong:** The design is built and validated entirely on placeholder content ("Lorem ipsum trainer is at level 42"). When real content is swapped in, it doesn't fit the established containers — the project description is 4x longer than the placeholder, the job titles overflow the timeline markers, the skills list has 40 items instead of the 12 the grid was designed for.

**Prevention:**
- Use realistic-length placeholder content that approximates actual content — not Lorem Ipsum
- Define content bounds for each component: "project card description: max 2 sentences / 200 characters", "skill item label: max 20 chars"
- In Phase 1/2, design components with min/max content ranges in mind

**Phase:** Content wiring (Phase 3 — define content contracts before real swap-in)

---

### Pitfall 13: Hard Drop Shadows Clip at Container Boundaries

**What goes wrong:** CSS `box-shadow` is clipped when a parent has `overflow: hidden`. The chunky hard drop-shadow aesthetic depends on visible offsets (8-12px). If any panel is inside a `overflow: hidden` scroll container or a clipping ancestor, the shadow disappears or is cut off, looking broken.

**Prevention:**
- Audit every component's ancestor chain for `overflow: hidden` before adding drop shadows
- Use `filter: drop-shadow()` as an alternative — it is not clipped by `overflow: hidden` on the element itself (though parent `overflow: hidden` still clips it)
- Add the shadow via a pseudo-element (`::after`) positioned outside the element's box if clipping is unavoidable

**Phase:** Design system (Phase 1 — establish shadow implementation pattern once)

---

### Pitfall 14: `prefers-reduced-motion` Not Respected on Scroll Triggers

**What goes wrong:** CSS keyframe animations on scroll-triggered elements respect `prefers-reduced-motion` if written with `@media (prefers-reduced-motion: reduce)`, but `IntersectionObserver`-driven class additions that trigger CSS transitions bypass this if the developer doesn't check the media query in JS before adding classes.

**Prevention:**
- Create a single utility: `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- Gate all JS-driven animation class additions behind this check
- In CSS, always wrap animation/transition rules in `@media (prefers-reduced-motion: no-preference)` rather than overriding in a `reduce` block — safer default

**Phase:** Interactive components (Phase 2)

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Design system tokens | IP creep via color palette too close to actual game | Establish divergence rules; compare against actual FireRed screenshots |
| Design system fonts | Pixel font readability at body scale; CLS from font swap | Constrain pixel font to headings; self-host with preload |
| Design system theme | FOUC on theme toggle | Blocking inline script in `<head>` before CSS; `is:inline` in Astro |
| Design system colors | Contrast failures on parchment/warm tones | Verify every token pair meets WCAG AA before building components |
| Interactive components | Typewriter blocking repeat visitors | Skip mechanism + reduced-motion check from day one |
| Interactive components | Avatar scope creep | Cap states at 5-6; CSS-first implementation |
| Interactive components | Journey nav confusion | Discoverable within 3s; mobile fallback designed up front |
| All components | Mobile layout breakage from chunky UI | Build mobile-first; dial back border/shadow weights for mobile |
| All components | Astro island JS accumulation | Track island budget; prefer `is:inline` vanilla JS for UI-only interactions |
| Content wiring | Real content doesn't fit designed containers | Use realistic-length placeholders; define content contracts per component |

---

## Sources

- Confidence: MEDIUM — findings grounded in established frontend engineering patterns (WCAG, Core Web Vitals, Astro docs behavior, CSS specification behavior). External web verification unavailable this session. Specific technical claims (Astro `is:inline` behavior, CSS `filter: drop-shadow` clipping behavior, `IntersectionObserver` + `prefers-reduced-motion` interaction) are HIGH confidence from specification knowledge. Claims about Nintendo IP enforcement posture are MEDIUM confidence from well-documented public record through August 2025.
- WCAG 2.1 contrast requirements: https://www.w3.org/TR/WCAG21/#contrast-minimum
- Astro script directives: https://docs.astro.build/en/guides/client-side-scripts/
- CSS `font-display` specification: https://drafts.csswg.org/css-fonts-4/#font-display-desc
- Core Web Vitals (CLS): https://web.dev/cls/
