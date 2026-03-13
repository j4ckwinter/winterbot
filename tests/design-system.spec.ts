import { test, expect } from '@playwright/test';

// @smoke @ds01
test('DS-01: Fire mode applies world background #8B3A2A', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'fire');
  });
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor
  );
  // #8B3A2A = rgb(139, 58, 42)
  expect(bg).toBe('rgb(139, 58, 42)');
});

// @smoke @ds01
test('DS-01: Leaf mode applies world background #5A6B3A', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'leaf');
  });
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor
  );
  // #5A6B3A = rgb(90, 107, 58)
  expect(bg).toBe('rgb(90, 107, 58)');
});

// @smoke @ds02
test('DS-02: Page loads with data-theme attribute already set on <html>', async ({ page }) => {
  // Simulate returning user with leaf preference saved
  await page.addInitScript(() => {
    localStorage.setItem('theme', 'leaf');
  });
  await page.goto('/');
  const theme = await page.getAttribute('html', 'data-theme');
  // FOUC script should have applied 'leaf' before first paint
  expect(theme).toBe('leaf');
});

// @smoke @ds03
test('DS-03: Text color on surface passes WCAG AA (10:1+ ratio)', async ({ page }) => {
  await page.goto('/');
  // The Panel surface should have #F9EFE5 bg and #66203D text
  // We verify the CSS variables are defined correctly
  const surface = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim()
  );
  const text = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
  );
  expect(surface).toBe('#F9EFE5');
  expect(text).toBe('#66203D');
});

// @smoke @ds04
test('DS-04: h1 uses DotGothic16 pixel font', async ({ page }) => {
  await page.goto('/');
  const fontFamily = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 ? getComputedStyle(h1).fontFamily : '';
  });
  expect(fontFamily).toContain('DotGothic16');
});

// @smoke @ds05
test('DS-05: body uses JetBrains Mono font', async ({ page }) => {
  await page.goto('/');
  const fontFamily = await page.evaluate(() =>
    getComputedStyle(document.body).fontFamily
  );
  expect(fontFamily).toContain('JetBrains Mono');
});

// @smoke @ds06
test('DS-06: Panel has 4px border and 6px drop-shadow', async ({ page }) => {
  await page.goto('/');
  const panel = page.locator('.panel').first();
  await expect(panel).toBeVisible();
  const styles = await panel.evaluate((el) => {
    const s = getComputedStyle(el);
    return { borderWidth: s.borderTopWidth, boxShadow: s.boxShadow };
  });
  expect(styles.borderWidth).toBe('4px');
  expect(styles.boxShadow).toContain('6px');
});
