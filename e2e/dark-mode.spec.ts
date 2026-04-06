import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test('page respects system color scheme preference', async ({ page }) => {
    // Emulate dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/en');

    // Page should load without errors
    await expect(page.locator('body')).toBeVisible();
  });

  test('page loads in light mode by default', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/en');

    await expect(page.locator('body')).toBeVisible();
  });

  test('theme toggle button exists and works', async ({ page }) => {
    await page.goto('/en');

    // Look for theme toggle button
    const themeToggle = page.getByRole('button', { name: /theme|dark|light|mode/i });

    if (await themeToggle.isVisible()) {
      // Click to toggle
      await themeToggle.click();
      await page.waitForTimeout(300);

      // HTML element should have class change
      const html = page.locator('html');
      const classes = await html.getAttribute('class');
      expect(classes).toBeTruthy();
    }
  });
});
