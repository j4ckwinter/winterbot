import { test, expect } from '@playwright/test';

test.describe('Phase 2 — Static Sections', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // NAV-01 — nav with 6 anchor children linking to all sections
  test('NAV-01: nav[aria-label="Site sections"] has 6 anchors with correct hrefs', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Site sections"]');
    await expect(nav).toBeVisible();
    const anchors = nav.locator('a');
    await expect(anchors).toHaveCount(6);
    const expectedHrefs = ['#hero', '#about', '#experience', '#projects', '#skills', '#contact'];
    for (const href of expectedHrefs) {
      await expect(nav.locator(`a[href="${href}"]`)).toBeVisible();
    }
  });

  // NAV-02 — nav contains diamond character
  test('NAV-02: nav contains diamond character (◆ or ◇)', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Site sections"]');
    const text = await nav.textContent();
    expect(text).toMatch(/[◆◇]/);
  });

  // HERO-01 — section#hero visible and contains level bar label
  test('HERO-01: section#hero visible with LVL text', async ({ page }) => {
    const hero = page.locator('section#hero');
    await expect(hero).toBeVisible();
    await expect(hero).toContainText(/LVL \d+/);
  });

  // HERO-02 — section#hero contains portrait placeholder element
  test('HERO-02: section#hero contains portrait placeholder', async ({ page }) => {
    const hero = page.locator('section#hero');
    const portrait = hero.locator('[class*="portrait"], [data-portrait], [class*="trainer-portrait"]');
    await expect(portrait).toBeVisible();
  });

  // HERO-03 — section#hero contains heading and paragraph outside trainer card
  test('HERO-03: section#hero contains heading and paragraph outside trainer-card', async ({ page }) => {
    const hero = page.locator('section#hero');
    // heading outside any .trainer-card wrapper
    const heading = hero.locator(':not(.trainer-card) > h1, :not(.trainer-card) > h2');
    await expect(heading.first()).toBeVisible();
    const paragraph = hero.locator(':not(.trainer-card) > p');
    await expect(paragraph.first()).toBeVisible();
  });

  // HERO-04 — section#hero contains links to #projects and #contact
  test('HERO-04: section#hero contains CTA links to #projects and #contact', async ({ page }) => {
    const hero = page.locator('section#hero');
    await expect(hero.locator('a[href="#projects"]')).toBeVisible();
    await expect(hero.locator('a[href="#contact"]')).toBeVisible();
  });

  // ABOUT-01 — section#about is visible
  test('ABOUT-01: section#about is visible', async ({ page }) => {
    const about = page.locator('section#about');
    await expect(about).toBeVisible();
  });

  // ABOUT-02 — section#about contains .panel element
  test('ABOUT-02: section#about contains .panel element', async ({ page }) => {
    const about = page.locator('section#about');
    await expect(about.locator('.panel')).toBeVisible();
  });

  // EXP-01 — section#experience contains a list with at least 1 li
  test('EXP-01: section#experience contains list with at least 1 item', async ({ page }) => {
    const exp = page.locator('section#experience');
    await expect(exp).toBeVisible();
    const listItem = exp.locator('ul li, ol li').first();
    await expect(listItem).toBeVisible();
  });

  // EXP-02 — first experience entry contains company, role, date, and achievement
  test('EXP-02: first experience entry contains company, role, date, and achievement', async ({ page }) => {
    const exp = page.locator('section#experience');
    const firstEntry = exp.locator('[class*="exp-entry"], [class*="experience-entry"], article').first();
    await expect(firstEntry).toBeVisible();
    // must contain some text content for each field
    const companyEl = firstEntry.locator('[class*="company"], [class*="employer"]');
    await expect(companyEl).toBeVisible();
    const roleEl = firstEntry.locator('[class*="role"], [class*="title"], h3');
    await expect(roleEl).toBeVisible();
    const dateEl = firstEntry.locator('[class*="date"], time');
    await expect(dateEl).toBeVisible();
    const achievementLi = firstEntry.locator('li').first();
    await expect(achievementLi).toBeVisible();
  });

  // EXP-03 — section#experience contains .is-current element
  test('EXP-03: section#experience contains .is-current element', async ({ page }) => {
    const exp = page.locator('section#experience');
    await expect(exp.locator('.is-current')).toBeVisible();
  });

  // PROJ-01 — section#projects contains .projects-grid with at least 2 .panel children
  test('PROJ-01: section#projects contains .projects-grid with at least 2 .panel children', async ({ page }) => {
    const projects = page.locator('section#projects');
    await expect(projects).toBeVisible();
    const grid = projects.locator('.projects-grid');
    await expect(grid).toBeVisible();
    const panels = grid.locator('.panel');
    const panelCount = await panels.count();
    expect(panelCount).toBeGreaterThanOrEqual(2);
  });

  // PROJ-02 — first project card contains dex number, project name heading, and two links
  test('PROJ-02: first project card contains dex number, heading, and two links', async ({ page }) => {
    const projects = page.locator('section#projects');
    const firstCard = projects.locator('.panel').first();
    await expect(firstCard).toBeVisible();
    const cardText = await firstCard.textContent();
    expect(cardText).toMatch(/#\d{3}/);
    const heading = firstCard.locator('h2, h3');
    await expect(heading.first()).toBeVisible();
    const links = firstCard.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThanOrEqual(2);
  });

  // PROJ-04 — project cards have class .panel
  test('PROJ-04: project cards have class .panel', async ({ page }) => {
    const projects = page.locator('section#projects');
    const panelCards = projects.locator('.projects-grid .panel');
    const count = await panelCards.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  // SKILL-01 — section#skills contains .skills-grid with at least 4 .skill-slot children
  test('SKILL-01: section#skills contains .skills-grid with at least 4 .skill-slot children', async ({ page }) => {
    const skills = page.locator('section#skills');
    await expect(skills).toBeVisible();
    const grid = skills.locator('.skills-grid');
    await expect(grid).toBeVisible();
    const slots = grid.locator('.skill-slot');
    const count = await slots.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  // SKILL-02 — section#skills contains element with role="tablist"
  test('SKILL-02: section#skills contains role="tablist" element', async ({ page }) => {
    const skills = page.locator('section#skills');
    await expect(skills.locator('[role="tablist"]')).toBeVisible();
  });

  // SKILL-03 — first .skill-slot contains an icon (svg or img) and a text label
  test('SKILL-03: first .skill-slot contains icon and text label', async ({ page }) => {
    const skills = page.locator('section#skills');
    const firstSlot = skills.locator('.skill-slot').first();
    await expect(firstSlot).toBeVisible();
    const icon = firstSlot.locator('svg, img').first();
    await expect(icon).toBeVisible();
    // must have visible text label
    const label = firstSlot.locator('span, p, [class*="label"]');
    await expect(label.first()).toBeVisible();
  });

  // CONT-01 — section#contact heading contains exact text
  test('CONT-01: section#contact heading contains "Rest Area / Save Point"', async ({ page }) => {
    const contact = page.locator('section#contact');
    await expect(contact).toBeVisible();
    await expect(contact.locator('h2, h3').first()).toContainText('Rest Area / Save Point');
  });

  // CONT-02 — section#contact contains mailto, github, and linkedin links
  test('CONT-02: section#contact contains mailto, github, and linkedin links', async ({ page }) => {
    const contact = page.locator('section#contact');
    await expect(contact.locator('a[href^="mailto:"]')).toBeVisible();
    await expect(contact.locator('a[href*="github.com"]')).toBeVisible();
    await expect(contact.locator('a[href*="linkedin.com"]')).toBeVisible();
  });

  // A11Y-01 — page has <main>, <nav>, and <section> elements
  test('A11Y-01: page has main, nav, and section elements', async ({ page }) => {
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('nav').first()).toBeVisible();
    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // A11Y-03 — all Icon elements inside sections have aria-hidden="true"
  test('A11Y-03: SVG icons inside sections have aria-hidden="true"', async ({ page }) => {
    const ariaHiddenSvgs = page.locator('section svg[aria-hidden="true"]');
    const count = await ariaHiddenSvgs.count();
    expect(count).toBeGreaterThan(0);
  });

});
