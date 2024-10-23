import { test, expect } from '@playwright/test';

test('test for profile page', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Book Store Application' }).click();
  await page.locator('li').filter({ hasText: 'Profile' }).click();
  await expect(page.getByText('Currently you are not logged')).toBeVisible();
});