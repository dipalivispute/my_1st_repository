// spec: specs/flipkart_search_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Search Functionality', () => {
  test('Successful search with valid product keyword', async ({ page }) => {
    // 1. Navigate to Flipkart homepage
    await page.goto('https://www.flipkart.com');
    
    // Verify homepage loads successfully
    await expect(page).toHaveURL(/flipkart\.com/);
    
    // Verify search bar is visible
    const searchBox = page.locator('input[name="q"]');
    await expect(searchBox).toBeVisible();

    // 2. Enter 'laptop' in the search box
    await searchBox.fill('laptop');
    
    // Verify search box has the value
    await expect(searchBox).toHaveValue('laptop');

    // 3. Press Enter to search
    await searchBox.press('Enter');
    
    // Wait for URL to change (search results page)
    await page.waitForURL(/\/search\?q=laptop/);
    
    // 4. Verify search results page URL contains query parameter
    const currentUrl = page.url();
    expect(currentUrl).toContain('?q=laptop');
    expect(currentUrl).toContain('marketplace=FLIPKART');
    
    // Verify page title shows laptop search
    await expect(page).toHaveTitle(/Laptop.*Buy Products/i);
  });
});
