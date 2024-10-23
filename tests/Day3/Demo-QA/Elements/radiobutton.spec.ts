import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('.card-up').first().click();
  await page.getByText('Radio Button').click();
  await page.getByText('Impressive').click();
  await expect(page.getByRole('paragraph').getByText('Impressive')).toBeVisible();
});