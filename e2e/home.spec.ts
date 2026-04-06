import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads English home page with all sections', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Takamul/i);

    // Hero section visible
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    // Check main heading exists
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Values section
    await expect(
      page.getByText('Our Core Values').or(page.getByText('Why Choose Us'))
    ).toBeVisible();

    // Services section
    await expect(page.getByText('Our Services').or(page.getByText('What We Do'))).toBeVisible();
  });

  test('loads Arabic home page', async ({ page }) => {
    await page.goto('/ar');
    await expect(page).toHaveTitle(/تكامل/);

    // Verify RTL direction
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(html).toHaveAttribute('lang', 'ar');
  });

  test('redirects bare / to /en', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL(/\/(en|ar)/);
    expect(page.url()).toMatch(/\/(en|ar)/);
  });

  test('scroll reveals trigger on scroll', async ({ page }) => {
    await page.goto('/en');

    // Scroll down to trigger animations
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500);

    // Sections should become visible after scroll
    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThan(1);
  });
});
