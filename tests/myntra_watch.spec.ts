import { test, expect } from '@playwright/test';

test('Myntra wrist watch search and add to bag', async ({ page }) => {
  await page.goto('https://www.myntra.com/');

  // Enter 'wrist watch' in the search bar
  await page.getByRole('textbox', { name: 'Search for products, brands and more' }).fill('wrist watch');

  // Wait for auto suggestions to appear
  await page.waitForSelector('.autocomplete-suggestions', { timeout: 5000 }).catch(() => {
    // If no suggestions, continue
  });

  // Count the number of auto suggestions
  const suggestions = page.locator('.autocomplete-suggestions li');
  const count = await suggestions.count();
  console.log('Total auto suggestions appeared:', count);

  // Click on submit (press Enter or click search button)
  await page.keyboard.press('Enter');

  // Wait for search results page
  await page.waitForURL(/wrist-watch/);

  // From search suggestions (results), select the 1st option
  const firstProduct = page.locator('a[href*="/p/"]').first();
  await firstProduct.click();

  // Wait for product page
  await page.waitForURL(/p\//);

  // Add to bag
  await page.getByRole('button', { name: /add to bag/i }).click();

  // Go back to search results
  await page.goBack();

  // Select another wrist watch (second product)
  const secondProduct = page.locator('.product-item').nth(1);
  await secondProduct.click();

  // Wait for product page
  await page.waitForURL(/p\//);

  // Add to cart
  await page.getByRole('button', { name: /add to bag/i }).click();

  // Go to cart
  await page.getByRole('link', { name: /bag/i }).click();

  // Wait for cart page
  await page.waitForURL(/checkout\/cart/);

  // Remove the 1st watch (first item in cart)
  const firstCartItem = page.locator('.cart-item').first();
  const removeButton = firstCartItem.locator('button[aria-label*="remove" i]');
  await removeButton.click();

  // Optionally, verify removed
  await expect(firstCartItem).not.toBeVisible();
});