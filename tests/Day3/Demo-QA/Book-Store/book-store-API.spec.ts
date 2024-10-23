import { test, expect } from '@playwright/test';

test('test for navigation to APi page', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('heading', { name: 'Book Store Application' }).click();
  await page.getByText('Book Store API').click();
  await expect(page.getByRole('heading', { name: 'Book Store API v1 OAS' })).toBeVisible();
});