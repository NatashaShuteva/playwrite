import { test, expect } from '@playwright/test';

test('test for modal dialog', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div:nth-child(3) > div > .avatar > svg').click();
  await page.getByText('Modal Dialogs').click();
  await page.getByRole('button', { name: 'Large modal' }).click();
  await expect(page.getByText('Large Modal', { exact: true })).toBeVisible();
  await page.locator('#closeLargeModal').click();
});