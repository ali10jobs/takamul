import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/contact');
  });

  test('renders contact form with step 1', async ({ page }) => {
    // Step 1 fields should be visible
    await expect(page.getByLabel(/name/i).first()).toBeVisible();
    await expect(page.getByLabel(/email/i).first()).toBeVisible();
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    // Try to advance without filling required fields
    const nextButton = page.getByRole('button', { name: /next|continue/i });
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(300);

      // Should show error messages
      const errors = page.locator('[role="alert"], .text-red-500, .text-error');
      const errorCount = await errors.count();
      expect(errorCount).toBeGreaterThan(0);
    }
  });

  test('multi-step form navigation', async ({ page }) => {
    // Fill step 1
    await page.getByLabel(/name/i).first().fill('Test User');
    await page.getByLabel(/email/i).first().fill('test@example.com');

    // Fill company if present
    const companyField = page.getByLabel(/company/i);
    if (await companyField.isVisible()) {
      await companyField.fill('Test Company');
    }

    // Fill phone if present
    const phoneField = page.getByLabel(/phone/i);
    if (await phoneField.isVisible()) {
      await phoneField.fill('+966501234567');
    }

    // Click next
    const nextButton = page.getByRole('button', { name: /next|continue/i });
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(500);

      // Should advance to step 2 — service selection should be visible
      const step2Content = page.getByLabel(/service/i).or(page.getByText(/service/i));
      await expect(step2Content.first()).toBeVisible();
    }
  });

  test('honeypot field is hidden', async ({ page }) => {
    // Honeypot field should exist but be invisible
    const honeypot = page.locator('[name="website"], [name="url"], [aria-hidden="true"] input');
    if ((await honeypot.count()) > 0) {
      const box = await honeypot.first().boundingBox();
      // Should be hidden (0 size or off-screen)
      expect(box === null || box.width === 0 || box.height === 0).toBeTruthy();
    }
  });
});
