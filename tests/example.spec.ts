import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// -----------------------------------------------------------------------------
// New test: search "samsung" on Flipkart
// -----------------------------------------------------------------------------
test('search samsung on flipkart', async ({ page }) => {
  // navigate to Flipkart homepage
  await page.goto('https://www.flipkart.com/');

  // close login modal if it appears
  const closeButton = page.locator('button:has-text("✕")');
  if (await closeButton.isVisible()) {
    await closeButton.click();
  }

  // fill search box and submit
  const searchBox = page.locator('input[name="q"]');
  await searchBox.fill('samsung');
  await searchBox.press('Enter');

  // wait for results heading to appear
  await expect(page.locator('h1, h2, h3').first()).toContainText(/samsung/i);
});
