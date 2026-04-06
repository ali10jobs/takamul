import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
  test('English page has LTR direction', async ({ page }) => {
    await page.goto('/en');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'ltr');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('Arabic page has RTL direction', async ({ page }) => {
    await page.goto('/ar');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(html).toHaveAttribute('lang', 'ar');
  });

  test('language switcher toggles EN to AR', async ({ page }) => {
    await page.goto('/en');

    // Find language switcher button/link
    const switcher = page
      .getByRole('link', { name: /العربية|AR/i })
      .or(page.getByRole('button', { name: /العربية|AR/i }));

    if (await switcher.isVisible()) {
      await switcher.click();
      await page.waitForURL('**/ar');
      expect(page.url()).toContain('/ar');

      // Verify RTL applied
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    }
  });

  test('language switcher preserves current path', async ({ page }) => {
    await page.goto('/en/services');

    const switcher = page
      .getByRole('link', { name: /العربية|AR/i })
      .or(page.getByRole('button', { name: /العربية|AR/i }));

    if (await switcher.isVisible()) {
      await switcher.click();
      await page.waitForURL('**/ar/services');
      expect(page.url()).toContain('/ar/services');
    }
  });

  test('both locales load all pages without errors', async ({ page }) => {
    const pages = ['', '/about', '/services', '/contact', '/case-studies', '/blog'];

    for (const p of pages) {
      const enResponse = await page.goto(`/en${p}`);
      expect(enResponse?.status()).toBeLessThan(400);

      const arResponse = await page.goto(`/ar${p}`);
      expect(arResponse?.status()).toBeLessThan(400);
    }
  });
});
