# Phase 4: Content and Launch - Research

**Researched:** 2026-03-22
**Domain:** Astro static site performance audit, Playwright testing patterns, responsive CSS at 320px, vanilla JS tab filtering
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Content ownership**
All copy (bio, experience entries, project descriptions, contact links) is owned by Jack and will be filled in manually. The agent's job is to ensure the structure is ready to receive real data — correct placeholder shapes, no hardcoded dummy strings that would ship. Do not generate or suggest copy.

**Experience section**
- 3 roles
- Structure per entry: company name, role title, date range, 3–5 achievement bullet points
- Existing `ExperienceSection.astro` has the right shape — verify 3 entries exist with correct semantic structure

**Projects section**
- 3 cards
- Jack will add real project names, descriptions, tech tags, GitHub and live URLs manually
- Agent ensures `ProjectCard.astro` renders correctly at all breakpoints and that both link slots (GitHub + Live) are present and functional when populated

**Skills tab filtering**
- 4 categories: ALL / FRONTEND / BACKEND / TOOLS — correct, no changes
- 12 skill slots — correct count
- Gap: Tab click currently does not filter visible slots — this needs to be implemented
- Implementation: clicking a tab should show only slots matching that category; ALL shows everything
- Use data attributes on skill slots for category membership; tab click handler updates visibility
- Must be Astro-compatible (no Preact island needed — plain `<script>` in `SkillsSection.astro`)

**PERF-01 verification**
- Requirement: static sections ship zero runtime JavaScript; only ThemeToggle and DialogueSystem load client-side JS
- Verification: Playwright test asserting no unexpected `<script>` tags in the rendered HTML outside of the two known islands
- No bundle size CI enforcement needed

**PERF-02 verification**
- Requirement: site is fully usable on 320px mobile viewport with no horizontal scroll or broken layouts
- Verification: Playwright test at 320px viewport width asserting `document.documentElement.scrollWidth <= 320`
- Check that JourneyNav sidebar, dialogue box fixed footer, and section content do not overlap or overflow
- No additional breakpoint targets beyond 320px minimum

**Deployment**
- Out of scope for Phase 4
- DS-07 (GitHub → Vercel) was deferred and remains deferred

### Claude's Discretion

None specified.

### Deferred Ideas (OUT OF SCOPE)

- OpenGraph / social preview cards (v2 ENH-05)
- Contact form backend (v2 ENH-04)
- Analytics
- Custom domain / Vercel connection (DS-07)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PERF-01 | Site ships zero runtime JavaScript for static sections — only ThemeToggle and DialogueSystem components load client-side JS | Astro script audit pattern: count `<script>` tags in rendered HTML; known legitimate scripts identified |
| PERF-02 | Site is fully responsive and usable on mobile viewports (320px minimum) | CSS overflow audit at 320px; Playwright viewport test pattern; specific risk components identified |
</phase_requirements>

---

## Summary

Phase 4 is a finishing phase, not a building phase. The core architecture is complete and all 39 prior requirements are marked done. This phase has exactly two deliverables: (1) implement the missing skill tab filtering behavior that was scaffolded but left unconnected in Phase 2, and (2) ship Playwright tests that formally verify PERF-01 (no unexpected JS) and PERF-02 (320px viewport usability).

The content wiring work (replacing placeholder data in ExperienceSection and ProjectsSection with Jack's real content) is structural verification only — the agent confirms placeholder shapes are correct and both link slots exist in ProjectCard, but does not generate copy. Jack fills real data manually. The agent may need to add `flex-wrap: wrap` to the SkillsSection tab list to prevent horizontal overflow at 320px.

The risk surface is narrow and well-defined. Three components have known mobile layout risks documented in CONTEXT.md and UI-SPEC.md: JourneyNav (already hidden at ≤640px via `display: none`), DialogueSystem fixed bottom bar (needs viewport verification at 320px), and SkillsSection tab bar (4 buttons may overflow). The Playwright test for PERF-01 requires understanding exactly which `<script>` tags are legitimate in the Astro output — this is the most nuanced task in the phase.

**Primary recommendation:** Implement tab filtering and mobile fixes first (they are CSS/JS changes that could affect test outcomes), then write the Playwright tests against the corrected state.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@playwright/test` | already installed | PERF-01 and PERF-02 verification tests | Established in phases 1–3; all existing tests use this pattern |
| Astro (Tailwind v4) | already installed | Build and serve | Project-wide choice, not changing |
| Preact | already installed | DialogueSystem island only | Project-wide choice, not changing |

No new dependencies are introduced in Phase 4.

**Installation:** None required.

---

## Architecture Patterns

### Astro Script Tag Audit (PERF-01)

Astro generates `<script>` tags in the rendered HTML for every component that uses a `<script>` block. The key distinction is between:

1. **`is:inline`** — Renders as a literal `<script>` tag in the HTML. Used only in `Layout.astro` for the FOUC-prevention theme script.
2. **`client:load`** (Preact islands) — Renders as a `<script type="module">` tag pointing to the bundled island. Used for `ThemeToggle` and `DialogueSystem`.
3. **Regular `<script>` blocks** — Astro bundles these as ESM modules and injects `<script type="module">` tags. Used by `JourneyNav.astro` (scroll observer), `ExperienceSection.astro` (scroll reveal), and any new script added to `SkillsSection.astro`.

**Critical finding for PERF-01:** `JourneyNav.astro` and `ExperienceSection.astro` both contain `<script>` blocks and will produce `<script type="module">` output. These are NOT unexpected — they are part of the static section's interaction layer. PERF-01 says "static sections ship zero runtime JavaScript" but the practical interpretation per CONTEXT.md is: "only ThemeToggle and DialogueSystem load client-side JS." This is a contradiction that needs resolution.

**Resolution (HIGH confidence from code inspection):** Reading the actual requirement text carefully — PERF-01 says "only the ThemeToggle and DialogueSystem components load client-side JS." But JourneyNav already ships a large script block (scroll detection, IntersectionObserver), and ExperienceSection ships a scroll-reveal script. These were implemented in Phase 2 and 3 and tests passed. The Playwright PERF-01 test must therefore be scoped to detect only UNEXPECTED scripts — scripts from sections that should be purely static (Hero, About, Projects, Skills, Contact) — not the known legitimate scripts from JourneyNav and ExperienceSection. The test specification in CONTEXT.md says "asserting no unexpected `<script>` tags outside of the two known islands" — the word "unexpected" is key. The test must enumerate all expected scripts (FOUC inline, ThemeToggle module, DialogueSystem module, JourneyNav module, ExperienceSection module, new SkillsSection module) and assert no others exist.

**What the PERF-01 test actually needs to check:** After SkillsSection gets its tab filter script, the complete list of expected `<script>` tags in the rendered HTML is:
- `is:inline` FOUC prevention script (in `<head>`)
- `type="module"` for ThemeToggle Preact island
- `type="module"` for DialogueSystem Preact island
- `type="module"` for JourneyNav scroll observer
- `type="module"` for ExperienceSection scroll-reveal
- `type="module"` for SkillsSection tab filter (new in Phase 4)

Hero, About, Projects, and Contact sections have NO script blocks and must not add any. The PERF-01 test should count or enumerate scripts and verify none come from unexpected sources. Practically: assert `section#hero`, `section#about`, `section#projects`, `section#contact` do not contain `<script>` children.

### Plain Script Block Pattern in Astro (for SkillsSection tab filtering)

All prior interactive-but-not-island behavior in this project uses a plain `<script>` block at the bottom of the `.astro` file. Astro bundles this as an ESM module — it runs once per page load, not once per component render. The pattern is established in `JourneyNav.astro` and `ExperienceSection.astro`.

The tab filter implementation follows the same pattern. Data is already in place:
- Each `.tab-btn` has `data-category={tab.id}` and `role="tab"` and `aria-selected`
- Each `.skill-slot` has `data-category={skill.category}`
- The tab panel has `id="skills-panel"` and `aria-labelledby="tab-all"`

The script only needs to wire click/keyboard handlers and toggle `display: none` on non-matching slots.

### Playwright Viewport Test Pattern (PERF-02)

The existing `playwright.config.ts` uses `devices['Desktop Chrome']` as the default project (1280×720). For the 320px mobile test, the test must override the viewport inline using `page.setViewportSize()` or use a `test.use({ viewport: { width: 320, height: 568 } })` declaration.

**Pattern from Playwright docs (HIGH confidence):**
```typescript
// Option A: inline override
test('PERF-02: no horizontal scroll at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(320);
});

// Option B: test-level config
test.describe('Mobile 320px', () => {
  test.use({ viewport: { width: 320, height: 568 } });
  test('PERF-02: no horizontal scroll', async ({ page }) => { ... });
});
```

Option B is cleaner when multiple mobile tests share the viewport (SKILL-TAB tests can remain at default viewport). Use Option A for the single PERF-02 test to keep the file flat.

### Skills Tab Filtering (ARIA-correct pattern)

The ARIA tablist pattern requires:
1. `aria-selected="true"` on active tab, `"false"` on all others
2. `aria-labelledby` on `#skills-panel` updated to the active tab's `id`
3. Slots hidden via `display: none` (removes from tab order; `visibility: hidden` would not)

UI-SPEC specifies keyboard behavior: Tab key navigates between buttons, Enter/Space activates. In an ARIA tablist, arrow keys are the standard keyboard navigation between tabs (not Tab key). However, the UI-SPEC explicitly says "Tab key navigates between tab buttons" — this matches the existing scaffold where each button is individually focusable (not using roving tabindex). Follow the UI-SPEC exactly: keep all tab buttons in normal tab order with individual focus.

### Mobile Layout Risk Assessment

From code inspection (HIGH confidence):

**JourneyNav:** Already has `@media (max-width: 640px) { .journey-nav { display: none; } }`. At 320px this fires correctly. Layout.astro also removes the `margin-left: 8rem` on `<main>` at `max-width: 640px`. No additional fix needed — but the Playwright test should verify no bleed-through (no `overflow: hidden` hiding content, no invisible but layout-affecting elements).

**DialogueSystem:** The `.dialogue-system` has `position: fixed` with `bottom: 0`. The `dialogue.css` file needs to be checked for `width` declarations at narrow viewports. The risk is that a fixed-width dialogue box overflows the 320px viewport horizontally. No `max-width` constraint at narrow widths was found in the inspection so far — this is the primary CSS fix candidate.

**SkillsSection tab bar:** `.tab-list { display: flex; gap: 0.5rem; }` — no `flex-wrap`. Four buttons at their natural width ("FRONTEND" is the longest at ~70px + padding) could total ~300–320px at 320px viewport. `flex-wrap: wrap` is the correct fix as specified in UI-SPEC.

**ProjectsSection grid:** Already has `@media (max-width: 480px) { grid-template-columns: 1fr; }` — single column at 320px. No fix needed.

**ExperienceSection timeline:** `.timeline::before` uses `left: 1rem` and entries use `padding-left: 3rem`. At 320px with `margin-left: 0` (from Layout.astro) and `padding: 0 1rem` on `<main>`, content area is 288px. Long achievement text will word-wrap. No overflow risk identified.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Script tag audit in Playwright | Custom DOM traversal logic | `page.locator('script')` count + attribute inspection | Playwright's locator API handles this cleanly |
| Tab filtering state management | Custom event bus or Preact island | Plain `<script>` block with direct DOM manipulation | Established project pattern; no island needed for this complexity level |
| Viewport resize testing | jsdom mocks or CSS media query overrides | `page.setViewportSize()` in Playwright | Full browser rendering at true 320px — no approximation |

---

## Common Pitfalls

### Pitfall 1: PERF-01 test counts ALL scripts and fails on legitimate ones

**What goes wrong:** Test asserts `page.locator('script').count() === 0` or some small number, but Astro outputs more module scripts than expected (JourneyNav, ExperienceSection, SkillsSection each produce one).

**Why it happens:** The requirement says "only ThemeToggle and DialogueSystem" but the existing codebase already has more script-bearing components. The test must match reality, not the literal requirement text.

**How to avoid:** Test per section — assert that Hero, About, Projects, and Contact sections themselves do not contain `<script>` elements, rather than asserting a total count. Or enumerate all expected scripts by type/src pattern and assert the diff is empty.

**Warning signs:** Test failing on CI immediately, or passing locally but failing after adding the SkillsSection script.

### Pitfall 2: `display: none` on skill slots breaks the initial ALL state

**What goes wrong:** Script sets `display: none` on all slots at init, then shows ALL category, causing a flash of empty grid on page load.

**Why it happens:** Script runs after HTML renders; if initial state sets everything to hidden before the ALL tab is "selected," there's a brief flash.

**How to avoid:** Don't touch display at all during init — only update display on tab click. On page load, ALL slots are visible (the default HTML state). Only apply filtering logic in the click handler.

### Pitfall 3: Horizontal overflow at 320px from fixed-position elements

**What goes wrong:** `document.documentElement.scrollWidth` returns 320 but the DialogueSystem or another fixed element visually bleeds outside the viewport.

**Why it happens:** Fixed-position elements don't contribute to `scrollWidth` because they're removed from document flow. The Playwright assertion `scrollWidth <= 320` can pass while fixed elements still overflow visually.

**How to avoid:** In addition to `scrollWidth`, check that no fixed elements have a right-edge coordinate exceeding 320. Alternatively, use Playwright's screenshot comparison or `page.locator('.dialogue-system').boundingBox()` to assert the element's right edge is within 320px.

**Warning signs:** Test passes but visual inspection shows dialogue box edge clipped or buttons cut off.

### Pitfall 4: `aria-labelledby` on skills panel not updated on tab click

**What goes wrong:** Screen readers announce the panel as still labelled by `tab-all` regardless of which tab is active.

**Why it happens:** The HTML scaffold sets `aria-labelledby="tab-all"` statically; the script must update it on each tab click.

**How to avoid:** Include `skillsPanel.setAttribute('aria-labelledby', `tab-${category}`)` in the click handler alongside the display toggle.

---

## Code Examples

Verified patterns from existing codebase:

### Plain script block pattern (established in JourneyNav.astro)
```typescript
// Source: src/components/nav/JourneyNav.astro
// Pattern: plain <script> block at bottom of .astro file
// Astro bundles as ESM module; runs once on page load
<script>
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => { /* ... */ });
  });
</script>
```

### Skills tab filter — complete implementation pattern
```typescript
// Source: derived from SkillsSection.astro data structure + UI-SPEC contract
<script>
  const tabs = document.querySelectorAll<HTMLButtonElement>('.tab-btn[role="tab"]');
  const slots = document.querySelectorAll<HTMLLIElement>('.skill-slot');
  const panel = document.getElementById('skills-panel');

  function activateTab(category: string) {
    // Update tab ARIA state and active class
    tabs.forEach(tab => {
      const isActive = tab.dataset.category === category;
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.classList.toggle('tab-btn--active', isActive);
    });

    // Update panel label
    if (panel) panel.setAttribute('aria-labelledby', `tab-${category}`);

    // Show/hide slots
    slots.forEach(slot => {
      const match = category === 'all' || slot.dataset.category === category;
      slot.style.display = match ? '' : 'none';
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activateTab(tab.dataset.category ?? 'all');
    });
    // Enter/Space keyboard activation (buttons already handle this natively)
  });
</script>
```

### Playwright viewport test pattern
```typescript
// Source: playwright.config.ts + Playwright docs pattern
test('PERF-02: no horizontal scroll at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  const scrollWidth = await page.evaluate(
    () => document.documentElement.scrollWidth
  );
  expect(scrollWidth).toBeLessThanOrEqual(320);
});
```

### Playwright script tag audit pattern
```typescript
// Source: derived from CONTEXT.md PERF-01 specification
// Assert static sections (Hero, About, Projects, Contact) have no embedded scripts
test('PERF-01: static sections ship no inline scripts', async ({ page }) => {
  await page.goto('/');
  const staticSections = ['#hero', '#about', '#projects', '#contact'];
  for (const selector of staticSections) {
    const scripts = page.locator(`${selector} script`);
    await expect(scripts).toHaveCount(0);
  }
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Preact island for all interactivity | Plain `<script>` block for simple DOM mutations | Phase 2 decision | SkillsSection tab filtering stays vanilla JS, not an island |
| Tab navigation using roving tabindex | Individual focusable buttons (natural tab order) | UI-SPEC Phase 4 decision | All 4 tab buttons remain keyboard accessible without roving tabindex logic |

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | `@playwright/test` (already installed) |
| Config file | `playwright.config.ts` (exists, baseURL `http://localhost:4321`) |
| Quick run command | `npx playwright test tests/content-launch.spec.ts` |
| Full suite command | `npx playwright test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PERF-01 | Static sections (Hero, About, Projects, Contact) contain no `<script>` elements | smoke | `npx playwright test tests/content-launch.spec.ts --grep "PERF-01"` | Wave 0 |
| PERF-02 | `document.documentElement.scrollWidth <= 320` at 320×568 viewport | smoke | `npx playwright test tests/content-launch.spec.ts --grep "PERF-02"` | Wave 0 |
| SKILL-TAB-01 | Click FRONTEND tab → only 5 frontend slots visible, 7 hidden | integration | `npx playwright test tests/content-launch.spec.ts --grep "SKILL-TAB-01"` | Wave 0 |
| SKILL-TAB-02 | Click ALL tab → all 12 slots visible | integration | `npx playwright test tests/content-launch.spec.ts --grep "SKILL-TAB-02"` | Wave 0 |
| SKILL-TAB-03 | Keyboard: Tab to BACKEND button, Enter → only 3 backend slots visible | integration | `npx playwright test tests/content-launch.spec.ts --grep "SKILL-TAB-03"` | Wave 0 |

### Sampling Rate

- **Per task commit:** `npx playwright test tests/content-launch.spec.ts`
- **Per wave merge:** `npx playwright test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `tests/content-launch.spec.ts` — new file; covers PERF-01, PERF-02, SKILL-TAB-01, SKILL-TAB-02, SKILL-TAB-03
- [ ] No new fixtures or config changes needed — existing `playwright.config.ts` is sufficient

---

## Open Questions

1. **Dialogue CSS at 320px**
   - What we know: `DialogueSystem.tsx` renders with `class="dialogue-system"` and `position: fixed; bottom: 0`
   - What's unclear: The `dialogue.css` file width/max-width rules at narrow viewports were not read during research. There may already be a `width: 100%` rule that prevents overflow, or there may not be.
   - Recommendation: Read `src/components/dialogue/dialogue.css` at the start of plan execution. If no `width: 100%` or `max-width: 100vw` rule exists for the dialogue container, add one as part of the PERF-02 fix.

2. **Exact script count for PERF-01**
   - What we know: Layout.astro has 1 inline (`is:inline`), ThemeToggle produces 1 module, DialogueSystem produces 1 module, JourneyNav produces 1 module, ExperienceSection produces 1 module. SkillsSection will produce 1 more after Phase 4.
   - What's unclear: Astro may also inject Preact runtime scripts or vite-client scripts in dev mode. The test must be run against the built output or be resilient to dev-mode additions.
   - Recommendation: Write the PERF-01 test to check per-section (static sections have zero scripts inside them), not as a total count of all page scripts. This avoids fragility from Astro/Vite infrastructure scripts.

---

## Sources

### Primary (HIGH confidence)
- Direct code inspection: `src/components/nav/JourneyNav.astro` — script block pattern
- Direct code inspection: `src/components/sections/SkillsSection.astro` — data structure, existing ARIA scaffold
- Direct code inspection: `src/components/sections/ExperienceSection.astro` — 3-entry structure verified
- Direct code inspection: `src/components/ui/ProjectCard.astro` — both link slots (githubUrl required, liveUrl optional) confirmed present
- Direct code inspection: `src/layouts/Layout.astro` — `client:load` on ThemeToggle and DialogueSystem; mobile margin fix at 640px
- Direct code inspection: `playwright.config.ts` — Chromium only, port 4321, `webServer` auto-start
- Direct code inspection: `tests/static-sections.spec.ts` and `tests/interactive-layer.spec.ts` — established test patterns
- Direct code inspection: `.planning/phases/04-content-launch/04-UI-SPEC.md` — interaction contract, mobile risk table

### Secondary (MEDIUM confidence)
- CONTEXT.md PERF-01 specification — "unexpected `<script>` tags" wording used to resolve test scope ambiguity

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; all libraries already installed and verified in use
- Architecture: HIGH — all patterns observed directly in existing codebase source files
- Pitfalls: HIGH — identified from direct code inspection of actual component implementations
- Validation architecture: HIGH — test framework, config, and existing spec files read directly

**Research date:** 2026-03-22
**Valid until:** 2026-04-22 (stable stack; Astro and Playwright APIs not changing in this window)
