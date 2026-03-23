---
phase: 4
slug: content-launch
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | `@playwright/test` (already installed) |
| **Config file** | `playwright.config.ts` (exists, baseURL `http://localhost:4321`) |
| **Quick run command** | `npx playwright test tests/content-launch.spec.ts` |
| **Full suite command** | `npx playwright test` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test tests/content-launch.spec.ts`
- **After every plan wave:** Run `npx playwright test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 0 | PERF-01, PERF-02, SKILL-TAB | smoke/integration | `npx playwright test tests/content-launch.spec.ts` | ❌ W0 | ⬜ pending |
| 4-02-01 | 02 | 1 | PERF-01 | smoke | `npx playwright test tests/content-launch.spec.ts --grep "PERF-01"` | ❌ W0 | ⬜ pending |
| 4-02-02 | 02 | 1 | PERF-02 | smoke | `npx playwright test tests/content-launch.spec.ts --grep "PERF-02"` | ❌ W0 | ⬜ pending |
| 4-03-01 | 03 | 1 | SKILL-TAB-01, SKILL-TAB-02, SKILL-TAB-03 | integration | `npx playwright test tests/content-launch.spec.ts --grep "SKILL-TAB"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/content-launch.spec.ts` — stubs for PERF-01, PERF-02, SKILL-TAB-01, SKILL-TAB-02, SKILL-TAB-03

*No new fixtures or config changes needed — existing `playwright.config.ts` is sufficient.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Real content in Experience section | Content ownership | Jack fills manually | Verify 3 entries with company, role, dates, and 3–5 bullet points |
| Real content in Projects section | Content ownership | Jack fills manually | Verify 3 cards with names, descriptions, tech tags, GitHub and live URLs |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
