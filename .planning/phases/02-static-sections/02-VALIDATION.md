---
phase: 2
slug: static-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright 1.58.2 |
| **Config file** | `playwright.config.ts` |
| **Quick run command** | `npx playwright test --project=chromium tests/static-sections.spec.ts` |
| **Full suite command** | `npx playwright test --project=chromium` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test --project=chromium tests/static-sections.spec.ts`
- **After every plan wave:** Run `npx playwright test --project=chromium`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-??-NAV-01 | TBD | 0 | NAV-01 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "NAV-01"` | ❌ W0 | ⬜ pending |
| 2-??-NAV-02 | TBD | 0 | NAV-02 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "NAV-02"` | ❌ W0 | ⬜ pending |
| 2-??-HERO-01 | TBD | 0 | HERO-01 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "HERO-01"` | ❌ W0 | ⬜ pending |
| 2-??-HERO-02 | TBD | 0 | HERO-02 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "HERO-02"` | ❌ W0 | ⬜ pending |
| 2-??-HERO-03 | TBD | 0 | HERO-03 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "HERO-03"` | ❌ W0 | ⬜ pending |
| 2-??-HERO-04 | TBD | 0 | HERO-04 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "HERO-04"` | ❌ W0 | ⬜ pending |
| 2-??-ABOUT-01 | TBD | 0 | ABOUT-01 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "ABOUT-01"` | ❌ W0 | ⬜ pending |
| 2-??-ABOUT-02 | TBD | 0 | ABOUT-02 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "ABOUT-02"` | ❌ W0 | ⬜ pending |
| 2-??-EXP-01 | TBD | 0 | EXP-01 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "EXP-01"` | ❌ W0 | ⬜ pending |
| 2-??-EXP-02 | TBD | 0 | EXP-02 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "EXP-02"` | ❌ W0 | ⬜ pending |
| 2-??-EXP-03 | TBD | 0 | EXP-03 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "EXP-03"` | ❌ W0 | ⬜ pending |
| 2-??-PROJ-01 | TBD | 0 | PROJ-01 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "PROJ-01"` | ❌ W0 | ⬜ pending |
| 2-??-PROJ-02 | TBD | 0 | PROJ-02 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "PROJ-02"` | ❌ W0 | ⬜ pending |
| 2-??-PROJ-03 | TBD | 0 | PROJ-03 | manual | Visual inspection — hover cursor | — | ⬜ pending |
| 2-??-PROJ-04 | TBD | 0 | PROJ-04 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "PROJ-04"` | ❌ W0 | ⬜ pending |
| 2-??-SKILL-01 | TBD | 0 | SKILL-01 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "SKILL-01"` | ❌ W0 | ⬜ pending |
| 2-??-SKILL-02 | TBD | 0 | SKILL-02 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "SKILL-02"` | ❌ W0 | ⬜ pending |
| 2-??-SKILL-03 | TBD | 0 | SKILL-03 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "SKILL-03"` | ❌ W0 | ⬜ pending |
| 2-??-SKILL-04 | TBD | 0 | SKILL-04 | manual | Visual inspection — inset shadow | — | ⬜ pending |
| 2-??-CONT-01 | TBD | 0 | CONT-01 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "CONT-01"` | ❌ W0 | ⬜ pending |
| 2-??-CONT-02 | TBD | 0 | CONT-02 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "CONT-02"` | ❌ W0 | ⬜ pending |
| 2-??-CONT-03 | TBD | 0 | CONT-03 | manual | Visual inspection — warm styling | — | ⬜ pending |
| 2-??-A11Y-01 | TBD | 0 | A11Y-01 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "A11Y-01"` | ❌ W0 | ⬜ pending |
| 2-??-A11Y-02 | TBD | 0 | A11Y-02 | manual | Keyboard tab through page, verify focus rings | — | ⬜ pending |
| 2-??-A11Y-03 | TBD | 0 | A11Y-03 | smoke | `npx playwright test --project=chromium tests/static-sections.spec.ts -g "A11Y-03"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/static-sections.spec.ts` — stubs covering NAV-01, NAV-02, HERO-01 through HERO-04, ABOUT-01/02, EXP-01 through EXP-03, PROJ-01/02/04, SKILL-01 through SKILL-03, CONT-01/02, A11Y-01, A11Y-03
- [ ] Install astro-icon if proceeding with icon package: `npx astro add astro-icon && npm install @iconify-json/devicon @iconify-json/simple-icons`

*Existing Playwright infrastructure (playwright.config.ts) is confirmed — no framework install needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hover cursor on project cards | PROJ-03 | CSS-only hover — no JS state to assert | Hover over each card, verify cursor changes and no lift animation occurs |
| Skill slot inset shadow Panel style | SKILL-04 | Visual depth inspection | Check each skill slot has a visible inset shadow |
| Contact section warm styling visually distinct | CONT-03 | Subjective visual difference | Compare Contact panel visual weight vs other section panels |
| Keyboard focus indicators visible | A11Y-02 | Requires human eye to confirm outline visibility | Tab through all interactive elements, verify `:focus-visible` outline is clearly visible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
