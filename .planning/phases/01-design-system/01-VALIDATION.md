---
phase: 1
slug: design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright — Wave 0 installs |
| **Config file** | `playwright.config.ts` — Wave 0 |
| **Quick run command** | `npx playwright test --grep @smoke` |
| **Full suite command** | `npx playwright test` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test --grep @smoke`
- **After every plan wave:** Run `npx playwright test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-xx-ds01 | TBD | 1 | DS-01 | smoke (Playwright) | `npx playwright test --grep @ds01` | ❌ W0 | ⬜ pending |
| 1-xx-ds02 | TBD | 1 | DS-02 | smoke (Playwright) | `npx playwright test --grep @ds02` | ❌ W0 | ⬜ pending |
| 1-xx-ds03 | TBD | 1 | DS-03 | smoke (Playwright) | `npx playwright test --grep @ds03` | ❌ W0 | ⬜ pending |
| 1-xx-ds04 | TBD | 1 | DS-04 | smoke (Playwright) | `npx playwright test --grep @ds04` | ❌ W0 | ⬜ pending |
| 1-xx-ds05 | TBD | 1 | DS-05 | smoke (Playwright) | `npx playwright test --grep @ds05` | ❌ W0 | ⬜ pending |
| 1-xx-ds06 | TBD | 1 | DS-06 | smoke (Playwright) | `npx playwright test --grep @ds06` | ❌ W0 | ⬜ pending |
| 1-xx-ds07 | TBD | 1 | DS-07 | manual | Vercel deployment check | manual only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/design-system.spec.ts` — Playwright smoke tests for DS-01 through DS-06
- [ ] `playwright.config.ts` — base URL `http://localhost:4321`, Chromium only for speed
- [ ] Framework install: `npm install -D @playwright/test && npx playwright install chromium`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Vercel deployment URL returns 200 after git push | DS-07 | Requires external Vercel account + git push to trigger CI | Push to main branch, check Vercel dashboard for successful deployment, visit deployment URL |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
