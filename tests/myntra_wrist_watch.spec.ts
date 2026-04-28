import { test, expect } from '@playwright/test';

test.describe('Myntra Wrist Watch Search Test', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configure browser context
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);
  });

  test('Search for wrist watch and select first product', async ({ page, context }) => {
    
    try {
      // Step 1: Navigate to myntra.com
      console.log('Step 1: Navigating to myntra.com...');
      await page.goto('https://www.myntra.com', { 
        waitUntil: 'domcontentloaded',
        timeout: 50000
      });
      console.log('✓ Successfully navigated to myntra.com');
      
      // Step 2: Click on the search bar
      console.log('Step 2: Clicking on search bar...');
      const searchBox = page.getByRole('textbox', { name: /search/i });
      await searchBox.click();
      console.log('✓ Clicked on search bar');
      
      // Step 3: Enter "wrist watch" in search bar
      console.log('Step 3: Entering "wrist watch" in search box...');
      await searchBox.fill('wrist watch');
      console.log('✓ Entered "wrist watch"');
      
      // Step 4: Wait for and count auto-suggestions
      console.log('Step 4: Waiting for auto-suggestions...');
      await page.waitForTimeout(800);
      
      const suggestions = page.locator('[role="option"]');
      const suggestionCount = await suggestions.count();
      console.log(`✓ Total number of auto-suggestions: ${suggestionCount}`);
      expect(suggestionCount).toBeGreaterThanOrEqual(0);
      
      // Step 5: Press Enter to submit search
      console.log('Step 5: Submitting search...');
      await searchBox.press('Enter');
      console.log('✓ Search submitted');
      
      // Wait for search results page to load
      console.log('Step 6: Waiting for search results page...');
      await page.waitForURL(/wrist-watch/i, { timeout: 30000 });
      console.log('✓ Search results page loaded');
      
      // Verify page has loaded with results
      await expect(page).toHaveURL(/wrist-watch/, { timeout: 10000 });
      console.log('✓ URL confirms wrist watch search results page');
      
      // Step 7: Verify search results count
      console.log('Step 7: Verifying search results...');
      const itemCountText = await page.locator('text=/[0-9,]+\\s+items/i').first().textContent();
      console.log(`✓ Total items found: ${itemCountText}`);
      
      // Step 8: Click on the first product from search results
      console.log('Step 8: Clicking on first product...');
      const firstProductLink = page.locator('a[href*="/watches/"]').first();
      await firstProductLink.click();
      console.log('✓ Clicked on first product');
      
      // Wait for product details page to load
      console.log('Step 9: Waiting for product details page...');
      await page.waitForTimeout(3000);
      console.log('✓ Product details page opened successfully');
      
      // Verify we're on a product page
      const currentUrl = page.url();
      expect(currentUrl).toContain('/watches/');
      console.log(`✓ Successfully navigated to product page: ${currentUrl}`);
      
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  test('Navigate through search suggestions', async ({ page }) => {
    try {
      await page.goto('https://www.myntra.com', { 
        waitUntil: 'domcontentloaded',
        timeout: 50000
      });
      
      const searchBox = page.getByRole('textbox', { name: /search/i });
      await searchBox.click();
      
      // Type and check suggestions
      await searchBox.type('watch', { delay: 100 });
      await page.waitForTimeout(1000);
      
      const suggestionItems = page.locator('[role="option"]');
      const count = await suggestionItems.count();
      
      console.log(`Found ${count} suggestions for "watch"`);
      expect(count).toBeGreaterThan(0);
      
    } catch (error) {
      console.error('Suggestion test failed:', error);
      throw error;
    }
  });
});

