import { test, expect } from '@playwright/test';

test('test for progress bar', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.getByText('Progress Bar').click();
  await page.getByRole('button', { name: 'Start' }).click();

  // Wait for the progress bar to reach 100%
  await page.waitForSelector('div[aria-valuenow="100"]');

  // Assert that the progress bar is 100%
  await expect(page.locator('div[aria-valuenow="100"]')).toBeVisible();

  // Assert that the "Reset" button is visible
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();

});