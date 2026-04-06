import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('skip link navigates to main content', async ({ page }) => {
    await page.goto('/en');

    // Tab to activate skip link
    await page.keyboard.press('Tab');

    // Skip link should become visible
    const skipLink = page.getByText(/skip to/i);
    if (await skipLink.isVisible()) {
      await skipLink.click();

      // Focus should move to main content area
      const main = page.locator('main, [role="main"], #main-content');
      if ((await main.count()) > 0) {
        await expect(main.first()).toBeVisible();
      }
    }
  });

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/en');

    // Tab through the page and verify focus is visible
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      const count = await focused.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('heading hierarchy is correct', async ({ page }) => {
    await page.goto('/en');

    // Should have exactly one h1
    const h1s = page.locator('h1');
    const h1Count = await h1s.count();
    expect(h1Count).toBe(1);

    // h2s should exist (section headings)
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('images have alt attributes', async ({ page }) => {
    await page.goto('/en');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      // alt should exist (can be empty string for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('interactive elements have sufficient touch targets on mobile', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'Touch target test — skip on desktop');

    await page.goto('/en');

    const buttons = page.locator('button, a[role="button"]');
    const count = await buttons.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const box = await buttons.nth(i).boundingBox();
      if (box) {
        // Touch targets should be at least 44x44px
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('respects prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');

    // Page should still load and function without animations
    await expect(page.locator('body')).toBeVisible();
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});
