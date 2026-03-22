---
phase: 3
slug: interactive-layer
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright (e2e) + Vitest (unit) |
| **Config file** | `playwright.config.ts` / `vitest.config.ts` |
| **Quick run command** | `npm run test:unit` |
| **Full suite command** | `npm run test` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test:unit`
- **After every plan wave:** Run `npm run test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 0 | DLG-01 | unit | `npm run test:unit` | ❌ W0 | ⬜ pending |
| 3-01-02 | 01 | 1 | DLG-01 | e2e | `npx playwright test dialogue` | ❌ W0 | ⬜ pending |
| 3-01-03 | 01 | 1 | DLG-02 | e2e | `npx playwright test dialogue` | ❌ W0 | ⬜ pending |
| 3-01-04 | 01 | 1 | DLG-03 | e2e | `npx playwright test dialogue` | ❌ W0 | ⬜ pending |
| 3-01-05 | 01 | 1 | DLG-05 | e2e | `npx playwright test reduced-motion` | ❌ W0 | ⬜ pending |
| 3-02-01 | 02 | 1 | DLG-04 | e2e | `npx playwright test avatar` | ❌ W0 | ⬜ pending |
| 3-02-02 | 02 | 1 | DLG-06 | e2e | `npx playwright test avatar` | ❌ W0 | ⬜ pending |
| 3-03-01 | 03 | 1 | EXP-04 | e2e | `npx playwright test experience` | ❌ W0 | ⬜ pending |
| 3-03-02 | 03 | 1 | EXP-04 | e2e | `npx playwright test reduced-motion` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/e2e/dialogue.spec.ts` — stubs for DLG-01, DLG-02, DLG-03, DLG-04, DLG-05
- [ ] `tests/e2e/avatar.spec.ts` — stubs for DLG-04, DLG-06
- [ ] `tests/e2e/experience.spec.ts` — stubs for EXP-04
- [ ] `tests/e2e/reduced-motion.spec.ts` — stubs for DLG-05, EXP-04 prefers-reduced-motion
- [ ] `npx astro add preact` — Preact integration must be installed before islands work

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Typewriter animation visual quality | DLG-01 | Character-by-character rendering is visual | Open site, scroll through sections, observe dialogue text animation |
| Avatar expression changes per section | DLG-04 | Pixel art correctness is visual | Open site, scroll to each section, verify avatar expression changes |
| Scroll-triggered animation timing | EXP-04 | Animation easing/timing is subjective | Open site, scroll to Experience section, verify entries animate in smoothly |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
