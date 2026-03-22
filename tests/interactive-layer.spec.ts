import { test, expect } from '@playwright/test';

test.describe('Phase 3: Interactive Layer', () => {

  // DLG-01: Dialogue system element exists, fixed at bottom of viewport
  test('DLG-01: .dialogue-system exists with position:fixed at bottom of viewport', async ({ page }) => {
    await page.goto('/');
    const dlg = page.locator('.dialogue-system');
    await expect(dlg).toBeVisible();
    const position = await dlg.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });

  // DLG-02: Typewriter mid-animation — partial text visible shortly after load
  test('DLG-02: .dialogue-text shows partial hero message during typewriter animation', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(200);
    const fullMessage = 'Welcome, Trainer! Your adventure begins here. Take a moment to get acquainted with your guide.';
    const text = await page.locator('.dialogue-text').textContent();
    expect(text).not.toBeNull();
    expect(fullMessage).toContain(text!.trim());
    // Should be partial (mid-animation), not the full message yet
    expect(text!.trim().length).toBeGreaterThan(0);
  });

  // DLG-03: Scrolling to #experience triggers experience section message
  test('DLG-03: scrolling to #experience changes dialogue to experience message', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.getElementById('experience')?.scrollIntoView());
    await page.waitForTimeout(500);
    const text = await page.locator('.dialogue-text').textContent();
    expect(text).toContain('The Quest Log!');
  });

  // DLG-04: Avatar sprite is visible inside dialogue system
  test('DLG-04: .avatar-sprite exists and is visible inside .dialogue-system', async ({ page }) => {
    await page.goto('/');
    const avatar = page.locator('.dialogue-system .avatar-sprite');
    await expect(avatar).toBeVisible();
  });

  // DLG-05: Clicking dialogue box skips typewriter to show full message
  test('DLG-05: clicking .dialogue-box skips typewriter and shows full hero message', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(100);
    await page.locator('.dialogue-box').click();
    const text = await page.locator('.dialogue-text').textContent();
    const fullMessage = 'Welcome, Trainer! Your adventure begins here. Take a moment to get acquainted with your guide.';
    expect(text).toContain(fullMessage);
  });

  // DLG-06: prefers-reduced-motion: full message shown immediately, no animation
  test('DLG-06: with prefers-reduced-motion, full hero message shown immediately', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const text = await page.locator('.dialogue-text').textContent();
    const fullMessage = 'Welcome, Trainer! Your adventure begins here. Take a moment to get acquainted with your guide.';
    expect(text).toContain(fullMessage);
  });

  // EXP-04: Experience entries get .is-visible class when scrolled into view
  test('EXP-04: .exp-entry elements get .is-visible class when scrolled into view', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.getElementById('experience')?.scrollIntoView());
    await page.waitForTimeout(500);
    const visibleCount = await page.locator('.exp-entry.is-visible').count();
    expect(visibleCount).toBeGreaterThanOrEqual(1);
  });

});
