import { test, expect } from '@playwright/test';

test.describe('Phase 4: Content and Launch', () => {

  // PERF-01: Static sections ship no runtime JavaScript
  // Per CONTEXT.md: assert that Hero, About, Projects, Contact sections
  // contain no <script> elements. JourneyNav, ExperienceSection, SkillsSection
  // scripts are EXPECTED and are NOT checked here.
  test('PERF-01: static sections contain no script elements', async ({ page }) => {
    await page.goto('/');
    const staticSections = ['#hero', '#about', '#projects', '#contact'];
    for (const selector of staticSections) {
      const scripts = page.locator(`${selector} script`);
      await expect(scripts).toHaveCount(0);
    }
  });

  // PERF-02: No horizontal scroll at 320px viewport
  // Per CONTEXT.md: scrollWidth <= 320 at 320x568
  // Also check fixed elements don't visually overflow
  test('PERF-02: no horizontal scroll at 320px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(320);

    // Verify dialogue box right edge is within viewport
    const dialogueBox = page.locator('.dialogue-system');
    const isVisible = await dialogueBox.isVisible();
    if (isVisible) {
      const box = await dialogueBox.boundingBox();
      if (box) {
        expect(box.x + box.width).toBeLessThanOrEqual(320);
      }
    }
  });

  // SKILL-TAB-01: Click FRONTEND tab shows only frontend slots
  test('SKILL-TAB-01: clicking FRONTEND tab shows only frontend slots', async ({ page }) => {
    await page.goto('/');
    await page.locator('.tab-btn[data-category="frontend"]').click();
    const visibleSlots = page.locator('.skill-slot:visible');
    await expect(visibleSlots).toHaveCount(5);
    // Verify all visible slots are frontend category
    const categories = await visibleSlots.evaluateAll(
      (els) => els.map(el => el.getAttribute('data-category'))
    );
    expect(categories.every(c => c === 'frontend')).toBe(true);
  });

  // SKILL-TAB-02: Click ALL tab shows all 12 slots
  test('SKILL-TAB-02: clicking ALL tab shows all 12 slots', async ({ page }) => {
    await page.goto('/');
    // First filter to FRONTEND, then back to ALL
    await page.locator('.tab-btn[data-category="frontend"]').click();
    await page.locator('.tab-btn[data-category="all"]').click();
    const visibleSlots = page.locator('.skill-slot:visible');
    await expect(visibleSlots).toHaveCount(12);
  });

  // SKILL-TAB-03: Keyboard activation of BACKEND tab
  test('SKILL-TAB-03: keyboard Tab to BACKEND button, Enter activates filter', async ({ page }) => {
    await page.goto('/');
    // Focus the BACKEND tab button and press Enter
    await page.locator('.tab-btn[data-category="backend"]').focus();
    await page.keyboard.press('Enter');
    const visibleSlots = page.locator('.skill-slot:visible');
    await expect(visibleSlots).toHaveCount(3);
    const categories = await visibleSlots.evaluateAll(
      (els) => els.map(el => el.getAttribute('data-category'))
    );
    expect(categories.every(c => c === 'backend')).toBe(true);
  });

});
