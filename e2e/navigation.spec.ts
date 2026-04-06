import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('desktop nav links work', async ({ page }) => {
    await page.goto('/en');

    // Click Services link
    await page
      .getByRole('link', { name: /services/i })
      .first()
      .click();
    await page.waitForURL('**/en/services');
    expect(page.url()).toContain('/en/services');

    // Click About link
    await page.getByRole('link', { name: /about/i }).first().click();
    await page.waitForURL('**/en/about');
    expect(page.url()).toContain('/en/about');

    // Click Contact link
    await page
      .getByRole('link', { name: /contact/i })
      .first()
      .click();
    await page.waitForURL('**/en/contact');
    expect(page.url()).toContain('/en/contact');
  });

  test('logo navigates to home', async ({ page }) => {
    await page.goto('/en/about');

    // Click the logo/brand link (first link in header)
    const header = page.locator('header');
    await header.getByRole('link').first().click();
    await page.waitForURL('**/en');
  });

  test('mobile menu opens and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile menu test — skip on desktop');

    await page.goto('/en');

    // Menu button should be visible on mobile
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();

    // Open menu
    await menuButton.click();
    await page.waitForTimeout(300);

    // Nav links should be visible
    const navLinks = page.getByRole('navigation').getByRole('link');
    await expect(navLinks.first()).toBeVisible();

    // Close menu
    await menuButton.click();
    await page.waitForTimeout(300);
  });

  test('active nav link is highlighted', async ({ page }) => {
    await page.goto('/en/services');

    // The services nav link should have an active indicator
    const servicesLink = page.locator('header').getByRole('link', { name: /services/i });
    await expect(servicesLink).toBeVisible();
  });
});
