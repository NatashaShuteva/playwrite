const { test, expect } = require('@playwright/test');

test('Dynamic Properties Test', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://demoqa.com/');
  await page.locator('svg').first().click();
  await page.getByText('Dynamic Properties').click();
    // Wait for 5 seconds
  await page.waitForTimeout(5000);
  await expect(page.getByRole('button', { name: 'Color Change' })).toBeVisible();

});