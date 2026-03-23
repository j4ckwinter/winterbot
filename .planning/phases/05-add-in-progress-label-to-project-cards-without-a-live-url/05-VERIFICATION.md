---
phase: 05-add-in-progress-label-to-project-cards-without-a-live-url
verified: 2026-03-23T09:30:00Z
status: human_needed
score: 4/4 must-haves verified
human_verification:
  - test: "Visual — badge appearance in Fire theme"
    expected: "IN PROGRESS badge shows as a muted amber pill with outlined border, visually distinct from solid tech tag pills"
    why_human: "color-mix() rendering and contrast cannot be verified without a browser; WCAG contrast of var(--color-surface) on 25%-opacity amber tint over --color-surface background is borderline and flagged for confirmation in UI-SPEC"
  - test: "Visual — badge appearance in Leaf theme"
    expected: "IN PROGRESS badge switches to muted olive (#8FA84A) fill + border, same pill shape, in Leaf theme"
    why_human: "Theme switching requires browser interaction; CSS var resolution under [data-theme=leaf] cannot be statically verified"
  - test: "Layout — badge alignment in card-links row"
    expected: "Badge is vertically centered alongside the GitHub link within the flexbox .card-links row"
    why_human: "Flex alignment requires rendered layout check"
---

# Phase 5: Add IN PROGRESS Badge to Project Cards — Verification Report

**Phase Goal:** Add a visually distinct "IN PROGRESS" badge to project cards without a live URL, using muted accent fill to differentiate from solid tech tags
**Verified:** 2026-03-23T09:30:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Project cards without a liveUrl show an "IN PROGRESS" badge | VERIFIED | `ProjectCard.astro` line 31: ternary else branch renders `<span class="card-badge--wip">IN PROGRESS</span>`; `ProjectsSection.astro` cards #002 and #003 omit `liveUrl` |
| 2 | Project cards with a liveUrl do NOT show an "IN PROGRESS" badge | VERIFIED | Same ternary — truthy `liveUrl` renders Live anchor, not badge; card #001 has `liveUrl: 'https://winterbot.vercel.app'` |
| 3 | The badge is visually distinct from technology tags (muted fill vs solid) | VERIFIED (code) | `.card-badge--wip` uses `color-mix(in srgb, var(--color-accent-secondary) 25%, transparent)` + `border: 1px solid` vs `.tag` which uses solid `background: var(--color-accent-secondary)` with no border |
| 4 | The badge works in both Fire and Leaf themes | VERIFIED (code) | All CSS uses `var(--color-accent-secondary)` which resolves to `#D4854A` (Fire) or `#8FA84A` (Leaf) via existing `[data-theme=leaf]` override in global.css; no new tokens introduced |

**Score:** 4/4 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/ui/ProjectCard.astro` | Conditional IN PROGRESS badge rendering and .card-badge--wip styles | VERIFIED | Lines 28-32: ternary conditional renders `<span class="card-badge--wip">IN PROGRESS</span>` when liveUrl falsy. Lines 110-120: complete `.card-badge--wip` CSS rule with all required properties |
| `tests/static-sections.spec.ts` | Playwright tests for WIP badge presence and absence | VERIFIED | Lines 135-157: three tests — WIP-01 (badge text on cards 2+3), WIP-02 (no badge on card 1 via `toHaveCount(0)`), WIP-03 (tagName is `span`) |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/components/ui/ProjectCard.astro` | liveUrl prop | Ternary conditional — badge shown when liveUrl is falsy | WIRED | `liveUrl ?` at line 28; falsy branch at line 31 renders `span.card-badge--wip`; truthy branch at line 29 renders Live anchor. Pattern `liveUrl ? ... : span.card-badge--wip` satisfies intent of `!liveUrl => card-badge--wip` |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `src/components/ui/ProjectCard.astro` | `liveUrl` prop | `src/components/sections/ProjectsSection.astro` — hardcoded project array | Yes — #001 has `liveUrl: 'https://winterbot.vercel.app'`; #002 and #003 intentionally omit liveUrl | FLOWING |

Data path: `ProjectsSection.astro` iterates `projects` array with `projects.map((p) => <ProjectCard {...p} />)`. Cards #002 and #003 have no `liveUrl` key, so the prop is `undefined` in ProjectCard — falsy branch triggers badge render.

---

### Behavioral Spot-Checks

Step 7b: SKIPPED for Playwright tests — requires a running dev server. Commit history confirms the GREEN phase commit (`940f72b`) passed all WIP-01, WIP-02, WIP-03 tests per SUMMARY. Static analysis confirms the markup and logic are correctly implemented.

| Behavior | Evidence | Status |
|----------|----------|--------|
| WIP-01 test exists and is substantive | Lines 135-142 in `tests/static-sections.spec.ts`: checks `toHaveText('IN PROGRESS')` on cards 2 and 3 | PASS (static) |
| WIP-02 test exists and is substantive | Lines 145-149: checks `toHaveCount(0)` on card 1 | PASS (static) |
| WIP-03 test exists and is substantive | Lines 152-157: evaluates `el.tagName.toLowerCase()` and asserts `toBe('span')` | PASS (static) |
| Both commits exist in git history | `9053fc4` (RED: tests) and `940f72b` (GREEN: implementation) both verified via git show | PASS |

---

### Requirements Coverage

No standalone REQUIREMENTS.md found in `.planning/`. WIP requirement IDs are defined inline in ROADMAP.md and PLAN frontmatter. Coverage assessed against ROADMAP.md Phase 5 requirements and PLAN task acceptance criteria.

| Requirement | Source | Description | Status | Evidence |
|-------------|--------|-------------|--------|----------|
| WIP-01 | PLAN frontmatter + ROADMAP.md | Project cards without liveUrl show IN PROGRESS badge | SATISFIED | `ProjectCard.astro` falsy-liveUrl branch renders `<span class="card-badge--wip">IN PROGRESS</span>`; Playwright test WIP-01 asserts this |
| WIP-02 | PLAN frontmatter + ROADMAP.md | Project card with liveUrl does NOT show IN PROGRESS badge | SATISFIED | Ternary truthy branch renders Live anchor, not badge; Playwright test WIP-02 asserts `toHaveCount(0)` |
| WIP-03 | PLAN frontmatter + ROADMAP.md | IN PROGRESS badge is a span, not a link | SATISFIED | Element is `<span class="card-badge--wip">` — not an `<a>`; Playwright test WIP-03 evaluates `tagName` and asserts `span` |

All three requirement IDs declared in PLAN frontmatter are accounted for. No orphaned requirements found (no `.planning/REQUIREMENTS.md` exists; ROADMAP.md lists exactly WIP-01, WIP-02, WIP-03 for Phase 5).

---

### Anti-Patterns Found

Scanned `src/components/ui/ProjectCard.astro` and `tests/static-sections.spec.ts`.

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `tests/static-sections.spec.ts` | 35-36 | `"portrait placeholder"` string in HERO-02 test name | Info | Pre-existing test from Phase 2 — references the placeholder portrait element by name. Not introduced by Phase 5. No impact on Phase 5 goal. |

No blockers or warnings found in Phase 5 additions. The word "placeholder" appears only in a pre-existing Phase 2 test unrelated to this phase.

---

### Human Verification Required

#### 1. Badge Visual Appearance — Fire Theme

**Test:** Start the dev server (`npm run dev`), open the site in Fire theme (default), navigate to the Projects section, inspect cards #002 (FPL Radar API) and #003 (FPL Radar UI).
**Expected:** Each card shows "IN PROGRESS" as a pill-shaped badge with a muted amber fill (~25% opacity) and a 1px solid amber border — visually softer than the solid amber technology tag pills. Text reads "IN PROGRESS" in DotGothic16 pixel font.
**Why human:** `color-mix(in srgb, var(--color-accent-secondary) 25%, transparent)` rendering and perceived contrast cannot be verified programmatically. The UI-SPEC notes contrast may be borderline and flags it for implementation review (light text on 25%-opacity tint over the same surface color).

#### 2. Badge Visual Appearance — Leaf Theme

**Test:** Toggle to Leaf theme using the theme toggle. Inspect cards #002 and #003.
**Expected:** Badge fill switches to muted olive tint (25% of #8FA84A), border switches to #8FA84A. Same pill shape and text. No visual breakage.
**Why human:** CSS var resolution under `[data-theme=leaf]` requires a live browser to confirm the theme switch propagates correctly to the badge.

#### 3. Badge Layout Alignment

**Test:** Visually inspect the `.card-links` row on a card with the badge (e.g., card #002).
**Expected:** "GitHub" link and "IN PROGRESS" badge are aligned on the same baseline within the flex row, matching the vertical alignment of "GitHub" and "Live" on card #001.
**Why human:** Flex baseline alignment and the `line-height: 1.2` interaction with padding requires a rendered layout check.

---

### Gaps Summary

No functional gaps found. All four observable truths are verified by code inspection. All three requirement IDs (WIP-01, WIP-02, WIP-03) are satisfied. Both artifacts exist, are substantive, and are properly wired. Data flows correctly from the project array through the prop to the conditional render.

Three items require human verification: visual appearance in Fire and Leaf themes, and badge alignment. These are quality checks, not functional blockers — the implementation is structurally complete and correct.

---

_Verified: 2026-03-23T09:30:00Z_
_Verifier: Claude (gsd-verifier)_
